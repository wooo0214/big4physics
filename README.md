# Physics Quest · 四大力学探索实验室（MVP + ED1–ED8 示范）

面向研究生的本地优先交互式学习游戏原型。**这是可运行的 MVP，不是完整四大力学课程。**

## 目录结构

以下文件路径与测试命令均以仓库根目录为基准。

```text
index.html                 网页入口
assets/css/                页面样式
assets/js/app.js           主交互
assets/js/course-map.js    课程地图界面
assets/js/data/            课程数据与术语
assets/js/physics/         物理模型
assets/js/lessons/         关卡内容
assets/js/renderers/       Canvas 绘图
tests/                     测试与共用适配器
docs/                      课程设计与教学审核
scripts/                   Mac / Windows 本地启动脚本
```

## 运行

1. 解压文件，Mac 可双击 `scripts/start_mac.command`，Windows 可双击 `scripts/start_windows.bat` 启动本地服务（需要 Python 3）。也可直接双击 `index.html` 尝试；外部资源链接需要联网。
2. 新版 ED1–ED8 请使用本目录入口；早期独立单文件不包含这些新增关卡。
3. 如果浏览器对 `file://` 的本地存储有限制，建议在文件夹中运行：

   ```bash
   python -m http.server 8765
   ```

   然后打开 `http://localhost:8765/`。推荐这种方式，以保证进度保存可靠。
4. 选择四门课程，拖动滑块观察参数变化，完成“预测”和“关键推导”两道挑战，每题 50 XP。
5. 写下学习反思并点击保存；点击“导出 Markdown 学习记录”将笔记导入 Obsidian。

## 基础讲解与进阶训练（2026-10-27）

ED1.1～ED8.4共32小节的基础讲解按“物理问题 → 列式理由 → 关键一步 → 极限检验”精修，放在原有推导折叠区；每节保持四段短文。基础正文参照 [Griffiths《电动力学导论》第4版](https://www.cambridge.org/highereducation/books/introduction-to-electrodynamics/3AB220820DBB628E5A43D52C4B011ED4)的讲解节奏，进阶推导与后续综合题参照 [Zangwill《现代电动力学》](https://assets.cambridge.org/97805218/96979/toc/9780521896979_toc.pdf)的展开深度。教材分工、Griffiths来源及逐模块章节定位见课程地图底部“课程依据与约定”；目录定位不等于逐页核对教材全文。

进阶区要求独立推导、明确边界条件、评估近似误差并检验迁移；未使用近似的题目不强加误差阶次。现有任务仍为自评，综合考试仍待开发。物理模型、两道示范题、35关／70题／3500 XP及学习记录保持原状。

## 中文术语与研究生教学审核（2026-10-27）

ED1～ED8共32小节已做逐节审核，教学正文、题目、控件和图中的英文人名术语统一为中文。修正高斯面中“场强大小／带符号分量”、全反射透射振幅的解释，以及ED5尚未模拟耗散的说明。每关的“关键推导”区域新增“研究生进阶：推导与检验（自评）”，含独立推导任务和可展开的自检要点；不计入原有XP或模块掌握判定。

“交互示范”后新增“核心概念中英对照”标签，含8模块、116项词条，提供中文／英文／符号与单位／概念含义／易混点／对应小节。进入时定位当前示范所属模块，也可切换模块；教材链接和章节定位位于表格上方。正文采用中文，英文原词集中用于术语对照；国际单位及公式符号保留。

教学定位仍是研究生课程的交互导学与基础复习，尚不能独立替代完整课程。逐节判断、修订依据和后续教学缺口见 [ELECTRODYNAMICS_REVIEW.md](docs/ELECTRODYNAMICS_REVIEW.md)。核心词条以本项目SI及度规约定解释，不逐字复制教材。

## 电动力学课程地图与 ED1–ED8 示例（2026-10-27）

选择“电动力学”即可浏览 **8 模块 / 32 关设计**、知识依赖图与逐关目标。实线表示必要先修，虚线表示建议先学。静电与静磁可并行，相对论模块可在麦克斯韦方程模块之后进入。

ED1.1 双电荷叠加、ED1.2 高斯面、ED1.3 散度与环流、ED1.4 界面场跳跃均已有交互示范。选“电动力学”后，在“课程地图”标签中选择模块、展开关卡并点击“进入示范”；“交互示范”标签直接显示当前实验。三个标签（课程地图／交互示范／核心概念中英对照）互斥显示，往返切换保留参数和待保存笔记，不再显示常驻的 EDx.x 快捷列表。ED2.1 电势与路径、ED2.2 接地镜像、ED2.3 矩形边值、ED2.4 多极与格林函数也已开放。ED3 静磁与矢势、ED4 介质响应各四关现已开放。ED5 动态场与波、ED6 能量与动量各四关已开放，包含 s/p 斜入射、全反射、等离子体截止、驻波控制体、辐射压和真空光束收支。ED7 辐射与 ED8 相对论各四关本轮开放，包含推迟势、近远场、拉莫尔公式／短天线，以及四矢量、四电流、场张量和场不变量；至此电动力学 32 关均有示范。浏览地图不计 XP，也不代表模块完成。完整设计见 [ELECTRODYNAMICS_MAP.md](docs/ELECTRODYNAMICS_MAP.md)。课程地图无需后端或新软件包，保留原有及 ED1 学习记录。

完整测试命令见下方“代码与测试”。ED7/ED8 八关经应用内桌面预览检查；未启动 Safari，未实测手机或浏览器重启。

## 已实现

- 35 个示范关卡（ED1–ED8 各四关，其他三科各一关），含交互式数学可视化、参数滑块、关键推导、两道自动判题、学习笔记、进度和 XP。
- `localStorage` 保存本机进度；Markdown 导出，无需后端和外部服务。
- 原有四个解析模型保留；新增双点电荷叠加、数学矢量场积分、真空薄面边界，以及静电路径积分、接地镜像、矩形 Laplace 和多极 / Green 核模型，明确单位、遮罩和近似。
- 官方模拟以外部链接方式接入，不复制或嵌入第三方受版权保护的代码。

## 物理适用范围

- 单摆周期使用理想无阻尼模型的精确椭圆积分，摆球动画采用简谐近似的角度时间曲线（仅示意，有限振幅下并非精确轨迹）。
- 高斯面图为三维球面的二维截面，仅适用于真空中的孤立点电荷；场强箭头长度不按真实数值缩放。
- 两能级模型为非简并、平衡态正则系综，能级为 0 和 Δ>0。
- 势阱为一维无限深势阱中的非相对论单电子，波函数图经过无量纲缩放。

- ED2：真空静电解析模型；点源遮罩 0.08 m；路径积分采用辛普森数值求积；接地模型仅物理半空间且能量排除自能。矩形模型为沿第三轴平移不变的 拉普拉斯截面，显示顶边截断残差；多极页显示精确势、首项和误差，零势面不定义相对误差。未使用平滑或随机模拟。

- ED3：长直导线 / 偏心环路、圆线圈轴线、局部规范变换与均匀外场中的磁偶极；ED4：预设极化立方体、Q/V 两约束电容能量账目、含退磁场的预设磁化无限平板、标量线性介质界面。模型边界见各关卡说明；物理验证可运行下方列出的测试。

- ED5：固定环路与准静态电容的独立装置、满足 ω=c|k| 的真空平面波、无损正实介质的正常/斜入射复菲涅耳系数、固定离子背景的无磁无碰撞冷电子等离子体。ED6：稳恒圆柱局部段、真空相干反向波、静止吸收/反射目标、两侧真空的被动功率分配。瞬时与平均、外法向符号和模型失效范围均在关卡内说明；不将真空动量公式套入介质。

- ED7：守恒理想点偶极、完整复近/远场、非相对论远区辐射及预设均匀电流天线；短元超出教学阈值后不输出绝对功率。ED8：惯性系 SI，固定 +−−− 度规与 洛伦兹变换方向；局域多项式势求场/源，指标升降、四维力和不变量均独立检验。局域/有限源、二维投影/完整分量、场幅/功率的区别在页面内说明。

## 外部资源与授权

- PhET Pendulum Lab: https://phet.colorado.edu/en/simulations/pendulum-lab
- PhET Charges and Fields: https://phet.colorado.edu/en/simulations/charges-and-fields
- Statistical and Thermal Physics Programs: https://www.compadre.org/stpbook/
- QuVis: https://www.st-andrews.ac.uk/physics/quvis/
- MIT TEAL: https://web.mit.edu/8.02t/www/TEALsim/visualizations/visualizingE%26M/VisualizingE%26M.htm

这些资源由原作者维护，**本项目不声明对第三方模拟的再分发、改编或嵌入权**。PhET 普通 HTML 模拟使用 CC BY-NC 4.0；QuVis 材料声明 CC BY-NC-SA；STP 教材配套材料可能有不同许可。商业使用或复制前应逐项核实。

## 下一步：从 MVP 到可用课程

1. 在现有电动力学地图上补充模块综合验收、掌握证据和难度分层；其他三门课扩展课程地图。
2. 继续扩展理论力学、热统、量子力学；优先补充相空间与哈密顿量、配分函数与涨落、量子叠加与测量。电动力学 32 关示范已开放。
3. 每关加入“预测数值 → 运行官方模拟 → 上传/记录观察 → 验证关键推导”流程。
4. 增加本地可选 AI 导师：只提示思路、不直接公布答案；对数学推导使用符号计算校验，而不是只凭语言模型判断。
5. 如果要统一操作第三方模拟，需先调查其 API/嵌入权限；否则保持官方外链，避免跨域与版权问题。

## 代码与测试

`index.html` + 原有页面/模型；`assets/js/lessons/ed1-lessons.js`、`assets/js/renderers/ed1-renderer.js` 与新增 `assets/js/physics/ed2-physics.js`、`assets/js/lessons/ed2-lessons.js`、`assets/js/renderers/ed2-renderer.js` 以及 ED3–ED8 对应模块复用共享 UI；无框架、无新增第三方依赖。

```bash
node tests/test_physics.js
node tests/test_ed1.js
node tests/test_ed2.js
node tests/test_ed3.js
node tests/test_ed4.js
node tests/test_ed5.js
node tests/test_ed6.js
node tests/test_ed7.js
node tests/test_ed8.js
node tests/test_curriculum.js
node tests/test_ed1_app.js
node tests/test_ed2_app.js
node tests/test_ed3_app.js
node tests/test_ed4_app.js
node tests/test_ed5_app.js
node tests/test_ed6_app.js
node tests/test_ed7_app.js
node tests/test_ed8_app.js
node tests/test_glossary.js
```

本项目自有代码可以自由修改；外部资源仍遵循各自许可。

示范题完成度目前为 35 关，每关两题、每题 50 XP；原进度键保留。两道选择题完成不等于模块掌握。课程设计见 [ELECTRODYNAMICS_MAP.md](docs/ELECTRODYNAMICS_MAP.md)，教学审核与适用范围见 [ELECTRODYNAMICS_REVIEW.md](docs/ELECTRODYNAMICS_REVIEW.md)。

## 公开发布版本

本目录是独立的公开发布仓库，仅包含网页代码、测试和公开说明，不包含内部开发记录或原开发仓库的提交历史。后续开发修改需要显式同步到本目录，不会自动同步。

上传到 GitHub 后，可在仓库的 Settings → Pages 中选择 Deploy from a branch，并指定 main 分支与 / (root)。网站入口为 index.html；本项目无需后端构建。

学习进度、XP、主题与反思笔记保存在访问者浏览器的 localStorage 中，不随项目代码上传，也不自动跨设备同步。本地预览与公开网址的记录按浏览器源分别保存。
