# Speaking Engine

IELTS speaking practice system — structured sentence-level shadowing with teacher-generated content.

---

## File Index

| File | Purpose |
| ---- | ------- |
| [CLAUDE.md](CLAUDE.md) | This file — project entry point |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture, deployment, and workflows |
| [docs/PRD/](docs/PRD/) | Product requirements documents |
| [openspec/](openspec/) | Specs, design, and tasks |

---

## Workflow

```
Idea/Brainstorming → PRD → OpenSpec Propose → Explore → Worktree → Apply → Verify → Fix/Iterate → Archive → Merge
```
 阶段 | 命令 | 用途与核心铁律 (Harness Constraints) |
|------|------|------|
| **探索想法** | `/brainstorming` | **从想法生成/改造 PRD**。聚焦雅思考生痛点、心理焦虑与产品交互玩法，严禁涉及任何代码细节与持久化设计。最终在 `docs/PRD/` 产出业务规则与 Explore Backlog。 |
| **创建提案** | `/opsx:propose` | **基于 PRD 创建变更提案，执行【契约守门人】卡点**。必须首先对照 `ARCHITECTURE.md` 评估变更范围。若发现提案试图绕过已有抽象层 Interface、破坏现有协议或分层架构，**必须立刻中断并触发【红牌拦截警告】**，拒绝生成提案。 |
| **深入设计** | `/opsx:explore` | **探索设计细节、技术方案**。聚焦”接口断层扫描”与”网络管道对齐”，跳过具体逻辑实现行。在 `openspec/` 沉淀出技术位置、新增 Interface 声明、Mermaid 通信时序图，并拆解出由原子任务组成的 `tasks.md`。 |
| **UI/UX 设计评审** | `/impeccable` | **apply 前必需关卡：设计评审通过后才能 apply**。若变更涉及 UI/UX（新界面、交互流程修改、视觉调整、移动端适配），必须调用 `/impeccable` 进行设计评审，确认方案合理性、交互流畅性、可访问性后再进入实施阶段。 |
| **启动实施** | `git worktree add -b feature/<name> .git/worktrees/<name> main` | **开启 feature 分支**。利用 Git Worktree 隔离技术开辟完全独立的临时物理工作空间，确保 `main` 分支在开发中绝对干净、不受污染。 |
| **实施变更** | `/opsx:apply` | **按 tasks.md 逐项实施变更**。化身为精准的“执行器”，严格按照 OpenSpec 拆解出的原子任务清单依次编写代码，严禁脱离清单自由发挥、擅自修改不相关文件。 |
| **验证功能** | `/run` / `/verify` | **运行应用，执行【双盲验证】流程**。<br>1. **🧪 前端自闭环验证**：完全断开后端，验证 `frontend/src/mock/data.ts` 是否适配新 TS 类型且 100% 独立跑通交互。<br>2. **🧪 全栈联调验证**：开启后端内存存储（STORAGE_PROVIDER=mock），进行端到端通信验证，确保 JSON Schema 契约契合且 JWT 鉴权通过（没加鉴权则跳过）。<br>3. **🧪 UI/UX 实施审查**：若涉及 UI/UX 变更，使用 `/impeccable` 检查视觉效果、交互响应、移动端适配、边界状态，确保实施与设计方案一致。 |
| **归档变更** | `/opsx:archive` | **归档变更并生成终结指令**。将 Spec 草案转为正式规格，打印 PR Body 报告，并在终端打印出人类专用的【一键合并销毁命令】。 |
| **合并主干** | *人类手动在终端执行* | **人类迁回主目录并完成最终合并**。人类在终端粘贴/执行 AI 留下的终结指令，安全销毁 AI 临时工作区，在主干上完成合并与分支清理。 |


---

**Architecture & Deployment** → [ARCHITECTURE.md](ARCHITECTURE.md)

---

## Project Structure

```
speaking-engine/
│
├── backend/                     # Go backend
│   ├── internal/                # Core packages
│   ├── cmd/
│   └── seeds/
│
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── types/
│   └── package.json
│
├── docs/                        # Documentation
│   └── PRD/                     # Product requirements documents
│
├── openspec/                    # Specs, design, tasks
├── .github/                     # CI/CD workflows
├── ARCHITECTURE.md              # Architecture & workflows
└── CLAUDE.md                    # Project entry point
```