/* QM2: original teaching text; stable IDs and shared two-question UI. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM2Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "mapId": "QM2.1",
    "id": "QM2.1",
    "courseId": "quantum",
    "short": "量子力学 · QM2.1",
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
        "id": "beta",
        "label": "基旋转参数 β",
        "min": 0,
        "max": 1.5707963267948966,
        "step": "any",
        "value": 0.4,
        "unit": "rad"
      },
      {
        "id": "eta",
        "label": "基复相位 η",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0.8,
        "unit": "rad"
      }
    ],
    "simTitle": "同时变换态坐标与测量算符",
    "intro": "两位实验者描述同一个两态系统：一位沿用原来的基，另一位换了一组基，纸上的态分量因此不同。仪器和物理态都没有改变，测量预测会受记法影响吗？先固定初态，只调基旋转参数和基复相位，比较两种表示中的范数与同一仪器的期望值。",
    "modelNote": "正交归一复二维态，U的列为新基；U=[[cosβ,−e⁻ⁱηsinβ],[eⁱηsinβ,cosβ]]。A=cos(0.73)σz+sin(0.73)σx，无量纲本征值±1。比较c′=U†c、A′=U†AU；仅改态而保留A的操作也列出。",
    "prediction": {
      "q": "为了保持同一物理期望值，换基时应变换？",
      "options": [
        "只变态",
        "态与算符同时变换",
        "只变算符"
      ],
      "correct": 1,
      "explain": "相同物理对象的坐标表示必须一起变换。"
    },
    "derive": {
      "q": "新基列向量组成U，态坐标如何变换？",
      "options": [
        "Uc",
        "Uᵀc",
        "U†c"
      ],
      "correct": 2,
      "explain": "由c=Uc′得c′=U†c，复数基底需共轭转置。"
    },
    "derivation": "<p><b>物理问题</b>　换坐标会不会改变物理态？要把被动基变换与对态施加的主动操作区分开。</p><p><b>列式理由</b>　新基列向量组成U，正交归一要求U†U=I，因此c′=U†c。</p><p><b>关键一步</b>　同一仪器在新基中A′=U†AU，c′†A′c′=c†Ac，范数也不变。</p><p><b>极限检验</b>　β=0只剩单位变换；只改c而保留A通常会改变期望，因为这相当于另一个物理比较。</p>",
    "check": "用完备关系逐分量推导；对复U不能用普通转置代替共轭转置。检查U†U和A′厄米性。"
  },
  {
    "mapId": "QM2.2",
    "id": "QM2.2",
    "courseId": "quantum",
    "short": "量子力学 · QM2.2",
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
        "id": "kind",
        "label": "算符",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "二态 diag(1,−1)"
          },
          {
            "value": 1,
            "label": "三态简并 diag(1,1,2)"
          }
        ]
      },
      {
        "id": "outcome",
        "label": "选择的结果",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "第一个本征值"
          },
          {
            "value": 1,
            "label": "第二个本征值"
          }
        ]
      }
    ],
    "simTitle": "谱投影、条件态与非选择测量",
    "intro": "设想一台仪器面对三个量子态，却只能显示“1”或“2”：前两个态都对应读数“1”。一次测量得到“1”，是否就能断定系统处于前两个态中的某一个？切换到三态简并算符，选择不同读数，比较结果概率、条件态和忽略读数后的密度矩阵。",
    "modelNote": "理想吕德斯测量。二态初态(c,eⁱδs)；三态初态(c,eⁱδs/√2,s/√2)。三态本征值1投影至前二维子空间；不擅自选择其中一条基矢。显示条件态及忽略结果后的完整ρ′；精确角度端点按数学极限处理；p=0时条件态明确未定义，小而非零的概率仍保留。",
    "prediction": {
      "q": "简并测量得到a后，吕德斯更新保留什么？",
      "options": [
        "子空间内相干",
        "只留任意一条基矢",
        "所有子空间间相干"
      ],
      "correct": 0,
      "explain": "Pₐ保留整个本征子空间，不做额外分辨。"
    },
    "derive": {
      "q": "pₐ=0时条件测后态是什么？",
      "options": [
        "零向量",
        "原态",
        "未定义"
      ],
      "correct": 2,
      "explain": "无法对零向量归一化；该结果不会发生。"
    },
    "derivation": "<p><b>物理问题</b>　测得简并本征值后，态一定是唯一的一条基矢吗？仪器只分辨本征值时，不能额外分辨简并子空间。</p><p><b>列式理由</b>　A=Σa aPₐ，结果概率pₐ=⟨ψ|Pₐ|ψ⟩。</p><p><b>关键一步</b>　pₐ>0时ψₐ=Pₐψ/√pₐ；忽略结果给ρ′=ΣaPₐρPₐ，子空间内部相干保留。</p><p><b>极限检验</b>　各结果概率和为1；零概率结果无条件态。立刻重复相同投影测量，会得到同一个已选择本征值。</p>",
    "check": "逐元素构造ρ′；三态例中ρ01保留，ρ02和ρ12消失。再次施加同一Pₐ给原条件态。"
  },
  {
    "mapId": "QM2.3",
    "id": "QM2.3",
    "courseId": "quantum",
    "short": "量子力学 · QM2.3",
    "controls": [
      {
        "id": "theta",
        "label": "混合角 θ",
        "min": 0,
        "max": 1.5707963267948966,
        "step": "any",
        "value": 0.4,
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
        "id": "beta",
        "label": "B相对z轴的角 β",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.5707963267948966,
        "unit": "rad"
      }
    ],
    "simTitle": "方差与态依赖的不确定性下界",
    "intro": "你反复制备同一个两态初态，用一批样本测量A，另一批测量B，再比较两组结果的离散程度。如果A与B不对易，每个初态的不确定性乘积下界都必定大于零吗？先固定B的轴角，改变混合角和相对相位，对照标准差乘积与两种下界。",
    "modelNote": "A=σz、B=cosβσz+sinβσx，本征值无量纲±1。Δ为态的内禀标准差；罗伯逊界|⟨[A,B]⟩|/2可能为0；同时列含协方差的更强界，不将其解读成仪器误差乘积。 接近零的残差可有约10⁻¹⁵级浮点误差，比较不等式时使用10⁻¹²绝对容差。",
    "prediction": {
      "q": "不对易但⟨[A,B]⟩=0时，罗伯逊界为？",
      "options": [
        "严格正数",
        "零",
        "无穷大"
      ],
      "correct": 1,
      "explain": "这是一个态依赖的不等式；零界不表示两方差都为零。"
    },
    "derive": {
      "q": "ΔA²应如何计算？",
      "options": [
        "⟨A²⟩−⟨A⟩²",
        "⟨A⟩²",
        "⟨A²⟩+⟨A⟩²"
      ],
      "correct": 0,
      "explain": "方差定义是围绕均值的二阶矩。"
    },
    "derivation": "<p><b>物理问题</b>　算符不对易，是否每个态的乘积下界都严格正？下界依赖对易子的期望，而不只看算符是否为零。</p><p><b>列式理由</b>　A²=B²=I，所以ΔA²=1−⟨A⟩²，ΔB²同理。</p><p><b>关键一步</b>　由柯西—施瓦茨得ΔAΔB≥|⟨[A,B]⟩|/2；加入协方差可得到更强界。</p><p><b>极限检验</b>　取实系数态，⟨σy⟩=0，简单界可为0，即使sinβ≠0且算符不对易。</p>",
    "check": "强界平方为|⟨[A,B]⟩|²/4+[⟨{A,B}⟩/2−⟨A⟩⟨B⟩]²；连续位置动量还须检查共同定义域。"
  },
  {
    "mapId": "QM2.4",
    "id": "QM2.4",
    "courseId": "quantum",
    "short": "量子力学 · QM2.4",
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
        "id": "alpha",
        "label": "A测量轴角 α",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.5707963267948966,
        "unit": "rad"
      },
      {
        "id": "beta",
        "label": "B测量轴角 β",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.5707963267948966,
        "unit": "rad"
      }
    ],
    "simTitle": "整体纯态、偏迹与联合关联",
    "intro": "两地实验者各拿到一个比特。只看各自的测量统计，他们无法区分手中的比特来自纠缠纯态，还是具有相同局域统计的经典混合。把两地结果放在一起比较，还能看出区别吗？先保留等权叠加，转动两侧测量轴，比较联合关联与局域纯度。",
    "modelNote": "可区分的两个比特，|ψ⟩=cosθ|00⟩+eⁱδsinθ|11⟩；基序00,01,10,11。对照经典混合c²|00⟩⟨00|+s²|11⟩⟨11|。两测量轴均在xz平面，A=cosασz+sinασx；没有测量随机采样或通信过程。",
    "prediction": {
      "q": "贝尔态的单侧约化态纯度是多少？",
      "options": [
        "1",
        "0",
        "1/2"
      ],
      "correct": 2,
      "explain": "约化态为I/2，Trρ²=1/2。"
    },
    "derive": {
      "q": "相同的局域统计能否唯一确定联合态？",
      "options": [
        "能",
        "不能",
        "只有两个比特时能"
      ],
      "correct": 1,
      "explain": "贝尔态和相应经典混合的局域态相同，联合关联可以不同。"
    },
    "derivation": "<p><b>物理问题</b>　整体纯态为什么局部可以是混合态？忽略另一子系统需要偏迹，不能随意挑一个分量。</p><p><b>列式理由</b>　ρAB=|ψ⟩⟨ψ|，ρA=TrBρAB=diag(cos²θ,sin²θ)。</p><p><b>关键一步</b>　局域纯度cos⁴θ+sin⁴θ；联合关联⟨A⊗B⟩=cosαcosβ+sin2θ cosδ sinαsinβ。</p><p><b>极限检验</b>　θ=π/4时局域纯度1/2。经典混合有相同边缘统计，却缺少上式第二项；某些测量轴无法区别两者。</p>",
    "check": "用偏迹的指标求和复算矩阵。对θ=π/4、δ=0，xx关联纯态为1、经典混合为0；单侧非选择局域操作不改另一侧边缘。"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:row.title||design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请明确比较条件，并写下一项数值或极限核验。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、文字和图示由项目实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
