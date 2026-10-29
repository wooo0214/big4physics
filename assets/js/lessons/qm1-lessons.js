/* QM1: original teaching text; stable IDs and shared two-question UI. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM1Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "mapId": "QM1.1",
    "id": "quantum",
    "short": "量子力学",
    "controls": [
      {
        "id": "n",
        "label": "量子数 n",
        "min": 1,
        "max": 5,
        "step": 1,
        "value": 2,
        "unit": ""
      },
      {
        "id": "L",
        "label": "势阱宽度 L",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "value": 1,
        "unit": "nm"
      }
    ],
    "simTitle": "边界、能量与归一化",
    "title": "从驻波到量子化能级",
    "intro": "保留原势阱故事；新增归一化核验。",
    "modelNote": "单电子，0<x<L，阱内V=0、阱外无穷高。横轴ξ=x/L；绿线√Lψ无量纲、紫线L|ψ|²无量纲，两者有不同物理意义。表列ψ的SI单位m⁻¹ᐟ²与密度nm⁻¹；归一化用800段辛普森求积，不把独立缩放曲线的视觉面积当概率。",
    "prediction": {
      "q": "n=2定态在阱内（不计两端）有几个密度节点？",
      "options": [
        "0个",
        "1个",
        "2个"
      ],
      "correct": 1,
      "explain": "sin(2πx/L)在x=L/2为零，内部只有一个节点。"
    },
    "derive": {
      "q": "固定n与质量，L增至2L，能量如何变化？",
      "options": [
        "变为1/2",
        "变为1/4",
        "变为2倍"
      ],
      "correct": 1,
      "explain": "Eₙ∝L⁻²。归一化振幅同时按L⁻¹ᐟ²变化。"
    },
    "derivation": "<p><b>物理问题</b>　电子被限制在盒中，为什么最低动能仍非零？硬壁要求波函数在两端消失，不能选一个非零常数态。</p><p><b>列式理由</b>　盒内V=0，薛定谔方程为−ℏ²ψ″/(2m)=Eψ；ψ(0)=ψ(L)=0筛选驻波。</p><p><b>关键一步</b>　k=nπ/L，n=1,2,…；由∫|ψ|²dx=1得ψ=√(2/L)sin(nπx/L)，Eₙ=n²π²ℏ²/(2mL²)。</p><p><b>极限检验</b>　n=0给零函数，无法归一化；L加倍能量降为1/4。换用ξ积分时必须保留dx=Ldξ。</p>",
    "check": "积分sin²给L/2，系数为√(2/L)；不同正整数n的正交积分为δnm。零函数不能表示归一化态；加常数势只平移能量。"
  },
  {
    "mapId": "QM1.2",
    "id": "QM1.2",
    "courseId": "quantum",
    "short": "量子力学 · QM1.2",
    "controls": [
      {
        "id": "n",
        "label": "量子数 n",
        "min": 1,
        "max": 5,
        "step": 1,
        "value": 2,
        "unit": ""
      },
      {
        "id": "L",
        "label": "势阱宽度 L",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "value": 1,
        "unit": "nm"
      },
      {
        "id": "a",
        "label": "区间端点 a/L",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.2,
        "unit": ""
      },
      {
        "id": "b",
        "label": "区间端点 b/L",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.7,
        "unit": ""
      }
    ],
    "simTitle": "密度曲线下的区间概率",
    "intro": "你把电子逐个制备在同一个势阱定态中，每次只测一次位置。现在只关心盒内一小段区域：这里的密度峰值很高，找到电子的概率就一定很大吗？先固定量子数和阱宽，移动区间的两个端点，比较高亮面积、解析概率与数值积分。",
    "modelNote": "同一无限深势阱；曲线是L|ψ|²，积分横轴ξ=x/L，面积才等于概率。两个端点自动按小到大排列，实际区间在表中明确列出；密度nm⁻¹另列。解析值与800段独立求积对照。无随机取样。",
    "prediction": {
      "q": "连续位置分布中，一个指定点的概率是多少？",
      "options": [
        "等于该点密度",
        "总是1",
        "为0"
      ],
      "correct": 2,
      "explain": "单点积分区间宽度为0，概率为0。"
    },
    "derive": {
      "q": "ξ=x/L后，归一化积分应写成？",
      "options": [
        "∫L|ψ(Lξ)|²dξ",
        "∫|ψ(Lξ)|²dξ",
        "∫|ψ(Lξ)|dξ"
      ],
      "correct": 0,
      "explain": "dx=Ldξ，雅可比不能省略。"
    },
    "derivation": "<p><b>物理问题</b>　密度峰值能超过1吗？密度有倒长度单位，只有在区间上积分后才是无量纲概率。</p><p><b>列式理由</b>　P=∫ₐᵇ|ψ|²dx；令ξ=x/L后，被积函数成为2sin²(nπξ)。</p><p><b>关键一步</b>　原函数F(ξ)=ξ−sin(2nπξ)/(2nπ)，故P=F(b/L)−F(a/L)。</p><p><b>极限检验</b>　全区间P=1、零宽区间P=0；连续分布在单个点的概率为0，即使该点密度很高。</p>",
    "check": "用sin²u=(1−cos2u)/2积分。对任意合法端点，P∈[0,1]；穿过节点会改变局部面积增长速度。"
  },
  {
    "mapId": "QM1.3",
    "id": "QM1.3",
    "courseId": "quantum",
    "short": "量子力学 · QM1.3",
    "controls": [
      {
        "id": "theta",
        "label": "混合角 θ",
        "min": 0,
        "max": 1.5707963267948966,
        "step": "any",
        "value": 0.7853981633974483,
        "unit": "rad"
      },
      {
        "id": "phase",
        "label": "相对相位 δ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "chi",
        "label": "整体相位 χ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      }
    ],
    "simTitle": "相干叠加与去掉交叉项的混合",
    "intro": "实验室用两种方法制备盒中的电子，两种制备中测得各能级的概率完全相同。只凭这份能量统计，能断定它们的位置分布也相同吗？先固定混合角，改变相对相位，比较相干叠加与混合态的密度；再只改整体相位，看看哪些量会变。",
    "modelNote": "固定时刻，ψ=cosθψ₁+exp(iδ)sinθψ₂，再乘exp(iχ)。ξ=x/L，曲线为L|ψ|²。基矢正交，整体相位与相对相位分别控制；本页不自动演化。混合曲线只删除交叉项，不是一个新的纯态。",
    "prediction": {
      "q": "只改变整体相位χ，位置密度怎样变化？",
      "options": [
        "不变",
        "整体平移",
        "乘以cosχ"
      ],
      "correct": 0,
      "explain": "整体相位的模方为1。"
    },
    "derive": {
      "q": "能量占据不变而密度改变，改变的是？",
      "options": [
        "整体相位",
        "相对相位",
        "归一化条件"
      ],
      "correct": 1,
      "explain": "相对相位改变交叉项，不改变cos²θ与sin²θ。"
    },
    "derivation": "<p><b>物理问题</b>　相同的能量占据能否对应不同的位置分布？占据只给系数模方，没有给相对相位。</p><p><b>列式理由</b>　展开|ψ|²，必须保留两振幅的交叉项，不能把概率相加来代替相干叠加。</p><p><b>关键一步</b>　L|ψ|²=2c²sin²πξ+2s²sin²2πξ+4cs cosδ sinπξ sin2πξ，c=cosθ、s=sinθ。</p><p><b>极限检验</b>　χ完全消失；δ=π/2时此位置密度恰与混合相同，但纯态与混合态并不因此相同。总积分由正交性保持为1。</p>",
    "check": "交叉项在全阱积分为0，在局部一般非零；δ=0与π构成同占据、不同位置分布的一对例子。"
  },
  {
    "mapId": "QM1.4",
    "id": "QM1.4",
    "courseId": "quantum",
    "short": "量子力学 · QM1.4",
    "controls": [
      {
        "id": "sigma",
        "label": "位置标准差 σₓ",
        "min": 0.1,
        "max": 1.5,
        "step": 0.05,
        "value": 0.4,
        "unit": "nm"
      },
      {
        "id": "x0",
        "label": "位置均值 x₀",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "value": 0,
        "unit": "nm"
      },
      {
        "id": "k0",
        "label": "动量均值 p₀/ℏ",
        "min": -4,
        "max": 4,
        "step": 0.1,
        "value": 1,
        "unit": "nm⁻¹"
      }
    ],
    "simTitle": "位置与动量的傅里叶宽度",
    "intro": "你想把一个自由电子制备得更集中，让它的位置尽量落在一小段空间内。但这样的波包，还能同时具有很集中的动量分布吗？先减小位置标准差，观察动量分布如何展宽；再改变动量均值，分清分布的平移与宽度变化。",
    "modelNote": "实数轴最小不确定高斯纯态，无二次相位。φ(p)=(2πℏ)⁻¹ᐟ²∫exp(−ipx/ℏ)ψdx。左横轴x[nm]密度nm⁻¹，右横轴k=p/ℏ[nm⁻¹]密度nm；分别显示均值±3σ窗口和遗漏概率，绝不按画布重新归一化。",
    "prediction": {
      "q": "σₓ减半而仍保持本页最小高斯态，σₚ怎样变化？",
      "options": [
        "减半",
        "不变",
        "加倍"
      ],
      "correct": 2,
      "explain": "σₚ=ℏ/(2σₓ)。"
    },
    "derive": {
      "q": "把p₀增大，哪项变化？",
      "options": [
        "动量均值",
        "位置标准差",
        "σₓσₚ"
      ],
      "correct": 0,
      "explain": "线性空间相位平移动量分布，不改变其方差。"
    },
    "derivation": "<p><b>物理问题</b>　波包压窄，增大的是哪一种宽度？本页用标准差，不把半高全宽当标准差。</p><p><b>列式理由</b>　ψ∝exp[−(x−x₀)²/(4σₓ²)+ip₀x/ℏ]，傅里叶变换后动量分布也是高斯。</p><p><b>关键一步</b>　σₚ=ℏ/(2σₓ)，故σₓσₚ=ℏ/2；x₀和p₀分别移动两分布的中心。</p><p><b>极限检验</b>　改变p₀不改σₚ；有限±3σ画窗遗漏约0.27%的概率。带二次相位的一般高斯可能不再饱和这个简单乘积界。</p>",
    "check": "用统一(2πℏ)⁻¹ᐟ²约定计算傅里叶变换；归一化检查在全实轴成立。二次相位产生位置动量协方差。"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:row.title||design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请明确比较条件，并写下一项数值或极限核验。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、文字和图示由项目实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
