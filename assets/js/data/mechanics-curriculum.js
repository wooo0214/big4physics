/* Original classical-mechanics curriculum; CM2.2 retains the legacy mechanics record.
 * SI internally; angle displays name deg/rad explicitly. Prerequisites guide, never lock.
 * Availability is integrated with the corresponding lesson modules by the application.
 */
(function(root,factory){const data=factory();if(typeof module==='object'&&module.exports)module.exports=data;root.MechanicsCurriculum=data;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return {
  "version": "0.1-course-map",
  "updated": "2026-10-28",
  "title": "理论力学课程地图",
  "modules": [
    {
      "id": "CM1",
      "title": "牛顿力学、约束与参考系",
      "short": "受力与参考系",
      "question": "换一个坐标系，怎样保证受力和加速度仍然一致？",
      "outcome": "能先标明参考系和约束，再把牛顿方程投影到允许运动方向。",
      "concepts": [
        "受力图",
        "理想约束",
        "极坐标基矢",
        "惯性力"
      ],
      "assumptions": "质点、非相对论、光滑固定约束；旋转系只计算恒定角速度的瞬时账目。",
      "misconception": "有速度不等于有净力；科里奥利力与离心力的方向和速度依赖不同。",
      "mastery": "重新推导斜面及电梯结果，明确法向约束有效域，并给出旋转系力的分量。",
      "transfer": "为星系盘旋转参考系提供语言；局部力账目并非银河系势模型。",
      "requires": [],
      "recommended": [],
      "tools": [
        "CB1",
        "CB2"
      ],
      "readings": [
        [
          "mit",
          "第1章的牛顿、约束与坐标主题；旋转系另参考第2章"
        ],
        [
          "ttm",
          "第2讲：牛顿、相空间、动量与能量"
        ]
      ],
      "lessons": [
        {
          "title": "牛顿第二定律与约束反力",
          "question": "同一斜面上，较重物体是否下滑得更快？",
          "experiment": "调质量m、斜面角α及g，比较沿坡加速度、支持力和重力分量。",
          "derivation": "沿坡mg sinα=ma，法向N=mg cosα；理想约束不沿可运动方向做功。",
          "acceptance": "a与m无关；α=0时a=0、N=mg，α=π/2时N=0。",
          "model": "光滑固定斜面、保持接触、无空气阻力；m为kg、g为m/s²、力为N，角计算用rad。",
          "graduateTask": "用能量守恒独立计算下滑距离后的速度，并解释失去接触时为何要重新建模。",
          "id": "CM1.1",
          "requires": [],
          "status": "available",
          "implementationId": "CM1.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "极坐标中的速度与加速度",
          "question": "速度大小不变，为什么仍可能有加速度？",
          "experiment": "调r、角速度ω和角加速度α，比较径向与切向基矢及各分量。",
          "derivation": "v=ṙ eᵣ+rφ̇ eφ；a=(r̈−rφ̇²)eᵣ+(rφ̈+2ṙφ̇)eφ，本示范固定r。",
          "acceptance": "匀速圆周运动aᵣ=−rω²；ω反号不改变向心项，角加速度决定aφ。",
          "model": "固定半径r>0的瞬时运动学；r为m、ω为rad/s、α为rad/s²，不将基矢变化漏掉。",
          "graduateTask": "由笛卡尔坐标二阶求导重得分量式，推广到非零径向速度。",
          "id": "CM1.2",
          "requires": [
            "CM1.1"
          ],
          "status": "available",
          "implementationId": "CM1.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "加速参考系与视重",
          "question": "电梯向上运动，体重计一定读数更大吗？",
          "experiment": "调质量、g和电梯向上的加速度，观察真实重力、支持力及惯性力。",
          "derivation": "惯性系N−mg=ma；加速系增加−ma后得相对平衡。",
          "acceptance": "N=m(g+a)；读数由加速度决定，不由速度方向决定；自由落体a=−g时N=0。",
          "model": "竖直向上为正，保持接触分支a≥−g；N是接触力，负的形式解不代表拉力。",
          "graduateTask": "讨论a<−g时物体脱离地板的运动，并分别在两参考系列式。",
          "id": "CM1.3",
          "requires": [
            "CM1.2"
          ],
          "status": "available",
          "implementationId": "CM1.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "旋转参考系中的惯性力",
          "question": "向外运动的小球为什么在转台上偏转？",
          "experiment": "调转速Ω、径向位置r与相对径向速度u，比较离心项及科里奥利项的方向。",
          "derivation": "a惯性=a相对+2Ω×v相对+Ω×(Ω×r)，恒定Ω时无欧拉项。",
          "acceptance": "离心加速度为+Ω²r eᵣ，科里奥利加速度为−2Ωu eφ；Ω或u反号会反转后者。",
          "model": "右手系、Ω沿+z，r为m、u为m/s、Ω为rad/s；本关是瞬时力账目，不假装已积分轨迹。",
          "graduateTask": "加入时变Ω的欧拉项，并解释科里奥利力为何不对相对速度做功。",
          "id": "CM1.4",
          "requires": [
            "CM1.3"
          ],
          "status": "available",
          "implementationId": "CM1.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM2",
      "title": "拉格朗日力学与变分原理",
      "short": "坐标、作用量与对称",
      "question": "能否先消去约束，再由一个函数得到运动方程？",
      "outcome": "能选广义坐标、从作用量求Euler–Lagrange方程，并辨认循环坐标。",
      "concepts": [
        "虚位移与虚功",
        "广义坐标",
        "驻定作用量",
        "循环坐标"
      ],
      "assumptions": "基础示范使用理想完整约束和非退化动能；变分固定端点及端点时刻。",
      "misconception": "驻定不普遍等于最小；广义动量不总是质量乘速度。",
      "mastery": "独立推导单摆方程及周期小角极限，并给出作用量一阶变化为零的证据。",
      "transfer": "为星系轨道的广义坐标和对称性守恒提供建模工具。",
      "requires": [
        {
          "id": "CM1",
          "reason": "受力、坐标和理想约束是消去反力的基础。"
        }
      ],
      "recommended": [],
      "tools": [
        "CB1",
        "CB2"
      ],
      "readings": [
        [
          "mit",
          "第1章：变分、约束和对称性"
        ],
        [
          "ttm",
          "第3–4讲：拉格朗日与对称性"
        ]
      ],
      "lessons": [
        {
          "title": "广义坐标、约束与虚功",
          "question": "去掉约束方向后，还需要显式求支持力吗？",
          "experiment": "用同一光滑斜面比较笛卡尔位移和沿坡广义坐标s的虚位移。",
          "derivation": "δr=(cosα,−sinα)δs；N·δr=0，Qₛ=mg sinα；达朗贝尔原理给m s̈=Qₛ。",
          "acceptance": "约束反力虚功为零但反力本身通常非零；沿坡结果与CM1.1相同。",
          "model": "固定完整约束、理想光滑接触；s为m，Qₛ为N，虚位移在固定时刻比较。",
          "graduateTask": "写出约束函数及拉格朗日乘子，独立恢复支持力。",
          "id": "CM2.1",
          "requires": [
            "CM1.1"
          ],
          "status": "available",
          "implementationId": "CM2.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "单摆与小角近似",
          "question": "单摆周期为何在大振幅时依赖振幅？",
          "experiment": "保留原L、g、初始角度控件，对照小角周期与AGM椭圆积分周期。",
          "derivation": "Lagrangian=mL²θ̇²/2−mgL(1−cosθ)；θ̈+(g/L)sinθ=0，小角周期T₀=2π√(L/g)。",
          "acceptance": "保留原两题和mechanics笔记；L加倍T₀乘√2，有限非零振幅的精确周期大于T₀。",
          "model": "理想无阻尼单摆，L为m、g为m/s²；角度控件为deg，计算用rad；动画只是轨迹示意。",
          "graduateTask": "从能量积分导出T=4√(L/g)K(sin(θ₀/2))，检查θ₀→0及接近π时的极限。",
          "id": "CM2.2",
          "requires": [
            "CM2.1"
          ],
          "status": "available",
          "implementationId": "mechanics",
          "implementationNote": "沿用原单摆、AGM周期、两道题、笔记及mechanics记录；不另建CM2.2完成记录。动画只作轨迹示意。",
          "legacyLessonId": "mechanics",
          "legacyLabel": "M1"
        },
        {
          "title": "驻定作用量与试探路径",
          "question": "真实路径的作用量总是最小吗？",
          "experiment": "固定谐振子端点，调正弦试探扰动的振幅及时间区间，比较S−S经典和一阶变化。",
          "derivation": "S=∫(m q̇²/2−mω²q²/2)dt；δq端点为零，分部积分给q̈+ω²q=0。",
          "acceptance": "经典解附近作用量一阶变化为零；二阶变化的符号可随时间区间改变。",
          "model": "固定端点和时刻，m为kg、q为m、ω为rad/s、S为J·s；驻定不等同全局最小。",
          "graduateTask": "计算正弦扰动的二阶作用量并找出共轭时间，解释长时间区间的鞍点性质。",
          "id": "CM2.3",
          "requires": [
            "CM2.2"
          ],
          "status": "available",
          "implementationId": "CM2.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "循环坐标与守恒动量",
          "question": "坐标不出现在拉格朗日量中，会带来什么？",
          "experiment": "调中心势轨道的半径和方位角速度，比较pφ、切向速度与角动量。",
          "derivation": "L=μ_red(ṙ²+r²φ̇²)/2−V(r)，∂L/∂φ=0给pφ=μ_redr²φ̇守恒。",
          "acceptance": "相同角动量下r加倍则φ̇变为1/4，切向速度减半；pφ与线动量单位不同。",
          "model": "中心势、惯性系、相对坐标，μ_red为约化质量kg，pφ为kg·m²/s，φ为rad。",
          "graduateTask": "用连续旋转对称性独立推导角动量守恒，并讨论显含φ的外扰矩。",
          "id": "CM2.4",
          "requires": [
            "CM2.3"
          ],
          "status": "available",
          "implementationId": "CM2.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM3",
      "title": "中心力场、轨道与开普勒问题",
      "short": "轨道与散射",
      "question": "中心力的二维运动如何化为一个径向问题？",
      "outcome": "能用比能量ε、比角动量h、比有效势及偏心率判别测试粒子轨道，并转换到一般两体相对运动。",
      "concepts": [
        "有效势",
        "约化质量",
        "圆锥轨道",
        "面积定律"
      ],
      "assumptions": "当前交互为点质量M场中的测试粒子：γ=GM [m³/s²]，h=L/m [m²/s]，ε=E/m [J/kg]，比势−γ/r且无穷远取零。一般两体用μ_red=m₁m₂/(m₁+m₂) [kg]、κ=Gm₁m₂，转换为γ=κ/μ_red=G(m₁+m₂)、h=ℓ/μ_red、ε=E/μ_red后可复用公式；不能把γ误作约化质量。不包含广义相对论或多体扰动。",
      "misconception": "当前图中r为测试粒子到固定中心的距离，曲线能量单位为J/kg，不是J；一般两体推广时r才是两体相对间距。h为比角动量，角动量守恒也不代表角速度恒定。",
      "mastery": "从比能量和比角动量得比有效势，分类轨道并推导周期及弱散射极限；说明γ与μ_red的单位，并独立完成一般两体量到比量的转换。",
      "transfer": "连接恒星轨道和引力飞掠；点质量二体模型不等于银河系扩展质量分布。",
      "requires": [
        {
          "id": "CM2",
          "reason": "使用循环角坐标及角动量守恒。"
        }
      ],
      "recommended": [],
      "tools": [
        "CB1",
        "CB2"
      ],
      "readings": [
        [
          "mit",
          "第4章的Kepler主题；基本二体推导为本项目补充"
        ]
      ],
      "lessons": [
        {
          "title": "有效势、转向点与圆轨道",
          "question": "离心势垒如何改变径向可达区间？",
          "experiment": "调引力参数γ [m³/s²]、比角动量h [m²/s]和比能量ε [J/kg]，画比有效势、转向点及圆轨道半径。",
          "derivation": "v有效=h²/(2r²)−γ/r，ε=ṙ²/2+v有效；v有效单位J/kg。圆轨道满足v有效′=0；一般两体由V有效/μ_red=v有效、h=ℓ/μ_red、γ=κ/μ_red得到同式。",
          "acceptance": "h>0时圆轨道r꜀=h²/γ且曲率为正；ε<−γ²/(2h²)时无实运动。用ε与比有效势比较，不能把总能量J直接代入。",
          "model": "当前测试粒子交互采用γ=GM [m³/s²]、h=L/m [m²/s]、ε=E/m [J/kg]；r>0、h>0。一般两体用γ=G(m₁+m₂)=κ/μ_red、h=ℓ/μ_red、ε=E/μ_red，μ_red为kg；h=0碰撞奇点不绘假轨道。",
          "graduateTask": "由圆轨道曲率求径向小振动频率，和轨道角频率比较。",
          "id": "CM3.1",
          "requires": [
            "CM2.4"
          ],
          "status": "available",
          "implementationId": "CM3.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "圆锥曲线与轨道分类",
          "question": "同一个引力定律怎样产生束缚与逃逸轨道？",
          "experiment": "调引力参数γ [m³/s²]、比角动量h [m²/s]和偏心率e，由p=h²/γ计算半通径，显示r(φ)、轨道分类及合法极角区间。",
          "derivation": "r=p/(1+e cosφ)，p=h²/γ，e²=1+2εh²/γ²；因此ε=γ²(e²−1)/(2h²)。当前γ=GM，一般两体用γ=G(m₁+m₂)、h=ℓ/μ_red、ε=E/μ_red。",
          "acceptance": "ε<0与e<1对应椭圆，ε=0与e=1对应抛物线，ε>0与e>1对应双曲线；ε单位J/kg，分母非正区域不属于所画支。",
          "model": "当前为固定中心点质量场中的测试粒子，γ为m³/s²、h为m²/s、r与p为m、ε为J/kg、e无量纲；无穷远比势取零。一般两体按γ=κ/μ_red及比量转换，不能把μ_red [kg]填作γ。",
          "graduateTask": "由Binet方程导出圆锥曲线，并说明有界轨道并非对任意中心势都闭合。",
          "id": "CM3.2",
          "requires": [
            "CM3.1"
          ],
          "status": "available",
          "implementationId": "CM3.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "面积定律与开普勒周期",
          "question": "偏心轨道中，行星在哪一段走得更快？",
          "experiment": "调引力参数γ [m³/s²]、半长轴a [m]和偏心率e，比较面积速度h/2、角速度h/r²及周期；图按真近点角采样，未展示均匀时间扇形。",
          "derivation": "h=√[γa(1−e²)]，dA/dt=h/2；椭圆面积πa²√(1−e²)除以h/2给T²=4π²a³/γ。当前测试粒子γ=GM；一般两体γ=G(m₁+m₂)，h=ℓ/μ_red。",
          "acceptance": "固定a和γ时T与e无关；近日点角速度更大而面积速度h/2不变。验证T²/a³=4π²/γ，γ单位m³/s²而非kg。",
          "model": "当前测试粒子绕固定中心，γ=GM [m³/s²]、h=L/m；交互偏心率0≤e≤0.9。a为m、h为m²/s、T为s、面积速度为m²/s。一般两体改用γ=G(m₁+m₂)=κ/μ_red、h=ℓ/μ_red，a取相对椭圆半长轴；均匀φ采样不是均匀时间采样。",
          "graduateTask": "结合角动量和能量推导近远日点速度比，检查e→0极限。",
          "id": "CM3.3",
          "requires": [
            "CM3.2"
          ],
          "status": "available",
          "implementationId": "CM3.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "引力散射与冲量参数",
          "question": "飞掠速度相同，离中心更近为何偏转更大？",
          "experiment": "调引力参数γ [m³/s²]、冲量参数b [m]及无穷远速度v∞ [m/s]，显示偏角曲线、双曲离心率与近心距离；不宣称已积分双曲轨迹。",
          "derivation": "测试粒子取γ=GM、h=bv∞、ε=v∞²/2，e=√(1+b²v∞⁴/γ²)，χ=2 arctan[γ/(b v∞²)]。一般两体相对散射用γ=G(m₁+m₂)、h=ℓ/μ_red、ε=E/μ_red。",
          "acceptance": "χ由无量纲比γ/(b v∞²)控制，大b或大v∞给小偏角；γ不是μ_red。b→0⁺时χ→π的极限不等于已求出穿过奇点轨道。",
          "model": "当前测试粒子在固定中心比势−γ/r中无耗散散射，γ=GM [m³/s²]、b>0、v∞>0；b为m、v∞为m/s、χ为rad。一般两体以γ=κ/μ_red=G(m₁+m₂)推广，忽略中心体尺寸与碰撞。",
          "graduateTask": "推导微分散射截面并解释点质量碰撞奇点与有限天体半径限制。",
          "id": "CM3.4",
          "requires": [
            "CM3.3"
          ],
          "status": "available",
          "implementationId": "CM3.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM4",
      "title": "小振动、简正模与耦合振子",
      "short": "线性化与模叠加",
      "question": "复杂运动何时可以拆成独立的振动模式？",
      "outcome": "能由势曲率判别线性稳定、求简正模，并检查能量和受迫响应。",
      "concepts": [
        "小振动",
        "广义本征问题",
        "拍与能量",
        "阻尼与共振"
      ],
      "assumptions": "局部线性化、对称双振子和线性稳态；零曲率需回到非线性模型。",
      "misconception": "单体能量不守恒不代表总能量不守恒；振幅峰和功率峰不同。",
      "mastery": "独立核对模频及正交性，写出耦合能量账目，注明受迫稳态的存在条件。",
      "transfer": "为盘面小扰动与局部振动建立方法；不把双振子当真实星系盘模型。",
      "requires": [
        {
          "id": "CM2",
          "reason": "使用广义坐标及二阶动能/势能展开。"
        }
      ],
      "recommended": [],
      "tools": [
        "CB2",
        "CB3"
      ],
      "readings": [
        [
          "mit",
          "第3章：Vibrations and Oscillations"
        ]
      ],
      "lessons": [
        {
          "title": "平衡点、势曲率与小振动",
          "question": "势能最低点附近为何常出现谐振运动？",
          "experiment": "调局部势曲率和质量，比较稳定、线性中性及不稳定平衡。",
          "derivation": "V≈V(q₀)+V″(q₀)(δq)²/2；mδq̈=−V″(q₀)δq。",
          "acceptance": "正曲率给ω²=V″/m，负曲率给指数增长；零曲率需更高阶分析。",
          "model": "一维局部线性化，q为m、曲率为N/m、ω为rad/s；小振幅条件须检查。",
          "graduateTask": "以四次势反例说明零二阶项不能判定非线性稳定性。",
          "id": "CM4.1",
          "requires": [
            "CM2.1"
          ],
          "status": "available",
          "implementationId": "CM4.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "耦合振子与简正模",
          "question": "两个相连的振子为何存在两种独立节奏？",
          "experiment": "调m、端点弹簧k及中间耦合κ，比较同相/反相本征矢。",
          "derivation": "M q̈+Kq=0；等质量对称系统ω₊²=k/m、ω₋²=(k+2κ)/m。",
          "acceptance": "κ→0恢复简并独立振子；同相模中耦合弹簧不伸长，反相模频率更高。",
          "model": "两质量相同、位移小、线性无阻尼；m为kg，k与κ为N/m。",
          "graduateTask": "使用质量加权坐标推广到不同质量，并检查模正交采用何种内积。",
          "id": "CM4.2",
          "requires": [
            "CM4.1"
          ],
          "status": "available",
          "implementationId": "CM4.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "模叠加、拍与能量交换",
          "question": "一个振子先动，能量怎样周期性交给另一个？",
          "experiment": "调初始位移、模振幅及相位，显示两坐标、包络和分项能量。",
          "derivation": "x₁=(Q₊+Q₋)/√2，x₂=(Q₊−Q₋)/√2；近频模叠加产生差频包络。",
          "acceptance": "总能量守恒，单个振子能量可变；纯单模时没有两模拍。",
          "model": "线性无耗散双振子；t为s，位移m、能量J；耦合势能须单独计账或说明分配。",
          "graduateTask": "推导完全转移时间，区分包络符号周期与能量交换周期。",
          "id": "CM4.3",
          "requires": [
            "CM4.2"
          ],
          "status": "available",
          "implementationId": "CM4.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "受迫阻尼振子与共振",
          "question": "最大振幅与最大吸收功率是否出现在同一频率？",
          "experiment": "调驱动频率、阻尼和驱动力，显示稳态幅度、相位及平均功率。",
          "derivation": "m ẍ+b ẋ+kx=F₀cosΩt；A=F₀/√[(k−mΩ²)²+(bΩ)²]。",
          "acceptance": "Ω→0给F₀/k，高频幅度下降；正阻尼时周期平均输入功率等于耗散功率。",
          "model": "线性稳态、b>0时瞬态已衰减；零阻尼精确共振不存在有限稳态；b为kg/s。",
          "graduateTask": "推导振幅峰位置及半功率带宽，说明过阻尼时不出现非零频率振幅峰。",
          "id": "CM4.4",
          "requires": [
            "CM4.3"
          ],
          "status": "available",
          "implementationId": "CM4.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM5",
      "title": "刚体运动、角动量与进动",
      "short": "刚体与主轴",
      "question": "角速度、角动量和转矩为何常常不在同一方向？",
      "outcome": "能计算惯量张量和瞬时角动量，辨认自由转动稳定性及慢进动条件。",
      "concepts": [
        "惯量张量",
        "主轴",
        "Euler方程",
        "进动"
      ],
      "assumptions": "刚性质量分布；自由转动只展示主轴附近线性扰动；重陀螺采用慢进动近似。",
      "misconception": "L一般不平行ω；稳定转动不表示会自动耗散到该状态。",
      "mastery": "核对惯量半正定、主轴稳定性和慢进动近似的量纲与失效条件。",
      "transfer": "连接天体自转及进动的基础；流体天体、潮汐和内部耗散需额外理论。",
      "requires": [
        {
          "id": "CM1",
          "reason": "使用角动量、转矩及旋转参考系。"
        }
      ],
      "recommended": [
        {
          "id": "CM4",
          "reason": "主轴稳定性借助线性化与本征值。"
        }
      ],
      "tools": [
        "CB1",
        "CB3"
      ],
      "readings": [
        [
          "mit",
          "第2章：Rigid Body Dynamics"
        ]
      ],
      "lessons": [
        {
          "title": "惯量张量与主轴",
          "question": "同一物体绕不同方向转动，为何转动惯量不同？",
          "experiment": "调点质量分布和轴方向，比较惯量矩阵、主值和轴向转动惯量。",
          "derivation": "Iᵢⱼ=Σmₐ(rₐ²δᵢⱼ−rₐᵢrₐⱼ)，I轴=nᵀIn。",
          "acceptance": "I对称且半正定；主轴使矩阵对角；转轴过质心与偏轴情形需区分。",
          "model": "离散刚性质量分布、参考点固定；m为kg、r为m、I为kg·m²。",
          "graduateTask": "验证平行轴定理，并构造退化主值不唯一的例子。",
          "id": "CM5.1",
          "requires": [
            "CM1.4"
          ],
          "status": "available",
          "implementationId": "CM5.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "角动量不一定平行角速度",
          "question": "角速度方向能直接代表角动量方向吗？",
          "experiment": "调三个主惯量及角速度方向，比较L、ω、动能和夹角。",
          "derivation": "主轴系Lᵢ=Iᵢωᵢ，T=ω·Iω/2。",
          "acceptance": "球形惯量或沿主轴转动时L平行ω；一般各向异性时不平行，T≥0。",
          "model": "绕固定参考点刚体的瞬时量；I为kg·m²、ω为rad/s、L为kg·m²/s、T为J。",
          "graduateTask": "在固定角动量下比较不同主轴的转动能，联系自由转动稳定性。",
          "id": "CM5.2",
          "requires": [
            "CM5.1"
          ],
          "status": "available",
          "implementationId": "CM5.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "自由刚体的主轴转动稳定性",
          "question": "为什么绕中间惯量轴转动容易翻转？",
          "experiment": "按I₁<I₂<I₃调主转速和微小扰动，比较各主轴附近线性增长率。",
          "derivation": "无外矩Euler方程I₁ω̇₁=(I₂−I₃)ω₂ω₃及循环置换；在线性邻域求扰动特征值。",
          "acceptance": "最大/最小惯量轴小扰动振荡，中间轴存在实增长率；简并惯量端点单独解释。",
          "model": "无外矩、主轴随体旋转、只作局部线性稳定性；增长率为s⁻¹，不声称完整翻转轨迹。",
          "graduateTask": "用能量与角动量两不变量的几何交线解释稳定性，并估计线性近似失效时间。",
          "id": "CM5.3",
          "requires": [
            "CM5.2"
          ],
          "status": "available",
          "implementationId": "CM5.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "重陀螺的慢进动",
          "question": "力矩为何主要改变角动量方向而非长度？",
          "experiment": "调质量、支点距离、自转角动量和倾角，对照重力矩及慢进动率。",
          "derivation": "τ=r质心×mg，慢进动时dL/dt≈Ωₚ×L，得Ωₚ≈mgl/L自转。",
          "acceptance": "固定几何下增大L自转会降低进动率；倾角为零时力矩为零，不能从0/0推得可观测锥面运动。",
          "model": "快速自转对称陀螺、慢进动且忽略章动；长度m、角动量kg·m²/s、Ωₚ为rad/s。",
          "graduateTask": "从完整对称陀螺方程推导稳态进动的两支，并量化慢支近似条件。",
          "id": "CM5.4",
          "requires": [
            "CM5.3"
          ],
          "status": "available",
          "implementationId": "CM5.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM6",
      "title": "哈密顿力学与相空间",
      "short": "相空间与演化",
      "question": "把速度换成动量后，怎样读出轨道和守恒结构？",
      "outcome": "能完成Legendre变换，用哈密顿方程演化，并区分形变与相空间体积变化。",
      "concepts": [
        "正则动量",
        "Legendre变换",
        "相轨道",
        "刘维尔定理"
      ],
      "assumptions": "非退化正则系统；示范以自治谐振子、自由粒子和单摆为主。",
      "misconception": "哈密顿量不在任何情形都等于机械能；构型面积不等于相空间面积。",
      "mastery": "独立求相流矩阵及辛面积，解释单摆分离曲线与临界周期。",
      "transfer": "为恒星系统的相空间分布建立基础；本章不替代无碰撞Boltzmann方程。",
      "requires": [
        {
          "id": "CM2",
          "reason": "由L与正则动量构造H。"
        }
      ],
      "recommended": [],
      "tools": [
        "CB2",
        "CB3"
      ],
      "readings": [
        [
          "mit",
          "第1章的Hamiltonian主题；第4章的辛结构"
        ],
        [
          "ttm",
          "第5–7讲：哈密顿量、方程与刘维尔定理"
        ]
      ],
      "lessons": [
        {
          "title": "从拉格朗日量到哈密顿量",
          "question": "换成动量坐标后，运动规律是否改变？",
          "experiment": "调谐振子m、ω、q和速度，显示p、L、H及同一点能量。",
          "derivation": "p=∂L/∂q̇=mq̇；H=pq̇−L=p²/(2m)+mω²q²/2。",
          "acceptance": "正则Legendre变换要求速度Hessian非退化；本自治自然系统H等于机械能。",
          "model": "一维谐振子、m>0、ω>0；q为m、p为kg·m/s、H和L为J。",
          "graduateTask": "给出显含时间或速度势的例子，说明H与能量的关系不能机械照搬。",
          "id": "CM6.1",
          "requires": [
            "CM2.2",
            "CM2.4"
          ],
          "status": "available",
          "implementationId": "CM6.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "哈密顿方程与相轨道",
          "question": "相空间里的椭圆怎样包含完整运动信息？",
          "experiment": "调初始位置/动量及时间，显示谐振子相轨道、切向速度和能量。",
          "derivation": "q̇=∂H/∂p=p/m，ṗ=−∂H/∂q=−mω²q；解给相空间椭圆。",
          "acceptance": "H恒定，轨道方向符合方程；原点为静止平衡，不能给零振幅分配唯一相位。",
          "model": "自治理想谐振子；坐标轴分别m和kg·m/s，绘图比例不改变真实相空间面积。",
          "graduateTask": "推导线性流矩阵并核对它的辛条件及一个周期返回初态。",
          "id": "CM6.2",
          "requires": [
            "CM6.1"
          ],
          "status": "available",
          "implementationId": "CM6.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "单摆分离曲线与转动",
          "question": "同一个摆何时来回摆动，何时连续转圈？",
          "experiment": "调无量纲能量及初始角，显示角度—正则角动量相图和分离曲线。",
          "derivation": "H=pθ²/(2mL²)+mgL(1−cosθ)；分离能量E=2mgL。",
          "acceptance": "E<2mgL为振动，E>2mgL为转动；临界轨道接近顶点所需时间发散。",
          "model": "理想无阻尼摆，θ为rad、pθ为kg·m²/s；相空间角度周期识别，不把图边界当物理反射。",
          "graduateTask": "由能量积分比较振动/转动周期，解释分离曲线附近小步长仍需误差检查。",
          "id": "CM6.3",
          "requires": [
            "CM6.2"
          ],
          "status": "available",
          "implementationId": "CM6.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "刘维尔定理与相空间体积",
          "question": "一团轨道被拉长后，相空间面积是否减少？",
          "experiment": "切换自由漂移/谐振子流，调时间，比较同一初始点云的形状与面积。",
          "derivation": "div(q̇,ṗ)=∂q∂pH−∂p∂qH=0；线性流det M=1。",
          "acceptance": "形状可剪切或旋转而面积不变；自由漂移矩阵与谐振子矩阵均保持辛面积。",
          "model": "光滑哈密顿流；以精确线性映射表示点云，不将屏幕面积或构型空间面积混同相空间面积。",
          "graduateTask": "证明辛矩阵det=1并解释耗散阻尼为何违反此哈密顿体积守恒条件。",
          "id": "CM6.4",
          "requires": [
            "CM6.3"
          ],
          "status": "available",
          "implementationId": "CM6.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM7",
      "title": "正则变换、泊松括号与守恒量",
      "short": "辛结构与守恒",
      "question": "怎样换一组相空间坐标而保留运动方程的结构？",
      "outcome": "能计算泊松括号，核验正则变换，并用作用量—角变量与HJ方法重写可积运动。",
      "concepts": [
        "泊松括号",
        "辛条件",
        "作用量—角变量",
        "哈密顿—雅可比"
      ],
      "assumptions": "光滑有限维正则系统；线性缩放、谐振子和自由粒子为精确示范。",
      "misconception": "高维det=1不足以说明变换正则；J=0的角变量没有唯一意义。",
      "mastery": "核对辛条件及括号符号，独立恢复一条轨道，并说明坐标奇点的意义。",
      "transfer": "为银河系轨道的作用量方法提供语言；一般星系势未必全局可积。",
      "requires": [
        {
          "id": "CM6",
          "reason": "使用哈密顿流和正则变量。"
        }
      ],
      "recommended": [],
      "tools": [
        "CB2",
        "CB3"
      ],
      "readings": [
        [
          "mit",
          "第4章：Canonical Transformations, Hamilton-Jacobi Equations, and Action-Angle Variables"
        ],
        [
          "ttm",
          "第7–8讲：泊松括号"
        ]
      ],
      "lessons": [
        {
          "title": "泊松括号与守恒判据",
          "question": "不显含时间的函数一定守恒吗？",
          "experiment": "在低阶多项式F、G及谐振子H之间选择，调q、p，比较括号和沿轨道导数。",
          "derivation": "{F,G}=∂qF∂pG−∂pF∂qG；dF/dt={F,H}+∂tF。",
          "acceptance": "{q,p}=1、{F,F}=0；H自治时{H,H}=0，但一般q或p不守恒。",
          "model": "一对正则变量，函数光滑；括号量纲为[F][G]/[q p]，并非普遍无量纲。",
          "graduateTask": "验证Jacobi恒等式，并用角动量括号说明旋转生成元的代数。",
          "id": "CM7.1",
          "requires": [
            "CM6.2",
            "CM6.4"
          ],
          "status": "available",
          "implementationId": "CM7.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "正则变换与辛结构",
          "question": "保持图形外观的坐标缩放一定是正则的吗？",
          "experiment": "比较Q=a q、P=p/a与同向缩放，调a并显示Jacobian、括号和面积。",
          "derivation": "正则变换满足MᵀJM=J；一对变量时{Q,P}=det M=1。",
          "acceptance": "倒数缩放保持辛面积；同向缩放一般不正则；a=0变换不可逆。",
          "model": "常数无量纲a>0、线性变换；高维中单独det=1并不足以保证辛条件。",
          "graduateTask": "由第二类生成函数F₂=a qP求该变换，并正确变换哈密顿量。",
          "id": "CM7.2",
          "requires": [
            "CM7.1"
          ],
          "status": "available",
          "implementationId": "CM7.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "谐振子的作用量—角变量",
          "question": "椭圆运动怎样变成角变量的匀速转动？",
          "experiment": "调能量、频率及相位，比较相空间椭圆和J、φ。",
          "derivation": "J=(2π)⁻¹∮p dq=E/ω，H=ωJ；φ̇=∂H/∂J=ω。",
          "acceptance": "J在自治谐振子中恒定；φ每周期增长2π；J=0时角变量未定义。",
          "model": "J单位J·s、φ为rad；固定约定q=√(2J/(mω))sinφ、p=√(2mωJ)cosφ。",
          "graduateTask": "检验{φ,J}=1，并讨论缓慢变频时作用量绝热不变量的条件。",
          "id": "CM7.3",
          "requires": [
            "CM7.2"
          ],
          "status": "available",
          "implementationId": "CM7.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "哈密顿—雅可比方程",
          "question": "能把运动问题变成寻找一个函数吗？",
          "experiment": "调自由粒子的常量P、初始位置及时间，比较S、p、Q和真实轨迹。",
          "derivation": "S(q,P,t)=Pq−P²t/(2m)，∂tS+H(q,∂qS)=0；Q=∂PS=q−Pt/m。",
          "acceptance": "p=P守恒，q=Q+Pt/m；HJ方程残差为零，P=0给静止轨迹。",
          "model": "自由粒子完整积分；S为J·s、P为kg·m/s、Q为m；常量变换与物理加速不同。",
          "graduateTask": "把势能加上常数，检验S的时间项如何变化而轨迹保持不变。",
          "id": "CM7.4",
          "requires": [
            "CM7.3"
          ],
          "status": "available",
          "implementationId": "CM7.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    },
    {
      "id": "CM8",
      "title": "非线性动力学、稳定性与混沌",
      "short": "非线性与敏感性",
      "question": "线性化失效时，如何区分稳定、分岔、耗散及混沌证据？",
      "outcome": "能解释非线性稳定性、振幅频移、频闪采样与有限时间敏感性，并检验数值误差。",
      "concepts": [
        "非线性稳定",
        "分岔",
        "Poincaré截面",
        "有限时间增长"
      ],
      "assumptions": "区分保守连续流、耗散驱动系统和离散辛映射；有限数值证据不等于严格混沌证明。",
      "misconception": "势能最低点的稳定不等于吸引；两轨道分离也可能包含数值误差。",
      "mastery": "给出步长收敛及能量收支，说明采样、瞬态与有限时间诊断的边界。",
      "transfer": "为天体轨道共振和混沌提供工具；不从玩具模型直接推断真实星系混合率。",
      "requires": [
        {
          "id": "CM4",
          "reason": "使用局部稳定性、谐振子和驱动响应。"
        },
        {
          "id": "CM6",
          "reason": "用相空间和守恒结构区分模型。"
        }
      ],
      "recommended": [
        {
          "id": "CM7",
          "reason": "辛映射与作用量语言有助理解规则岛。"
        }
      ],
      "tools": [
        "CB2",
        "CB3",
        "CB4"
      ],
      "readings": [
        [
          "mit",
          "第7章：Chaos and Non-Linear Dynamics；具体四次势与标准映射为本项目示例"
        ]
      ],
      "lessons": [
        {
          "title": "非线性平衡与分岔",
          "question": "平衡点的数量怎样随一个参数改变？",
          "experiment": "调四次势V=a q²/2+b q⁴/4的a，比较平衡点、曲率与局部稳定性。",
          "derivation": "V′=q(a+bq²)=0；b>0时a<0有q=±√(−a/b)，a≥0仅q=0。",
          "acceptance": "a<0中心不稳定且两侧稳定；a=0时二阶曲率为零但四次势仍有稳定最低点。",
          "model": "保守一维势，b>0，q为m、a为N/m、b为N/m³；稳定不等于吸引。",
          "graduateTask": "比较加入阻尼前后的Lyapunov稳定和渐近稳定，解释势形分岔与吸引子分岔的区别。",
          "id": "CM8.1",
          "requires": [
            "CM4.1",
            "CM4.4",
            "CM6.3"
          ],
          "status": "available",
          "implementationId": "CM8.1",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "非谐振子与振幅相关周期",
          "question": "弹簧不完全线性时，周期为何随振幅变化？",
          "experiment": "调振幅和正四次势强度，对照周期积分与小非谐频移。",
          "derivation": "m q̈+kq+λq³=0；ε=λA²/k≪1时ω≈√(k/m)(1+3ε/8)。",
          "acceptance": "λ=0回到谐振子；硬化λ>0频率随A增加；列出近似相对误差而非掩盖失效。",
          "model": "m,k>0、λ≥0；q为m、λ为N/m³，周期积分在转向点采用去奇异替换。",
          "graduateTask": "推导Lindstedt一阶频移，并用独立周期积分检验余项随ε的阶次。",
          "id": "CM8.2",
          "requires": [
            "CM8.1"
          ],
          "status": "available",
          "implementationId": "CM8.2",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "驱动阻尼摆与频闪截面",
          "question": "周期驱动一定产生周期响应吗？",
          "experiment": "调无量纲阻尼、驱动幅度及频率，显示轨迹、能量收支和固定驱动相位采样。",
          "derivation": "θ″+cθ′+sinθ=f cos(ντ)，τ=t√(g/L)；de/dτ=fθ′cosντ−cθ′²。",
          "acceptance": "无驱动无阻尼极限能量守恒；驱动时核对输入−耗散−储能残差，比较步长减半结果。",
          "model": "有限时长确定性积分，τ,c,f,ν无量纲；注明步长、瞬态舍弃时长和采样相位，不把有限图证明为混沌。",
          "graduateTask": "比较不同初值和瞬态舍弃窗口的频闪点，并检查长期轨迹敏感性与数值误差。",
          "id": "CM8.3",
          "requires": [
            "CM8.2"
          ],
          "status": "available",
          "implementationId": "CM8.3",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        },
        {
          "title": "标准映射与有限时间敏感性",
          "question": "确定性映射为什么既有规则岛也有敏感轨道？",
          "experiment": "调K、初值及迭代次数，对照标准映射、邻近轨道和切向增长诊断。",
          "derivation": "pₙ₊₁=pₙ+K sin qₙ，qₙ₊₁=qₙ+pₙ₊₁ mod 2π；Jacobian行列式为1。",
          "acceptance": "K=0时p恒定且规则；有限迭代增长率依赖初值/时长，不能把K>0统称为全局混沌。",
          "model": "踢转子的无量纲离散模型；q为rad，p为缩放动量，计算保留未取模p的柱面约定。",
          "graduateTask": "推导切向映射及稳定岛附近局部条件，比较有限时间Lyapunov估计的收敛与适用限制。",
          "id": "CM8.4",
          "requires": [
            "CM8.3"
          ],
          "status": "available",
          "implementationId": "CM8.4",
          "implementationNote": "参数交互、图示、四步讲解、两道示范题及进阶自评；示范题完成不等于模块掌握。"
        }
      ]
    }
  ],
  "bridges": [
    {
      "id": "CB1",
      "title": "矢量与坐标",
      "check": "会点积、叉积、右手系和极坐标基矢；参考系、角度单位与符号必须先声明。"
    },
    {
      "id": "CB2",
      "title": "微积分与常微分方程",
      "check": "会链式法则、分部积分、Taylor展开与二阶方程；变分固定端点，近似给小参数。"
    },
    {
      "id": "CB3",
      "title": "线性代数与本征问题",
      "check": "会对称矩阵、二次型、本征值与线性流；正交须说明使用的质量度量。"
    },
    {
      "id": "CB4",
      "title": "数值误差与采样",
      "check": "能比较步长减半、守恒残差及相同采样相位；有限时间图形不当作严格证明。"
    }
  ],
  "route": [
    "CM1",
    "CM2",
    "CM3",
    "CM4",
    "CM5",
    "CM6",
    "CM7",
    "CM8"
  ],
  "routeNote": "CM2后，CM3、CM4、CM6可分支学习；CM5只要求CM1，建议先学CM4；CM7接CM6，CM8要求CM4与CM6，CM7为建议。所有关卡开放，先修不构成锁定或掌握证据。",
  "rubric": [
    "预测：操作前写出方向、比例或可检验的守恒判断。",
    "解释：区分真实力、惯性力、坐标变化和物理演化，声明单位与约束。",
    "推导：独立补全关键一步，核对量纲、端点和守恒；数值模型给收敛与残差。",
    "迁移：更换约束、初态或参数后重新检查近似；解释与迁移为自评，不自动计分。"
  ],
  "teachingApproach": "8章32关沿用问题导入、物理图景、列式理由、关键一步、极限检验及进阶自评。公开课程用于主题定位，正文为本项目原创；交互示范和两题完成不替代完整研究生课程、综合考试或模块掌握验收。",
  "conventions": "非相对论经典力学，内部SI；显示角度若用deg须转换为rad。功W由力沿位移积分，力F=−∇V；泊松括号{F,G}=Σ(∂qF∂pG−∂pF∂qG)。转动使用右手系；CM3交互使用测试粒子比量：γ=GM [m³/s²]、h=L/m [m²/s]、ε=E/m [J/kg]。一般两体用μ_red=m₁m₂/(m₁+m₂) [kg]，γ=κ/μ_red=G(m₁+m₂)、h=ℓ/μ_red、ε=E/μ_red；γ与约化质量不得混用。连续解析解、局部线性化、数值积分及离散映射分别注明，有限迭代敏感性不作严格混沌证明。",
  "sources": [
    {
      "id": "mit",
      "title": "MIT OpenCourseWare · 8.09 Classical Mechanics III（2014）",
      "url": "https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/",
      "use": "已核查公开讲义目录中分析力学、刚体、振动、正则变换与非线性动力学的主题及章号。只作主题和阅读定位，未逐页核读讲义，不声称原课采用本地图顺序；具体示例与中文释义由本项目编写。"
    },
    {
      "id": "ttm",
      "title": "Susskind · The Theoretical Minimum：Classical Mechanics（2011年秋季）",
      "url": "https://theoreticalminimum.com/courses/classical-mechanics/2011/fall",
      "use": "已核查公开的10讲标题及简介；第2–8讲用于牛顿、拉格朗日、哈密顿、对称性和泊松括号的概念导入。未逐段观看，不宣称覆盖全部轨道、刚体或混沌专题。"
    }
  ]
};
});
