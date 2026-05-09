---
title: "ABC-Prime · 12 个核心用户体验场景 v3.0"
source: "https://www.notion.so/35bbc670d3638012923cc88b1d03d48c"
exported_at: "2026-05-09"
---

# ABC-Prime · 12 个核心用户体验场景 v3.0
> **面向金融机构的意图驱动 AI 执行系统**
把用户意图、治理规则、执行过程、证据链、组织经验与周期性复核统一进一个可审计的执行系统。

---
## 文档说明
**版本：** v3.0（对外销售与客户演示版）
**读者：** 高管、销售、投资人、客户、合规委员会、IT 安全审查官
**用途：**
1. 客户首次接触时讲清产品定位
2. 销售阶段回答 IT 安全 / 合规委员会的问询
3. 投资人沟通时呈现产品差异化
4. 内部跨部门对齐 AI 执行系统的设计哲学
**配套文档：**
本文档每个场景都有对应的工程实现规格卡（独立的 12 份子页面），用于 PRD 拆分、Sprint 规划、QA 验收。两份文档讲同一架构，但读者不同——本文档讲”为什么这样做”，子页面讲”具体怎么做”。
---
# 第一部分 · 产品定位
## ABC-Prime 是什么
ABC-Prime **不是一个聊天机器人，也不是一个普通的 Agent 平台**。
它是一个面向金融机构的**意图驱动 AI 执行系统**：
> 用户用自然语言表达业务目标，系统将其转换为 Business Contract，经由 Nomos 治理规则约束，由 Prometheus 编译成可执行蓝图 EB 与执行策略 EP，再由 Hermes 执行，Gateway 强制执行权限与政策，Mnem 生成 Evidence Pack，Atlas 沉淀组织经验，Scheduler 触发周期性新执行，最终形成可审计、可治理、可复盘的金融级 AI 工作流。
一句话版本：
> **ABC-Prime 把 AI 从”会回答问题”升级为”能在规则约束下执行任务，并留下可验证证据”。**
---
## 为什么金融机构需要 ABC-Prime
通用 AI 工具（ChatGPT、Claude、Copilot 等）在金融业应用面临四个根本性问题：
### 问题 1 · 合规无法回溯
监管问询时，机构无法证明 AI 当时的判断依据、引用的政策版本、调用的数据源。一句”AI 这样输出的”在 FINRA、SEC 面前不是答辩。
### 问题 2 · 治理规则无法强制
机构的 IPS、合规政策、客户委托约束散落在 PDF、邮件和口头共识里。AI 输出是否遵守这些规则，靠员工”记得”。
### 问题 3 · 第三方数据边界不清
机构的客户数据通过 AI 调用流向哪些第三方？哪些字段流出？是否经过 DPA 审批？通用 AI 工具默认不告诉你。
### 问题 4 · AI 失败后会”自作主张”
权限拒绝、数据不可用、第三方失败时，普通 AI 工具会自动 fallback、自动 replan、自动换数据源——这在金融业是合规事故。
ABC-Prime 是为这四个问题量身设计的。它的每一条架构红线都对应一个金融业风险点。
---
## 销售一句话
| 场合 | 一句话 |
| --- | --- |
| 给 CIO / IT 安全 | “ABC-Prime 让 AI 行为第一次有了交易系统级的审计强度。” |
| 给合规委员会 | “AI 输出绑定执行时刻的政策版本——新规则永远不会改写历史证据。” |
| 给业务主管 | “顾问用一句话提交意图，系统生成可见、可审、可复用的执行蓝图。” |
| 给投资人 | “我们不是又一个 AI Chat——我们是金融机构 AI 治理的基础设施。” |
| 给老板 / 销售 | “From intent to execution. From execution to evidence. From evidence to governance. From governance to organizational memory.” |
---
# 第二部分 · Prime 核心架构对象词典
| 对象 | 含义 | 用户能否看到 |
| --- | --- | --- |
| **Interaction Surface** | 用户交互界面（Chat、Dashboard、Scheduler UI） | 能 |
| **Business Contract** | 用户目标、约束、上下文与恢复原因的结构化契约 | 部分能 |
| **Nomos** | 治理规则、IPS、审批和版本管理系统 | 合规角色能 |
| **Prometheus** | 编译器，将 Business Contract 编译为 EB / EP / ESD | 一般不可见 |
| **EB（Execution Blueprint）** | 固定执行蓝图——做什么、按什么结构做 | 以蓝图形式可见 |
| **EP（Execution Policy）** | 执行权限和治理边界 | 以权限提示可见 |
| **ESD（Execution Schedule Definition）** | 周期性任务定义 | 管理员 / 合规官可见 |
| **Hermes** | 执行编排引擎，按照 EB 固定执行 | 不直接可见 |
| **Gateway** | 策略执行点——deny / allow / block | 用户看到结果 |
| **Capability / Execution Unit** | Skill、MCP、API、Agent、LLM 等能力节点 | 以业务节点可见 |
| **Mnem Trace** | 不可篡改执行事件流 | 审计角色可见 |
| **Evidence Pack** | 面向合规和用户的证据包 | 能 |
| **Atlas** | 组织经验和记忆系统 | 以 Applied Lesson 形式可见 |
| **Outer Scheduler** | 外部周期性触发系统 | 管理员 / 合规官可见 |
> **对外用词建议：** 用户可见层面统一用 **Plan Preview**、**Evidence Pack**、**Capability**。EB、EAC、ECES 等是工程实现名，保留在内部 schema、错误码、API 文档中。
---
# 第三部分 · ABC-Prime 的 8 条产品红线
这 8 条红线不是限制——它们是 ABC-Prime 区别于普通 AI 工具的**架构宣言**。
## 红线 1 · 蓝图提交后不可偷偷改变
用户点击 Run 后，当前 Execution 必须按照已编译的 EB 执行。系统不能在运行中悄悄改蓝图。
> *为什么重要：* 金融业要求执行透明。如果 AI 在运行中”自己换了一种做法”，事后无法证明做了什么。
## 红线 2 · Gateway 只执行策略，不创造策略
Gateway 负责执行 EP。它不能临时发明规则，也不能解释 IPS。
> *为什么重要：* 策略来源唯一性是审计基础。
## 红线 3 · Prometheus 编译规则，但不创造治理规则
Prometheus 从 Nomos 获取当前生效规则，编译进 EP。它不能绕过 Nomos 自己创造规则。
> *为什么重要：* 任何绕过审批的”自动规则生成”都是合规漏洞。
## 红线 4 · Nomos 是治理规则唯一来源
IPS、合规规则、组织政策必须经过 Nomos 的草稿、校验、审批、发布、版本化流程。
> *为什么重要：* 单一治理来源是金融机构内审、外审的硬性要求。
## 红线 5 · 节点失败不允许 runtime fallback
权限拒绝、能力不可用、第三方失败时，当前 Execution 必须终止或阻塞。恢复只能通过新的 Business Contract 创建新的 Execution。
> *为什么重要：* Runtime fallback = 系统在运行中自己做选择 = 用户和合规事后无法还原决策路径。
## 红线 6 · 新规则不改写旧证据
旧 Evidence Pack 永远绑定执行当时的政策版本。新 IPS 只能影响未来执行，不能 retroactively 修改历史结果。
> *为什么重要：* 历史证据的不可变性是金融业司法可信度的基础。
## 红线 7 · Atlas 只能影响未来上下文，不能直接变成硬规则
Atlas 可以沉淀经验，生成 Candidate Lesson，经审批后影响未来执行上下文。若要变成强制规则，必须进入 Nomos 审批生命周期。
> *为什么重要：* 经验影响 ≠ 规则强制。
## 红线 8 · Scheduler 不循环执行，只创建新执行实例
每一次周期性任务触发，都是新的 Business Contract / EB / EP / Execution / Evidence Pack。
> *为什么重要：* 让每次触发都是独立可审计的执行——而不是一个永远不结束的”长执行”——是合规审计可读性的前提。
---
# 第四部分 · 12 个核心场景总览
| 编号 | 场景 | 主要角色 | 优先级 | 核心价值 |
| --- | --- | --- | --- | --- |
| ① | 意图 → 蓝图 | Lin | P0 | 把自然语言意图变成可见、可确认的执行计划 |
| ② | 异步执行 | Lin | P0 | 长任务提交后可离开，跨设备恢复和流式回流 |
| ③ | 节点失败后的合宪恢复 | Lin / Marcus | P0 | 权限拒绝时终止当前执行，通过新契约创建新执行 |
| ④ | 第三方 MCP 信任与数据边界 | Alex / Marcus / Lin | P1 | 每次第三方调用都可见、可审批、可追溯 |
| ⑤ | 编排式取证 | Marcus / Lin | P0 | 从输出追溯到完整 DAG、策略版本和节点证据 |
| ⑥ | 工作流作者 | Marcus | P1 | 把成功执行沉淀成团队可复用模板 |
| ⑦ | 跨顾问监督 | Marcus | P1 | 合规官从全局发现异常并钻取到具体执行 |
| ⑧ | 新人 onboarding | Sarah | P1 | 新顾问第一天完成真实首单 |
| ⑨ | 实时统计与成本治理 | Alex | P1 | 管理员按用户、能力、客户、第三方查看成本和风险 |
| ⑩ | Nomos 治理规则发布 | Marcus | P0 | 把 IPS / 合规政策变成可审批、可版本化、可执行规则 |
| ⑪ | Atlas 经验沉淀 | Marcus / Lin | P1 | 把失败和审查反馈变成未来行为改进 |
| ⑫ | Outer Scheduler 周期性复核 | Marcus / Alex | P1 | 周期性任务每次触发新的独立执行和证据包 |
---
# 第五部分 · 实施顺序与 MVP 分层
## Demo MVP（产品演示）
**场景 ① + ② + ⑤** —— 最小可演示闭环
完成后可以演示：
> 用户表达意图 → 系统生成可见蓝图 → 异步执行 → 产出可验证 Evidence Pack。
适合：第一次见客户、给老板汇报、给投资人介绍。
## Banking-grade MVP（金融机构试点）
**场景 ① + ② + ③ + ⑤ + ⑩** —— 进入金融机构 IT、安全、合规评审的最小场景集
完成后可以回答四个核心问询：
1. 规则从哪里来？（场景 ⑩）
2. 权限拒绝怎么办？（场景 ③）
3. 旧证据是否会被新规则篡改？（场景 ⑤ + ⑩）
4. 用户能否看清系统打算做什么？（场景 ① + ②）
适合：与合规委员会、IT 安全团队、CIO 的正式评审。
## 团队扩散阶段
**场景 ④ + ⑥ + ⑦ + ⑧ + ⑨**
让产品从”个人工具”变成”团队操作系统”——顾问、合规官、管理员都有自己的日常入口。
## 平台化阶段
**场景 ⑪ + ⑫**
让 ABC-Prime 成为组织级 AI 执行基础设施——经验沉淀、周期性治理、跨期审计。
---
# 第六部分 · 12 个场景详细叙事
---
# 场景 ① · 意图 → 蓝图：从一句话到可执行计划
## 场景定位
这是 ABC-Prime 的**核心循环**。
用户不选择功能、不填写表单、不配置流程，而是直接用自然语言表达业务目标。系统将这句话转换成可见、可解释、可确认的执行蓝图（Plan Preview）。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Lin · 财富顾问 |
| 使用频率 | 每天 5–10 次（核心循环） |
| 优先级 | P0 ★★★ |
| 耗时 | 提交到执行 0.5 – 5 分钟 |
| Prime 映射 | Interaction Surface → Business Contract → Prometheus 编译 EB / EP |
## 用户故事
财富顾问 Lin 收到客户邮件：
> 我 58 岁，200 万应税账户，希望配置一个 ETF only、单一持仓不超过 8%、有 ESG 偏好的退休组合，18 个月后需要提取 15 万。
在普通 AI 工具里，Lin 得到一段回答。
在 Excel 里，她要算 1 小时。
在传统投顾系统里，她要进入多个页面填写字段。
**在 ABC-Prime 里**，Lin 粘贴这段话后，系统生成一个可见的执行蓝图。她审视计划、确认无误、点击 Run。一旦提交，蓝图即冻结，Hermes 严格按蓝图执行，Gateway 在每个节点强制权限边界。
执行完成，Lin 收到的不只是一段答案——还有一份可被独立验证的 Evidence Pack。
## 核心体验流程
### Step 1 · 用户提交自然语言意图
Lin 把客户邮件粘贴进 Chat composer，按下回车。系统不要求她选择能力类型，也不要求填表。
### Step 2 · 系统流式生成 Plan Preview
1–2 秒内，界面显示「正在编排执行计划……」，下方出现动态生长的蓝图卡片：
```plain text
Plan Preview

1. Load client IPS
2. Read current portfolio holdings
3. Extract mandate constraints
4. Build initial allocation
5. Run pre-trade compliance check
6. Generate advisor explanation
7. Produce evidence pack
```
每个节点用业务语言命名，不暴露内部 Capability ID。
### Step 3 · 用户检查节点详情
Lin 点击「Build initial allocation」节点展开，看到：
```plain text
Capability: portfolio.allocation.build_initial
Data sources:
  - internal.fund.catalog
  - client.ips.constraints (from Step 1)
Outbound data: none (internal compute only)
Estimated tokens: 8K
Estimated duration: 30s
EP scope: pre-approved
```
### Step 4 · 用户确认执行
Lin 觉得没问题，点击 Run。
此时 Plan Preview 被提交为正式 Business Contract，由 Prometheus 编译成 EB（执行蓝图）+ EP（执行权限边界），交给 Hermes。
### Step 5 · 蓝图被冻结并进入执行
执行开始后，**当前 Execution 不允许在运行中偷偷改变蓝图**。
如果后续出现权限拒绝或数据不可用，系统不能 runtime fallback——只能终止或阻塞当前执行，并允许用户基于新约束创建新的 Execution（参见场景 ③）。
### Step 6 · 编辑只允许在 Draft 阶段
如果 Lin 想调整，必须在 Plan Preview 阶段（执行前）完成。每次编辑生成新版本号，便于事后审计「为什么用户从 v1 改到 v2」。
## UI 关键文案
```plain text
Plan Preview

This is what AlphaBitCore plans to do for you.
You can review and edit any step before running.
Once you click Run, this plan will be frozen
and executed under policy enforcement.
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 用户输入 | Interaction Surface |
| 自然语言目标 | Business Contract |
| 系统输出的执行计划 | EB |
| 权限和策略边界 | EP |
| 计划预览 | Plan Preview |
| 用户点击 Run | Contract Commit |
| 执行证据 | Mnem Trace / Evidence Pack |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT / Claude | 黑盒输入输出 | 意图编译为可见 Plan Preview，每个节点可解释 |
| LangChain / 自建编排 | 工程师写代码定义 chain | 业务用户用自然语言，Prometheus 自动编译 |
| 传统投顾系统 | 表单驱动，每个字段必须填 | 意图驱动，约束自动提取 |
| 通用 workflow 工具 | 运行期可改 | 蓝图一旦提交即冻结，符合金融业审计要求 |
## 给用户带来什么价值
- **从 1 小时到 5 分钟** —— 多约束委托从手动结构化变成系统理解
- **执行前可纠正** —— 意图理解错了，在 Plan Preview 阶段就能改
- **建立信任** —— 透明的计划比黑盒回答更值得托付高风险任务
- **架构清晰** —— 一旦提交，结构就被锁定，避免运行期”漂移”
## 工程要满足
需要支持：自然语言意图解析与 DAG 编译（Prometheus）、节点 display_name 业务化映射、节点元数据预估（token / 时长 / 数据源）、流式 Plan Preview 渲染、提交动作触发蓝图签名冻结并写入不可变记录、Plan Preview 草稿版本管理。
## 绝对红线
```plain text
❌ 用户在执行中改 EB
❌ 系统在执行中替换节点
❌ "智能"地跳过用户没批准的步骤
❌ 用户看到的是 raw JSON 而不是 Plan Preview
❌ 节点用工程化命名（skill-19-...）暴露给用户
```
正确表达：
```plain text
✅ 用户提交 Business Contract
✅ Prometheus 编译 Plan Preview
✅ 用户审视 Plan Preview
✅ 提交后蓝图冻结
✅ Hermes 严格按蓝图执行
```
## 验收标准
- 用户能在 5 分钟内从客户委托进入执行
- 蓝图至少显示节点名称、数据源、能力类型、权限要求、预计耗时
- 执行前用户能理解系统准备做什么
- 执行开始后，蓝图固定，不发生 runtime replan
- 节点显示业务名称，不暴露工程化 ID
## 一句话总结
**用户用一句话提交意图，ABC-Prime 编译出可见、可编辑、可冻结的执行蓝图——这是从聊天到执行系统的根本转变。**
---
# 场景 ② · 异步执行：提交后离开，跨设备流式回流
## 场景定位
金融任务往往不是 10 秒回答，而是 5–30 分钟的长流程。
ABC-Prime 必须让用户**提交后离开**，让任务在服务端继续执行，并在任意设备恢复查看。这是普通 AI Chat 永远做不到的事。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Lin · 财富顾问 |
| 使用频率 | 每天 1–3 次（涉及长任务时） |
| 优先级 | P0 ★★★ |
| 耗时 | 任务 5–30 分钟 |
| Prime 映射 | Execution Process / Execution State / Observation Surface |
## 用户故事
Lin 上午 10:00 提交一个批量再平衡任务，涉及 12 位客户，预计 15 分钟完成。她 10:15 有客户会议。
在 ChatGPT 里，她要么等 15 分钟错过会议，要么关掉浏览器丢失任务。
**在 ABC-Prime 里**，Lin 关上笔记本去开会。Hermes 引擎独立继续执行，Mnem 持续记录每个节点的状态。
10:30 会议中，Lin 手机收到推送：「您的批量再平衡任务已完成 70%，第 8 步发现 3 位客户违反新 IPS，需要您的关注」。
12:00 Lin 在平板上打开 ABC-Prime，从 Observation Surface 看到任务正在继续——已完成的部分立即可见，流式输出从中断处继续呈现。
下午 3:00 Lin 在电脑上看到完整的 Evidence Pack。整个过程，她没有”等待”过 AI 一次。
## 核心体验流程
### Step 1 · 任务徽章出现
Lin 提交意图后，Chat 顶部出现进行中的任务徽章：
```plain text
Active Executions: 1
└─ Batch Rebalance for 12 clients
   Progress: 23%
   ETA: ~12 minutes remaining
```
### Step 2 · 用户关闭浏览器
Lin 关上笔记本盖子。Hermes 后台继续执行。
**关键架构边界：** UI 是 Observation Surface，**只能观察、不能修改**运行中的蓝图结构。跨设备继续观察可以；跨设备改变运行结构不行。
### Step 3 · 关键事件触发推送
10:30，Hermes 检测到第 8 步发现合规异常，触发推送通知：
```plain text
Push notification:
"Batch Rebalance · 70% complete
3 clients flagged for IPS violation
Tap to review"
```
通知偏好可配置（push / email / Slack / 飞书）。
### Step 4 · 用户跨设备观察
12:00 Lin 在平板上打开 ABC-Prime。Observation Surface 重连，从历史事件流 fast-forward 到当前状态，然后切换到实时流：
```plain text
Tab: Active Executions
└─ Batch Rebalance for 12 clients
   ├─ ✓ Step 1-7 completed
   ├─ ⚠ Step 8: 3 clients flagged
   └─ ⏳ Step 9-10 running
```
### Step 5 · 检视被标记的客户
Lin 点击 3 个被标记客户中的第一个，看到该客户对应的子 Execution。问题节点高亮：
```plain text
Client: Mrs. Chen
Step 8: Pre-trade compliance check
Status: ⚠ Warning
Issue: TSLA holding 7.8% > new IPS threshold 7.0%
Recommendation: Manual review required
```
任何”标记审查”动作都不修改原 Execution——只是追加观察注解。
### Step 6 · 关闭平板，回到电脑继续
Lin 完成审查，关闭平板。Hermes 继续执行。
下午 3:00 Lin 在电脑上看到完整 Evidence Pack：
```plain text
Batch Rebalance for 12 clients · Completed
Total duration: 14m 23s
Successful: 9 clients
Flagged for review: 3 clients
Evidence Pack: ep_batch_rebalance_2026_06_15_001
```
## UI 关键文案
```plain text
This task is running independently.

You can close this window or switch devices.
Output will continue and you can return anytime.
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 任务徽章 | Observation Surface |
| 后台执行 | Hermes Execution Process |
| 状态持久化 | Mnem Trace |
| 跨设备恢复 | Trace Replay |
| 通知 | Execution Event Subscription |
| 最终结果 | Evidence Pack / Report |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT | 关闭 = 失去对话上下文 | Execution 持久化，任意设备登录可继续观察 |
| 大多数 AI 产品 | 必须盯屏 | 提交即放手——通知到达再回来 |
| LangChain agents | 需自建任务管理 | 原生 Observation Surface |
| 传统 batch 任务 | 等邮件结果 | 实时流式回流 |
## 给用户带来什么价值
- **不被 AI 任务绑住** —— 长任务可以提交后离开
- **跨设备无缝** —— 电脑提交、手机跟进、平板查看，体验连续
- **不丢失工作** —— 崩溃、关闭、断网都不会丢失任务
- **多任务并行** —— 同时跑多个分析，进度都可见
## 工程要满足
需要支持：执行进程与前端会话彻底解耦、事件流持久化（Mnem）、关键事件推送通道（移动端 push / 邮件 / 即时通讯）、跨设备状态恢复与历史回放、单一数据源保证多设备一致性、Observation Surface 严格只读权限模型。
## 绝对红线
```plain text
❌ UI 关闭后任务停止
❌ UI 可以修改运行中的蓝图
❌ 跨设备登录看到不同的状态
❌ 重连后丢失历史输出
❌ 用户可以"暂停"运行中的 Execution
```
正确表达：
```plain text
✅ Hermes 独立执行，不依赖 UI
✅ UI 是 Observation Surface，只读
✅ Mnem 是单一数据源
✅ 所有设备订阅相同状态流
✅ 重连后 fast-forward 到当前状态
```
## 验收标准
- 用户关闭浏览器后，任务继续执行
- 用户换设备后，能恢复到同一 Execution
- 已完成节点、中间结果、当前节点、最终 Evidence Pack 均可见
- 任务状态与输出不依赖前端会话
## 一句话总结
**Hermes 独立执行，UI 只是观察窗口——这让 ABC-Prime 可以处理 ChatGPT 永远做不到的长任务、跨设备工作流。**
---
# 场景 ③ · 节点失败后的合宪恢复：终止当前执行，创建新执行
## 场景定位
这是 ABC-Prime **架构严肃性的关键场景**。
当节点遇到权限拒绝、数据源不可用、第三方失败或策略 deny 时，系统**不能在当前 Execution 内偷偷 fallback**，也不能运行时替换节点。
正确方式是：
> 当前 Execution 终止或阻塞，失败完整记录。用户或系统基于新的约束创建新的 Business Contract，Prometheus 重新编译新的 EB / EP，启动新的 Execution。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Lin · 财富顾问 / Marcus · 合规官 |
| 使用频率 | 每周 2–5 次 |
| 优先级 | P0 ★★★ |
| 耗时 | 失败到恢复 30 秒到 5 分钟 |
| Prime 映射 | Gateway deny / Execution terminal state / 新 Business Contract |
## 用户故事
Lin 为客户 Chen 生成退休组合再平衡解释。
原始蓝图需要调用 Bloomberg 获取实时债券收益率数据。
执行到该节点时，Gateway 返回：
```plain text
DENY: Client account does not have approved Bloomberg data entitlement.
```
**ABC-Prime 不会自动切换到内部历史数据源。**
它会清楚告诉 Lin：
> 当前执行已被 Gateway 策略裁决终止。没有获取 Bloomberg 数据，也没有执行下游计算。
你可以基于新的约束创建一个新的执行：使用内部历史数据重新生成报告。
Lin 点击「Create New Run with Internal Data」。
系统生成新的 Business Contract，Prometheus 重新编译新的 EB / EP，新的 Execution Process 启动。
## 核心体验流程
### Step 1 · 执行前蓝图确认
Lin 输入意图，系统生成 Plan Preview。Bloomberg 节点显示 UI 标注：
```plain text
Market Data Source: Bloomberg
Entitlement: Requires client-approved data access
Policy: Will be enforced by Gateway at runtime
```
Lin 点击 Run。
### Step 2 · 执行进入 Bloomberg 节点
Hermes 创建 Execution Process。执行路径固定为：
```plain text
Execution Process
→ Connector
→ Gateway
→ Bloomberg Data Unit
```
Gateway 检查权限边界后返回：
```json
{
  "decision": "deny",
  "reason": "client_data_entitlement_missing",
  "capability": "bloomberg.market_data.fetch",
  "policy_ref": "ep_2026_04_chen_001"
}
```
### Step 3 · 当前 Execution 进入终态
系统**不 fallback、不改蓝图、不替换节点**。
```plain text
contract.status = aborted
node.status = denied
```
UI 显示：
> Execution aborted by policy enforcement.
No market data was fetched.
No downstream calculation was performed.
### Step 4 · 用户选择创建新 Execution
UI 提供合法恢复选项：
```plain text
Recovery Options

A. Create new run using internal historical data
B. Request entitlement approval
C. Save as blocked evidence
```
Lin 选择 A。**这一步不是继续原 Execution。**
### Step 5 · 创建新的 Business Contract
系统生成新的 Business Contract：
```plain text
Objective:
Generate retirement portfolio rebalance explanation.

Constraint:
Use internal historical market data instead of Bloomberg.

Reason:
Bloomberg entitlement denied in previous execution.

Context refs:
- previous_execution_id
- denied_node_id
- gateway_decision_id
```
新 Business Contract 引用前一个失败 Execution 的 ID 作为上下文，但本质上是独立的新 Execution。
### Step 6 · Prometheus 重新编译新 EB / EP
新的 EB：
```plain text
1. Load client IPS
2. Read current portfolio holdings
3. Fetch internal historical market data
4. Calculate rebalance delta
5. Generate advisor explanation
6. Produce compliance evidence pack
```
新的 EP 明确不包含 Bloomberg 能力，确保 Gateway 在新 Execution 中不会再尝试 Bloomberg。
### Step 7 · 新 Execution 独立启动
系统显示：
```plain text
This is a new execution.

The previous execution was aborted by Gateway policy enforcement.
No runtime fallback occurred.

A new blueprint and policy have been compiled for this run.
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 原始请求 | Business Contract |
| 原始蓝图 | EB |
| 原始权限边界 | EP |
| Bloomberg 节点 | Execution Node |
| 权限拒绝 | Gateway deny |
| 执行终止 | Execution terminal state |
| 用户选择恢复 | New Business Contract |
| 新蓝图 / 新权限 / 新执行 | New EB / EP / Execution Process |
| 失败证据 | Mnem Trace / Evidence Pack |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT / Claude | 工具调用失败 = 整个对话停下 | 失败完整记录，用户创建新 Execution |
| LangChain | 默认抛异常或自动 fallback | 终止 + 新 Business Contract，绝无 runtime replan |
| 传统 RPA | 脚本失败完全失败，要重写 | 失败上下文保留，新执行复用前序成功结果 |
| 普通 SaaS | 「Tool failed」一句话，无下一步 | 失败必带 3 个合法恢复选项 |
## 给用户带来什么价值
- **失败可审计** —— 每次失败完整留痕，而不是默默”自动恢复”
- **决策保留在用户** —— 系统不替用户做选择
- **新执行结构清晰** —— 不污染原 Execution，新蓝图完全独立
- **避免假成功** —— 没有任何”看似成功但其实降级”的隐患
## 工程要满足
需要支持：Gateway 运行期权限校验（带结构化 deny 原因码）、Execution 终态机器（aborted / blocked）、失败上下文持久化、新 Business Contract 自动引用前序 Execution、跨 Execution 的关联追溯链路、UI 上明确告知”无 runtime fallback”的文案与状态。
## 绝对红线
```plain text
❌ 系统自动切换到备用数据源
❌ 引擎从节点 4 重新调度
❌ 当前执行中替换节点
❌ 当前执行中重新选择 Capability
❌ 当前执行中动态改蓝图
❌ 当前 Execution 内 retry / fallback / replan
```
正确表达：
```plain text
✅ 当前 Execution 被终止或阻塞
✅ 失败被完整记录
✅ 用户创建新执行
✅ Prometheus 重新编译 EB / EP
✅ 新 Execution Process 独立运行
```
## 验收标准
- 权限拒绝时，当前执行不会继续跑下游节点
- UI 明确说明没有 runtime fallback
- 新执行必须有新的 execution_id
- 新 Evidence Pack 必须引用 previous_execution_id
- 合规官能同时查看失败执行和恢复后的新执行
## 一句话总结
**Prime 不做运行期 fallback；Prime 做可审计的失败终止，以及基于新契约的新执行。**
---
# 场景 ④ · 第三方 MCP 信任引入与数据边界
## 场景定位
ABC-Prime 可以接入第三方 MCP 服务（市场数据、ESG 数据、研究数据、行情数据等）。
但在金融机构里，关键不是”能接入多少第三方”，而是：
> 客户数据是否会流向第三方？哪些字段会传输？是否经过批准？某次执行用了哪个第三方、哪个版本、什么时间、什么数据 hash？
接入第三方**不是运行时决定**——必须先经过 Nomos Governance Artifact 流程。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Alex · 平台管理员 / Marcus · 合规官 / Lin · 财富顾问 |
| 使用频率 | 信任建立一次性，使用持续 |
| 优先级 | P1 ★★ |
| 耗时 | 信任建立 1–3 周；使用即时 |
| Prime 映射 | Nomos Capability Registry / EP / Gateway / Capability Unit |
## 用户故事
ABC Wealth 想接入 Bloomberg 的 ETF 数据 MCP 服务。
Alex 在能力市场看到 Bloomberg MCP，但**不能直接接入**——必须先走 Nomos 治理流程：服务商身份验证、DPA 草案审批、合规签字、写入 Capability Registry。
整个流程花了 2 周。从那以后，Prometheus 编译 EB 时可以引用 Bloomberg ETF 数据节点。
Lin 第一次用到 Bloomberg 数据时，蓝图明确标识第三方节点（不同颜色 / 图标），并显示”会传输什么、不传输什么”。执行后，Evidence Pack 完整记录第三方调用的版本、时间戳、请求和响应的 hash。
Marcus 季度审计时，可一键导出”过去 90 天所有第三方调用清单”，满足 IT 安全审查。
## 核心体验流程
### Step 1 · 管理员浏览第三方能力
Alex 打开「能力市场」，看到候选服务：
```plain text
Available MCP Services (Pending Governance Approval)

- Bloomberg ETF Data
  Provider: Bloomberg L.P.
  Compliance: SOC 2 Type II
  DPA: Required (review before approval)

- Refinitiv Market Data
- Sustainalytics ESG
- ...
```
每个候选项必须声明：服务商身份、DPA 草案、合规认证、数据传输边界、可审计性。
### Step 2 · 管理员触发 Nomos 接入流程
Alex 点击「接入 Bloomberg」，系统进入 Nomos Governance Artifact 创建流程：
```plain text
Nomos Governance Artifact: capability_onboarding

Capability: bloomberg.etf.market_data
DPA Draft: included (review required)
Outbound data fields:
  - ETF tickers
  - date range
  - aggregation level
Restricted data fields (NOT transmitted):
  - client identity
  - account numbers
  - portfolio composition
Retention: Bloomberg-side 30 days; Prime-side hash only
```
**Artifact 草案不能被任何 Execution 引用，直到审批通过。**
### Step 3 · 合规与法务审批
Marcus 和法务团队审阅 DPA、数据流向、合规认证：
```plain text
Approval Workflow

Draft → Legal Review → Compliance Approval → Publish

Legal: ✓ Approved by Sarah Chen (2026-04-15)
Compliance: ✓ Approved by Marcus Wong (2026-04-18)
Status: Ready to publish
```
每次签字本身是一次小 Execution，写入 Mnem。
### Step 4 · Capability 进入 Registry
审批通过后，Bloomberg ETF Data 成为公司可用 Capability：
```plain text
Capability Registry Update

bloomberg.etf.market_data
  status: active
  governance_artifact: cap_bloomberg_etf_v1
  approved_at: 2026-04-19
  effective_date: 2026-04-20
  origin: third_party
  display_name: "Bloomberg ETF Data"
```
**只有此刻起，Prometheus 才能在编译 EB 时引用这个 Capability。**
### Step 5 · 蓝图中显式展示第三方节点
Lin 提交一个组合分析意图。Plan Preview 中**第三方节点用不同视觉标识**：
```plain text
Plan Preview

1. Load client IPS                    [internal]
2. Extract mandate constraints        [internal]
3. ☁ Fetch ETF market data           [third_party · Bloomberg]
4. Build allocation                   [internal]
...
```
### Step 6 · 执行前展示数据边界
Lin 点击节点 ③ 展开：
```plain text
Third-party node: Bloomberg ETF Data
Will transmit:
  - ETF tickers in scope
  - date range: last 18 months
Will NOT transmit:
  - client name
  - account number
  - portfolio composition
EAC will record: full request/response hash
```
### Step 7 · Evidence Pack 记录第三方调用
执行完成后，Evidence Pack 中有专门的”第三方调用记录”节：
```plain text
Third-Party Call Record

Capability: bloomberg.etf.market_data
Provider: Bloomberg L.P.
API Version: v3.2
Timestamp: 2026-04-23T22:58:59Z
Request body hash: sha256:a3f9...
Response body hash: sha256:b2c1...
Governance Artifact: cap_bloomberg_etf_v1
Outcome: success
```
### Step 8 · 合规官季度审计
Marcus 在合规仪表盘可查询：
```plain text
Compliance Dashboard → Third-Party Audit

Past 90 days:
- bloomberg.etf.market_data: 1,247 calls (98.2% success)
- refinitiv.bond.data: 432 calls (96.7% success)
- sustainalytics.esg.score: 891 calls (99.1% success)

Top users:
- Lin: 234 Bloomberg calls
- David: 187 Bloomberg calls

Export → CSV / PDF
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 第三方服务目录 | Capability Registry |
| DPA 审批 | Governance Artifact |
| 第三方节点 | EB Node with origin = third_party |
| 数据字段边界 | Outbound Data Schema |
| 运行时验证 | Gateway |
| 调用记录 | Mnem Trace |
| 证据展示 | Evidence Pack |
| 合规查询 | Audit / Observation Surface |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| 普通 AI 产品 | 第三方调用埋在代码里 | 第三方节点在蓝图里显式标识 |
| MCP 客户端 | 能调用，无治理元数据 | 每次调用记录数据流向 / 版本 / hash |
| 传统 SaaS | DPA 是合同附件，无运行时验证 | DPA 是 Nomos Governance Artifact，运行时 Gateway 强制 |
| 开发者工具 | 调用了什么靠 git log 翻找 | Evidence Pack 多维查询，审计一键导出 |
## 给用户带来什么价值
- **透明的数据流出** —— 用户在执行图里就能看到「这个节点调用了第三方 X」
- **合规自动追溯** —— Evidence Pack 记录第三方调用的时间、版本、数据载荷 hash
- **采购不背锅** —— IT 安全审查时，可一键导出过去 90 天所有第三方调用清单
- **第三方失败可降级** —— 通过场景 ③ 的合宪失败恢复路径（不是 runtime fallback）
## 工程要满足
需要支持：第三方 MCP 服务目录与 DPA 数字签名流程、Capability Registry 准入审批工作流、Capability schema 显式声明 outbound data fields、节点 origin 字段标记与 UI 区分渲染、第三方调用 hash 记录、Evidence Pack 按第三方多维索引（vendor / time / user / client）。
## 绝对红线
```plain text
❌ 第三方调用不能隐藏在后端代码里
❌ 用户执行前不知道有第三方调用
❌ outbound fields 不可声明、不可验证
❌ 未批准第三方被 Gateway 放行
❌ 失败后在当前 Execution 中偷偷换第三方
❌ Capability Registry 可被普通用户修改
```
正确表达：
```plain text
✅ 第三方接入走 Nomos 治理流程
✅ DPA 必须先签字才能写入 Registry
✅ 第三方节点在蓝图中显式标识
✅ 执行期 Gateway 强制已批准 Capability
✅ Evidence Pack 完整记录所有第三方调用
```
## 验收标准
- 每个第三方能力都有审批状态
- 每次第三方调用都进入 Evidence Pack
- 第三方节点在蓝图中明显可见
- outbound data fields 可在执行前预览
- 合规官能按 vendor / user / client / time 查询调用记录
## 一句话总结
**第三方接入是治理决策，不是运行时决策——Nomos 把第三方变成可审计的合法 Capability。**
---
# 场景 ⑤ · 编排式取证：从 Evidence Pack 到完整 DAG 追溯
## 场景定位
这是 ABC-Prime **进入金融机构销售的门票**。
金融机构不会只关心 AI 是否能生成结果，它们更关心：
> 这个结果是怎么来的？当时适用哪个 IPS 版本？每个节点调用了什么能力？输入输出是否被篡改？如果监管问询，能否 60 秒内给出证据？
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · 合规官 / Lin · 财富顾问 |
| 使用频率 | 每周 2–5 次 |
| 优先级 | P0 ★★★ |
| 耗时 | 60 秒 |
| Prime 映射 | Mnem / Trace / Evidence Pack / Replay / Audit |
## 用户故事
Lin 上周一交付的客户组合，本周三被合规问询：
> 客户 X 的 TSLA 持仓 7.8%，但你 IPS 当时写的是 ≤7%——为什么超出？
在普通系统里，Lin 要翻聊天历史、对照 IPS 文档、解释分析过程。
**在 ABC-Prime 里**，Marcus 自己就能 60 秒内拿到完整证据：
> 这个组合执行时，IPS 是 v2.3，TSLA 限制是 8%。v2.4（≤7%）在执行后 3 天才生效。这是当时的蓝图、每个节点的权限边界、输入输出 hash、引用的 IPS 版本。
这不是一条记录，而是一张**可独立验证的执行图**。
## 核心体验流程
### Step 1 · 合规官调取证据
Marcus 在合规仪表盘看到 Lin 的客户 X 组合被标记「需要复核」：
```plain text
Compliance Dashboard

Flagged: Client X portfolio (built 2026-04-23 by Lin)
Issue: TSLA 7.8% appears to violate v2.4 (≤7%)
Action: View Evidence Pack
```
仅授权角色可访问。
### Step 2 · 系统呈现完整执行图
```plain text
Execution: exec_chen_2026_04_23_001
Status: completed
Duration: 47s

EB Structure:
  ✓ 1. Load client IPS (v2.3)         · 2s
  ✓ 2. Read portfolio holdings        · 4s
  ✓ 3. Extract mandate constraints    · 8s
  ✓ 4. Build allocation               · 18s
  ✓ 5. Pre-trade compliance check     · 9s
  ✓ 6. Generate explanation           · 6s

Evidence Pack: ep_chen_2026_04_23_001
```
### Step 3 · Marcus 检视合规检查节点
Marcus 点击「Pre-trade compliance check」节点：
```plain text
Node 5: Pre-trade compliance check

Referenced policy: ips_policy_v2.3
Effective at execution time: yes
Constraint enforced:
  - max single holding: 8.0% (v2.3)
TSLA holding evaluated: 7.8% ✓ (within v2.3 limit)

Execution decision: PASS
```
**关键事实**：Lin 提交时，生效的是 v2.3，TSLA 限制是 8%。当时的执行确实合规。
### Step 4 · Marcus 校验 Evidence Pack 完整性
Marcus 点击「Verify Integrity」：
```plain text
Evidence Pack Integrity Check

Loading execution structure...
Recomputing Merkle root from event stream...
Comparing with Evidence Pack signature...

✓ Evidence Pack integrity verified.
Hash: sha256:f7d2c9...
Signed by: Mnem service key #abc123
Signed at: 2026-04-23T22:58:59Z
```
**即使主系统被攻陷，独立验证工具也可独立验证历史 Evidence Pack。**
### Step 5 · Marcus 处置：追加审查记录
Marcus 决定标记为「已通过（政策过渡期良性差异）」：
```plain text
Compliance Action

Original Evidence Pack: ep_chen_2026_04_23_001 (immutable)
New audit record: audit_chen_2026_05_15_review_001
  reviewer: Marcus
  decision: approved
  rationale: "Compliant under v2.3, in effect at execution time"
  references_evidence_pack: ep_chen_2026_04_23_001

Lin notification: sent
```
**注意**：Marcus 的处置创建了新的审查记录，引用原 Evidence Pack。**原 Evidence Pack 永不被修改。**
### Step 6 · 必要时触发确定性 Replay
如果 Marcus 需要更深入验证，可触发 deterministic replay：
```plain text
Replay Request

Original execution: exec_chen_2026_04_23_001
Replay mode: historical (use original context, data hashes, model versions)

Hermes restoring environment...
Re-executing under same EB / EP...
Comparing output hash: ✓ Match
Replay confirmed: results reproducible
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 合规调取 | Audit Surface |
| 执行图重建 | Mnem trace replay |
| 策略版本绑定 | Nomos Versioned Policy |
| 节点证据 | Mnem Trace |
| 完整性验证 | Evidence Pack verification |
| 审查处置 | 新 Evidence Pack（audit subtype） |
| 重放验证 | Hermes historical replay |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT 企业版 | 对话日志，不可加密验证 | 每节点输入输出 hash 独立验证 |
| 传统投顾 | 审计日志是「人工写明的注释」 | 审计是「系统自动产生的蓝图 + Evidence Pack」 |
| LangChain + 自建监控 | 工程团队配置，事后还原 | 原生 first-class，提交即沉淀 |
| 合规审计工具（AuditBoard 等） | 审计的是文档 | 审计的是 AI 实际执行的每一步 |
## 给用户带来什么价值
- **从「不可证」到「可证」** —— AI 输出第一次有了交易系统级的审计强度
- **合规问询从天到分钟** —— 证据自动检索，不需要人肉梳理
- **用户敢用 AI 做严肃决策** —— 背后有可追溯的证据链兜底
- **对监管有交代** —— 可以应对 FINRA / SEC 等监管的 AI 治理要求
## 工程要满足
需要支持：执行事件流的不可变持久化（Mnem）、节点级 hash 记录与 Merkle root 签名、独立完整性验证工具、策略版本快照与 Evidence Pack 绑定、跨版本评估能力（保留并列评估而不覆盖）、合规处置作为新 Evidence Pack（audit subtype）写入、确定性历史 Replay。
## 绝对红线
```plain text
❌ 处置动作修改原 Evidence Pack
❌ 新策略 retroactively 改写历史 Evidence Pack
❌ Evidence Pack 可被普通用户编辑
❌ 重放产生与原执行不同的输出
❌ 合规仪表盘可以"重新执行"原 Execution
```
正确表达：
```plain text
✅ Evidence Pack 不可变，只能追加
✅ 历史 Evidence Pack 绑定执行时刻的策略版本
✅ 处置创建新审查记录，引用原 Evidence Pack
✅ 重放是确定性的
✅ 合规视图是只读 Observation Surface
```
## 验收标准
- 合规官能在 60 秒内回答「为什么当时允许」
- Evidence Pack 可验证未被篡改
- 历史执行绑定历史 policy version
- 审查结论形成新的审计事件
- 重放结果与原执行 hash 一致
## 一句话总结
**ABC-Prime 不只产出答案，还产出可独立验证的执行史——这是金融业把 AI 用于严肃决策的前提。**
---
# 场景 ⑥ · 工作流作者：业务用户构建可治理的 Assembly
## 场景定位
当顾问团队开始重复使用 ABC-Prime 后，会自然出现一个问题：
> 能不能把资深顾问的最佳实践沉淀成团队模板？
如果工作流只能由工程师写代码，ABC-Prime 会变成开发者工具。
如果业务用户能从一次成功执行复制、编辑、测试、发布，ABC-Prime 才能成为企业 SaaS。
但这**不是普通 workflow builder**——它创建的是可治理的 Assembly，发布、共享、版本必须走 Nomos。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · 资深顾问 / IPS 合规官 |
| 使用频率 | 每月 2–5 次 |
| 优先级 | P1 ★★ |
| 耗时 | 首次创建 30–60 分钟 |
| Prime 映射 | Skill / Assembly / Nomos Governance Artifact |
## 用户故事
Marcus 发现团队 8 位顾问每天都在做相似的事——粘贴客户委托、让系统编排、微调、输出。每个人微调的方式不一样，导致同样场景下输出质量参差不齐。
Marcus 想：
> 我能不能把我做这件事的最佳实践，做成一个可复用的 Assembly，让团队都用？
他在 ABC-Prime 里点击「+ 新建 Assembly」，从一次成功的 Execution 复制为草案，在可视化编辑器里调整，加入「如果客户有税务敏感需求，多调用一次税务优化节点」的条件分支。沙箱测试通过后，提交 Nomos 审批。合规官签字后，Assembly 进入 Capability Registry。
下周一，团队顾问在 Chat 顶部看到「Marcus 发布了新 Assembly：『退休组合 - 含税务优化』」。Lin 一键试用，发现比她自己摸索的方式快 30%。
## 核心体验流程
### Step 1 · 从历史 Execution 创建草案
Marcus 在「我的 Assembly」点击「+ 新建」：
```plain text
New Assembly

Source:
  ○ Empty
  ● From a successful execution
    └─ Select: exec_client_y_2026_04_15_001

Convert to Assembly draft? Yes
```
历史 Evidence Pack 反向生成 Assembly 草案——具体输入值变为参数占位符。
### Step 2 · 可视化编辑结构
```plain text
Assembly Draft Editor: "Retirement Portfolio with Tax Optimization"

[1] Read client mandate
   ↓
[2] Load active IPS
   ↓
[3] Build initial allocation
   ↓
[4] ◇ Has tax-sensitive requirement?
   ├─ Yes → [4a] Apply tax optimization
   └─ No → (continue)
   ↓
[5] Pre-trade compliance check
   ↓
[6] Generate explanation
```
Marcus 从右侧 Capability 面板拖出「税务优化」节点。
### Step 3 · 沙箱测试
Marcus 用「Test Run」在沙箱验证：
```plain text
Sandbox Test

Test input: sample_client_chen_taxable_account
Running in sandbox environment...

Trace:
  ✓ Step 1-2 completed
  ✓ Step 3: Initial allocation built
  ◇ Step 4: Tax-sensitive? YES
  ✓ Step 4a: Tax optimization applied
  ✓ Step 5-6 completed

Sandbox result: looks correct
Token used: 12K (sandbox quota, not real)
```
沙箱不影响真实数据，不计入合规账户，不消耗真 token。
### Step 4 · 提交 Nomos 审批
```plain text
Submit for Approval

Assembly: "Retirement Portfolio with Tax Optimization"
Type: Team Assembly
Approval workflow:
  1. Compliance Officer review
  2. Team Lead review
  3. Publish

Estimated approval time: 2-5 business days
```
**未审批的 Assembly 不能被任何 EB 引用**——即使作者本人想用，也必须先批。
### Step 5 · 进入 Capability Registry
合规官 + 团队领导审批通过：
```plain text
Capability Registry Update

assembly.retirement_portfolio_tax_optimized
  status: active
  governance_artifact: asm_marcus_v1
  approved_by: [Compliance Officer, Team Lead]
  approved_at: 2026-05-02
  display_name: "Retirement Portfolio with Tax Optimization"
  visibility: team
```
### Step 6 · 团队顾问发现新 Assembly
下周一 Lin 登录，Chat 顶部看到通知：
```plain text
New Team Assembly Available

"Retirement Portfolio with Tax Optimization"
Author: Marcus
Best for: retired clients with tax-sensitive accounts

[Try it now] [Learn more]
```
### Step 7 · 想改的话，fork 后走新审批
如果某团队想改 Marcus 的 Assembly，**不能直接改原版本**——必须 fork 后再走 Nomos 流程：
```plain text
Fork Assembly

Original: assembly.retirement_portfolio_tax_optimized (v1)
Fork to: assembly.retirement_portfolio_tax_optimized_intl (draft v0.1)

Modifications planned:
  - Add international ETF preference logic
  - Adjust ESG threshold

Proceed to draft editor? Yes
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| Assembly 草案 | Nomos Governance Artifact (draft) |
| 沙箱测试 | Sandbox Execution Process |
| 审批工作流 | Nomos approval lifecycle |
| 已发布 Assembly | Capability (in Registry) |
| 团队使用 | Prometheus 编译 EB 时引用 |
| Fork 演化 | Mnem lineage tracking |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| LangChain | 写 Python 代码 | 拖拽 + Nomos 审批 |
| Microsoft Power Automate | 业务但能力受限 | 节点可以是 MCP / Skill / Agent / API / LLM |
| UiPath / RPA | 录屏脆弱 | 声明式蓝图 schema |
| 普通 workflow 工具 | 无 AI 集成 | 原生 LLM + 治理 |
## 给用户带来什么价值
- **团队最佳实践沉淀** —— 资深顾问的方法论不再依赖人在
- **新人快速上手** —— 直接用既有 Assembly，不用从零摸索
- **合规一致性** —— 所有顾问处理同类问题用同一套已审批流程
- **持续优化** —— Assembly 可版本化，迭代历史可追溯
## 工程要满足
需要支持：从历史 Evidence Pack 反向生成 Assembly 草案、可视化编辑器（节点、条件分支、参数占位符）、Sandbox 隔离执行环境、Nomos 审批工作流（多角色签字）、Assembly 版本化与 fork lineage、团队市场（评分、留言、使用统计）。
## 绝对红线
```plain text
❌ Assembly 草案绕过审批被使用
❌ 已发布 Assembly 可被消费者直接改
❌ 节点用工程化命名暴露给作者
❌ 沙箱测试影响真实数据
❌ 审批工作流可绕过（管理员特权）
```
正确表达：
```plain text
✅ Assembly 是 Nomos Governance Artifact
✅ 发布必经审批
✅ 沙箱与生产隔离
✅ 共享 Assembly 不可被消费者改原版本
✅ Fork 关系完整追溯
```
## 验收标准
- 成功执行可一键转 Assembly 草案
- 真实客户数据被参数化
- Assembly 发布有版本和审批记录
- 每次使用 Assembly 仍产生新的 Business Contract / EB / EP / Evidence Pack
## 一句话总结
**业务用户可以构建 Assembly，但每个 Assembly 都是治理工件——Nomos 让团队最佳实践成为可审计的合法 Capability。**
---
# 场景 ⑦ · 跨顾问监督：合规风险的早期预警
## 场景定位
合规官不是只在事故发生后审查，他需要**提前发现趋势和异常**。
ABC-Prime 要把分散的执行证据聚合成合规健康视图，让 Marcus 看到：
> 上周哪些顾问、客户、策略版本、能力节点值得关注？
监督系统必须**只读**——任何处置只能追加新审查记录，绝不修改原 Evidence Pack / trace。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · IPS 合规官 |
| 使用频率 | 每周 1–2 次主动 + 异常即时 |
| 优先级 | P1 ★★ |
| 耗时 | 周一晨会前 15 分钟 |
| Prime 映射 | Audit / Metrics / Observation Surface（只读） |
## 用户故事
Marcus 周一 8:30 到办公室，端着咖啡打开合规仪表盘。
他不是在监视员工——他在**主动发现需要关注的事件**。仪表盘顶部已经有「本周需要您注意的 3 件事」摘要。
他点开第一条「Lin 上周合规率从 100% 降到 92%」，看到 3 笔可能涉及刚更新的 IPS 第 4 条。逐一钻取后，Marcus 判断这是政策更新过渡期的良性差异——不是 Lin 的失误。
他追加一条审查记录，标注「政策过渡期，无需追溯」并归档。**原始 Evidence Pack 永不被修改。**
整个过程 5 分钟。喝完咖啡前，Marcus 合上电脑去开晨会。
## 核心体验流程
### Step 1 · Marcus 打开 Compliance Review
```plain text
Compliance Review · Week of June 1

🔔 Things Needing Your Attention (3)

1. Lin's compliance rate dropped 100% → 92%
   3 portfolios involve recently-updated IPS Section 4

2. David: 2 third-party data calls failed (Bloomberg)
   No fallback used, executions aborted properly

3. Quarterly trend: ESG-flagged exclusions up 23%
   Possibly related to v2.4 broader exclusion list
```
### Step 2 · 钻取异常
Marcus 点击第一条，展开 Lin 的 3 笔可疑组合：
```plain text
Lin's Flagged Portfolios (Week of June 1)

Client X (June 2): TSLA 7.8%
  IPS at execution: v2.3 (limit 8.0%)
  IPS now: v2.4 (limit 7.0%)
  Status: was compliant under v2.3, flagged under v2.4

Client Y (June 4): NVDA 7.5%
  Same situation as Client X

Client Z (June 5): AAPL 9.2%
  IPS at execution: v2.3 (limit 8.0%)
  Status: violation even under v2.3 ⚠
```
### Step 3 · 检视具体 Evidence Pack
Marcus 点开 Client Z 的完整执行图：
```plain text
Execution: exec_client_z_2026_06_05_001
EB structure: ✓ all nodes completed
Compliance check (node 5):
  Constraint enforced: max single holding 8.0% (v2.3)
  AAPL holding evaluated: 9.2%
  Decision: PASS ⚠ ← unexpected!

Investigating...
Discovery: AAPL was 7.9% at submission time,
appreciated to 9.2% by execution time (intraday move)
```
Marcus 发现这是真问题——但不是 Lin 的失误，是市场移动导致的临时偏离。
### Step 4 · 跨版本评估
Marcus 想看如果按 v2.4 评估，哪些组合需要复审：
```plain text
Cross-Version Evaluation

Run all of Lin's last-month Evidence Packs through ips_policy_v2.4

Results:
  Compliant: 47 portfolios
  Flagged for review: 5 portfolios

The original evaluations remain unchanged.
The cross-version evaluations are appended as audit notes.
```
**两份评估都保留，互不污染。**
### Step 5 · Marcus 处置：追加审查记录
Marcus 判断 Client Z 的情况是市场移动而非 Lin 失误：
```plain text
New Audit Record

Subject Evidence Pack: ep_client_z_2026_06_05_001 (immutable)
Reviewer: Marcus
Decision: approved
Rationale: "Holding crossed threshold due to intraday market move,
not advisor error. Recommend setting up real-time threshold alerts."

References Evidence Pack: ep_client_z_2026_06_05_001
```
**关键事实：** 处置创建了新 Evidence Pack 引用原 Evidence Pack，**绝不修改原 Evidence Pack。**
### Step 6 · 触发 Nomos 流程（如需 runtime 改变）
如果 Marcus 决定整改，他可以触发 Nomos 流程「新增 intraday 监控规则」——但这是**新 Governance Artifact**，不是修改 runtime：
```plain text
Trigger Governance Action

Type: New Nomos Rule Proposal
Rule: "Holdings approaching 8% threshold trigger intraday alerts"

This will:
  - Create a new Governance Artifact draft
  - Enter approval workflow
  - When approved, future EPs will include this rule
  - Gateway will enforce starting from approval date

This will NOT:
  - Modify any existing Evidence Pack
  - Affect ongoing executions
  - Change historical compliance evaluations
```
### Step 7 · 5 分钟完成，去开晨会
Marcus 用 5 分钟处理完 3 件事，合上电脑。
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 合规仪表盘 | Observation Surface（只读） |
| 异常检测 | Audit Metrics 聚合管道 |
| Evidence Pack 钻取 | Mnem trace replay |
| 跨版本评估 | Nomos Versioned Policy |
| 审查记录 | 新 Evidence Pack（audit subtype） |
| 整改提案 | Nomos Governance Proposal |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| 传统合规监控 | 日志肉眼筛 | AI 异常检测 + 风险打分 |
| AuditBoard | 审「制度遵守」 | 审「AI 行为符合约束」 |
| Splunk | 技术指标 | 业务指标（IPS 合规率、客户覆盖） |
| 普通 BI | 看趋势 | 看趋势 → 钻取到 Execution → 解释为什么 |
## 给用户带来什么价值
- **从被动审查变主动预警** —— 异常自动浮现，不靠抽查
- **10 分钟掌握全局** —— 上周所有顾问的合规健康度一目了然
- **追溯到具体 Execution** —— 发现异常可一键钻取到执行图
- **避免合规事故** —— 风险在升级前被发现
- **审计完整性** —— 原始 Trace 永不被合规动作污染
## 工程要满足
需要支持：基于历史基线 + Nomos 规则的异常打分算法、Evidence Pack 多维索引（顾问 / 客户 / IPS 版本 / 时间戳 / 合规状态）、跨版本策略评估并列保存、合规处置作为新 Evidence Pack 写入、Nomos 治理提案触发链路、严格只读权限模型保证 Observation Surface 不能干预 runtime。
## 绝对红线
```plain text
❌ Marcus 直接修改 Lin 的 Evidence Pack
❌ 仪表盘可以"暂停"运行中的 Execution
❌ 处置直接改变 Gateway / EP
❌ 跨版本评估覆盖原始评估
❌ 监督角色拥有 runtime 干预权限
```
正确表达：
```plain text
✅ Observation Surface 只读
✅ 处置只追加新审查记录
✅ Runtime 改变必经 Nomos
✅ 原 Evidence Pack 永不被修改
✅ 跨版本评估并列保存
```
## 验收标准
- Marcus 能在 10 分钟内完成周度重点风险识别
- 每个风险项都能追溯到 Evidence Pack
- 处置结论可审计
- 系统能区分”历史合法、当前需复核”和”历史本身违规”
## 一句话总结
**合规官有完整的视野、强大的分析、明确的处置路径——但绝不能直接干预 runtime，这是 ABC-Prime 治理边界的硬性体现。**
---
# 场景 ⑧ · 新人 onboarding：第一天上岗到完成首单
## 场景定位
如果新人第一天不能用 ABC-Prime 完成真实任务，团队推广会受阻。
新人 onboarding 的目标**不是教菜单，而是让新人快速完成一份真实交付物**。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Sarah · 入职第一周的财富顾问 |
| 使用频率 | 每个新员工一次性事件 |
| 优先级 | P1 ★★ |
| 耗时 | 首日 30 分钟启动 + 首周建立心智 |
| Prime 映射 | Interaction Surface / Assembly 模板入口 |
## 用户故事
Sarah 入职第一天，导师给她一个客户委托作为热身：
> Mrs. Chen，55 岁，预备 5 年后退休，300 万应税账户，希望保守增长。
Sarah 打开 ABC-Prime，登录。她看到的不是一个让人发懵的多菜单后台，而是一个**简洁的欢迎页**，问她「您的第一个任务是什么？」
她点击建议任务「构建客户组合」，Composer 已预填示例。她替换为 Mrs. Chen 的信息，按下回车。Plan Preview 流式展开，旁边有 1 行教学提示。
5 分钟后，Sarah 收到结构化的组合方案——5 只 ETF、每个的占比和理由、合规标记 ✓。她惊讶地发现：**不用培训也能出来**。
下面她点「Save as my Assembly」，系统提示「这是您个人的草稿，不需要审批，下次粘贴新客户信息即可复用」。
首日结束，Sarah 完成 3 个真实客户初稿。她的导师从隔壁过来一看，说：「比我入职那年快多了。」
## 核心体验流程
### Step 1 · 角色感知首页
Sarah 首次登录。**她看到的不是 12 个菜单**，而是一个简洁的欢迎页：
```plain text
Welcome, Sarah

What's your first task?

[Analyze a stock]      [Build a client portfolio]
[Read a client mandate] [Browse team Assemblies]
```
Token Quota / MCP Manager / Permissions 等管理菜单全部隐藏。
### Step 2 · 选择建议任务
Sarah 点击「Build a client portfolio」，进入 Chat。Composer 已预填示例委托：
```plain text
[Sample] Build a portfolio for a client.
Sample: 60-year-old, $1M taxable, moderate risk, ETF-only.
Replace with your real client info and press Enter.
```
### Step 3 · 替换为真实客户信息
Sarah 删除示例，输入 Mrs. Chen 的真实情况，按下回车。Plan Preview 卡片开始流式渲染，**右侧有教学提示**：
```plain text
[Live tip] AlphaBitCore is compiling a plan ("EB") for you.
Each numbered step is a node — like a recipe step.
You can review and edit before running.
```
### Step 4 · 看到 Plan Preview
```plain text
Plan Preview

1. Read client mandate
2. Load active firm IPS
3. Build initial allocation
4. Run pre-trade compliance check
5. Generate explanation
6. Produce evidence pack

[✓ Run]  [Edit]
```
Sarah 觉得没问题，点「Run」。
### Step 5 · 看到结构化结果
执行完成，**输出是结构化的方案，绝不是 raw JSON**：
```plain text
Recommended Portfolio for Mrs. Chen

Allocation:
  - Total Stock Market ETF (VTI):     45%
  - International Stock ETF (VXUS):   20%
  - Total Bond Market ETF (BND):      25%
  - TIPS ETF (SCHP):                  7%
  - Cash:                             3%

Compliance: ✓ All holdings within firm IPS limits
ESG considerations: ✓ None excluded
Risk profile match: ✓ Moderately conservative

Explanation:
[Plain-language summary, 2 paragraphs]

Evidence Pack: ep_chen_first_2026_05_01_001
[View full execution graph]
```
### Step 6 · 透明度：Token 与能力使用
底部显示：
```plain text
This execution used:
  - Capability: assembly.client_portfolio_v2 (firm template)
  - Internal IPS data (v2.4)
  - Internal fund catalog (no external calls)
Token consumed: 12K
Your monthly quota remaining: 92%
```
### Step 7 · 保存为个人 Assembly 草案
Sarah 点「Save as my Assembly」：
```plain text
Saved!

This is your personal draft Assembly.
- It's saved in "My Assemblies"
- Only you can use it (no approval needed)
- Next time, just paste new client info to reuse

Want to share with your team?
You can submit for approval anytime.
```
**关键设计：个人草案不需要 Nomos 审批。** 这是 P6（隐藏复杂度）的具体应用——新员工首日体验不能被审批流程阻塞。
### Step 8 · 首日完成 3 个交付物
Sarah 在导师指导下，首日完成 3 个真实客户初稿。
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 角色感知导航 | RBAC + Interaction Surface |
| 任务模板首页 | Assembly Registry（visibility = team / firm） |
| 引导式 composer | Interaction Surface 增强 |
| 个人草案 | Local Assembly draft（无需 Nomos） |
| 教学叠加层 | Onboarding hint system |
| 透明度面板 | Mnem aggregation 视图 |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT | 5 分钟出东西，但无合规 | 5 分钟出合规、可审计、结构化的结果 |
| 传统投顾系统 | 1–2 周培训才能上手 | 通过做真实任务自然学习 |
| 普通 SaaS | 新手教程是流程演示 | 新手教程是真实任务驱动 |
| LangChain 工具 | 新手需要懂代码 | 新手只需会说话 |
## 给用户带来什么价值
- **首日成功经历** —— 心理上接受这是个有用的工具
- **无需培训也能用** —— 降低公司 enablement 成本
- **从模板起步** —— 直接用资深同事的 Assembly，避免重新发明轮子
- **渐进式深入** —— 先用，再懂，最后自己做
## 工程要满足
需要支持：RBAC 驱动的角色感知首页、任务模板推荐引擎、Composer 预填示例机制、首次执行的教学叠加层（前 3 次自动出现）、业务化输出渲染（不暴露 raw JSON）、个人草案的本地保存（绕过 Nomos）、新员工首周指标统计。
## 绝对红线
```plain text
❌ 新员工默认看到管理员菜单
❌ 个人草案需要 Nomos 审批
❌ 首日教程需要看完才能用
❌ 输出默认是 raw JSON
❌ 能力命名暴露内部 ID
```
正确表达：
```plain text
✅ 角色感知简化导航
✅ 个人草案无需审批
✅ 真实任务驱动学习
✅ 输出是业务化结构
✅ 命名是业务化的
```
## 验收标准
- 新人首日完成至少 1 个真实交付物
- 首次执行流程不超过 5 到 10 分钟
- 新人首周至少保存 1 个个人 Assembly 草案
- 导师可以看到新人首单 Evidence Pack
## 一句话总结
**ABC-Prime 让新员工首日就能产出价值——这不是因为产品简单，而是因为复杂度被分层隐藏，业务能力被治理过的模板封装好。**
---
# 场景 ⑨ · 实时统计：行为审计与成本治理
## 场景定位
管理员需要治理平台使用情况。
这不是简单的登录次数统计，而是 AI 行为统计：
> 谁提交了什么意图？哪些 DAG 消耗最高？哪些能力最常失败？哪些第三方调用最多？token 和第三方费用归属于哪些用户、客户和任务？
**关键架构边界：** Metrics 不能直接改变 runtime。告警可以触发**人**或 **Nomos 更新规则**，运行期强制仍由 Gateway / EP 完成。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Alex · 平台管理员 / Marcus · 合规官 |
| 使用频率 | 每周 1 次综合审计 + 异常即时 |
| 优先级 | P1 ★★ |
| 耗时 | 每周 30 分钟 |
| Prime 映射 | Audit & Metrics（只读）+ Cost / Quota Governance |
## 用户故事
每周一上午 10:00 是 Alex 的固定环节——他要审视上周整个公司在 ABC-Prime 上的使用情况。
这不是为了监视员工，而是为了：① 控制成本 ② 发现异常 ③ 满足公司治理 ④ 优化体验。
Alex 注意到这周 Lin 的 token 消耗比平均高 3 倍，下钻发现是周二的批量再平衡任务——合理使用，不是异常。但他同时发现 Bloomberg 调用失败 4 次，决定在 Slack 提醒 IT 关注 Bloomberg 稳定性。
如果他要限制单用户日 token 上限，**不能直接在 Metrics 仪表盘改 runtime**——必须通过 Nomos 创建新 Governance Artifact，经审批后由 Prometheus 编译进未来 EP。
整个审计 25 分钟完成。
## 核心体验流程
### Step 1 · Alex 打开 Real-Time Monitor
```plain text
Real-Time Monitor · Week of June 15

[ Total Executions ]      [ Total Tokens ]
   1,247                     8.4M
   ↑ 12% vs last week        ↑ 28% vs last week ⚠

[ Third-Party Cost ]      [ Failure Rate ]
   $1,247                    2.3%
   ↑ 8% vs last week         ↓ 0.4% vs last week
```
指标延迟 \< 1 分钟。
### Step 2 · 下钻 Token 消耗
Alex 点击「token 消耗」卡片，看到按用户的消耗排行：
```plain text
Token Consumption · Week of June 15

By Advisor:
  Lin Wong         1.2M  ████████████ ← 平均 3 倍 ⚠
  David Chen      450K   ████
  Anna Park       410K   ████
  Marcus Wong     390K   ███
```
### Step 3 · 进一步下钻到 Lin 的每日趋势
```plain text
Lin Wong's Daily Token Consumption (Last 30 days)

Mon Jun 15  |  450K  ⚠ ← 周二尖峰
Tue Jun 16  |  180K
Wed Jun 17  |  220K

Average daily (excluding spike): 195K
Spike date: Tue Jun 16, 80K above 95th percentile
```
### Step 4 · 钻取到具体 Execution
Alex 点击周二的尖峰：
```plain text
Lin's Executions on Tue Jun 16

08:30  Single client analysis        12K tokens
09:45  Single client analysis         8K tokens
10:00  Batch Rebalance for 12 clients 380K tokens ← 主要消耗
14:20  Single client analysis        18K tokens
```
最大那条是一个批量再平衡任务处理了 12 个客户。
### Step 5 · 判断：合理使用
Alex 判断这是合理使用，不是异常：
```plain text
Alex's Judgment: Legitimate use, not anomaly.
Action: No further action required for this spike.
Note added: "Q2 batch rebalance season; expected pattern."
```
Alex 的判断和注释是**只读的旁注**，不影响任何 runtime 状态。
### Step 6 · 发现 Bloomberg 失败
Alex 在第三方稳定性面板看到：
```plain text
Third-Party Stability · Week of June 15

bloomberg.etf.market_data
  Total calls: 312
  Success: 308 (98.7%)
  Failures: 4 ⚠ (down from 99.5% last week)
  Avg latency: 380ms
  P95 latency: 1.2s
```
Alex 决定 Slack 提醒 IT：
```plain text
Action: notify_only (does not change any runtime behavior)
Channel: #alphabit-ops Slack
Message: "Bloomberg stability dropped to 98.7% this week.
Worth a check before quarter-end."
```
### Step 7 · 想限额？必经 Nomos
Alex 看到趋势：可能下季度需要给单用户加 token 上限。
但他**不能在 Metrics 仪表盘直接配置 runtime 限制**——必须通过 Nomos 流程：
```plain text
Trigger Nomos Action

Type: New Quota Rule Proposal
Rule: "Per-advisor daily token cap of 500K"

This will:
  - Create a new Nomos Governance Artifact draft
  - Enter approval workflow (CIO + Compliance)
  - When approved, future EPs include this quota
  - Gateway enforces from approval date

This will NOT:
  - Affect ongoing Executions
  - Modify any historical Evidence Pack
  - Be a "switch" Alex can flip directly
```
### Step 8 · 25 分钟完成审计
Alex 处理完所有需要关注的事项，关闭仪表盘。
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 顶部 4 张卡片 | Audit Metrics（实时聚合） |
| 多维下钻 | Audit Metrics OLAP |
| 钻取到 Execution | Mnem trace 视图 |
| 第三方稳定性 | Audit Metrics + Capability 维度索引 |
| 告警规则 | Notification rule engine（只读触发器） |
| 限额提案 | Nomos Governance Proposal |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| 普通 SaaS 后台 | 看的是订阅、用户数、登录数 | 看的是 AI 行为——什么意图、什么蓝图、什么消耗 |
| 云费用工具 | 基础设施费用 | 业务行为成本——按客户 / 项目 / 能力归属 |
| BI 工具（Tableau 等） | 需要数据团队搭 | 原生 first-class，无需搭建 |
| 普通 LLM 平台 | token 计数器，无业务关联 | token 关联到具体蓝图 / 用户 / 客户 |
## 给用户带来什么价值
- **成本可控** —— 按用户 / 部门 / 能力的 token 和第三方费用透明可见
- **异常预警** —— 突发的消耗暴涨自动触发警报
- **容量规划** —— 基于历史使用预测下季度配额需求
- **治理闭环** —— 通过 Nomos 路径影响未来 runtime，不通过 Metrics 直接干预
## 工程要满足
需要支持：基于事件流的实时聚合管道（OLAP 风格预聚合）、多维下钻查询、第三方稳定性指标、规则引擎触发通知（不能触发 runtime 变更）、Metrics 与 Nomos 之间的显式提案路径、严格只读权限模型。
## 绝对红线
```plain text
❌ Metrics 仪表盘有"暂停 Execution"按钮
❌ 告警规则可直接强制 runtime 行为
❌ Alex 直接修改用户的 token 配额
❌ 注释或处置改写原 Evidence Pack
❌ Metrics 与 Nomos 之间存在"快捷绕过"
```
正确表达：
```plain text
✅ Metrics 是只读的
✅ 告警只触发通知或 Nomos 提案
✅ Runtime 改变必经 Nomos 完整流程
✅ 注释作为旁注独立记录
✅ Metrics → Nomos 必须显式过渡
```
## 验收标准
- Alex 能在 30 分钟内完成周度平台治理审计
- 任一指标都能下钻到具体 Execution
- token、第三方费用、失败率有多维归属
- 异常规则可配置并触发通知
## 一句话总结
**Metrics 让 Alex 看清全貌、发现风险——但 runtime 改变必须通过 Nomos，这是 ABC-Prime 治理边界的硬性规则。**
---
# 场景 ⑩ · Nomos 治理规则发布：从 IPS 更新到 EP 生效
## 场景定位
Nomos 是 ABC-Prime 的治理规则系统。
它负责把金融机构的 IPS 条款、合规规则、组织政策变成：
> 可草拟、可校验、可审批、可版本化、可编译、可执行、可审计的系统规则。
**这不是配置页面，而是 Governance Lifecycle。**
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · IPS 合规官 |
| 使用频率 | 每季度 1 次 + 临时变更约每年 2–3 次 |
| 优先级 | P0 ★★★ |
| 耗时 | 端到端 1–2 周 |
| Prime 映射 | Nomos / Policy Registry / Prometheus / Gateway / EP |
## 用户故事
公司刚更新了针对高净值客户的 IPS 规则：
> 对于 65 岁以上退休客户，任何组合再平衡建议不得导致权益类资产占比超过 45%，除非存在明确的客户书面授权。
Marcus 需要把这条规则发布到系统中。他进入 Nomos Governance Console，创建一条新的 IPS Policy Rule。
规则经过校验、审批、发布后，**未来所有相关客户的执行**都会在 Prometheus 编译阶段引用该规则，并在 Gateway 执行阶段被强制执行。
**旧的 Evidence Pack 仍然绑定旧版本规则，不会被 retroactively 改写。**
## 核心体验流程
### Step 1 · Marcus 创建治理规则草稿
Marcus 打开 Nomos Governance Console：
```plain text
Nomos → Governance Rules → IPS Rules → New Rule
```
输入：
```plain text
Rule Name: Retirement Equity Exposure Cap

Rule Text:
For retired clients aged 65+, equity exposure after rebalance
must not exceed 45%, unless explicit written authorization exists.

Scope:
Tenant: ABC Wealth
Environment: Production
Client Segment: Retired / Age 65+
Policy Type: IPS Constraint

Severity: Blocking

Effective Date: 2026-05-01
```
草案不影响任何 runtime。
### Step 2 · Nomos 执行结构校验
Nomos 检查这条规则是否可被 Gateway 强制执行：
```plain text
Validation Checks

✓ Rule has owner
✓ Rule has tenant scope
✓ Rule has effective date
✗ Rule must map to enforceable runtime fields
```
系统提示：
> This rule cannot be published as an enforceable policy because no enforceable runtime field is mapped.
Marcus 必须补充字段映射：
```plain text
Enforcement Mapping:
  - portfolio.equity_exposure_after_rebalance  (numeric, percentage)
  - client.age                                 (numeric)
  - client.retirement_status                   (boolean)
  - authorization.written_override_exists      (boolean)
```
### Step 3 · 合规审批
Marcus 提交审批：
```plain text
Approval Workflow

[ Draft ] → [ Legal Review ] → [ Compliance Approval ] → [ Publish ]

Reviewers See:
- Diff vs current IPS
- Affected client segments (~340 retired clients)
- Affected Capabilities (rebalance, allocation)
- Test results from sandbox
```
法务和合规委员会成员看到 diff：
```plain text
New rule added to ips_policy:
  [+] Retirement Equity Exposure Cap
      - Applies to: retired clients age 65+
      - Blocks rebalance if: equity_exposure_after > 45%
      - Exception: written_authorization == true
      - Severity: blocking
```
审批人点击「Approve & Publish」。
### Step 4 · Nomos 发布新版本
```plain text
IPS Policy Version: ips_policy_v2.4
Status: published
Effective: 2026-05-01

Audit trail:
  created_by: Marcus
  legal_review: Sarah Chen, 2026-04-20
  compliance_approval: Compliance Committee, 2026-04-25
  published_at: 2026-04-28
  supersedes: ips_policy_v2.3
```
旧版本不删除：
```plain text
ips_policy_v2.3 = deprecated_but_auditable (仍可被历史 Evidence Pack 引用)
ips_policy_v2.4 = active (新 Evidence Pack 默认引用)
```
### Step 5 · Prometheus 后续编译引用新规则
5 月 1 日 00:00 后，Lin 为退休客户 Chen 生成再平衡建议：
```plain text
Compilation Context

Tenant: ABC Wealth
Environment: production
Policy Version: active_at_compile_time → ips_policy_v2.4
Compiled at: 2026-05-15T10:23:11Z
```
Prometheus 编译 EP：
```json
{
  "ep_id": "ep_chen_rebalance_2026_05_15_001",
  "policy_version": "ips_policy_v2.4",
  "constraints": [
    {
      "type": "portfolio_limit",
      "field": "equity_exposure_after_rebalance",
      "operator": "<=",
      "value": 0.45,
      "condition": "client.retired == true && client.age >= 65"
    }
  ]
}
```
### Step 6 · Gateway 强制执行 EP
执行到 rebalance calculation 节点时：
```plain text
equity_exposure_after_rebalance = 48% (超过 45% 阈值)
client.retired = true
client.age = 68
authorization.written_override_exists = false
```
Gateway 返回：
```json
{
  "decision": "deny",
  "reason": "ips_equity_exposure_limit_exceeded",
  "policy_version": "ips_policy_v2.4",
  "rule_id": "retirement_equity_exposure_cap"
}
```
Execution 进入 blocked 状态（场景 ③ 处理路径）。
### Step 7 · Evidence Pack 绑定规则版本
最终生成的 Evidence Pack：
```plain text
Evidence Pack

Execution ID: exec_chen_rebalance_2026_05_15_001
EB version: eb_chen_rebalance_v1
EP version: ep_chen_rebalance_v1

IPS Policy Version: ips_policy_v2.4
  - Rule applied: retirement_equity_exposure_cap
  - Decision: deny
  - Threshold: 45%
  - Actual: 48%
```
旧客户报告（执行于 4 月 15 日）仍引用旧版本：
```plain text
Old Evidence Pack (ep_chen_2026_04_15_001)
  IPS Policy Version: ips_policy_v2.3
  (No retroactive rewrite to v2.4)
```
**新规则发布绝不 retroactively 改写历史 Evidence Pack。**
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| IPS Rule | Governance Artifact |
| Nomos Rule Draft | Governance Lifecycle |
| Approval | Governance Review |
| Published Rule | Versioned Policy |
| Policy Snapshot | Nomos → Prometheus Contract |
| EP | Decision Output |
| Gateway enforcement | PEP（Policy Enforcement Point） |
| Evidence Pack | Mnem / Audit Artifact |
| Old reports | Immutable historical execution |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| 普通合规系统 | IPS 是 PDF 文档 | IPS 是结构化 Governance Artifact，可被 Prometheus 编译 |
| AuditBoard 等 | 制度文档管理 | 制度→编译→运行期强制的完整链路 |
| LangChain | 配置写死在代码 | 配置是 first-class，版本化、可审批、可回滚 |
| 传统投顾系统 | 改规则需要工程发版 | 业务用户更新规则，运行期自动生效（经审批） |
## 给用户带来什么价值
- **规则变更不再”靠人记”** —— 自动进入 EP，Gateway 强制
- **跨版本可追溯** —— 老 Evidence Pack 仍绑定旧 IPS，新 Evidence Pack 走新 IPS，互不污染
- **审批留痕** —— 谁在何时签字批准，写入 Mnem
- **可回滚** —— 发布的 IPS 可被新版本覆盖，但旧版本永不消失（用于历史 Evidence Pack 验证）
## 工程要满足
需要支持：结构化规则编辑器（不是自由文本）、规则可执行性校验（必须映射到 Gateway 可校验字段）、多角色审批工作流、内容寻址的 Versioned Policy Registry（已发布版本永不删除）、Prometheus 编译时获取 governance snapshot 并冻结版本号、Gateway 严格按 EP 中冻结的版本执行。
## 绝对红线
```plain text
❌ Gateway 自己生成规则
❌ Prometheus 创造规则
❌ Hermes 解释 IPS
❌ Execution Unit 判断合规
❌ 新规则改写旧 Execution
❌ Metrics / Audit 直接修改运行期
❌ 已发布版本被删除
```
正确路径：
```plain text
Human / Compliance
→ Nomos draft
→ Review / Approval
→ Publish version
→ Prometheus compile EP (引用版本)
→ Gateway enforce EP
→ Mnem records evidence
→ Old version permanently retained
```
## 验收标准
- 每条规则有草稿、审批、发布、版本历史
- 规则必须映射到可执行字段
- Published policy 可被 Prometheus 编译进 EP
- Gateway 根据 EP 强制执行
- Evidence Pack 绑定执行时 policy version
## 一句话总结
**Nomos 把组织规则变成可版本化的法律；Prometheus 把法律编译进 EP；Gateway 在执行期强制执行；Mnem 永久记录证据。**
---
# 场景 ⑪ · Atlas 经验沉淀：失败如何变成未来行为
## 场景定位
Atlas 让 ABC-Prime 不只是执行系统，而是**会学习组织经验的系统**。
但 Atlas 不是运行时 replan，也不是治理规则发布器。
它的职责是：
> 记录经验、验证经验、沉淀 Lesson、影响未来上下文。如果经验要变成硬规则，必须进入 Nomos。
这是 ABC-Prime 和普通 workflow / audit 系统的最大长期差异化。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · 合规官 / Lin · 财富顾问 |
| 使用频率 | 每周 1–3 次 promotion；每天受益 |
| 优先级 | P1 ★★ |
| 耗时 | 单次 promotion 5–15 分钟，受益持续 |
| Prime 映射 | Atlas / Episode / Fact / Lesson / Promotion Gate / Instruction Rewrite |
## 用户故事
Lin 为客户生成了一份退休组合解释。系统输出中有一句：
> “This rebalance will guarantee a more stable retirement outcome.”
Marcus 在合规审查时标记：
> Issue: Guarantee language is not allowed in client-facing retirement communication.
这次失败不会只是留在日志里。
Prime 会把它作为 Episode 写入 Atlas。Atlas 提取候选 Lesson：
> Avoid guarantee language when explaining portfolio outcomes to retirement clients.
经过验证和审批后，这条经验会影响未来类似任务。下次 Lin 再生成类似解释时，**系统会自动避免 guarantee language**，并在蓝图节点显示「应用了团队经验规则」。
## 核心体验流程
### Step 1 · 生成报告并进入合规审查
Lin 运行：
```plain text
Generate retirement portfolio rebalance explanation for client Chen.
```
Marcus 审查输出时发现问题：
```plain text
Compliance Review Finding:
  Type: guarantee_language_not_allowed
  Severity: medium
  Evidence reference: paragraph_12
  Reviewer: Marcus
```
合规审查标签是结构化的。
### Step 2 · Mnem 记录原始事实
```json
{
  "event_type": "compliance_review_flagged",
  "actor": "marcus",
  "execution_id": "exec_chen_0421",
  "finding_type": "guarantee_language_not_allowed",
  "evidence_ref": "paragraph_12",
  "timestamp": "2026-04-21T14:23:11Z"
}
```
不可覆盖、不可删除。
### Step 3 · Atlas 接收 Episode
```plain text
Episode submitted to Atlas

Episode ID: ep_retirement_rebalance_0421
Source execution: exec_chen_0421
Task type: retirement_portfolio_explanation
Generated output: [excerpt with flagged phrase]
Compliance finding: guarantee_language_not_allowed
Reviewer note: "Guarantee language is not permitted in retirement communications."
Final outcome: flagged_for_revision
```
**这是一个候选 Episode，还不是 Lesson。**
### Step 4 · Atlas 生成候选 Lesson
```plain text
Candidate Lesson

Lesson Text:
When generating retirement portfolio explanations,
avoid language that implies guaranteed outcomes.

Triggers:
  - Task type: retirement_portfolio_explanation
  - Output language patterns: "guarantee", "ensure", "secure", "assured"

Evidence:
  - 1 episode: ep_retirement_rebalance_0421 (Marcus, 2026-04-21)

Confidence: 0.62
Status: needs_more_evidence
```
### Step 5 · 验证与提升
之后又出现类似审查：
```plain text
- "guaranteed income stability"  (David, 2026-04-23)
- "assured downside protection"  (Anna, 2026-04-25)
- "will secure retirement outcome"  (Lin, 2026-04-28)
```
Atlas 把这些 Episode 合并到候选 Lesson：
```plain text
Updated Candidate Lesson

Evidence: 4 episodes
Confidence: 0.91
Status: ready_for_review
Reviewer assigned: Marcus
```
Atlas 触发 promotion gate——Marcus 收到通知：
> 4 similar episodes have clustered under this candidate lesson.
Should this be promoted to a Team Lesson?
**绝不自动 promote。**
### Step 6 · Marcus 审阅并批准 Lesson
```plain text
Lesson Review

Lesson Text (editable):
"In client-facing retirement communication, avoid language that
implies guaranteed outcomes. Prefer probabilistic phrasing such as
'is designed to', 'may help', 'can support'."

Triggers (verified): ✓
Evidence (4 episodes): [view all]
Confidence: 0.91

[Approve as Team Lesson]   [Reject]   [Revise & Resubmit]
```
Marcus 批准：
```plain text
Lesson Published

Lesson ID: lesson_avoid_guarantee_retirement_v1
Status: active
Scope: ABC Wealth / Retirement Advice
Approved by: Marcus
Effective: 2026-05-02
```
Lesson 通过 Nomos 治理生命周期发布。
### Step 7 · 未来执行时被应用（instruction rewriting）
一周后，Lin 为另一个退休客户生成解释。
Hermes 向 Atlas 发出 Memory Access Request。Atlas 返回相关 Lesson：
```plain text
Relevant Lessons (1):
  - lesson_avoid_guarantee_retirement_v1
    Triggers matched: task_type, client_segment
    Recommended substitutions: "guarantee" → "is designed to"
                                "ensure" → "may help"
                                "secure" → "can support"
```
**Hermes 通过 instruction rewriting 把 Lesson 注入相关节点的指令本身：**
```plain text
Node: explanation.generate

Original instruction:
  "Generate a clear explanation of the rebalance to the client."

Rewritten instruction (with lesson applied):
  "Generate a clear explanation of the rebalance to the client.
   IMPORTANT: Avoid guarantee language. Use probabilistic phrasing
   such as 'is designed to', 'may help', 'can support'."
```
输出变为：
> “This rebalance is designed to support a more stable retirement income profile under the assumptions described.”
**这是 Atlas 的核心机制——memory 是 distillation，不是 storage。** Lesson 不是 context injection（往 prompt 里塞文档），而是修改节点的指令本身。
### Step 8 · UI 显示经验应用
Lin 在 Plan Preview 阶段看到节点 ⑤ 旁边有标记：
```plain text
Node 5: Generate explanation

[Applied Team Lesson]
"Avoid guarantee language in retirement explanations"

Source:
  - 4 prior compliance review findings
  - Approved by Marcus
  - Active since 2026-05-02
```
**Lesson 应用必须可见。** 用户有权知道哪些经验在影响自己的执行。
### Step 9 · 从 Atlas 到 Nomos 的升级路径
如果这条经验需要变成硬性规则（blocking 而非 advisory），不能由 Atlas 直接修改 Nomos。
正确路径：
```plain text
Atlas Lesson (advisory)
→ Governance Proposal
→ Nomos Draft Rule
→ Compliance Approval
→ Published Policy Version
→ Future EP
→ Gateway Enforcement (blocking)
```
Atlas 影响”行为倾向”，Nomos 强制”行为合法性”。从 Lesson 升级到 Policy 必须显式经过 Nomos 流程。
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 原始输出 | Execution Result |
| Marcus 标记 | Review Event |
| 审查记录 | Mnem Trace |
| 一次失败经验 | Atlas Episode |
| 候选规则 | Candidate Fact / Lesson |
| 验证过程 | Atlas Promotion Gate |
| 被批准经验 | Lesson（Nomos 治理生命周期） |
| 未来上下文应用 | Memory Access Contract |
| 未来行为改变 | Instruction Rewriting（Hermes） |
| 硬规则升级 | Atlas → Nomos governance proposal |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| ChatGPT | 每次对话从零开始 | 团队 / 公司经验自动应用 |
| 普通 RAG | 历史是参考语料 | 历史是 distillation 后的 Lesson |
| LangChain memory | context injection | instruction rewriting（编译进指令） |
| 传统知识管理 | 写文档没人看 | 经验自动应用，无需主动检索 |
## 给用户带来什么价值
- **团队会越用越聪明** —— 每次错误都让未来更好
- **资深员工的判断不再靠口耳** —— Marcus 的标准被沉淀
- **新员工自动继承** —— 不用看 100 份历史案例
- **错误不重复犯** —— 同样的失误不会发生第二次
## 工程要满足
需要支持：结构化合规审查标签 → Atlas Episode 自动 derive、相似度聚类与 confidence 计算、promotion gate（人工审批，不自动 promote）、Lesson 通过 Nomos 治理生命周期发布、Memory Access Contract、instruction rewriting（不是 context injection）、EAC 记录所有应用的 Lesson 版本、Atlas → Nomos 升级路径。
## 绝对红线
```plain text
❌ Atlas 改变当前 Execution 路径
❌ Atlas 直接生成 EP
❌ Atlas 绕过 Nomos 发布规则
❌ Atlas 直接修改 Governance Artifact
❌ Atlas 在当前执行中重新规划
❌ Lesson 应用在用户看不到的情况下默默改变行为
```
正确表达：
```plain text
✅ Atlas 记录经验
✅ Atlas 验证经验（promotion gate）
✅ Atlas 影响未来上下文和行为
✅ Lesson 应用对用户透明可见
✅ 若要变成硬规则，必须进入 Nomos 审批生命周期
```
## 验收标准
- 合规审查问题能沉淀为 Episode
- Candidate Lesson 需要验证和审批
- Active Lesson 能影响未来上下文
- 用户能看到被应用的 Lesson 来源
- 硬规则升级必须走 Nomos
## 一句话总结
**Atlas 让失败不只是日志，而是可验证、可沉淀、可影响未来行为的组织经验——这是 ABC-Prime 区别于普通 workflow 系统的长期差异化。**
---
# 场景 ⑫ · Outer Scheduler 周期性复核：每次循环都是新执行
## 场景定位
ABC-Prime **不支持 Execution 内循环**。
每一次循环 = 一个新的 Execution Process。
Outer Scheduler 只按 ESD 创建新实例，绝不延长已有 Execution。
| 项目 | 内容 |
| --- | --- |
| 主要角色 | Marcus · IPS 合规官 / Alex · 平台管理员 |
| 使用频率 | 配置一次，每月自动运行 |
| 优先级 | P1 ★★ |
| 耗时 | 配置 5–10 分钟，每次自动运行 30–60 分钟 |
| Prime 映射 | Outer Scheduler / ESD / 新 Execution 实例创建 |
## 用户故事
Marcus 想做一件事：
> 每月第一天自动扫描所有客户组合，识别哪些组合不符合最新 IPS。
这不是一个长期运行的 Execution——是**一系列在月初被自动创建的新 Execution**。每次都是新 Business Contract → 新 EB / EP → 新 Execution Process。
如果他试图把”循环 12 次”塞进一个 EB，那就违反了 Prime——EB 没有循环结构，Execution 也不会”续命”。
正确的做法是：Marcus 创建一个 ESD（Execution Schedule Declaration），Outer Scheduler 保存它，每月按时触发新 Run Request，每次触发产生一个全新的 Execution。
## 核心体验流程
### Step 1 · Marcus 创建周期性复核任务
Marcus 打开「定时任务」分区：
```plain text
Scheduler → New Scheduled Review

Name: Monthly IPS Impact Review

Objective:
Scan all retired clients and identify portfolios that may
violate current IPS constraints.

Schedule:
First business day of every month, 8:00 AM (firm timezone)

Scope:
- Client segment: retired
- AUM > $1M
- Environment: production

Output:
- Compliance dashboard summary
- Evidence Pack per flagged client

Max Runs: 12 months (auto-expire)
Approval: Compliance Owner required
```
ESD 是 first-class Nomos Governance Artifact。
### Step 2 · Interaction Surface 生成 Business Contract Template
```json
{
  "objective": "monthly_ips_impact_review",
  "constraints": {
    "client_segment": "retired",
    "aum_min": 1000000,
    "environment": "prod"
  },
  "context_refs": [
    "client_registry",
    "portfolio_holdings",
    "active_ips_policy"
  ],
  "execution_strategy": {
    "type": "cron",
    "schedule": "first_business_day_monthly_08_00",
    "max_runs": 12
  }
}
```
### Step 3 · Prometheus 编译 EB / EP / ESD
Prometheus 编译三个产物：
```plain text
EB:
  1. Load eligible client list (retired, AUM > $1M)
  2. Read active IPS policy (snapshot at run time)
  3. For each client batch, evaluate portfolio constraints
  4. Generate flagged client list
  5. Produce dashboard summary
  6. Create Evidence Pack

EP:
  - allowed: client_registry.read
  - allowed: portfolio_holdings.read
  - allowed: ips_policy.read (current snapshot)
  - allowed: report.generate
  - allowed: evidence_pack.create

ESD:
  - cron trigger: first_business_day_monthly_08_00
  - max_runs: 12
  - contract_ref: monthly_ips_review_template
```
ESD 交给 Outer Scheduler。
```plain text
ESD 不进入 Execution Plane。
EB 中没有 graph loop。
每个月不是继续旧 Execution，而是创建新 Execution。
```
### Step 4 · Scheduler 等待时间触发
Outer Scheduler 只保存最少必要信息：
```plain text
Scheduler State

ESD ID: esd_monthly_ips_review_v1
Schedule: first_business_day_monthly_08_00
Contract Ref: monthly_ips_review_template
Next Run: 2026-06-01T08:00:00Z
Max Runs: 12
Run Count: 0
Status: active
```
Scheduler **不读取** ExecutionState、StepState、ExecutionEvent。
Scheduler **不判断** 谁该执行、下一步是什么、是否 retry、是否 fallback。
### Step 5 · 每月触发新的 Run Request
到了 2026-06-01 08:00：
```plain text
Run Request

trigger_id: sched_monthly_ips_review_run_06
contract_ref: monthly_ips_review_template
triggered_by: outer_scheduler
triggered_at: 2026-06-01T08:00:00Z
```
Prometheus 接收 Run Request，**重新获取当前 Nomos governance snapshot**：
```plain text
Compilation Context for this run:

Tenant: ABC Wealth
Environment: prod
Policy Version (active at this run time): ips_policy_v2.4
```
这意味着：
```plain text
2026-06-01 运行使用 v2.4 IPS
2026-07-01 运行如果 v2.5 已生效，就用 v2.5
2026-08-01 运行根据当时生效的 IPS
```
每次执行的 Evidence Pack 永远绑定执行时刻的 policy 版本。
### Step 6 · 当月 Execution 执行
Hermes 创建 Execution Process，按完整执行路径：
```plain text
Execution Process
→ Connector
→ Gateway
→ Execution Units
```
每个客户的检查结果进入 Trace 和 Evidence Pack：
```plain text
Result Summary

Total clients scanned: 247
Compliant: 233
Flagged for review: 14
```
由 Scheduler 触发的 Execution 与人工触发的 Execution 在 Hermes 中没有区别。
### Step 7 · Dashboard 展示多次独立执行
```plain text
Monthly IPS Impact Review · Run History

Run #1: 2026-06-01  Completed     14 flagged
Run #2: 2026-07-01  Completed      9 flagged
Run #3: 2026-08-01  Failed         data source denied
Run #4: 2026-09-01  Scheduled      pending
```
点开 8 月失败记录：
```plain text
Run #3 · 2026-08-01

Status: failed
Failure node: Read active IPS policy
Reason: nomos_snapshot_unavailable

This Execution was aborted.
No retry was performed inside the same execution.
```
Marcus 可选择：
```plain text
[Create New Run Manually]
[Investigate Data Source]
[Skip This Cycle With Audit Note]
```
**失败的 Execution 不会被 Scheduler 自动 retry。**
### Step 8 · ESD 到期或停用
ESD 达到 max_runs（12 次）后自动停用：
```plain text
ESD Status Update

esd_monthly_ips_review_v1
Status: expired
Reason: max_runs reached
Total executions: 12
First run: 2026-06-01
Last run: 2027-05-01

Want to renew?
[Create New ESD] [Modify Schedule]
```
## Prime 架构映射
| 用户体验 | Prime 对象 |
| --- | --- |
| 周期性任务设置 | Interaction Surface |
| 周期性意图 | Business Contract Template |
| 时间策略 | execution_strategy |
| 编译产物（调度部分） | ESD |
| 调度系统 | Outer Scheduler |
| 每月触发 | New Run Request |
| 每月执行 | New Execution Process |
| 每月权限 | New EP |
| 每月结构 | New EB |
| 每月证据 | Mnem Trace / Evidence Pack |
## 与其他产品不同的地方
| 对比对象 | 他们 | ABC-Prime |
| --- | --- | --- |
| Cron job | 命令行脚本，无治理 | 业务用户配置，Nomos 治理 |
| Airflow | DAG 调度，但无治理 | DAG 调度 + 完整治理 / 审计 |
| 普通 SaaS scheduler | 简单时间触发 | 时间 + 事件 + 条件多重触发 |
| ChatGPT | 不支持 | 原生 first-class |
## 给用户带来什么价值
- **合规无遗漏** —— 客户组合被定期重新评估，不靠人记
- **政策变更后批量复核** —— IPS 更新后，旧组合自动被新 IPS 评估
- **风险早发现** —— 异常会在下一次扫描时浮现
- **审计有规律** —— 每月有一次完整快照
- **结构清晰** —— 每次运行一个独立 Evidence Pack，便于跨期对比
## 工程要满足
需要支持：execution_strategy 字段在 Prometheus 编译时识别并产出 ESD、Outer Scheduler 极简职责（只触发，不读取 Execution 状态）、每次触发重新读取 Nomos governance snapshot、批次完成事件聚合、ESD 生命周期管理（active / expired / paused / cancelled）、失败不自动 retry。
## 绝对红线
```plain text
❌ Scheduler 读取 ExecutionState
❌ Scheduler 监听 ExecutionEvent 来 retry
❌ Scheduler 进入 DAG
❌ Scheduler 调用 Capability
❌ Scheduler 修改 Business Contract
❌ Scheduler 生成意图
❌ EB 包含循环
❌ Execution 续命
```
正确路径：
```plain text
Interaction Surface
→ Business Contract with execution_strategy
→ Prometheus compiles ESD
→ Scheduler consumes ESD
→ Scheduler triggers New Run Request
→ Prometheus compiles new EB / EP (fresh governance snapshot)
→ New Execution Process
→ Mnem records new Evidence Pack
```
## 验收标准
- 每次周期性触发都有新的 execution_id
- 每次执行都绑定当时有效 policy version
- 失败周期不会在同一 Execution 内 retry
- 用户能查看每次运行的独立 Evidence Pack
- Scheduler 只负责触发，不参与执行逻辑
## 一句话总结
**Outer Scheduler 不循环执行；它只按 ESD 创建新的 Execution 实例——每次都是新的契约、新的编译、新的执行、新的证据。**
---
# 第七部分 · 最终产品叙事
## 核心叙事
ABC-Prime 不是一个让 Advisor 更快写报告的 AI 工具。
> **它是一个让金融机构把业务意图、治理规则、执行过程、第三方数据边界、合规证据、组织经验和周期性复核统一到同一个可审计执行系统中的平台。**
## 销售叙事的四步
```plain text
From intent to execution.
From execution to evidence.
From evidence to governance.
From governance to organizational memory.
```
中文：
```plain text
从意图到执行。
从执行到证据。
从证据到治理。
从治理到组织经验。
```
## 完整链路
```plain text
Interaction Surface
→ Business Contract
→ Nomos Governance Snapshot
→ Prometheus 编译 EB / EP / ESD
→ Hermes Execution Process
→ Gateway Policy Enforcement
→ Capability / Execution Unit
→ Mnem Trace
→ Evidence Pack
→ Atlas Memory
→ Scheduler Instance Loop
→ Observation / Audit Surface
```
## 最强一句话
> **ABC-Prime 让金融机构第一次能够把 AI 行为纳入可编译、可执行、可审计、可复盘的治理体系。**
---
## 文档结束
如需对应的工程实现规格卡（每个场景的 PRD 拆分底稿），请参考 12 份子页面文档。两份文档讲同一架构，但读者不同——本文档讲”为什么这样做”，子页面讲”具体怎么做”。
