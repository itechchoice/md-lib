# Reconcile Plane - 为什么不再叫 State Orchestration Plane

[返回 🔙](%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E4%B8%8E%E6%9E%B6%E6%9E%84%E5%AE%AA%E6%B3%95%20v1%203%201%202d8bc670d363802bb159f8c44f970d54.md)

---

<aside>
💡

好，下面我按你的要求，**用“宪法条款式语言”直接写一整页**。

不是解释文、不是建议文，而是**裁决文 / 定义文**，可以直接放进《核心概念与架构宪法》。

</aside>

---

# **Reconcile Plane 为什么不再叫 State Orchestration Plane**

---

## **一、裁决结论（先给结论）**

> 本系统不再使用 “State Orchestration Plane” 这一命名，而统一采用 “Reconcile Plane”。
> 

此变更 **不改变任何架构原则与职责边界**，仅用于**消除长期歧义、锁死执行期权力边界、防止实现层越权演化**。

---

## **二、为什么不再叫 State Orchestration Plane**

### **2.1 “Orchestration” 在工程语义上的固有歧义**

在主流工程语境中，**Orchestration** 一词天然携带以下含义：

- workflow orchestration
- step orchestration
- service orchestration
- control-flow orchestration

其隐含假设是：

> **系统在执行期具备“控制流程走向”的能力。**
> 

这正是以下系统的核心特征：

- Workflow Engine
- DAG Engine
- Pipeline Orchestrator
- Agent Runtime

---

### **2.2 Orchestration 与 Workflow Engine 的语义绑定**

在绝大多数工程体系中：

- **Orchestrator** 通常负责：
    - 决定下一步做什么
    - 根据执行结果选择路径
    - retry / fallback / compensation
    - 动态调整执行顺序

也即：

> **Orchestration = 执行期路径决策**
> 

而在本系统中，这是**明确禁止的能力**。

---

### **2.3 继续使用 Orchestration 命名的必然后果**

如果继续使用 **State Orchestration Plane**：

- 工程师会合理地假设：
    - “这里可以写流程控制”
    - “这里可以根据结果判断下一步”
- 实现层会自然演化为：
    - 隐式 workflow engine
    - 隐式 agent loop
- 架构将不可避免地**向 Workflow Engine 退化**

> **因此，继续使用 Orchestration 命名，在语义上等价于给系统埋下违宪入口。**
> 

---

## **三、为什么必须改为 Reconcile Plane**

### **3.1 Reconcile 的精确定义（工程级）**

**Reconcile** 在工程中的精确含义是：

> **对账 / 校验 / 纠偏 / 推进一致性**
> 

它回答的问题是：

> **“当前状态，是否与既定声明一致？”**
> 

而不是：

> “下一步应该做什么？”
> 

---

### **3.2 Reconcile 与 Workflow 的根本区别**

| **维度** | **Workflow Engine** | **Reconcile Plane** |
| --- | --- | --- |
| 决策时间 | 执行期 | 执行前（已冻结） |
| 核心问题 | 下一步做什么 | 当前是否一致 |
| 是否选择路径 | 是 | 否 |
| 是否 retry / fallback | 是 | 否 |
| 是否修改结构 | 可能 | 绝不 |

> **Workflow 关心“选择”，
Reconcile 关心“一致性”。**
> 

---

### **3.3 Reconcile Plane 在本系统中的真实职责**

> **Reconcile Plane 的职责只有一件事：
判断“当前 Execution State 是否对应冻结结构中的合法下一步”，
并据此推进状态。**
> 

它：

- 不决定执行内容
- 不决定执行顺序
- 不根据结果做策略判断
- 不修改 Execution Blueprint
- 不修改 Execution Policy

---

## **四、Reconcile Plane 的宪法级定义（冻结）**

**Reconcile Plane 是一次 Execution 生命周期内的状态对账与推进内核。**
**在每个 Execution Event 发生后，Reconcile Plane：**

1. 读取当前 Execution State
2. 读取冻结的 Execution Blueprint
3. 判断是否存在**唯一合法的下一状态**
4. 若存在，则推进；若不存在，则终止

**Reconcile Plane 不具备任何路径选择、策略判断或流程编排能力。**

---

## **五、Reconcile Plane 不是 Workflow Engine（明确裁决）**

### **5.1 本系统中不存在的能力**

Reconcile Plane **明确不允许**：

- if / else
- switch / branch
- retry / backoff
- fallback / compensate
- DAG 条件解释
- 执行期重新规划

任何以上能力的引入，均视为**架构违规**。

---

### **5.2 判定准则（实现层一票否决）**

> **如果某段逻辑在执行期需要回答：
“要不要换一条路？”
那它就不属于 Reconcile Plane。**
> 

---

## **六、与 Kubernetes Reconcile 的关系（澄清）**

本系统借鉴的是 **Kubernetes Reconcile 的“思想”**，而非其完整机制：

- Kubernetes：
    - 长期存在的 Desired State
    - 可反复拉回现实
    - 具备自愈能力
- 本系统：
    - 一次性冻结的 Execution Blueprint
    - 不可逆的真实副作用
    - **不具备自愈或回拉能力**

因此：

> **本系统的 Reconcile Plane 是“单向、一次性、不可回滚的 Reconcile”。**
> 

---

## **七、命名变更的最终裁决**

> **将 State Orchestration Plane 更名为 Reconcile Plane，
是为了在命名层面彻底消除 Workflow / Orchestration 的误导语义，
并将执行期能力严格收敛为：
“状态对账与合法推进”。**
> 

此命名调整 **不改变架构，只锁死权力**。

---

## **八、一句话定锚（封底用）**

> **Decision Plane 决定结构，
Reconcile Plane 判断是否合法，
Execution Plane 让事情发生。**
> 

---

如果你愿意，下一步我可以继续帮你写：

- **《Reconcile Plane 不可包含能力清单（Forbidden Capabilities）》**
- **《为什么我们不是 Workflow Engine》对外版本**
- 或把这一页压缩成 **“工程实现裁决卡”**，直接给开发团队用