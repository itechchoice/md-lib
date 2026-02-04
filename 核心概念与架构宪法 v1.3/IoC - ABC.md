# IoC - ABC

[返回🔙](ABC%20=%20%E6%89%80%E6%9C%89%20AI%20%E7%B3%BB%E7%BB%9F%E5%BF%85%E9%A1%BB%E4%BE%9D%E8%B5%96%E7%9A%84%20Control%20Plane%202f7bc670d363808cb261ecf5f2f9496d.md)

---

## **Executive Summary｜IoC · ABC（Maven / Spring 对标版）**

**核心结论**

本页定义了一套**成熟、可验证、可长期演进的 IoC 架构**：

**Thaleon 只声明“要什么”，ABC 负责决定“怎么跑”**。

ABC 以 **Maven / Spring 风格的 IoC + Lifecycle** 作为运行时模型，把**决策、编排、执行**严格分层，避免执行期失控。

---

### **架构定位（一句话）**

> **ABC 是一个像 Maven 一样的 IoC 运行时；**
**Thaleon 写的是 POM（契约），不是插件链（执行编排）。**
> 

---

### **四个 Plane 的清晰分工**

- **Control Plane**：能力目录、Assembly Registry、策略与合规边界（“能用什么、是否允许”）。
- **Decision Plane**：将 *intent + context* 编译为**冻结的执行计划（Assembly）与能力白名单（VCS）**。
- **State Orchestration Plane**：纯状态机推进生命周期（只推进、不做策略、不重试）。
- **Execution Plane**：插件化执行单元（Tool / LLM / DB / Search），**只干活、不决定流程**。

> 任何把“编排/决策”塞进执行组件（如 LLM Gateway）的做法都会破坏该模型。
> 

---

### **两个等价视角（帮助对齐）**

- **Spring IoC 视角**：
    - Decision ≈ BeanFactory 装配计划
    - Orchestration ≈ 容器生命周期
    - Execution ≈ 具体 Bean
- **Maven 视角**：
    - Decision ≈ 生成 Effective POM
    - Orchestration ≈ Lifecycle Engine
    - Execution ≈ Plugins/Mojos

---

### **交互与验收原则**

- **契约优先**：Business Contract ≈ POM（Schema 即接口，时序即协议）。
- **幂等与只读查询**：submit → ticket → poll；poll 只读，不得推进/重试/重规划。
- **冻结执行**：Assembly/VCS 一旦生成，执行期不可变。

---

### **本页价值**

这不是接口说明，而是**架构宪法级的协作协议**：

确保 IoC 不被破坏、执行不失控、系统可审计、可演进。

**一句话总结**

> Thaleon 写 POM，ABC 跑 Lifecycle；
插件只执行，控制权永远在 Control/Decision Plane。
> 

---

“深度比喻”：**ABC 四个面（Plane）= 一个“像 Maven 一样的 IoC 运行时”**。

Thaleon 写的是“声明式契约”（像 POM），ABC 负责把它变成可执行的生命周期，并用插件（Tool/LLM/DB/Search）完成动作。

下面我用 **两套比喻**把同一件事讲透：

1. **IoC 容器（Spring 风格）**
2. **Maven 构建系统（Lifecycle + Plugin）**

---

## **一、IoC（Spring）视角：ABC = “容器”，Thaleon = “配置与意图声明者”**

把 analyze_portfolio 看成你在 IoC 里声明一个 *Bean graph*：“我要一个 PortfolioAnalysisResult，但你容器自己决定怎么装配”。

### **1) Control Plane ≈ Bean 定义仓库 + 环境/策略（“能装什么、允许装什么”）**

- **像什么**：@Configuration、BeanDefinitionRegistry、PropertySource、Policy/Enforcer
- **它管什么**：能力目录、版本、合规策略、连接器配置（凭证/租户隔离）、可用 Assembly 列表
- **一句话**：决定 **“容器里允许出现哪些零件、零件怎么被治理”**

### **2) Decision Plane ≈ BeanFactory / Autowire 规划（“把声明变成装配计划”）**

- **像什么**：BeanFactory 解析依赖图、决定用哪个实现、生成 wiring plan
- **它管什么**：把 intent + context 编译成 **固定结构（Assembly）+ 能力白名单（VCS）+ 步骤图**
- **一句话**：决定 **“怎么装配”**（但注意：这是“生成计划”，不是“执行”）

### **3) State Orchestration Plane ≈ 容器运行时（“按计划驱动状态，不掺策略”）**

- **像什么**：ApplicationContext 生命周期、事件总线、状态推进器
- **它管什么**：按步骤推进、记录状态、消费 Execution Event、产出 progress snapshot
- **一句话**：它是 **“只推进、不思考”** 的状态机（就像容器不会在运行时改你的依赖图）

### **4) Execution Plane ≈ 具体 Bean / 实现类（“干活的手脚”）**

- **像什么**：被 IoC 容器调用的 Service、Repository、Client
- **它管什么**：调用 LLM、查数据库、跑风控计算、调搜索、格式化输出
- **一句话**：只做被指派的动作，**不决定下一步该做什么**

> **IoC 精髓一句话：**
Thaleon 声明“要什么（契约）”，ABC（容器）控制“如何装配与运行（四个 Plane）”。
> 

---

## **二、Maven 视角：ABC = Maven，四个 Plane = “从 POM 到 Lifecycle 到 Plugin”的四层机器**

把 analyze_portfolio 当成你跑一次：

**mvn analyze-portfolio -Ddetail=standard**

Thaleon 提供的 Business Contract ≈ POM + goals + profiles（声明式），ABC 负责执行。

### **0) Interaction Surface（补充角色）≈ mvn 命令入口 / IDE 按钮**

- Thaleon 发起 submit/poll，就像你敲 mvn package
- 入口只做：参数校验、幂等、投递任务、返回 ticket（或者同步结果）

> **入口不是生命周期引擎，更不是插件。**
> 

---

### **1) Control Plane ≈ Maven Central / settings.xml / pluginManagement / enforcer（“可用能力与治理”）**

- **像什么**
    - settings.xml（凭证、镜像、代理）≈ Connector 治理
    - pluginManagement（允许用哪些 plugin 版本）≈ Assembly Registry / Capability Catalog
    - maven-enforcer-plugin（规则）≈ 合规/策略
- **一句话**：控制面决定 **“你这次构建允许运哪些插件、访问哪些仓库、用什么凭证”**

---

### **2) Decision Plane ≈ 生成 Effective POM + 执行计划（“编译声明成计划”）**

- **像什么**
    - 解析 POM、profiles、packaging、依赖树
    - 得到 **effective POM**，并决定每个 phase 会触发哪些 plugin goal
- **在 ABC 里对应**
    - 解析 intent + context + output_spec
    - 选定 Assembly（流程模板）与 VCS（能力白名单）
    - 产出固定步骤序列（plan）

> **这就是 IoC 的“控制反转点”**
你不是手写“先调 LLM 再查 DB 再总结”，你只是声明“要 analyze_portfolio”，计划由系统生成。
> 

---

### **3) State Orchestration Plane ≈ Maven Lifecycle Engine（按 phase 推进，不做策略）**

- **像什么**
    - lifecycle phases：validate → compile → test → package → verify
    - 它只负责：按顺序触发、收集结果、推进状态、失败就停/标记失败
- **在 ABC 里对应**
    - validate → resolve_context → plan → execute → aggregate → package → done
    - 它只消费事件推进状态（不会“临场改 POM”）

> 关键对齐：**Lifecycle 引擎不等于决策层**；它不会“见机行事”改你的执行图。
> 

---

### **4) Execution Plane ≈ Maven Plugins / Mojos（插件只干活，不决定生命周期）**

- **像什么**
    - compiler:compile 只负责编译
    - surefire:test 只负责跑测试
    - 插件不能决定“下一步改跑 deploy”
- **在 ABC 里对应**
    - LLM 调用、数据拉取、风险计算、归因分析、建议生成、格式化输出
    - 每一步都是一个 execution unit（Tool/LLM/DB/Search）

> **反例一眼就懂（也是你们方案三的坑）**
如果让 LLM Gateway 去“编排下一步”，就等于让 compiler-plugin 决定 lifecycle —— Maven 世界会直接崩。
> 

---

## **三、把“你要的轻量 Thaleon”说清楚：Thaleon 写 POM，不写插件链**

你们的理想 IoC 合作姿势，翻译成 Maven 语言就是：

- Thaleon 负责写 **POM（Business Contract + Context + Output Spec）**
- ABC 负责提供 **Maven（四个 Plane）**
- Tool/LLM/DB/Search 是 **插件（Execution Units）**
- 验收标准是：
    - 给定同一份“POM”（contract），ABC 跑出来的“产物”（result/progress/error）必须符合 schema
    - 时序像 lifecycle 一样可预测（submit → accepted/result；poll 只读状态）

---

## **四、三条“验收口径”用 Maven 类比最清晰**

1. **不得让插件当生命周期引擎**
    - LLM Gateway/Tool 不得决定下一步（= 插件不得决定 lifecycle）
2. **不得让 tail -f 日志触发构建继续**
    - poll 只能读状态（= 看日志不应触发推进/重试/重新规划）
3. **POM 一旦解析成 effective POM，就冻结**
    - 计划（Assembly/VCS）生成后执行期不应随意改结构（= build 过程中不临时改 phase 绑定）

---

如果你希望更“深度到可落地”，我可以把 **analyze_portfolio 的 Maven lifecycle** 定义成一份“phase-to-step 映射表”（每个 phase 对应哪些执行单元、哪些产物、哪些 event），这样 ABC 四个 Plane 的职责边界就会像 Maven 一样清晰、可验收、不可争辩。

---

**ThoughtWorks 的 Martin Fowler 把 IoC（尤其是 IoC Container / DI 这套说法）在主流社区里“讲清楚并普及”了。**

“Inversion of Control”这个概念/措辞本身更早就出现了。

一个比较公认的时间线是：

- **1988：Ralph E. Johnson & Brian Foote** 在论文 *Designing Reusable Classes* 里就用到了 “inversion of control” 来描述框架的特征（框架调用应用代码，而不是反过来）。
- **1990s：术语在框架圈逐步传播**；维基的梳理提到其词源可追到 1988，并提到 **Michael Mattsson（1996）**、**Stefano Mazzocchi（Avalon，1999）** 等对术语传播的影响。
- **2004：Robert C. Martin 与 Martin Fowler** 在当时 IoC/DI 容器热潮中进一步把概念系统化、推广开来；Fowler 的文章把它与 **Dependency Injection** 关系讲得很清楚。
- **2005：Fowler 的 bliki** 继续强调 IoC 是“框架的普遍特征”，而不是容器独有。

**Martin Fowler（ThoughtWorks）** + **Robert C. Martin** 在 2004 前后推动了普及，尤其是 Fowler 把它与 DI 的边界讲清楚后影响很大。 

---