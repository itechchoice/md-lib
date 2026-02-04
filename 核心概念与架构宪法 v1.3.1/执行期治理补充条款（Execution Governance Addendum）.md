# 执行期治理补充条款（Execution Governance Addendum）

定位非常明确：

> 不改变任何架构原则，只约束“执行期如何不越权”。
> 

用**宪法条款式语言**来写，而不是建议文或说明文。

---

# **🧱 执行期治理补充条款**

**Execution Governance Addendum**

> 本补充条款是《核心概念与架构宪法》的**执行期治理扩展**
> 

> 用于约束系统在**Execution Lifecycle**
> 

---

## **第一章｜适用范围与基本原则**

### **条款 E-0.1｜适用范围**

本补充条款 **仅适用于执行期（Execution Phase）**，包括但不限于：

- State Orchestration Plane
- Execution Plane
- Interaction Surfaces
- Execution Context（Workspace / Connector / Lifecycle）

本条款 **不修改、不重定义、不扩展** 任何 Plane 的原始权力。

---

### **条款 E-0.2｜执行期治理基本原则**

> 执行期不得引入任何新的权力。
> 

执行期的所有行为，必须满足以下三条：

1. **不新增决策**
2. **不修改结构**
3. **不形成内部反馈回路**

---

## **第二章｜关于“动态任务”的执行期治理**

### **条款 E-1.1｜禁止运行期重决策**

在 Execution Phase 内，系统 **不得**：

- 重新计算 Assembly
- 基于执行结果选择新的执行路径
- 动态生成新的流程结构

> 任何运行期路径选择，只能发生在 Decision Plane 已生成的分支范围内。
> 

---

### **条款 E-1.2｜多分支 Assembly 的合法性**

以下行为被明确认定为 **合法执行期行为**：

- 在 Decision Plane 生成 **多分支 Assembly**
- 在 Execution Phase 中，根据执行结果类型：
    - 选择 **已存在的分支**

该行为 **不构成运行期重决策**。

---

### **条款 E-1.3｜Fail Fast 的宪法地位**

Fail Fast 被定义为：

> 一种合法、稳定、可审计的终止状态，而非异常行为。
> 

Fail Fast 后，系统必须：

- 进入 **Terminal State**
- 停止 State Orchestration
- 仅产生 Execution Event

Fail Fast **不得**：

- 自动触发重试
- 自动触发新 Execution
- 自动回流至 Decision Plane

---

### **条款 E-1.4｜自愈的合法定义**

> 自愈 ≠ 运行期修复
> 

合法的“自愈”必须满足：

- 基于 Execution Event
- 由外部系统或人类触发
- 启动一次 **新的 Decision + Execution 周期**

任何运行期内部的“自修复流程”，在架构上等价于 Agent 行为，**一律禁止**。

---

## **第三章｜Assembly Definition 的执行期治理**

### **条款 E-2.1｜Assembly 的职责上限**

Assembly Definition **只允许描述控制流结构**，包括：

- 执行步骤顺序
- 基于结果类型的分支

Assembly **不得**包含：

- 业务计算逻辑
- JSON 字段级判断
- 数值比较与推导
- 复杂规则表达

---

### **条款 E-2.2｜Assembly 模板化原则**

为防止 Assembly Definition 膨胀，系统 **必须支持**：

- Template-based Assembly
- Assembly = Template + 参数 + 分支绑定

Decision Plane 的职责是：

- 选择模板
- 填充参数
- 决定分支覆盖范围

---

### **条款 E-2.3｜Assembly 的可理解性要求**

任何 Assembly Definition 必须满足：

> 人类在 5 分钟内可以完整理解其执行路径。
> 

不满足该条件的 Assembly，被视为 **设计缺陷**，而非能力不足。

---

## **第四章｜Interaction Surface 的执行期治理**

### **条款 E-3.1｜Interaction Surface 的绝对去权原则**

Interaction Surface（包括但不限于 Workspace、Session、Connector）：

- **不拥有任何决策权**
- **不拥有任何流程推进权**
- **不拥有任何能力选择权**

其职责仅限于：

- 承载
- 投递
- 呈现

---

### **条款 E-3.2｜Workspace 的执行期红线**

Workspace 在执行期 **严禁**：

- if / else 流程控制
- 调用其他 Tool
- 推进或终止流程
- 持有可变流程状态

Workspace 仅允许：

- 按 Step Descriptor 执行
- 产生 Execution Result

---

### **条款 E-3.3｜Connector 的生命周期约束**

Connector：

- 必须绑定在 Workspace 生命周期内
- 不得跨 Workspace 复用
- 不得独立触发执行

任何试图将 Connector 提升为“半执行体”的行为，均构成架构违规。

---

## **第五章｜异常、中断与清理（Cleanup）治理**

### **条款 E-4.1｜异常的定义**

异常是：

> Execution 未能完成既定 Step 的结果状态
> 

异常 **不是**：

- 新的决策触发器
- 新的流程入口

---

### **条款 E-4.2｜Cleanup 权力归属**

Cleanup / Rollback：

- 属于 **Execution Plane**
- 只能在 **State Orchestration 已终止后执行**

Cleanup 行为 **不得**：

- 改变流程结构
- 触发新执行
- 调整后续路径

---

### **条款 E-4.3｜禁止隐性重试**

任何形式的：

- 自动 Retry
- 自动 Fallback
- 自动替代路径

若发生在 Execution Phase 内，

且未显式体现在 Assembly Definition 中，

一律视为 **隐性重决策，禁止**。

---

## **第六章｜违规检测与治理执行**

### **条款 E-5.1｜架构违规事件（Architecture Violation Event）**

以下行为必须触发 Architecture Violation Event：

- Workspace 出现流程控制逻辑
- Tool 调用 Tool
- Connector 独立调度
- 执行期修改 Assembly / VCS

---

### **条款 E-5.2｜治理优先级**

Architecture Violation Event：

- 必须被记录
- 必须可审计
- 不得被吞没或降级

> 治理优先级高于业务成功。
> 

---

### **条款 E-5.3｜宪法裁决原则**

在任何争议中：

> ❌ “这样更快 / 更灵活”
> 

> ❌ “临时优化一下”
> 

> 不能构成违反宪法的理由。
> 

唯一合法依据是：

> 是否符合架构宪法及本补充条款。
> 

---

## **终章｜总裁决（Final Clause）**

> 执行期的稳定性优先于系统的即时灵活性。
> 

> 系统被允许在失败后重新开始，
但不被允许在运行中自行改变命运。
> 

---

## **📌 状态标识**

- **Document Type**：Governance Addendum
- **Applies To**：Execution Phase
- **Compatibility**：Architecture Constitution v1.1
- **Change Policy**：v1.x 仅允许补充条款

---

### **✅ 使用建议**

- 本文可作为：
    - 架构评审否决依据
    - 执行期实现检查清单
    - PR / Code Review 对照文本
- 编号为：**Appendix E · Execution Governance**

---

下一步：

1. 🔍 把这份补充条款 **压缩成 1 页执行期检查表**
2. 🧪 用它 **反审一个“真实复杂执行场景”**
3. 📘 把它 **翻译成工程师版（可执行清单）**