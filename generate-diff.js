#!/usr/bin/env node
/**
 * 自动生成版本差异文档 diff.md
 * 运行方式: node generate-diff.js
 * 
 * 生成 Agent 可读的结构化差异报告
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 配置
const IGNORE_PATTERNS = ['.git', '.DS_Store', 'node_modules', 'index.html', '.github'];
const VERSION_PATTERN = /^(.+?)\s*v?([\d.]+)$/;

// 生成文件内容的哈希值
function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  } catch {
    return null;
  }
}

// 获取文件统计信息
function getFileStats(filePath) {
  try {
    const stat = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    return {
      size: stat.size,
      lines,
      words,
      mtime: stat.mtime.toISOString()
    };
  } catch {
    return null;
  }
}

// 扫描目录获取所有文件
function scanDirectory(dirPath, basePath = dirPath) {
  const files = {};
  
  if (!fs.existsSync(dirPath)) return files;
  
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (IGNORE_PATTERNS.some(p => item === p || item.startsWith('.'))) continue;
    
    const fullPath = path.join(dirPath, item);
    const relativePath = path.relative(basePath, fullPath);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      Object.assign(files, scanDirectory(fullPath, basePath));
    } else if (item.endsWith('.md')) {
      files[relativePath] = {
        path: fullPath,
        hash: getFileHash(fullPath),
        stats: getFileStats(fullPath)
      };
    }
  }
  
  return files;
}

// 解析版本号
function parseVersion(dirName) {
  const match = dirName.match(VERSION_PATTERN);
  if (match) {
    return {
      baseName: match[1].trim(),
      version: match[2],
      fullName: dirName
    };
  }
  return null;
}

// 比较两个版本
function compareVersions(oldFiles, newFiles, oldVersion, newVersion) {
  const added = [];
  const removed = [];
  const modified = [];
  const unchanged = [];
  
  // 查找新增和修改的文件
  for (const [filePath, fileInfo] of Object.entries(newFiles)) {
    if (!oldFiles[filePath]) {
      added.push({
        file: filePath,
        stats: fileInfo.stats
      });
    } else if (oldFiles[filePath].hash !== fileInfo.hash) {
      const oldStats = oldFiles[filePath].stats;
      const newStats = fileInfo.stats;
      modified.push({
        file: filePath,
        changes: {
          lines: newStats.lines - oldStats.lines,
          words: newStats.words - oldStats.words,
          size: newStats.size - oldStats.size
        },
        oldStats,
        newStats
      });
    } else {
      unchanged.push(filePath);
    }
  }
  
  // 查找删除的文件
  for (const filePath of Object.keys(oldFiles)) {
    if (!newFiles[filePath]) {
      removed.push({
        file: filePath,
        stats: oldFiles[filePath].stats
      });
    }
  }
  
  return { added, removed, modified, unchanged };
}

// 生成 diff.md 内容
function generateDiffMarkdown(versionData, comparisons) {
  const now = new Date().toISOString();
  
  let md = `---
# Prometheus DNA Artifacts - Version Diff Report
# 此文件由 generate-diff.js 自动生成，用于 AI Agent 解析
# 格式遵循结构化 Markdown + YAML frontmatter

generated_at: "${now}"
format_version: "1.0"
schema: "agent-readable-diff"

versions:
${versionData.map(v => `  - name: "${v.fullName}"
    version: "${v.version}"
    file_count: ${Object.keys(v.files).length}
    total_lines: ${Object.values(v.files).reduce((sum, f) => sum + (f.stats?.lines || 0), 0)}`).join('\n')}

summary:
  total_versions: ${versionData.length}
  latest_version: "${versionData[versionData.length - 1]?.version || 'unknown'}"
---

# 版本差异报告 (Version Diff Report)

> **说明**: 此文档记录各版本之间的内容变更，采用结构化格式便于 AI Agent 解析和理解。

## 版本概览

| 版本 | 文件数 | 总行数 | 总字数 |
|------|--------|--------|--------|
${versionData.map(v => {
  const totalLines = Object.values(v.files).reduce((sum, f) => sum + (f.stats?.lines || 0), 0);
  const totalWords = Object.values(v.files).reduce((sum, f) => sum + (f.stats?.words || 0), 0);
  return `| ${v.fullName} | ${Object.keys(v.files).length} | ${totalLines} | ${totalWords} |`;
}).join('\n')}

---

`;

  // 生成每个版本对比的详细信息
  for (const comp of comparisons) {
    md += `## ${comp.from} → ${comp.to}

### 变更统计

\`\`\`yaml
comparison:
  from: "${comp.from}"
  to: "${comp.to}"
  changes:
    added: ${comp.diff.added.length}
    removed: ${comp.diff.removed.length}
    modified: ${comp.diff.modified.length}
    unchanged: ${comp.diff.unchanged.length}
\`\`\`

`;

    if (comp.diff.added.length > 0) {
      md += `### ➕ 新增文件 (${comp.diff.added.length})\n\n`;
      for (const item of comp.diff.added) {
        md += `- **${item.file}**\n`;
        md += `  - 行数: ${item.stats?.lines || 0}, 字数: ${item.stats?.words || 0}\n`;
      }
      md += '\n';
    }

    if (comp.diff.removed.length > 0) {
      md += `### ➖ 删除文件 (${comp.diff.removed.length})\n\n`;
      for (const item of comp.diff.removed) {
        md += `- ~~${item.file}~~\n`;
      }
      md += '\n';
    }

    if (comp.diff.modified.length > 0) {
      md += `### ✏️ 修改文件 (${comp.diff.modified.length})\n\n`;
      for (const item of comp.diff.modified) {
        const lineChange = item.changes.lines >= 0 ? `+${item.changes.lines}` : item.changes.lines;
        md += `- **${item.file}**\n`;
        md += `  - 行数变化: ${lineChange}, 当前行数: ${item.newStats.lines}\n`;
      }
      md += '\n';
    }

    if (comp.diff.unchanged.length > 0) {
      md += `### ✓ 未变更文件 (${comp.diff.unchanged.length})\n\n`;
      md += `<details>\n<summary>点击展开</summary>\n\n`;
      for (const file of comp.diff.unchanged) {
        md += `- ${file}\n`;
      }
      md += `\n</details>\n\n`;
    }

    md += '---\n\n';
  }

  // 添加各版本文件清单
  md += `## 版本文件清单\n\n`;
  
  for (const v of versionData) {
    md += `### ${v.fullName}\n\n`;
    md += `\`\`\`yaml\nversion: "${v.version}"\nfiles:\n`;
    for (const [filePath, fileInfo] of Object.entries(v.files)) {
      md += `  - path: "${filePath}"\n`;
      md += `    lines: ${fileInfo.stats?.lines || 0}\n`;
      md += `    words: ${fileInfo.stats?.words || 0}\n`;
      md += `    hash: "${fileInfo.hash?.substring(0, 8) || 'unknown'}"\n`;
    }
    md += `\`\`\`\n\n`;
  }

  return md;
}

// 主程序
function main() {
  const rootPath = process.cwd();
  console.log(`📂 扫描目录: ${rootPath}\n`);
  
  // 获取所有版本目录
  const items = fs.readdirSync(rootPath);
  const versions = [];
  
  for (const item of items) {
    if (IGNORE_PATTERNS.some(p => item === p || item.startsWith('.'))) continue;
    
    const itemPath = path.join(rootPath, item);
    if (!fs.statSync(itemPath).isDirectory()) continue;
    
    const versionInfo = parseVersion(item);
    if (versionInfo) {
      versionInfo.files = scanDirectory(itemPath);
      versions.push(versionInfo);
      console.log(`✅ 发现版本: ${versionInfo.fullName} (${Object.keys(versionInfo.files).length} 个文件)`);
    }
  }
  
  // 按版本号排序
  versions.sort((a, b) => a.version.localeCompare(b.version, undefined, { numeric: true }));
  
  // 生成版本间的比较
  const comparisons = [];
  for (let i = 0; i < versions.length - 1; i++) {
    const oldVersion = versions[i];
    const newVersion = versions[i + 1];
    const diff = compareVersions(oldVersion.files, newVersion.files, oldVersion.version, newVersion.version);
    comparisons.push({
      from: oldVersion.fullName,
      to: newVersion.fullName,
      diff
    });
    console.log(`📊 比较: ${oldVersion.version} → ${newVersion.version}`);
  }
  
  // 生成 diff.md
  const diffContent = generateDiffMarkdown(versions, comparisons);
  const diffPath = path.join(rootPath, 'diff.md');
  fs.writeFileSync(diffPath, diffContent, 'utf8');
  
  console.log(`\n🎉 已生成: diff.md`);
  console.log(`\n💡 此文件包含:`);
  console.log(`   - YAML frontmatter (便于解析)`);
  console.log(`   - 版本概览表格`);
  console.log(`   - 各版本间差异详情`);
  console.log(`   - 结构化的文件清单`);
}

main();
