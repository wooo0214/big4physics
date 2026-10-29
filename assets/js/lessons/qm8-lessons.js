/* QM8: original stories, controls, questions and four-step explanations. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM8Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "intro": "你给两个未扰动能级接上很弱的耦合，能量似乎只移动一点。但如果把两能级逐渐拉近，同样的耦合还算“很弱”吗？先固定能隙Δ调g，再缩小Δ，对照精确低能量与二阶微扰，并记录绝对误差和无量纲比值。",
    "controls": [
      {
        "id": "g",
        "label": "耦合能量 g",
        "min": -1,
        "max": 1,
        "step": 0.02,
        "value": 0.1,
        "unit": "eV"
      },
      {
        "id": "gap",
        "label": "未扰动能隙 Δ",
        "min": 0.1,
        "max": 3,
        "step": 0.05,
        "value": 1,
        "unit": "eV"
      }
    ],
    "modelNote": "二态H=[[0,g],[g,Δ]]，Δ>0且g为实能量，精确对角化作为基准。g/Δ才是本例展开参数；g=0时精确能移为0，相对误差未定义，绝对误差仍为0。无截断或经验拟合。",
    "derivation": "<p><b>物理问题</b>　弱扰动必须相对相关能隙判断；g绝对值小不足以保证展开收敛良好。</p><p><b>列式理由</b>　由det(H−EI)=0求精确解；再对g/Δ作小参数展开。</p><p><b>关键一步</b>　E₋=(Δ−√(Δ²+4g²))/2=−g²/Δ+g⁴/Δ³+…；代码用等价有理式避免小g消减。</p><p><b>极限检验</b>　g=0两能量为0和Δ；改变g符号不改能谱。若|g/Δ|不小，二阶答案可能严重偏离，应改解耦合子块。</p>",
    "prediction": {
      "q": "判断本例非简并微扰强弱，应主要比较？",
      "options": [
        "g与1 eV",
        "|g/Δ|",
        "g的符号"
      ],
      "correct": 1,
      "explain": "必须把耦合矩阵元与相关能隙比较。"
    },
    "derive": {
      "q": "g=0时能移相对误差该显示？",
      "options": [
        "无穷大",
        "强制设为1",
        "未定义；绝对误差为0"
      ],
      "correct": 2,
      "explain": "相对误差分母为零，不能除零或掩盖。"
    },
    "check": "用独立特征值方程复算能谱，检验小g误差∝g⁴/Δ³；区分公式有值与近似可靠。",
    "mapId": "QM8.1",
    "id": "QM8.1",
    "courseId": "quantum",
    "short": "量子力学 · QM8.1",
    "simTitle": "近似与跃迁 · 实验1"
  },
  {
    "intro": "两个态原本严格简并，你在任意一组基中只计算扰动的对角元，得到两条能移。换一组同样合法的基，答案竟变了，问题出在哪里？先转动初始基，比较直接取对角元与投影后对角化；再接入外部能级观察高阶偏差。",
    "controls": [
      {
        "id": "a",
        "label": "子空间对角参数 a",
        "min": -1,
        "max": 1,
        "step": 0.05,
        "value": 0.3,
        "unit": "eV"
      },
      {
        "id": "b",
        "label": "子空间耦合 b",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "value": 0.5,
        "unit": "eV"
      },
      {
        "id": "beta",
        "label": "初始基旋转 β",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "lambda",
        "label": "扰动系数 λ",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "value": 0.2,
        "unit": ""
      },
      {
        "id": "gap",
        "label": "外部能隙 G",
        "min": 2,
        "max": 8,
        "step": 0.2,
        "value": 4,
        "unit": "eV"
      },
      {
        "id": "coupling",
        "label": "外部耦合 v",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "value": 0.3,
        "unit": "eV"
      }
    ],
    "modelNote": "H₀=diag(0,0,G)；简并子块λ[[a,b],[b,−a]]，在固定原基下仅第一个态以λv接第三态。旋转只改子块的记账基，不改物理H。对比子块一阶本征值与完整3×3数值对角化；外部近简并时明确不给小参数。所有能量eV。",
    "derivation": "<p><b>物理问题</b>　简并子空间中的任意原态都不是必然的好态；只取对角元会依赖任意基选择。</p><p><b>列式理由</b>　先构造PVP并在整个简并子空间对角化，其本征值给一阶修正，本征矢给正确零阶组合。</p><p><b>关键一步</b>　本例能移为±λ√(a²+b²)，不随初始基旋转改变。第三态耦合带来额外高阶偏差，完整矩阵另作基准。</p><p><b>极限检验</b>　a=b=0或λ=0时子块没有唯一好态；外部最小间隔G−λ√(a²+b²)必须保持正且大于耦合才能作隔离子空间近似。</p>",
    "prediction": {
      "q": "只取任意初始基中的PVP对角元，能否一般得到正确能移？",
      "options": [
        "不能，需对子块对角化",
        "总能",
        "只要是实矩阵就能"
      ],
      "correct": 0,
      "explain": "非零非对角元会混合简并态。"
    },
    "derive": {
      "q": "同一子空间内更换正交基，PVP本征值？",
      "options": [
        "随基角线性改变",
        "保持不变",
        "总变成0"
      ],
      "correct": 1,
      "explain": "酉相似变换保留本征值。"
    },
    "check": "乘出旋转后的子块并验迹、行列式；外耦合置零时完整矩阵的两低能根与子块一致；按实际外部间隔检查误差。",
    "mapId": "QM8.2",
    "id": "QM8.2",
    "courseId": "quantum",
    "short": "量子力学 · QM8.2",
    "simTitle": "近似与跃迁 · 实验2"
  },
  {
    "intro": "你得到两个近似答案：一个声称能量不会低于真实基态，另一个给出穿过平滑势垒的指数。它们的可信度是同一种保证吗？先调高斯宽度寻找谐振子的变分极小，再改变势垒能差，比较半经典指数与解析透射基准，并靠近转折点检查局域条件。",
    "controls": [
      {
        "id": "width",
        "label": "位置标准差 s/ℓ",
        "min": 0.25,
        "max": 2,
        "step": 0.025,
        "value": 1,
        "unit": ""
      },
      {
        "id": "depth",
        "label": "势垒顶能差 ε",
        "min": 0,
        "max": 4,
        "step": 0.05,
        "value": 1,
        "unit": "(V顶−E)/(ℏΩ)"
      },
      {
        "id": "point",
        "label": "势垒采样位置 ξ",
        "min": -3,
        "max": 3,
        "step": 0.05,
        "value": 0.5,
        "unit": ""
      }
    ],
    "modelNote": "两个独立练习：左为单位ℏω的谐振子高斯变分；s是位置标准差。右为全局倒抛物线V−V顶=−ℏΩξ²/2，不是有限方势垒。ε≥0，精确通量T=1/[1+exp(2πε)]；指数exp(−2πε)仅作深禁区近似。采样在转折点或禁区外时，禁区κ判据未定义。",
    "derivation": "<p><b>物理问题</b>　变分原理给能量上界，WKB给渐近展开；两种结果必须分别说明保证与失效条件。</p><p><b>列式理由</b>　归一化高斯给E(s)/(ℏω)=1/(8s²)+s²/2，此处s已除以ℓ。禁区κ=√(2ε−ξ²)。</p><p><b>关键一步</b>　变分最小s=1/√2、E=1/2；倒抛物线禁区作用量∫κdξ=πε，比较e⁻²πε与精确T。</p><p><b>极限检验</b>　ε=0时精确T=1/2而裸指数为1；转折点κ→0使|κ′|/κ²失效。能量上界不保证波函数准确，指数也不是普遍精确透射率。</p>",
    "prediction": {
      "q": "谐振子高斯试探能量与精确基态相比？",
      "options": [
        "可任意更低",
        "总不低于精确值",
        "总相等"
      ],
      "correct": 1,
      "explain": "合适归一化试探态的能量期望受变分上界约束。"
    },
    "derive": {
      "q": "本页倒抛物线势垒顶ε=0，精确T为？",
      "options": [
        "1",
        "0",
        "1/2"
      ],
      "correct": 2,
      "explain": "裸指数给1，在势垒顶不能当精确答案。"
    },
    "check": "独立积分禁区作用量并与πε比；采样靠近±√(2ε)观察局域判据发散。变分与WKB分别使用ω和Ω，不混用两个体系。",
    "mapId": "QM8.3",
    "id": "QM8.3",
    "courseId": "quantum",
    "short": "量子力学 · QM8.3",
    "simTitle": "近似与跃迁 · 实验3"
  },
  {
    "intro": "你把弱周期外场的频率调到两能级差对应的频率，却仍可能完全激发不了体系。频率匹配之外，还缺什么？先把矩阵元切为对称性禁戒，再恢复允许耦合，改变频率和作用时间；比较一阶概率与完整两态数值演化，观察微扰何时失效。",
    "controls": [
      {
        "id": "g",
        "label": "耦合幅 g=V₀/(ℏω₀)",
        "min": 0,
        "max": 0.5,
        "step": 0.01,
        "value": 0.05,
        "unit": ""
      },
      {
        "id": "nu",
        "label": "驱动频率比 ν=ω/ω₀",
        "min": 0,
        "max": 2.5,
        "step": 0.01,
        "value": 1,
        "unit": ""
      },
      {
        "id": "time",
        "label": "作用时长 τ=ω₀t",
        "min": 0,
        "max": 20,
        "step": 0.1,
        "value": 8,
        "unit": ""
      },
      {
        "id": "allowed",
        "label": "预设矩阵元",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "允许：矩阵元非零"
          },
          {
            "value": 1,
            "label": "禁戒：矩阵元为零"
          }
        ]
      }
    ],
    "modelNote": "受激封闭两态H/(ℏω₀)=[[0,g cos(ντ)],[g cos(ντ),1]]，初态为低能态。保留旋转与反旋转两项；数值参考为四阶龙格—库塔积分，不使用旋波近似。选择禁戒时耦合严格置零。τ及ν无量纲；ω₀、ω均为角频率。无自发辐射、碰撞或连续末态黄金规则速率。",
    "derivation": "<p><b>物理问题</b>　跃迁需要非零相互作用矩阵元；频率接近能隙不能解除对称性禁戒。</p><p><b>列式理由</b>　一阶幅c₁=−ig∫₀ᵗcos(ντ′)eⁱτ′dτ′，含1−ν与1+ν两项；用sinc形式保留共振连续极限。</p><p><b>关键一步</b>　P一阶=|c₁|²；数值参考直接解完整两态方程，报告步长与概率范数残差。接近1的一阶结果不再可信，超过1也不裁剪。</p><p><b>极限检验</b>　g=0或矩阵元为0时无转移；τ=0概率为0。长作用时间缩窄有限时共振峰，但孤立离散两态不能硬套固定黄金规则速率。</p>",
    "prediction": {
      "q": "能量差匹配但相互作用矩阵元为0，跃迁如何？",
      "options": [
        "必然完全跃迁",
        "本相互作用下一阶跃迁为零",
        "概率为1/2"
      ],
      "correct": 1,
      "explain": "选择定则约束矩阵元；换相互作用可能改变规则。"
    },
    "derive": {
      "q": "一阶计算得到P>1应怎样处理？",
      "options": [
        "说明近似失效，保留诊断并对照数值解",
        "裁剪到1后继续称可靠",
        "解释为一次发生多个同一测量结果"
      ],
      "correct": 0,
      "explain": "概率超过1是展开失效的证据，裁剪不能修复理论。"
    },
    "check": "ν=0时与恒定H的精确二态解比较；减半步长检验数值参考。E1单电子规则Δl=±1、Δm=0,±1还需偏振；21厘米线是M1超精细跃迁，本例不给其跃迁率。",
    "mapId": "QM8.4",
    "id": "QM8.4",
    "courseId": "quantum",
    "short": "量子力学 · QM8.4",
    "simTitle": "近似与跃迁 · 实验4"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请写下预测、一次参数对照及模型适用边界。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、故事与图示由项目原创实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
