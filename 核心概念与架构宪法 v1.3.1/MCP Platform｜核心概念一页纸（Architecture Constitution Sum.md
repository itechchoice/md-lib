# MCP Platform｜核心概念一页纸（Architecture Constitution Summary）

[返回 🔙](%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E4%B8%8E%E6%9E%B6%E6%9E%84%E5%AE%AA%E6%B3%95%20v1%203%201%202d8bc670d363802bb159f8c44f970d54.md)

---

这里是一页**“可以直接贴在文档首页 / 投给新同事 / 给合作方看的核心概念总览”**。

目标只有一个：**5 分钟读完，不再误解。**

---

## **一句话总览**

> 我们不是在做 Agent Runtime，而是在做一个“可编译、可冻结、可治理的执行平台（Control Plane）”。
> 

---

## **一、三大层级（先记住这张心智图）**

```
Project（长期空间）【前端是 Workspace（UI)】
└── Session（上下文 / 对话）
    └── Processing（一次运行）
         ├── Execution Blueprint（EB：结构）
         └── Execution Policy（EP：许可）
             ↓
         Execution Process（执行进程）
```

---

## **二、核心对象是什么（逐个讲清楚）**

### **1️⃣ Project（前端通常叫 Workspace）**

- **是什么**：用户/团队的长期工作空间
- **负责**：资源、权限、历史、Session 组织
- **不负责**：❌ 执行、❌ 调用能力、❌ 决策
- **类比**：K8S Namespace / GitHub Project / Notion Workspace

> 👉 Project 是“人工作的地方”，不是“程序跑的地方”。
> 

---

### **2️⃣ Session（前端通常叫 Chat / Conversation）**

- **是什么**：对话与编译上下文
- **负责**：保存 prompt 历史、变量、引用
- **每次用户输入**：都会触发一次新的编译与运行
- **不负责**：❌ 执行、❌ 继续运行、❌ 持有执行状态
- **类比**：Shell Session / IDE Run Configuration

> 👉 Session 是“想事情的地方”，不是“干活的地方”。
> 

---

### **3️⃣ Processing（一次运行）**

- **是什么**：一次完整的 **编译 + 执行** 过程
- **特点**：
    - 一次性
    - 不可续命
    - 不可交互
- **内部产物**：
    - **Execution Blueprint（EB）**：怎么做（结构）
    - **Execution Policy（EP）**：能不能做（许可）

> 👉 Processing = 一次提交程序并运行。
> 

---

## **三、Decision Plane = 编译器（最重要的认知）**

> Decision Plane 是系统中唯一的“编译器”。
> 

它做的事：

```
Business Contract（用户意图）
        ↓
       编译
        ↓
Execution Blueprint（结构）+ Execution Policy（许可）
```

**编译器四大铁律（全部强制）：**

- 编译只发生一次（执行前）
- 编译产物是“结构事实”
- 权限（EP）与结构（EB）分离
- 执行期不得修改结构或权限

👉 **因此：**

- 不写 if
- 不写 retry / fallback
- 执行期不重新决策

这些不是设计偏好，而是**编译模型的必然结论**。

---

## **四、Execution Plane（执行切面）**

### **唯一一等公民：Execution Process**

> **Execution Process 是系统中唯一拥有执行权的对象。**
> 
- **是什么**：一次执行的运行进程 / 实例
- **生命周期**：create → run → terminate
- **拥有**：Execution Authority（执行权）
- **不拥有**：❌ 决策权、❌ 编排权
- **类比**：Linux Process / K8S Job / Pod

---

### **执行切面的结构（定稿版）**

```
Execution Plane
└── Execution Process  ← 唯一执行权主体
    ├── Execution Binding（抽象）
    │    └── Connector（实现，Process-scoped）
    ├── Gateway (PEP)   ← 策略强制点
    └── Execution Units
         ├── MCP Server
         ├── Tool
         └── LLM Gateway
```

---

### **各组件一句话定位**

- **Connector**：执行绑定（句柄），❌ 不是一等公民
- **Gateway (PEP)**：只执法，不思考（Allow / Deny / Limit）
- **Execution Units**：只执行，不理解“为什么”

> 👉 **执行层越“愚钝”，系统越安全。**
> 

---

## **五、State Orchestration Plane（纯状态机）**

> **Orchestrator 是纯状态机，不是 Workflow Engine。**
> 
- 只依据：EB + Execution State + Execution Event
- 不做：❌ if、❌ retry、❌ fallback、❌ 策略判断
- 只回答：**“现在到哪一步”**

---

## **六、Interaction Surface（交互接触面 · 无权力）**

> Surface 是“接触面”，不是系统结构。
> 
- **只做**：接收意图、规范化、触发 Processing
- **永远不做**：❌ 决策、❌ 执行、❌ 编排
- **铁律**：**一旦 Execution 开始，Surface 必须消失**

### **前后端概念对齐**

| **前端** | **后端真实语义** |
| --- | --- |
| Workspace (UI) | Project |
| Chat | Session |
| Run | Execution Process |

---

## **七、三条“内核级定律”（记住这三条就不会写歪）**

1️⃣ **执行实体不可伪造**

→ Execution Process 只能由系统创建

2️⃣ **执行实体不可续命**

→ 执行结束即终止，不可继续

3️⃣ **执行权唯一收敛**

→ 只有 Execution Process 能调用 Gateway

---

## **八、一句话终极总结（可以贴在封面）**

> Plane 定义权力，
Surface 承载意图，
Execution Process 行使执行权，
Gateway 强制法律。
> 

> **我们不是 Agent Runtime，而是一个可治理的执行平台。**
> 

---

如果你愿意，下一步我可以把这一页：

- 压成 **A4 PDF / 海报版**
- 或拆成 **新同事 30 分钟入门讲稿**
- 或做成 **对外架构说明页（非技术版）**

你现在这套概念，已经**完全可以对外讲了**。