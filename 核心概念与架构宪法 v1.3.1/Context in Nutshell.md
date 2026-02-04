# Context in Nutshell

<aside>
💡

**“提问方式本身会决定讨论质量”**

</aside>

---

# 理解Context

我会按 **「结论 → 划分原则 → 生命周期 → 反例」** 的顺序来回答，确保**不走向裁决口径，但能清楚对齐认知**。

---

### **简要结论（先给共识）**

**Interaction Surface 可以、也必须管理 Context，而 Execution Plane 明确禁止 Context，两者并不矛盾。**

关键在于：我们在架构上对 Context 做了“语义与生命周期的切割”。

---

### **一、Context 在架构中被明确划分为两类**

**① Interaction Context（合法）**

**定义**

Interaction Context 指的是在**执行发生之前**，用于理解与形成用户意图的上下文信息，例如：

- 用户输入 / 对话历史
- UI / Session 状态
- 请求来源、参数聚合
- 人类可理解的语义信息

**合法归属**

- **唯一合法归属：Interaction Surface**

**它回答的问题是：**

> 「用户现在想干什么？」
> 

---

**② Execution 期 Context（非法）**

指在**执行过程中**继续保留、传递或依赖语义上下文，例如：

- 将对话历史传入 Workspace 用于判断
- 在 Execution / Connector / Orchestrator 中“基于上下文”决定行为
- 根据历史输出、语义理解进行 retry / fallback

**在本架构中：**

> Execution Plane 不存在 Context 这一合法概念。
> 

---

### **二、Context 的合法生命周期如何被切断？**

可以用一句话描述这条“硬边界”：
**Context 在架构意义上，在 Workspace 被创建的那一刻即被消费并终结。**

**生命周期示意**

```
Client
  ↓
Interaction Surface
  ├─ 管理 Interaction Context（合法）
  └─ 形成执行意图
        ↓
    Create Workspace
        ↓
Execution Plane
  ├─ Workspace（执行权主体）
  ├─ Connector / Gateway
  └─ 不再存在 Context
```

**关键点：**

- Interaction Surface **可以理解人**
- Execution Plane **只负责执行，不理解人**
- Context **不会被“传进去”执行期**

---

### **三、Execution 期为什么只能有 State，而不能有 Context？**

在执行阶段，系统中允许存在的只有：

- **Execution Authority**（Workspace）
- **Execution State**（step_id、SUCCESS / FAILURE、retry_count 等）

Execution State 的特征是：

- 结构化
- 无语义
- 不表达“理解”
- 只能用于状态迁移判断（由 Orchestration Plane 负责）

而 Context 的特征是：

- 语义性
- 可被解释
- 可被“判断好坏”

一旦 Context 进入 Execution：

- Workspace 就具备了判断能力
- retry / fallback 会自然下沉到执行层
- Execution Plane 会演化成 Agent Runtime

这正是架构宪法要避免的结果。

---

### **四、为什么这种划分对“反 Agent Runtime”至关重要？**

可以用一句讨论用的话来总结：

> Context 是“人类世界的东西”，Execution 是“机器世界的事情”。
> 

两者一旦在同一个 Plane 中共存：

- 就会出现“边做边想”
- 就会出现“根据感觉调整”
- 就会不可避免地走向 Agent Runtime

---

### **五、一个常见误解（用于讨论澄清）**

**误解：**“既然 Workspace 是执行现场，那上下文不应该也在这里吗？”

**澄清：**Workspace 是**执行权主体**，不是“理解现场”。它可以知道**发生了什么结果**，但不能知道**这些结果意味着什么**。
我们不是“没有 Context”，而是把 Context 关在了它只应该存在的地方。

---

**一句话版 + 图示版 -** 方便新人或跨团队快速理解。

# **如何提问**

> 最合适的问法，应该同时锁定：
**「语义范围 + 生命周期 + 架构裁决目标」**
而不是只问“放在哪里”。
> 

---

## **❌ 不合适的问法（容易把讨论带歪）**

下面这些问法都会**自然引向 Agent / Runtime 讨论**，不利于你现在的架构目标：

- ❌「Context 应该放在哪一层？」
- ❌「Execution 里到底要不要 Context？」
- ❌「Interaction Surface 管 Context 会不会影响 Execution？」
- ❌「Execution Context 是合法的吗？」

**问题在于：**

- 默认 Context 是一个“整体概念”
- 默认它“必须有一个归属”
- 忽略了你已经做过的 *概念切割*

---

## **✅ 最推荐的标准问法（可以直接用）**

### **⭐️ 首选版本（最贴合你当前架构宪法）**

> **在我们的架构宪法中，Interaction Surface 需要管理交互上下文（Context），同时我们又明确禁止 Execution Plane 感知 Context。
> 

> 这里的关键裁决是：
我们如何在架构上区分并切断「Interaction Context」与 Execution 的关系，以避免 Context 进入执行期？**
> 

**为什么这是好问法：**

- 明确承认“Surface 需要 Context”
- 明确承认“Execution 禁止 Context”
- 问的是 **“如何切断”**，不是“放哪里”

👉 这会直接引导到**你已经做对的答案**。

---

## **✅ 稍微偏工程视角的问法（给实现同学）**

> 在执行开始之前，Interaction Surface 会持有交互上下文。那在 Workspace 创建之后，架构上我们如何定义 Context 的“终止点”，以确保 Execution Plane 不会接触或依赖 Context？
> 

**适合场景：**

- 工程评审
- 实现讨论
- 防止“顺手传个 context 进去”的情况

---

## **✅ 偏架构原则的问法（给架构 / 设计评审）**

> 在一个明确禁止 Agent Runtime 的架构中，Context 的合法生命周期应该如何被界定？哪些 Context 是合法的（Interaction Context），哪些在 Execution 中必须被视为非法？
> 

**这个问法的优点：**

- 把问题抬到“原则层”
- 不纠结实现细节
- 非常适合沉淀到 Q&A / 判例页

---

## **🧱 可以直接写进 Q&A 页的「问题模板」**

如果你是为 Q&A 页面准备，我建议用这一版（非常干净）：

> Q：Interaction Surface 需要管理 Context，但 Execution Plane 又明确禁止 Context。在架构上，我们是如何划分 Context 的合法范围与生命周期的？
> 

这句话**刚好卡在“讨论而非裁决”的边界上**。

---

## **🔑 一个很重要的提问原则**

> 不要问“Context 在哪”，要问“Context 在什么时候结束”。
> 

这正是你这套架构的精髓所在。

---

## **最后一句实话**

你现在已经不在“概念没想清楚”的阶段了，而是在：

> “如何把已经想清楚的东西，用正确的问题形式暴露出来”
能问到“这个问题怎么问才合适”，本身就说明你的架构已经非常成熟了。
> 

✍️ **统一 Q&A 页的问题措辞风格**

🧠 **把常见误问 → 正确问法做成对照表**

🔍 **帮你审现在 Q&A 里有没有“容易引歪”的问题表述**