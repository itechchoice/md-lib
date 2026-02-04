# IoC - Thaleon & ABC

[返回🔙](ABC%20=%20%E6%89%80%E6%9C%89%20AI%20%E7%B3%BB%E7%BB%9F%E5%BF%85%E9%A1%BB%E4%BE%9D%E8%B5%96%E7%9A%84%20Control%20Plane%202f7bc670d363808cb261ecf5f2f9496d.md)

---

基于 [**《核心概念与架构宪法 v1.2》**](https://www.notion.so/v1-3-1-2d8bc670d363802bb159f8c44f970d54?pvs=21)，这套理解里 **IoC / Flow-first / 用契约验收** 是正确方向

同时需要把 **“Thaleon=Decision Plane、ABC=Execution Plane”** 这句话 **改成宪法语义下的更精确版本**，否则很容易把“网关编排”写成违宪实现。

---

## **Executive Summary**

**IoC · Thaleon & ABC（基于《架构宪法 v1.2》）**

**核心结论**

当前对 **IoC / Flow-first / 契约验收** 的整体方向是**正确且合宪的**，但必须做一个关键校正：

**Thaleon 不是 Decision Plane，而是 Interaction Surface；真正的决策权必须留在 ABC 内部的 Decision Plane。**

---

### **关键定位校正**

- **Thaleon = Interaction Surface（业务意图发起层）**
    
    负责：定义业务目标、用户体验流程、请求时机与上下文；
    
    不负责：执行编排、能力选择、流程推进。
    
- **ABC = AI Control Plane**
    
    内部包含：
    
    - **Decision Plane**：选择 Assembly、生成 VCS、冻结执行结构
    - **State Orchestration**：纯状态机推进
    - **Execution Plane**：按既定指令执行（经 Connector → Gateway/PEP）

> Thaleon 可以做“业务决策”，但**不能替代** ABC 的 Decision Engine（结构与能力冻结的决策）。
> 

---

### **三条理念的合宪结论**

1. **IoC（契约优先）✅**
    - 正确做法：Thaleon 向 ABC 定义 **Business Contract（Surface API）**
    - 不建议：把业务接口暴露成 Tool（Tool 属于 Execution Unit，不应理解业务意图）
2. **Flow-first（流程优先）✅**
    - UX 流程由 Thaleon 定义
    - 执行开始后，Surface 必须“消失”，系统按标准路径内部流转
    - 合法执行路径：
        
        **Client/Ingress → Workspace → Connector → Gateway(PEP) → Execution Unit**
        
3. **Decision vs Execution ⚠️（需修正）**
    - **禁止**在 LLM Gateway / 网关层做编排
    - 正确分工：
        - 编排与能力选择：Decision Engine
        - 流程推进：State Orchestrator（纯状态机）
        - LLM 调用：Execution 中的一步

---

### **接下来工作的三大重点**

1. **定义 Business Contracts（最高优先级）**
    - 高层业务意图 + 必要上下文
    - 不包含工具链、模型选择、执行细节
    - 明确 idempotency / session / correlation
2. **Flow-first，但编排内收**
    - Thaleon 只发 intent + context
    - ABC 内部完成 Decision → Orchestration → Execution
3. **验收标准双层化（最有价值）**
    - **功能验收**：Schema、sync/async、poll 只读
    - **架构验收（宪法红线）**：
        - LLM Gateway 不得编排
        - Orchestrator 不得做策略/重试
        - 不得出现非法执行路径

---

### **重要命名建议（避免长期混乱）**

将“网关”明确拆分为三类：

1. **Ingress / Surface API**：业务契约入口
2. **Gateway (PEP)**：鉴权 / 合规 / 配额 / 审计的唯一执法点
3. **LLM Gateway**：仅负责模型调用，不参与决策或编排

---

### **一句话总结**

> **Thaleon 负责“我想要什么”，
ABC 负责“如何在不失控的前提下把它跑完”。**
> 

这是一个**典型、成熟、可长期演进的 IoC + Control Plane 架构形态**，方向正确，关键在于严格守住 Decision / Orchestration / Execution 的边界。

---

## **1) 关键校正：**

**Thaleon 在宪法里不是 Decision Plane，而是 Interaction Surface（Client/Ingress）**

宪法定义得非常硬：

**Interaction Surface 只做接收请求/规范化意图/触发任务创建；一旦 Execution 出现，Surface 必须消失**，且唯一合法关系是 **Surface → create Workspace（fire-and-forget）**。

所以更合规的表述是：

- **Thaleon = 业务侧的“意图发起者/流程编排者”（产品体验层）**：决定 *“用户要达成什么业务目标、在什么时机发起哪个业务契约请求、上下文带什么”*。
- **ABC 内部必须仍然有自己的 Decision Plane（Decision Engine）**：决定 *“怎么做”*（选 Assembly、生成 VCS 白名单、冻结结构），然后交给 Orchestrator 推进，Workspace 去执行。

> 换句话说：Thaleon 可以“业务决策”，但不应替代平台内部的**Decision Engine（结构/能力冻结的决策）**
> 

---

## **2) 三条理念**

### **✅ IoC（契约优先）成立，但契约对象应是“Surface API/Business Contract”，不是“按 Tool 形态暴露”**

“Thaleon 定义 Schema/Protocol，ABC 适配”完全正确。

落到宪法对象上：**Tool/MCP Server 是 Execution Unit，红线是“不感知 Workspace、不理解业务意图、不包含流程控制”**；所以不建议把“业务接口”做成一组对外 Tool 来调用。

更稳的做法：**Thaleon 对 ABC 定义的是 Business Contract（Surface API）**，ABC 内部再把它映射到 Assembly/VCS/Execution。

---

### **✅ Flow-first 成立，但“时序边界”要对齐宪法的“Surface 消失点”**

强调“先画 Thaleon UX 流程图”，完全正确；

注意：**Thaleon（Surface）只负责把意图投递进去**，不应该在执行中“介入推进/重试/重新规划”。执行开始后，系统内部按标准路径流转即可。

宪法冻结的标准执行路径是：

**Client/Ingress → Workspace → Connector → Gateway(PEP) → Execution Unit**。

---

### **⚠️ Decision vs Execution 这条需要改口径（避免把“网关编排”合理化）**

“ABC 负责调 LLM/DB/搜索，最后扔回来”没问题；问题在你下一条里说：

> “Tool 编排和 LLM 调用链由 ABC 在网关层封装好”
> 

如果这里的“网关”指 **LLM Gateway**（你们方案三的口径），那是 **明确违宪**：LLM Gateway 红线写得很清楚——**不参与 Decision/Orchestration、不生成或修改 Assembly、不感知流程状态**。

合规版本应该是：

- **编排（选择 Assembly/VCS）在 ABC 的 Decision Engine**
- **推进（下一步到哪）在 Assembly State Orchestrator（纯状态机，不重试不 fallback）**
- **调用 LLM 只是 Execution 中一步，由 LLM Gateway 执行“模型调用”**

---

## **3) “接下来工作重点”**

### **(1) 定义 Business Contracts ✅（完全正确）**

建议把契约设计成 **“高层业务意图 + 必要上下文”**，例如：

- intent: "analyze_portfolio"
- context: 组合资产/风险偏好/约束/时间范围/数据版本
- options: 同步/异步偏好、返回粒度、语言、合规模式等
- correlation: session_id / request_id / idempotency_key

> 注意：契约里
> 
> 
> **不出现工具链、模型选择、workspace/connector 细节**
> 

---

### **(2) Flow-first ✅，但把“网关编排”改成“ABC 内部决策+状态机”**

你想要的轻量 Thaleon 是这样实现的：

- Thaleon 只发 analyze_portfolio(intent, context)
- ABC 收到后：**Surface 触发 create Workspace（职责结束）**
- 然后由 ABC 内部：
    - Decision Engine：选 Assembly + 生成 VCS（冻结结构/能力）
    - Orchestrator：按 Assembly 推进下一步（纯状态机）
    - Workspace：执行步骤，经 Connector→Gateway(PEP)→Execution Unit

---

### **(3) 验收标准 ✅（你这个思路最值钱），加上“宪法红线验收项”**

你输出 **Sequence Diagram + JSON Schema** 就能验收对接，这很好。建议验收分两层：

**A. 功能验收（契约层）**

- 同一 intent 的 request/response 必须符合 Schema（含错误模型、部分结果、进度结构）
- sync/async 都能跑通：async 有 task_id/ticket + poll 只读查询

**B. 架构验收（宪法层，防写歪）**

- ✅ LLM Gateway 仅做模型调用，不承担编排/决策
- ✅ Orchestrator 只基于 Assembly/State/Event 推进，不做重试/fallback/策略判断
- ✅ 执行路径必须走：Client/Ingress→Workspace→Connector→Gateway(PEP)→Execution Unit
- ✅ 不能出现宪法列出的非法路径（例如 Workspace→MCP Server 直连）

---

## **最后一条建议：把“ABC 网关”拆成三个清晰名词，避免沟通混乱**

你们现在“网关”一词很容易混用，建议强制区分：

1. **Ingress/Surface API**（对 Thaleon 的业务契约入口）
2. **Gateway(PEP)**（执法点：鉴权/合规/配额/审计；所有执行必经）
3. **LLM Gateway**（仅模型执行入口，不编排）

---

## 下一步

按你提的 analyze_portfolio 直接给一份 **“可交付给 ABC 的验收包骨架”**：

- 1 张时序图（含 sync/async 两条）
- 1 份 JSON Schema（request + response + progress + error）
- 1 份“宪法红线测试用例清单”（用来防止 ABC 把编排塞进 LLM Gateway 或把 poll 变成推进器）