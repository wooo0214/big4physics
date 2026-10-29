/* QM3: original teaching text; stable IDs and shared two-question UI. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM3Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "mapId": "QM3.1",
    "id": "QM3.1",
    "courseId": "quantum",
    "short": "量子力学 · QM3.1",
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
        "id": "tau",
        "label": "相对演化时间 τ",
        "min": 0,
        "max": 12.566370614359172,
        "step": "any",
        "value": 0,
        "unit": "rad"
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
        "id": "shift",
        "label": "共同能移 C/ΔE",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "value": 0,
        "unit": ""
      }
    ],
    "simTitle": "定态整体相位与叠加密度振荡",
    "intro": "把盒中的电子制备好，再让这个封闭系统自行演化。如果各能级的占据概率始终不变，在盒子不同位置找到电子的概率还能随时间变化吗？先把混合角设为0，再改为等权叠加，分别拖动时间τ，比较密度曲线与位置均值。",
    "modelNote": "无限方阱n=1,2，τ=(E₂−E₁)t/ℏ；加常数势C只加共同相位。长度nm、物理时间fs、能量eV。固定τ改变L会改变相应物理时间；显示帧率不代表演化速率，需手动调τ。",
    "prediction": {
      "q": "给所有能级加相同常数C，密度振荡周期怎样？",
      "options": [
        "不变",
        "加倍",
        "取决于C的符号"
      ],
      "correct": 0,
      "explain": "相位差只含能级差。"
    },
    "derive": {
      "q": "两能级叠加的密度振荡角频率为？",
      "options": [
        "(E₂+E₁)/ℏ",
        "|E₂−E₁|/ℏ",
        "E₁/ℏ"
      ],
      "correct": 1,
      "explain": "整体相位消失，保留相对相位。"
    },
    "derivation": "<p><b>物理问题</b>　单定态的波函数随时间变，密度为何不变？时间变化只在整体相位中。</p><p><b>列式理由</b>　对与时间无关的H，ψ(t)=Σcₙe⁻ⁱᴱⁿᵗᐟℏψₙ。</p><p><b>关键一步</b>　两态交叉项中的相对相位为δ−τ，周期2πℏ/ΔE；⟨x⟩/L=1/2−32cs cos(δ−τ)/(9π²)。</p><p><b>极限检验</b>　θ=0只剩定态，密度不变；所有能级加同一C不改变密度、周期或能量占据。</p>",
    "check": "用∫ξsinπξsin2πξdξ=−8/(9π²)核验位置均值。能量概率与⟨H⟩均随时间守恒。"
  },
  {
    "mapId": "QM3.2",
    "id": "QM3.2",
    "courseId": "quantum",
    "short": "量子力学 · QM3.2",
    "controls": [
      {
        "id": "omega",
        "label": "耦合角频率 Ω",
        "min": 0,
        "max": 8,
        "step": 0.1,
        "value": 2,
        "unit": "10¹² rad/s"
      },
      {
        "id": "time",
        "label": "演化时间 t",
        "min": 0,
        "max": 6,
        "step": 0.02,
        "value": 0.8,
        "unit": "ps"
      },
      {
        "id": "detuning",
        "label": "失谐 Δ",
        "min": -8,
        "max": 8,
        "step": 0.1,
        "value": 0,
        "unit": "10¹² rad/s"
      }
    ],
    "simTitle": "精确两态演化与失谐抑制",
    "intro": "你把一个封闭的两态系统制备在|0⟩，随后接通恒定耦合。等待一段时间后，它有多大概率出现在|1⟩？两个态之间的占据转移为什么不会破坏总概率？先保持失谐为0，改变耦合强度与等待时间；再加入失谐，观察振荡的最大幅度。",
    "modelNote": "预设恒定H=ℏ(Ωσx+Δσz)/2，从|0⟩开始；此处Δ是角频率，不是能量。t用ps，Ω与Δ输入单位10¹² rad/s。精确矩阵指数，不声称是任意受驱原子的完整模型。",
    "prediction": {
      "q": "Ω=0，从|0⟩出发，P₁是多少？",
      "options": [
        "1",
        "1/2",
        "0"
      ],
      "correct": 2,
      "explain": "只有σz对角相位，不产生占据转移。"
    },
    "derive": {
      "q": "有失谐时最大跃迁概率为？",
      "options": [
        "Ω²/(Ω²+Δ²)",
        "1+Δ²/Ω²",
        "总为1"
      ],
      "correct": 0,
      "explain": "失谐减小振荡包络最大值。"
    },
    "derivation": "<p><b>物理问题</b>　占据振荡为什么不能破坏总概率？封闭系统的自伴H产生幺正U。</p><p><b>列式理由</b>　令ωg=√(Ω²+Δ²)，利用(Ωσx+Δσz)²=ωg²I计算矩阵指数。</p><p><b>关键一步</b>　U=cos(ωgt/2)I−i sin(ωgt/2)(Ωσx+Δσz)/ωg；P₁=Ω²sin²(ωgt/2)/ωg²。</p><p><b>极限检验</b>　Ω=Δ=0用U=I的连续极限；Δ=0时t=π/Ω完全翻转，有失谐时最大值一般小于1。</p>",
    "check": "独立乘出U†U；零广义频率时sin(ωgt/2)/ωg取t/2。该恒定模型不包含耗散或测量塌缩。"
  },
  {
    "mapId": "QM3.3",
    "id": "QM3.3",
    "courseId": "quantum",
    "short": "量子力学 · QM3.3",
    "controls": [
      {
        "id": "kind",
        "label": "边界模型",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "实数轴自由高斯"
          },
          {
            "value": 1,
            "label": "硬壁实定态"
          },
          {
            "value": 2,
            "label": "周期环上行波"
          }
        ]
      },
      {
        "id": "sigma",
        "label": "初始σₓ（高斯）",
        "min": 0.2,
        "max": 1,
        "step": 0.05,
        "value": 0.4,
        "unit": "nm"
      },
      {
        "id": "x0",
        "label": "初始x₀（高斯）",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "value": 0,
        "unit": "nm"
      },
      {
        "id": "k0",
        "label": "k₀（高斯）/整数绕数（环）",
        "min": -3,
        "max": 3,
        "step": 1,
        "value": 1,
        "unit": "nm⁻¹ / 无量纲"
      },
      {
        "id": "time",
        "label": "时间 t（高斯）",
        "min": 0,
        "max": 20,
        "step": 0.2,
        "value": 2,
        "unit": "fs"
      },
      {
        "id": "a",
        "label": "区间端点 a",
        "min": -4,
        "max": 4,
        "step": 0.1,
        "value": -0.5,
        "unit": "nm"
      },
      {
        "id": "b",
        "label": "区间端点 b",
        "min": -4,
        "max": 4,
        "step": 0.1,
        "value": 0.8,
        "unit": "nm"
      }
    ],
    "simTitle": "区间概率变化与两端概率流",
    "intro": "你在一维空间里划定一段观察区，只关心在其中找到粒子的概率。如果区内密度不随时间变化，是否就意味着两端没有概率流？先比较硬壁实定态与环上行波，再切换到自由高斯波包，对照区间概率变化率和两端流入、流出的差。",
    "modelNote": "1D归一化j单位s⁻¹，正向+x。高斯按自由薛定谔方程展宽，内部用SI；硬壁范围[−4,4]nm；环周长8nm，k=2πn/ℓ且n为整数。仅高斯使用σ、x₀、t；环的k₀控件读作整数绕数。端点排序后明确列出。密度时间导数解析独立计算，再做800段求积，与两端流比较。固定画窗遗漏高斯概率列于表。",
    "prediction": {
      "q": "环上单一行波的密度恒定，j一定为零吗？",
      "options": [
        "不一定",
        "一定",
        "只要质量非零就为零"
      ],
      "correct": 0,
      "explain": "环行波可有恒定非零流，两端流相等。"
    },
    "derive": {
      "q": "固定区间[a,b]的概率变化率等于？",
      "options": [
        "j(b)−j(a)",
        "j(a)−j(b)",
        "j(a)+j(b)"
      ],
      "correct": 1,
      "explain": "左端流入减右端流出。"
    },
    "derivation": "<p><b>物理问题</b>　密度不变是否表示没有流？实定态可以无流，环上行波可以恒定密度但持续有流。</p><p><b>列式理由</b>　实势的薛定谔方程与其共轭相减，得∂tρ+∂xj=0，j=(ℏ/m)Im(ψ*∂xψ)。</p><p><b>关键一步</b>　区间积分给dP/dt=j(a)−j(b)。高斯还包含展宽引起的局域速度项，不能只用均值速度乘密度。</p><p><b>极限检验</b>　硬壁实定态j=0；环行波j=ℏk/(mℓ)可非零，但两端相同，所以区间概率不变。</p>",
    "check": "高斯σt=σ0√(1+[ℏt/(2mσ0²)]²)；j=ρ[v+(x−xc)σ̇t/σt]。独立微分区间概率与边界通量检验；复势会额外出现源汇。"
  },
  {
    "mapId": "QM3.4",
    "id": "QM3.4",
    "courseId": "quantum",
    "short": "量子力学 · QM3.4",
    "controls": [
      {
        "id": "theta",
        "label": "混合角 θ",
        "min": 0,
        "max": 1.5707963267948966,
        "step": "any",
        "value": 0.6,
        "unit": "rad"
      },
      {
        "id": "phase",
        "label": "相对相位 δ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0.7,
        "unit": "rad"
      },
      {
        "id": "omega",
        "label": "H=ℏΩσz/2 的 Ω",
        "min": 0,
        "max": 6,
        "step": 0.1,
        "value": 2,
        "unit": "10¹² rad/s"
      },
      {
        "id": "time",
        "label": "时间 t",
        "min": 0,
        "max": 6,
        "step": 0.02,
        "value": 0.6,
        "unit": "ps"
      },
      {
        "id": "observable",
        "label": "观测算符",
        "type": "select",
        "value": 1,
        "options": [
          {
            "value": 0,
            "label": "σz（守恒）"
          },
          {
            "value": 1,
            "label": "σx（不对易）"
          },
          {
            "value": 2,
            "label": "显含时间的A(t)"
          }
        ]
      }
    ],
    "simTitle": "薛定谔与海森堡绘景的同一期望",
    "intro": "两位实验者追踪同一个两态系统：一位让态随时间演化，另一位把演化记在观测算符上。两种记账方式看起来不同，对同一次测量的预测会一致吗？先选σx并改变时间，比较两种绘景的期望；再换成σz，检查什么量保持不变。",
    "modelNote": "H=ℏΩσz/2；τ=Ωt。显含时间选项A(t)=cosτσz+sinτ(cosτσx+sinτσy)。对所有选项均使用AH=U†AS(t)U；不把特殊初态期望不变当作对易证据。时间ps、Ω单位10¹² rad/s。",
    "prediction": {
      "q": "无显含时间且与H对易的A，能推出什么？",
      "options": [
        "对所有适用初态守恒",
        "只在基态守恒",
        "一定为零"
      ],
      "correct": 0,
      "explain": "在封闭系统和适用域满足要求时，这是态无关的充分条件。"
    },
    "derive": {
      "q": "海森堡算符正确表达式是？",
      "options": [
        "UAU†",
        "UᵀAU",
        "U†AU"
      ],
      "correct": 2,
      "explain": "⟨Uψ|A|Uψ⟩=⟨ψ|U†AU|ψ⟩。"
    },
    "derivation": "<p><b>物理问题</b>　算符不显含时间就一定守恒吗？还要检查它与哈密顿量的对易关系。</p><p><b>列式理由</b>　薛定谔绘景让态演化；海森堡绘景让算符演化，态保持初值。</p><p><b>关键一步</b>　AH=U†ASU，两种绘景期望相等；d⟨A⟩/dt=(i/ℏ)⟨[H,A]⟩+⟨∂tA⟩。</p><p><b>极限检验</b>　σz对易且无显含时间，态无关地守恒；σx在某个特殊初态中期望恒为零，并不证明[H,σx]=0。</p>",
    "check": "先分别算[H,A]与∂tA，再比较总导数；空间平移、宇称对称性还需边界和算符定义域保持。"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:row.title||design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请明确比较条件，并写下一项数值或极限核验。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、文字和图示由项目实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
