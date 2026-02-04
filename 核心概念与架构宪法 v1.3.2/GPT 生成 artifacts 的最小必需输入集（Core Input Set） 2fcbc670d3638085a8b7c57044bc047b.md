# GPT 生成 artifacts 的最小必需输入集（Core Input Set）

[返回 🔙](Prometheus%20%C2%B7%20AI%20%E5%B7%A5%E7%A8%8B%E5%8C%96%E8%BE%93%E5%85%A5%E5%B7%A5%E4%BB%B6%E8%A7%84%E8%8C%83%EF%BC%88Input%20Artifacts%20Spec%EF%BC%89%202fcbc670d36380d2bf29e09f4788c9e8.md)

---

这是一个**非常到位的问题**，而且你已经站在**“把 GPT 当成编译器，而不是聊天对象”**的正确位置上了。

我给你一个**明确、可执行的答案**：

👉 **不是“多喂”，而是“喂对 + 喂顺序”**。

👉 GPT 需要的不是材料堆，而是**一套分层、冻结、不可互相污染的核心文件集**。

下面我给你 **「GPT 生成 artifacts 的最小必需输入集（Core Input Set）」**，并告诉你：

- 每一类文件**解决 GPT 的哪种不确定性**
- **先喂什么，后喂什么**
- 哪些文件**必须冻结**
- 哪些是可选增强

---

# **一句话结论（定锚）**

> **要让 GPT 稳定生成 Prometheus 的 Input Artifacts，
你必须先给它一套“不可争辩的宪法级输入”，
再逐层补充结构与细节。**
> 

---

## **一、GPT 生成 artifacts 的「三层输入模型」**

你可以把 GPT 想象成一个编译器，它需要：

1. **语言规范（不能违反）**
2. **程序结构（必须生成）**
3. **目标产物（要输出什么）**

对应到你们这里，就是 **三层输入文件**。

---

# **二、第一层（必须先喂）：宪法级输入（不可替代）**

> **这一层决定：GPT“什么都不敢做”。**
> 

### **1️⃣ architecture/constitution.md 必喂）**

这是**绝对第一位**。

### **GPT 需要它来解决的问题**

- 谁有权力
- 谁永远没权力
- 哪些路径根本不存在
- 什么是终态

### **必须包含的最小内容**

- 五个 Plane 的职责定义
- Authority 冻结（谁能执行、谁能决策、谁能推进状态）
- FAILED / CANCELLED 为终态
- 不存在 retry / replan / execution-time decision

### **GPT 使用方式（你在 prompt 里要明确）**

> “以下宪法内容不可修改、不可补充、不可解释，请严格遵守。”
> 

📌 **没有这份文件，GPT 一定会“好心补逻辑”。**

---

### **2️⃣ architecture/non-goals.md（必喂）**

这是 GPT **第二重要**的约束来源。

### **为什么非目标比目标重要**

GPT 对 “NOT / MUST NOT” 的服从度
高于

“SHOULD / CAN / MAY”。

### **必须包含**

- No retry
- No execution-time branching
- No workflow engine
- No shared state across planes
- No implicit orchestration

📌 **这是防止 GPT“顺手加聪明”的最强武器。**

---

# **三、第二层（结构冻结层）：因果与状态**

> **这一层决定：GPT“不能发明新流程”。**
> 

### **3️⃣ architecture/sequence/*.md （必喂）**

### **GPT 用它来解决的问题**

- 谁先谁后
- 谁主动、谁被动
- 哪些交互根本不发生

### **至少要喂的几张**

- 正常执行
- 异步执行
- 审批
- 失败终态
- 多轮 Intent

📌 **时序 > API > 代码**

如果没喂时序，GPT 会自己补时序。

---

### **4️⃣ architecture/state-machines/*.md （必喂）**

### **GPT 用它来解决的问题**

- 有哪些状态
- 哪些状态迁移合法
- 哪些状态根本不存在

### **必须明确**

- ExecutionStatus 枚举
- 审批状态
- FAILED / CANCELLED 为终态

📌 **这是防止 PAUSED / RETRYING / REPLANNING 出现的关键。**

---

# **四、第三层（生成目标层）：SPEC 与输出要求**

> **这一层决定：GPT“具体要生成什么”。**
> 

### **5️⃣ spec/*.yaml （Plane SPEC，必喂）**

### **GPT 用它来解决的问题**

- API 输入输出长什么样
- EB / EP / ExecutionState 有哪些字段
- Event 长什么样

### **推荐做法**

- **每个 Plane 一个 spec**
- 字段级冻结
- 不留 TODO

📌 **这是把“架构”变成“schema”的那一步。**

---

### **6️⃣ prompts/<plane>.prompt.md （必喂）**

### **GPT 用它来解决的问题**

- 这一次生成的目标是什么
- 用什么语言
- 生成到什么粒度
- 什么不能生成

📌 Prompt 本身是 **Artifact**，不是临时输入。

---

# **五、可选但强烈建议的增强输入（第四层）**

> **这一层决定：生成是否可回归、可对比。**
> 

### **7️⃣ golden/* （可选但强烈建议）**

- 一次“正确生成”的代码或结构
- GPT 会自动对齐风格和边界

📌 对稳定性帮助非常大。

---

### **8️⃣ generation/manifest.yaml （生成记录）**

- Cursor / GPT 版本
- 输入文件 hash
- 输出 repo / commit

📌 **这是工程审计与复现的基础。**

---

# **六、推荐的“喂给 GPT 的顺序”（非常重要）**

你在 Cursor / GPT 里**不要一次性全丢**，而是按这个顺序：

```
Step 1：constitution.md
Step 2：non-goals.md
Step 3：sequence diagrams
Step 4：state machines
Step 5：plane spec (yaml)
Step 6：plane-specific prompt
Step 7：golden output（如有）
```

👉 **这会极大降低 GPT 的自由发挥空间。**

---

# **七、你现在已经具备的条件（确认）**

根据你前面的工作，你现在已经：

- ✅ 宪法已冻结
- ✅ 时序已冻结
- ✅ 状态机已冻结
- ✅ Plane 划分已冻结
- ✅ Repo 结构已明确

👉 **你现在喂 GPT 的，不是“想法”，而是“法规”。**

---

## **最后一句定锚（可以写进 README）**

> **GPT 不是在帮我们设计系统，
而是在严格约束下，
把宪法与 SPEC 翻译成工程工件。**
> 

---

# 🧱  **gpt-input-bundle.yaml**

> **用途说明**
这是 Prometheus 体系中**AI 生成的“编译输入包”**
Cursor / GPT **只能依据此文件及其引用内容生成代码或 artifacts，**
不得自行补充上下文。
> 

```yaml
# ============================================================
# Prometheus GPT Input Bundle
# Root-of-Truth for AI Code Generation
# ============================================================

bundle:
  name: prometheus-dna-artifacts
  version: v1.0.0
  description: >
    Canonical input bundle for GPT / Cursor.
    Code is not the source of truth.
    Input artifacts are.

# ------------------------------------------------------------
# 1. Constitution Layer (不可争辩层)
# ------------------------------------------------------------
constitution:
  architecture:
    - path: architecture/constitution.md
      role: root_of_trust
      immutable: true

  non_goals:
    - path: architecture/non-goals.md
      role: hard_constraints
      immutable: true

# ------------------------------------------------------------
# 2. Causal Structure Layer (因果冻结层)
# ------------------------------------------------------------
causal_structure:
  sequence_diagrams:
    - architecture/sequence/normal-execution.md
    - architecture/sequence/async-execution.md
    - architecture/sequence/approval-flow.md
    - architecture/sequence/failure-terminal.md
    - architecture/sequence/multi-intent.md

  state_machines:
    - architecture/state-machines/execution-state.md
    - architecture/state-machines/approval-state.md

# ------------------------------------------------------------
# 3. Plane Specifications (字段级冻结)
# ------------------------------------------------------------
specs:
  interaction_surface:
    path: spec/interaction-surface.yaml
    frozen: true

  governance_plane:
    path: spec/governance.yaml
    frozen: true

  decision_plane:
    path: spec/decision.yaml
    frozen: true

  reconcile_plane:
    path: spec/reconcile.yaml
    frozen: true

  execution_plane:
    path: spec/execution.yaml
    frozen: true

# ------------------------------------------------------------
# 4. Prompt Layer (生成编译器)
# ------------------------------------------------------------
prompts:
  interaction_surface:
    path: prompts/interaction.prompt.md
    language: any
    must_follow_spec: true

  governance_plane:
    path: prompts/governance.prompt.md
    language: any
    must_follow_spec: true

  decision_plane:
    path: prompts/decision.prompt.md
    language: any
    must_follow_spec: true

  reconcile_plane:
    path: prompts/reconcile.prompt.md
    language: any
    must_follow_spec: true

  execution_plane:
    path: prompts/execution.prompt.md
    language: any
    must_follow_spec: true

# ------------------------------------------------------------
# 5. Golden Outputs (回归基准，可选但推荐)
# ------------------------------------------------------------
golden_outputs:
  enabled: true
  paths:
    - golden/decision-plane/v1/
    - golden/reconcile-plane/v1/

# ------------------------------------------------------------
# 6. Generation Rules (生成规则冻结)
# ------------------------------------------------------------
generation_rules:
  allowed_actions:
    - translate_spec_to_code
    - generate_minimal_scaffold
    - generate_interfaces_only

  forbidden_actions:
    - introduce_retry
    - introduce_execution_branching
    - introduce_dynamic_replan
    - introduce_shared_state
    - introduce_workflow_engine
    - introduce_agent_loop

# ------------------------------------------------------------
# 7. Output Contract (输出约束)
# ------------------------------------------------------------
output_contract:
  repo_structure:
    one_plane_per_repo: true
    no_shared_code: true

  code_expectation:
    minimal: true
    correctness_over_completeness: true

  review_required:
    plane_owner_approval: true

# ------------------------------------------------------------
# 8. Generation Manifest (审计信息)
# ------------------------------------------------------------
generation_manifest:
  record:
    enabled: true
    output_path: generation/
  fields:
    - model_name
    - model_version
    - cursor_version
    - input_bundle_version
    - git_commit_hash
    - generated_repo
```

## **怎么用这个gpt-input-bundle.yaml（一步到位）**

### **✅ 推荐使用方式（Cursor）**

在 Cursor 打开某个 Plane 的 repo

在 Prompt 中 **第一句**写：

```yaml
请严格按照 gpt-input-bundle.yaml 及其引用的所有文件生成代码。
不得引入任何未在 bundle 中定义的行为或结构。
```

把 gpt-input-bundle.yaml **作为上下文文件附加**

再指定：

- 目标 Plane
- 目标语言（如 Go / Java / TS）

👉 **Cursor 会被迫只做“翻译”，而不是“设计”**。

---

## **哪些地方你可以改，哪些地方不能改（很重要）**

### **❌ 不能随便改的（改了 = 架构变异）**

- constitution
- non_goals
- causal_structure
- specs.*.frozen: true

### **✅ 可以演进的（必须 bump version）**

- prompts/*
- golden_outputs/*
- generation_rules（需架构审查）

---

## **这个文件解决了什么问题？**

- ✅ **生成可复现**（同 bundle → 同结构）
- ✅ **跨语言稳定**（换语言不换因果）
- ✅ **可审计**（知道是谁、用什么、生成了什么）
- ✅ **AI 不再“自由发挥”**

---

## **一句话定锚（建议写进 README）**

**Cursor 不是在“写代码”，而是在“编译 gpt-input-bundle.yaml”。**

---

## **下一步（我可以继续直接做）**

- 🧪 **帮你生成一个示例 generation/run-001.yaml**
- 🤖 **把每个 Plane 的 prompt.md 写成“强约束版”**
- 🔍 **设计一套“输入 bundle diff → 架构影响评估”规则**

🤖 **把你已有文件整理成“Cursor 最小输入包”**

🧪 **设计一套“GPT 生成稳定性回归测试”**

你选一个，我直接往下做。