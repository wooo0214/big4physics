/* Original definitions and caveats; public course catalogues supply reading anchors.
 * SI units and coordinate-dependent canonical units are stated per term.
 */
(function(root,factory){const data=factory();if(typeof module==='object'&&module.exports)module.exports=data;root.MechanicsGlossary=data;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return {
  "version": "0.1",
  "updated": "2026-10-28",
  "sources": {
    "mit": {
      "title": "MIT OpenCourseWare · 8.09 Classical Mechanics III（2014）公开讲义目录",
      "url": "https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/pages/lecture-notes/"
    },
    "ttm": {
      "title": "The Theoretical Minimum · Classical Mechanics（2011年秋季）",
      "url": "https://theoreticalminimum.com/courses/classical-mechanics/2011/fall"
    }
  },
  "scope": "已核查MIT8.09公开讲义目录和The Theoretical Minimum 2011课程标题与简介，用于主题定位；未逐页核读正文、未逐段观看视频。中文名称、英文对照、释义与易混点由本项目整理，不冒充某译本逐字措辞；未单列的概念是相关主题拓展，不虚构页码。",
  "conventions": "非相对论经典力学，内部SI；显示deg时换算为rad。泊松括号{F,G}=Σ(FqGp−FpGq)。作用量变量J与结构矩阵J由上下文区分。q/p的单位随所用坐标变化；CM3当前交互为测试粒子γ=GM [m³/s²]、h=L/m [m²/s]、ε=E/m [J/kg]；一般两体γ=κ/μ_red=G(m₁+m₂)、h=ℓ/μ_red、ε=E/μ_red，μ_red为kg；CM2.2保留mechanics记录。查词不计XP、不代表模块掌握。",
  "modules": [
    {
      "id": "CM1",
      "title": "受力与参考系",
      "readings": [
        [
          "mit",
          "第1章分析力学及第2章旋转坐标主题"
        ]
      ],
      "terms": [
        {
          "zh": "牛顿第二定律",
          "en": "Newton’s Second Law",
          "symbol": "F合=m a；N",
          "definition": "在惯性系中，质点合外力等于质量乘加速度。",
          "caveat": "先选研究对象和参考系；恒速运动的合力可以为零。",
          "lessons": [
            "CM1.1"
          ]
        },
        {
          "zh": "约束反力",
          "en": "Constraint Reaction",
          "symbol": "N；N",
          "definition": "维持指定几何约束所需的接触力。",
          "caveat": "理想约束可不做虚功，但反力本身不必为零。",
          "lessons": [
            "CM1.1"
          ]
        },
        {
          "zh": "支持力",
          "en": "Normal Force",
          "symbol": "N≥0；N",
          "definition": "光滑接触表面对物体施加的法向推力。",
          "caveat": "N<0的形式解表示接触假设失效，不能解释为表面拉住物体。",
          "lessons": [
            "CM1.1",
            "CM1.3"
          ]
        },
        {
          "zh": "径向加速度",
          "en": "Radial Acceleration",
          "symbol": "aᵣ=r̈−rφ̇²；m/s²",
          "definition": "极坐标中沿瞬时径向基矢的加速度分量。",
          "caveat": "匀速圆周的径向分量非零；负号表示向中心。",
          "lessons": [
            "CM1.2"
          ]
        },
        {
          "zh": "切向加速度",
          "en": "Transverse Acceleration",
          "symbol": "aφ=rφ̈+2ṙφ̇；m/s²",
          "definition": "极坐标中沿瞬时方位基矢的加速度分量。",
          "caveat": "半径变化时不能漏掉2ṙφ̇；固定半径示范不代表一般公式。",
          "lessons": [
            "CM1.2"
          ]
        },
        {
          "zh": "惯性参考系",
          "en": "Inertial Frame",
          "symbol": "无额外惯性力",
          "definition": "自由质点作匀速直线运动的参考系。",
          "caveat": "转动或加速的参考系通常需要加入惯性力才能沿用相对运动形式。",
          "lessons": [
            "CM1.1",
            "CM1.3",
            "CM1.4"
          ]
        },
        {
          "zh": "视重",
          "en": "Apparent Weight",
          "symbol": "本关N=m(g+a)；N",
          "definition": "体重计通过接触力给出的读数。",
          "caveat": "电梯向上运动不保证增重；判断量是加速度。",
          "lessons": [
            "CM1.3"
          ]
        },
        {
          "zh": "平移惯性力",
          "en": "Translational Inertial Force",
          "symbol": "F惯=−m a系；N",
          "definition": "在平移加速参考系中引入的等效力项。",
          "caveat": "它来自参考系选择，不能遗漏真实作用力或重复计入。",
          "lessons": [
            "CM1.3"
          ]
        },
        {
          "zh": "离心力",
          "en": "Centrifugal Force",
          "symbol": "−mΩ×(Ω×r)；N",
          "definition": "恒定旋转系中与位置有关的惯性力。",
          "caveat": "不需要相对速度；沿旋转轴方向的位移不产生该项。",
          "lessons": [
            "CM1.4"
          ]
        },
        {
          "zh": "科里奥利力",
          "en": "Coriolis Force",
          "symbol": "−2mΩ×v相对；N",
          "definition": "旋转系中由相对速度产生的惯性力。",
          "caveat": "与相对速度垂直，因此本项不对相对运动做功；不是离心力。",
          "lessons": [
            "CM1.4"
          ]
        }
      ]
    },
    {
      "id": "CM2",
      "title": "坐标、作用量与对称",
      "readings": [
        [
          "mit",
          "第1章：变分、约束、Lagrange与Hamilton主题"
        ]
      ],
      "terms": [
        {
          "zh": "广义坐标",
          "en": "Generalized Coordinate",
          "symbol": "qᵢ；单位视坐标而定",
          "definition": "描述约束后独立构型所需的坐标。",
          "caveat": "可为长度或角度，不能假定所有qᵢ单位相同。",
          "lessons": [
            "CM2.1",
            "CM2.2",
            "CM2.4"
          ]
        },
        {
          "zh": "完整约束",
          "en": "Holonomic Constraint",
          "symbol": "f(q,t)=0",
          "definition": "可以写为坐标和时间之间关系的约束。",
          "caveat": "可含时间；本关固定光滑斜面只是定常完整约束的一例。",
          "lessons": [
            "CM2.1"
          ]
        },
        {
          "zh": "虚位移",
          "en": "Virtual Displacement",
          "symbol": "δq；与q同单位",
          "definition": "固定时刻、满足约束的相邻可能构型之差。",
          "caveat": "不是实际经过一小段时间的运动位移。",
          "lessons": [
            "CM2.1",
            "CM2.3"
          ]
        },
        {
          "zh": "广义力",
          "en": "Generalized Force",
          "symbol": "δW=ΣQᵢδqᵢ",
          "definition": "通过虚功定义的力在广义坐标上的分量。",
          "caveat": "角坐标对应广义力通常为力矩；不总是N。",
          "lessons": [
            "CM2.1"
          ]
        },
        {
          "zh": "拉格朗日量",
          "en": "Lagrangian",
          "symbol": "L=T−V；J",
          "definition": "本课程自然力学系统中用于生成运动方程的函数。",
          "caveat": "一般可添加全时间导数而不改变固定端点运动方程。",
          "lessons": [
            "CM2.1",
            "CM2.2",
            "CM2.3",
            "CM2.4"
          ]
        },
        {
          "zh": "欧拉—拉格朗日方程",
          "en": "Euler–Lagrange Equation",
          "symbol": "d(∂L/∂q̇)/dt−∂L/∂q=0",
          "definition": "作用量对合法路径变分驻定时满足的方程。",
          "caveat": "非理想约束和非保守广义力需相应补充。",
          "lessons": [
            "CM2.1",
            "CM2.2",
            "CM2.3",
            "CM2.4"
          ]
        },
        {
          "zh": "小角近似",
          "en": "Small-angle Approximation",
          "symbol": "sinθ≈θ；θ为rad",
          "definition": "当摆角绝对值很小时将单摆方程线性化。",
          "caveat": "deg数值必须先转rad；有限振幅精确周期仍依赖振幅。",
          "lessons": [
            "CM2.2"
          ]
        },
        {
          "zh": "完全椭圆积分",
          "en": "Complete Elliptic Integral",
          "symbol": "K(k)=∫₀^(π/2)(1−k²sin²u)⁻¹ᐟ²du",
          "definition": "给出理想单摆有限振幅周期的特殊函数。",
          "caveat": "本关k=sin(θ₀/2)；有些软件使用参数m=k²，不能混用。",
          "lessons": [
            "CM2.2"
          ]
        },
        {
          "zh": "驻定作用量",
          "en": "Stationary Action",
          "symbol": "S=∫Ldt；J·s",
          "definition": "真实路径在固定端点变分下使作用量的一阶变化为零。",
          "caveat": "驻定可以是局部最小、最大或鞍点，不能一概叫最小。",
          "lessons": [
            "CM2.3"
          ]
        },
        {
          "zh": "循环坐标",
          "en": "Cyclic Coordinate",
          "symbol": "∂L/∂qᵢ=0",
          "definition": "不显式出现在拉格朗日量中的广义坐标。",
          "caveat": "对应正则动量守恒；不表示该坐标的速度必定恒定。",
          "lessons": [
            "CM2.4"
          ]
        }
      ]
    },
    {
      "id": "CM3",
      "title": "轨道与散射",
      "readings": [
        [
          "mit",
          "第4章Kepler主题；基本二体量由本项目补充"
        ]
      ],
      "terms": [
        {
          "zh": "约化质量",
          "en": "Reduced Mass",
          "symbol": "μ_red=m₁m₂/(m₁+m₂)；kg",
          "definition": "把两体相对运动写为一体形式时出现的惯性质量。",
          "caveat": "当前交互使用测试粒子γ=GM [m³/s²]，不是μ_red；一般两体γ=κ/μ_red=G(m₁+m₂)，h=ℓ/μ_red，ε=E/μ_red。相对间距也不是任一物体的质心轨道半径。",
          "lessons": [
            "CM3.1",
            "CM3.2",
            "CM3.3",
            "CM3.4"
          ]
        },
        {
          "zh": "中心力",
          "en": "Central Force",
          "symbol": "F=F(r)eᵣ；N",
          "definition": "方向沿两体连线、大小只依赖间距的力。",
          "caveat": "当前测试粒子比力为−γ eᵣ/r²，γ=GM [m³/s²]；一般两体γ=G(m₁+m₂)。任意中心力轨道并非全部闭合。",
          "lessons": [
            "CM3.1",
            "CM3.2"
          ]
        },
        {
          "zh": "有效势",
          "en": "Effective Potential",
          "symbol": "v有效=h²/(2r²)−γ/r；J/kg",
          "definition": "把角向运动的离心项并入径向比能量方程的比有效势。",
          "caveat": "当前测试粒子取γ=GM、h=L/m，能量轴为J/kg；一般两体V有效=μ_red v有效。它不是额外真实相互作用，也不能与总能量J直接比较。",
          "lessons": [
            "CM3.1"
          ]
        },
        {
          "zh": "转向点",
          "en": "Turning Point",
          "symbol": "ε=v有效(r)；ε：J/kg，r：m",
          "definition": "径向速度为零、径向运动可能反向的位置。",
          "caveat": "当前用测试粒子比能量ε判别，普通能量E须先除以m；一般两体除以μ_red。双根可对应圆轨道，不能都画成普通往返端点。",
          "lessons": [
            "CM3.1"
          ]
        },
        {
          "zh": "圆轨道稳定性",
          "en": "Circular-orbit Stability",
          "symbol": "v有效′=0，v有效″>0；r꜀=h²/γ",
          "definition": "径向小扰动下仍停留在圆轨道附近的性质。",
          "caveat": "当前测试粒子γ=GM、h为m²/s；只作局部径向稳定判别，未包含多体或非球对称扰动。一般两体使用转换后的同一比有效势。",
          "lessons": [
            "CM3.1"
          ]
        },
        {
          "zh": "偏心率",
          "en": "Eccentricity",
          "symbol": "e²=1+2εh²/γ²；无量纲",
          "definition": "描述Kepler圆锥轨道形状并连接能量与角动量的参数。",
          "caveat": "当前测试粒子以γ=GM、比能量ε [J/kg]和比角动量h [m²/s]计算；一般两体先作比量转换。e=1为抛物阈值，半长轴公式不能在此除零。",
          "lessons": [
            "CM3.2"
          ]
        },
        {
          "zh": "半通径",
          "en": "Semi-latus Rectum",
          "symbol": "p=h²/γ；m",
          "definition": "圆锥轨道r=p/(1+e cosφ)中的长度尺度。",
          "caveat": "当前测试粒子γ=GM；一般两体p=ℓ²/(μ_redκ)=h²/γ。p不是半长轴，椭圆中p=a(1−e²)。",
          "lessons": [
            "CM3.2"
          ]
        },
        {
          "zh": "面积速度",
          "en": "Areal Velocity",
          "symbol": "dA/dt=h/2=ℓ/(2μ_red)；m²/s",
          "definition": "相对位置矢量在单位时间内扫过的有向面积。",
          "caveat": "当前测试粒子h=L/m，图按真近点角采样；一般两体h=ℓ/μ_red。面积速度恒定不等于角速度恒定或图上均匀时间采样。",
          "lessons": [
            "CM3.3"
          ]
        },
        {
          "zh": "开普勒第三定律",
          "en": "Kepler’s Third Law",
          "symbol": "T²/a³=4π²/γ；γ：m³/s²",
          "definition": "牛顿两体椭圆轨道的周期与半长轴关系。",
          "caveat": "当前测试粒子绕固定中心，γ=GM；一般两体γ=G(m₁+m₂)，a为相对椭圆半长轴。γ不是约化质量μ_red [kg]。",
          "lessons": [
            "CM3.3"
          ]
        },
        {
          "zh": "引力散射偏角",
          "en": "Gravitational Deflection Angle",
          "symbol": "χ=2atan[γ/(b v∞²)]；rad",
          "definition": "无耗散双曲飞掠前后渐近速度方向之间的偏转角。",
          "caveat": "当前测试粒子γ=GM，h=bv∞、ε=v∞²/2；一般两体相对散射γ=G(m₁+m₂)。b>0、v∞>0，b→0极限不解决碰撞奇点。",
          "lessons": [
            "CM3.4"
          ]
        }
      ]
    },
    {
      "id": "CM4",
      "title": "线性化与模叠加",
      "readings": [
        [
          "mit",
          "第3章：振动与简正坐标"
        ]
      ],
      "terms": [
        {
          "zh": "平衡点",
          "en": "Equilibrium Point",
          "symbol": "V′(q₀)=0",
          "definition": "在零速度下净力为零的构型。",
          "caveat": "平衡不必稳定；二阶项为零需继续分析。",
          "lessons": [
            "CM4.1"
          ]
        },
        {
          "zh": "势曲率",
          "en": "Potential Curvature",
          "symbol": "V″(q₀)；N/m",
          "definition": "局部势能二阶变化的系数。",
          "caveat": "正负控制线性稳定性，零值不能直接给出非线性结论。",
          "lessons": [
            "CM4.1"
          ]
        },
        {
          "zh": "线性化",
          "en": "Linearization",
          "symbol": "δq̈=−(V″/m)δq",
          "definition": "保留平衡点附近运动方程的一阶扰动项。",
          "caveat": "仅适用于足够小的扰动，不能外推至任意振幅。",
          "lessons": [
            "CM4.1",
            "CM4.2"
          ]
        },
        {
          "zh": "简正模",
          "en": "Normal Mode",
          "symbol": "q=u cos(ωt+φ)",
          "definition": "耦合线性系统中各坐标以共同频率、固定相对比例运动的模式。",
          "caveat": "一般本征问题为Ku=ω²Mu，正交性使用质量度量。",
          "lessons": [
            "CM4.2"
          ]
        },
        {
          "zh": "本征频率",
          "en": "Eigenfrequency",
          "symbol": "ω²为M⁻¹K本征值；s⁻²",
          "definition": "无驱动自由线性运动允许的固有角频率。",
          "caveat": "角频率ω与普通频率f相差2π。",
          "lessons": [
            "CM4.2"
          ]
        },
        {
          "zh": "模叠加",
          "en": "Modal Superposition",
          "symbol": "q=ΣuₖQₖ",
          "definition": "将线性系统一般运动展开为独立简正模之和。",
          "caveat": "仅在线性模型中严格成立；非线性耦合可交换模能量。",
          "lessons": [
            "CM4.2",
            "CM4.3"
          ]
        },
        {
          "zh": "拍频",
          "en": "Beat Frequency",
          "symbol": "Δω=∣ω₁−ω₂∣；rad/s",
          "definition": "相近频率叠加时形成的慢包络相关频率。",
          "caveat": "包络符号周期、包络绝对值周期和能量交换周期应明确区分。",
          "lessons": [
            "CM4.3"
          ]
        },
        {
          "zh": "耦合势能",
          "en": "Coupling Potential Energy",
          "symbol": "κ(x₁−x₂)²/2；J",
          "definition": "连接两振子的耦合弹簧储存的能量。",
          "caveat": "不能在总能量账目中漏算；给单体分配时必须说明约定。",
          "lessons": [
            "CM4.3"
          ]
        },
        {
          "zh": "稳态响应",
          "en": "Steady-state Response",
          "symbol": "x=A cos(Ωt−δ)；m",
          "definition": "阻尼使瞬态衰减后，由周期驱动维持的响应。",
          "caveat": "零阻尼精确共振没有有限振幅的这种稳态。",
          "lessons": [
            "CM4.4"
          ]
        },
        {
          "zh": "共振与平均功率",
          "en": "Resonance and Mean Power",
          "symbol": "⟨P⟩=bΩ²A²/2；W",
          "definition": "驱动频率改变时，振幅或吸收功率出现峰值的行为。",
          "caveat": "振幅峰与功率峰通常不同；没有峰值时不能硬称振幅共振。",
          "lessons": [
            "CM4.4"
          ]
        }
      ]
    },
    {
      "id": "CM5",
      "title": "刚体与主轴",
      "readings": [
        [
          "mit",
          "第2章：惯量、Euler方程、对称陀螺"
        ]
      ],
      "terms": [
        {
          "zh": "惯量张量",
          "en": "Moment-of-inertia Tensor",
          "symbol": "Iᵢⱼ；kg·m²",
          "definition": "把角速度映射到角动量的对称二阶张量。",
          "caveat": "须说明参考点；不能把三维刚体总用单个标量I替代。",
          "lessons": [
            "CM5.1",
            "CM5.2"
          ]
        },
        {
          "zh": "主轴",
          "en": "Principal Axis",
          "symbol": "Iu=I主u",
          "definition": "惯量张量的本征方向。",
          "caveat": "主值简并时主轴方向不唯一；它不是新的物理不确定性。",
          "lessons": [
            "CM5.1",
            "CM5.2",
            "CM5.3"
          ]
        },
        {
          "zh": "平行轴定理",
          "en": "Parallel-axis Theorem",
          "symbol": "I轴=I质心平行轴+Md²",
          "definition": "连接过质心轴与平行偏置轴转动惯量的关系。",
          "caveat": "d是两平行轴的垂直距离，不能取任意坐标间距。",
          "lessons": [
            "CM5.1"
          ]
        },
        {
          "zh": "角速度",
          "en": "Angular Velocity",
          "symbol": "ω；rad/s",
          "definition": "描述刚体瞬时转动速率与轴向的矢量。",
          "caveat": "其方向一般不等于角动量方向。",
          "lessons": [
            "CM5.2"
          ]
        },
        {
          "zh": "刚体角动量",
          "en": "Rigid-body Angular Momentum",
          "symbol": "L=Iω；kg·m²/s",
          "definition": "相对于指定参考点的转动角动量。",
          "caveat": "L与ω平行需要沿主轴或惯量各向同性等条件。",
          "lessons": [
            "CM5.2",
            "CM5.3"
          ]
        },
        {
          "zh": "转动动能",
          "en": "Rotational Kinetic Energy",
          "symbol": "T=ω·Iω/2；J",
          "definition": "刚体相对指定固定点的纯转动动能。",
          "caveat": "同时平动时需按质心分解加入平动项，不能漏项。",
          "lessons": [
            "CM5.2"
          ]
        },
        {
          "zh": "欧拉刚体方程",
          "en": "Euler’s Rigid-body Equations",
          "symbol": "I₁ω̇₁+(I₃−I₂)ω₂ω₃=τ₁",
          "definition": "在随体主轴系中描述角速度演化的方程。",
          "caveat": "无外矩时L在惯性系守恒，随体系分量却可变化。",
          "lessons": [
            "CM5.3"
          ]
        },
        {
          "zh": "中间轴不稳定性",
          "en": "Intermediate-axis Instability",
          "symbol": "λ²=Ω²(I₂−I₁)(I₃−I₂)/(I₁I₃)",
          "definition": "无矩非简并刚体绕中间主惯量轴旋转时的小扰动增长。",
          "caveat": "本关为局部线性结论；不能把增长解外推成完整翻转轨迹。",
          "lessons": [
            "CM5.3"
          ]
        },
        {
          "zh": "进动",
          "en": "Precession",
          "symbol": "Ωₚ；rad/s",
          "definition": "自转轴或角动量方向绕另一轴的缓慢转动。",
          "caveat": "进动不等于自转；力矩改变方向的同时也须检查近似。",
          "lessons": [
            "CM5.4"
          ]
        },
        {
          "zh": "慢进动近似",
          "en": "Slow-precession Approximation",
          "symbol": "Ωₚ≈mgl/L自转",
          "definition": "快速自转对称陀螺在合适条件下的进动率估计。",
          "caveat": "需自转角动量主导且进动慢；忽略章动不是普遍精确解。",
          "lessons": [
            "CM5.4"
          ]
        }
      ]
    },
    {
      "id": "CM6",
      "title": "相空间与演化",
      "readings": [
        [
          "mit",
          "第1章Hamilton主题及第4章辛结构"
        ]
      ],
      "terms": [
        {
          "zh": "正则动量",
          "en": "Canonical Momentum",
          "symbol": "p=∂L/∂q̇",
          "definition": "与指定广义坐标共轭、由拉格朗日量定义的动量。",
          "caveat": "角坐标的共轭动量单位为角动量；速度相关势下也未必等于mv。",
          "lessons": [
            "CM6.1",
            "CM6.2",
            "CM6.3"
          ]
        },
        {
          "zh": "勒让德变换",
          "en": "Legendre Transform",
          "symbol": "H=Σpᵢq̇ᵢ−L；J",
          "definition": "在可逆条件下用动量替代速度作为独立变量的变换。",
          "caveat": "速度Hessian退化时不能直接用常规逆变换。",
          "lessons": [
            "CM6.1"
          ]
        },
        {
          "zh": "哈密顿量",
          "en": "Hamiltonian",
          "symbol": "H(q,p,t)；J",
          "definition": "生成正则变量时间演化的函数。",
          "caveat": "本自治自然系统H等于机械能，但这不是所有坐标与相互作用下的通则。",
          "lessons": [
            "CM6.1",
            "CM6.2",
            "CM6.3",
            "CM6.4"
          ]
        },
        {
          "zh": "哈密顿方程",
          "en": "Hamilton’s Equations",
          "symbol": "q̇=∂pH，ṗ=−∂qH",
          "definition": "正则相空间中的一阶运动方程组。",
          "caveat": "负号与所用泊松括号约定必须一致。",
          "lessons": [
            "CM6.2",
            "CM6.3"
          ]
        },
        {
          "zh": "相空间",
          "en": "Phase Space",
          "symbol": "(q,p)；各轴单位不同",
          "definition": "以全部广义坐标及共轭动量描述瞬时状态的空间。",
          "caveat": "相空间轨迹不是实际空间轨迹；屏幕等比例不表示两轴量纲相同。",
          "lessons": [
            "CM6.2",
            "CM6.3",
            "CM6.4"
          ]
        },
        {
          "zh": "相轨道",
          "en": "Phase Trajectory",
          "symbol": "H(q,p)=E",
          "definition": "状态随时间在相空间中经过的曲线。",
          "caveat": "同一能量曲线还需方向与时间参数才能描述运动。",
          "lessons": [
            "CM6.2",
            "CM6.3"
          ]
        },
        {
          "zh": "分离曲线",
          "en": "Separatrix",
          "symbol": "单摆E=2mgL",
          "definition": "把不同运动类型的区域隔开的临界相轨道。",
          "caveat": "接近不稳定顶点需无限时间，不能用有限周期公式跨过临界点。",
          "lessons": [
            "CM6.3"
          ]
        },
        {
          "zh": "哈密顿流",
          "en": "Hamiltonian Flow",
          "symbol": "z(t)=Φₜ(z₀)",
          "definition": "由哈密顿方程将初始状态映射到随后状态的演化。",
          "caveat": "变换坐标与实际时间演化概念不同，即使二者都可为正则映射。",
          "lessons": [
            "CM6.2",
            "CM6.4"
          ]
        },
        {
          "zh": "刘维尔定理",
          "en": "Liouville’s Theorem",
          "symbol": "div(q̇,ṗ)=0",
          "definition": "光滑哈密顿演化保持正则相空间体积的性质。",
          "caveat": "阻尼耗散流通常不满足；构型空间体积可以变化。",
          "lessons": [
            "CM6.4"
          ]
        },
        {
          "zh": "辛面积",
          "en": "Symplectic Area",
          "symbol": "∮p dq；J·s",
          "definition": "一对正则变量中由坐标—动量面积表示的不变量。",
          "caveat": "画布像素面积和构型空间面积不是该物理量。",
          "lessons": [
            "CM6.4"
          ]
        }
      ]
    },
    {
      "id": "CM7",
      "title": "辛结构与守恒",
      "readings": [
        [
          "mit",
          "第4章：正则变换、泊松括号、HJ、作用角"
        ]
      ],
      "terms": [
        {
          "zh": "泊松括号",
          "en": "Poisson Bracket",
          "symbol": "{F,G}=FqGp−FpGq",
          "definition": "表示相空间函数之间辛结构和生成关系的双线性运算。",
          "caveat": "符号约定固定后{q,p}=1；单位随F和G而定。",
          "lessons": [
            "CM7.1"
          ]
        },
        {
          "zh": "守恒量判据",
          "en": "Conservation Criterion",
          "symbol": "dF/dt={F,H}+∂tF=0",
          "definition": "判断一个函数沿实际运动是否保持不变的条件。",
          "caveat": "不显含时间还不够；某个特殊点的导数为零也不保证全局守恒。",
          "lessons": [
            "CM7.1"
          ]
        },
        {
          "zh": "正则变换",
          "en": "Canonical Transformation",
          "symbol": "{Q,P}=1",
          "definition": "保持正则辛结构、并可相应重写哈密顿方程的坐标变换。",
          "caveat": "一对变量时面积条件足够；高维单看行列式为1并不充分。",
          "lessons": [
            "CM7.2"
          ]
        },
        {
          "zh": "辛矩阵",
          "en": "Symplectic Matrix",
          "symbol": "MᵀJM=J",
          "definition": "保持给定标准辛形式的实可逆线性变换矩阵。",
          "caveat": "J在此为结构矩阵，不是作用量变量；由上下文区分。",
          "lessons": [
            "CM7.2"
          ]
        },
        {
          "zh": "生成函数",
          "en": "Generating Function",
          "symbol": "F₂(q,P,t)；J·s",
          "definition": "通过偏导建立旧变量与新正则变量关系的函数。",
          "caveat": "须指定所用类型；含时变换还会改变哈密顿量。",
          "lessons": [
            "CM7.2",
            "CM7.4"
          ]
        },
        {
          "zh": "作用量变量",
          "en": "Action Variable",
          "symbol": "J=(2π)⁻¹∮p dq；J·s",
          "definition": "对一周期闭合轨道的正则环积分除以2π得到的变量。",
          "caveat": "不是S=∫Ldt；不同资料可能采用不除2π的约定。",
          "lessons": [
            "CM7.3"
          ]
        },
        {
          "zh": "角变量",
          "en": "Angle Variable",
          "symbol": "φ；rad，{φ,J}=1",
          "definition": "与作用量共轭、在可积运动中随时间推进的相位坐标。",
          "caveat": "J=0时相位不唯一；本关约定q∝sinφ、p∝cosφ。",
          "lessons": [
            "CM7.3"
          ]
        },
        {
          "zh": "可积系统",
          "en": "Integrable System",
          "symbol": "n自由度有n个独立对合积分",
          "definition": "在适当条件下可用足够多彼此泊松对易积分组织运动的系统。",
          "caveat": "局部变量存在不等于整个相空间都有无奇点的全局作用角坐标。",
          "lessons": [
            "CM7.3"
          ]
        },
        {
          "zh": "哈密顿主函数",
          "en": "Hamilton’s Principal Function",
          "symbol": "S(q,P,t)；J·s",
          "definition": "满足HJ方程并生成新常量变量的作用量型函数。",
          "caveat": "可依赖所选常量标签和分支；不能把S误当势能。",
          "lessons": [
            "CM7.4"
          ]
        },
        {
          "zh": "哈密顿—雅可比方程",
          "en": "Hamilton–Jacobi Equation",
          "symbol": "∂tS+H(q,∂qS,t)=0",
          "definition": "把哈密顿运动方程改写为主函数满足的偏微分方程。",
          "caveat": "有解还需足够独立常量才能恢复一般运动；本关自由粒子是精确例子。",
          "lessons": [
            "CM7.4"
          ]
        }
      ]
    },
    {
      "id": "CM8",
      "title": "非线性与敏感性",
      "readings": [
        [
          "mit",
          "第7章：非线性、稳定性与映射；具体示例为本项目选择"
        ]
      ],
      "terms": [
        {
          "zh": "非线性稳定性",
          "en": "Nonlinear Stability",
          "symbol": "V有严格局部最低点",
          "definition": "允许保留高阶项后，附近小初始扰动仍保持在附近的性质。",
          "caveat": "保守体系的稳定不等于轨道渐近吸引到平衡点。",
          "lessons": [
            "CM8.1"
          ]
        },
        {
          "zh": "分岔",
          "en": "Bifurcation",
          "symbol": "控制参数a",
          "definition": "随参数变化，平衡点或运动结构发生定性改变的现象。",
          "caveat": "一维势形的改变不自动等同耗散吸引子的分岔。",
          "lessons": [
            "CM8.1"
          ]
        },
        {
          "zh": "非谐振子",
          "en": "Anharmonic Oscillator",
          "symbol": "m q̈+kq+λq³=0",
          "definition": "回复力含非线性项、振动频率可随振幅变化的系统。",
          "caveat": "本关限硬化λ≥0；软化情形需重新检查有界运动范围。",
          "lessons": [
            "CM8.2"
          ]
        },
        {
          "zh": "微扰小参数",
          "en": "Perturbation Parameter",
          "symbol": "ε=λA²/k；无量纲",
          "definition": "衡量四次势修正相对谐振项大小的比值。",
          "caveat": "ε不小就不能继续把一阶频移当准确结果。",
          "lessons": [
            "CM8.2"
          ]
        },
        {
          "zh": "驱动阻尼摆",
          "en": "Driven Damped Pendulum",
          "symbol": "θ″+cθ′+sinθ=f cosντ",
          "definition": "同时具有非线性回复、耗散和外部周期输入的摆模型。",
          "caveat": "非自治耗散系统不能套封闭哈密顿流的面积守恒。",
          "lessons": [
            "CM8.3"
          ]
        },
        {
          "zh": "频闪截面",
          "en": "Stroboscopic Section",
          "symbol": "τₙ=τ₀+2πn/ν",
          "definition": "在相同外驱相位反复采样状态形成的离散集合。",
          "caveat": "须注明瞬态舍弃与采样相位；有限点数的形状不能单独严格证明混沌。",
          "lessons": [
            "CM8.3"
          ]
        },
        {
          "zh": "瞬态",
          "en": "Transient",
          "symbol": "舍弃时间τ去；无量纲",
          "definition": "系统尚未表现长期响应之前依赖初态的过渡过程。",
          "caveat": "任意指定一个短舍弃窗口不保证已经收敛到稳态。",
          "lessons": [
            "CM8.3"
          ]
        },
        {
          "zh": "标准映射",
          "en": "Standard Map",
          "symbol": "p′=p+Ksin q，q′=q+p′",
          "definition": "周期踢转子的离散辛映射，用于比较规则与敏感运动。",
          "caveat": "本关q取模2π、p保留未取模柱面值；K>0不表示处处混沌。",
          "lessons": [
            "CM8.4"
          ]
        },
        {
          "zh": "有限时间Lyapunov估计",
          "en": "Finite-time Lyapunov Estimate",
          "symbol": "λN=(1/N)Σln伸长率；每次迭代",
          "definition": "由有限次数切向演化估计平均扰动伸长的诊断量。",
          "caveat": "依赖初值、时长与数值方法；有限正值不等于严格证明渐近正指数。",
          "lessons": [
            "CM8.4"
          ]
        },
        {
          "zh": "收敛与守恒残差",
          "en": "Convergence and Conservation Residual",
          "symbol": "步长h；能量残差Δe",
          "definition": "用细化步长和独立收支检验数值结果可信范围的方法。",
          "caveat": "混沌轨道的逐点差会放大；须同时比较统计量、采样和残差。",
          "lessons": [
            "CM8.2",
            "CM8.3",
            "CM8.4"
          ]
        }
      ]
    }
  ]
};
});
