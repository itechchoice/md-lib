#!/usr/bin/env node
/**
 * 自动生成目录索引 index.html
 * 运行方式: node generate-index.js
 *
 * 功能:
 * - 扫描当前目录及所有子目录
 * - 为每个目录生成 index.html 文件
 * - 显示文件夹结构，点击 .md 文件可直接查看内容
 */

const fs = require("fs");
const path = require("path");

// 配置: 忽略的目录和文件
const IGNORE_PATTERNS = [
  ".git",
  ".github",
  ".gitignore",
  ".DS_Store",
  "node_modules",
  "generate-index.js",
  "generate-diff.js",
  "llms.txt",
];

// 检查是否应该忽略
function shouldIgnore(name) {
  return IGNORE_PATTERNS.some(
    (pattern) => name === pattern || name.startsWith("."),
  );
}

// 获取文件图标
function getIcon(name, isDir) {
  if (isDir) return "📁";
  const ext = path.extname(name).toLowerCase();
  switch (ext) {
    case ".md":
      return "📄";
    case ".json":
      return "📋";
    case ".js":
      return "📜";
    case ".html":
      return "🌐";
    case ".css":
      return "🎨";
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".gif":
    case ".svg":
      return "🖼️";
    default:
      return "📃";
  }
}

// 格式化文件大小
function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// 生成单个目录的 index.html
function generateIndexHtml(dirPath, rootPath) {
  const relativePath = path.relative(rootPath, dirPath) || ".";
  const items = fs.readdirSync(dirPath);

  // 分离文件夹和文件
  const folders = [];
  const files = [];

  for (const item of items) {
    if (shouldIgnore(item)) continue;
    if (item === "index.html") continue; // 跳过我们生成的文件

    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      folders.push({ name: item, isDir: true });
    } else {
      files.push({
        name: item,
        isDir: false,
        size: stat.size,
        mtime: stat.mtime,
      });
    }
  }

  // 排序: 文件夹按名称，文件按名称
  folders.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  files.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

  const allItems = [...folders, ...files];

  // 生成面包屑导航
  const pathParts = relativePath === "." ? [] : relativePath.split(path.sep);
  let breadcrumb =
    '<a href="' + "../".repeat(pathParts.length) + 'index.html">🏠 根目录</a>';

  for (let i = 0; i < pathParts.length; i++) {
    const backSteps = pathParts.length - i - 1;
    const href = backSteps > 0 ? "../".repeat(backSteps) + "index.html" : "#";
    breadcrumb += ` / <a href="${href}">${pathParts[i]}</a>`;
  }

  // 生成文件列表 HTML
  let listHtml = "";

  // 如果不是根目录，添加返回上级目录链接
  if (relativePath !== ".") {
    listHtml += `
      <tr class="parent-dir">
        <td>📂</td>
        <td><a href="../index.html">.. (上级目录)</a></td>
        <td>-</td>
        <td>-</td>
      </tr>`;
  }

  for (const item of allItems) {
    const icon = getIcon(item.name, item.isDir);
    const href = item.isDir
      ? `${encodeURIComponent(item.name)}/index.html`
      : encodeURIComponent(item.name);
    const size = item.isDir ? "-" : formatSize(item.size);
    const mtime = item.mtime ? item.mtime.toLocaleString("zh-CN") : "-";

    listHtml += `
      <tr>
        <td>${icon}</td>
        <td><a href="${href}">${item.name}</a></td>
        <td>${size}</td>
        <td>${mtime}</td>
      </tr>`;
  }

  const title =
    relativePath === "." ? "Prometheus DNA Artifacts" : path.basename(dirPath);

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
      color: #333;
    }
    h1 {
      font-size: 1.5rem;
      border-bottom: 2px solid #0066cc;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .breadcrumb {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 20px;
    }
    .breadcrumb a {
      color: #0066cc;
      text-decoration: none;
    }
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #555;
    }
    tr:hover {
      background: #f8f9fa;
    }
    tr.parent-dir {
      background: #fff8e6;
    }
    td:first-child {
      width: 30px;
      text-align: center;
    }
    td:nth-child(3), td:nth-child(4) {
      width: 120px;
      color: #888;
      font-size: 0.85rem;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .stats {
      margin-top: 20px;
      font-size: 0.85rem;
      color: #888;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="breadcrumb">${breadcrumb}</div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>名称</th>
        <th>大小</th>
        <th>修改时间</th>
      </tr>
    </thead>
    <tbody>
      ${listHtml}
    </tbody>
  </table>
  <div class="stats">
    共 ${folders.length} 个文件夹, ${files.length} 个文件
  </div>
</body>
</html>`;

  const indexPath = path.join(dirPath, "index.html");
  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`✅ 生成: ${path.relative(rootPath, indexPath)}`);
}

// 递归处理所有目录
function processDirectory(dirPath, rootPath) {
  generateIndexHtml(dirPath, rootPath);

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (shouldIgnore(item)) continue;

    const itemPath = path.join(dirPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      processDirectory(itemPath, rootPath);
    }
  }
}

// 主程序
function main() {
  const rootPath = process.cwd();
  console.log(`📂 开始扫描: ${rootPath}\n`);

  processDirectory(rootPath, rootPath);

  console.log(`\n🎉 完成! 现在可以打开 index.html 查看目录结构了。`);
  console.log(
    `\n💡 提示: 将所有文件(包括 index.html)部署到 GitHub Pages 或服务器即可访问。`,
  );
}

main();
