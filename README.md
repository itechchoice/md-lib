# Prometheus DNA Artifacts · md-lib

> **面向 AI Agent 的文档库**：把 ABC-Prime / Prometheus 体系下的设计文档、场景反推、PPT 演示稿等 Markdown 资产，组织成一个可在浏览器里直接预览、并自带版本差异报告的静态站点。

本仓库的内容是 **文档** 与 **生成器脚本** 的组合：

- `*.md` — 真正的设计资产（架构宪法、场景规格、PPT 幻灯片源等）。
- `generate-index.js` — 递归为每个目录生成 `index.html`，把整个仓库变成可点击浏览的目录树。
- `generate-diff.js` — 扫描以版本号命名的目录（如 `xxx v1.3` / `v1.3.1`），自动产出 `diff.md` 版本差异报告，便于 AI Agent 解析。
- `.github/workflows/deploy.yml` — push 到 `main`/`master` 时跑这两个脚本并部署到 GitHub Pages。

---

## 仓库结构

```
md-lib/
├── README.md                      # 本文件
├── index.html                     # 自动生成的根目录索引（由 generate-index.js 产出）
├── diff.md                        # 自动生成的版本差异报告（由 generate-diff.js 产出）
├── generate-index.js              # 目录索引生成器
├── generate-diff.js               # 版本差异生成器
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
│
├── ABC-Prime/                     # ABC-Prime 12 个核心用户体验场景
│   ├── index.html                 # 目录索引（自动生成）
│   └── ABC-Prime 12 个核心用户体验场景 v3.0.md
│
└── Orchestrated-Forensics/        # 场景 ⑤「编排式取证」反推文档 + 幻灯片
    ├── index.html                 # 目录索引（自动生成）
    ├── 场景5-编排式取证.md         # 场景反推系统文档
    └── presentation.html          # PPT 风格的可演示幻灯片（独立 HTML）
```

> **关于 `presentation.html`**：`Orchestrated-Forensics/presentation.html` 是一份用纯 HTML/CSS/JS 模拟的 PPT 演示稿（带字体、动效、背景画布），原本以 `index.html` 命名会和目录索引冲突，现统一约定为 `presentation.html`，目录索引会自动给出指向它的链接。

---

## 当前内容

### 1. `ABC-Prime/` — 产品定位与场景目录

`ABC-Prime 12 个核心用户体验场景 v3.0.md`：面向金融机构的对外销售/演示版本，定义了 ABC-Prime 作为**意图驱动 AI 执行系统**的核心架构对象（Business Contract / Nomos / Prometheus / EB / EP / Hermes / Gateway / Mnem / Atlas / Scheduler）和 12 个端到端用户场景。

### 2. `Orchestrated-Forensics/` — 场景 ⑤「编排式取证」

把 `ABC-Prime` 中的「编排式取证」单独拆出来反推工程契约：

- `场景5-编排式取证.md`：执行摘要、行为链、契约清单（Evidence Pack Schema、政策版本快照绑定、独立完整性验证工具）等。
- `presentation.html`：同一主题的 PPT 风格幻灯片，可直接在浏览器全屏播放。

---

## 本地使用

仓库纯静态，没有运行时依赖，只需要 Node.js（用于跑生成器）。

### 1. 重新生成所有 `index.html`

每次新增/删除/重命名文档后跑一次：

```bash
node generate-index.js
```

它会：

- 跳过 `.git`、`.github`、`node_modules`、自身脚本等。
- 对仓库根目录及每一个子目录写入一个新的 `index.html`，列出其中的子目录与文件、面包屑、上级链接。
- 在二级目录里把 `presentation.html` 之类的资源以普通文件链接方式列出，点击即可预览。

### 2. 重新生成版本差异 `diff.md`

```bash
node generate-diff.js
```

`generate-diff.js` 只关心**目录名匹配 `^(.+?)\s*v?([\d.]+)$` 的版本目录**（例如 `核心概念与架构宪法 v1.3.1`）。它会：

- 扫描每个版本目录里的 `.md` 文件，计算 md5、行数、字数。
- 按版本号排序，两两比较，输出新增 / 删除 / 修改 / 未变更清单。
- 写入根目录的 `diff.md`，带 YAML frontmatter，便于 AI Agent 解析。

> 当前仓库已不存在版本目录，`diff.md` 中的版本表为空属正常现象——只要再放入形如 `xxx v2.0` 的目录，`diff.md` 就会自动重新带出版本对比。

### 3. 本地预览

直接用浏览器打开根目录的 `index.html`，或起一个简单的静态服务器：

```bash
# Python 3
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

---

## GitHub Pages 自动部署

`.github/workflows/deploy.yml` 在 push 到 `main`/`master` 或手动触发时：

1. checkout 代码；
2. 安装 Node.js 20；
3. 跑 `node generate-index.js` 重新生成所有目录索引；
4. 跑 `node generate-diff.js` 重新生成 `diff.md`；
5. 把整个仓库打包并部署到 GitHub Pages。

也就是说**你只需要提交 `.md` 文件**，索引和差异报告会在部署时自动生成。

---

## 添加新内容的工作流

1. **写文档**：在仓库根目录下新建一个目录（按主题/版本命名），把 `.md` 放进去。
   - 想被 `generate-diff.js` 纳入版本对比？目录名结尾加上 `v1.0` 这样的版本号。
   - 想加 PPT 风格演示？写一个独立的 `presentation.html`（不要叫 `index.html`，会被目录索引覆盖）。
2. **本地预跑**（可选）：`node generate-index.js && node generate-diff.js`，浏览器打开 `index.html` 检查。
3. **提交到 main**：CI 自动重新生成索引并部署到 GitHub Pages。

---

## 约定与注意事项

- **不要手写 `index.html`**：根目录和各子目录的 `index.html` 都会在部署时被脚本覆盖。
- **PPT / 富 HTML 资源命名**：使用 `presentation.html`、`slides.html` 等明确名字，避免占用 `index.html`。
- **忽略列表**：`generate-index.js` / `generate-diff.js` 内部维护了 `IGNORE_PATTERNS`，新增需要忽略的资源时记得同步更新两个脚本。
- **文件名可以是中文**：脚本内部使用 `encodeURIComponent` 处理 URL，GitHub Pages 上可正常访问。
