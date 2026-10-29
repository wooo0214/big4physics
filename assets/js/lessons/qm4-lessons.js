/* QM4: original teaching text; stable IDs and shared two-question UI. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM4Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "mapId": "QM4.1",
    "id": "QM4.1",
    "courseId": "quantum",
    "short": "量子力学 · QM4.1",
    "controls": [
      {
        "id": "z0",
        "label": "无量纲深度 z₀",
        "min": 0.2,
        "max": 10,
        "step": 0.1,
        "value": 4,
        "unit": ""
      },
      {
        "id": "a",
        "label": "势阱半宽 a",
        "min": 0.2,
        "max": 2,
        "step": 0.05,
        "value": 0.5,
        "unit": "nm"
      },
      {
        "id": "level",
        "label": "能级序号（从0起）",
        "min": 0,
        "max": 6,
        "step": 1,
        "value": 0,
        "unit": ""
      }
    ],
    "simTitle": "偶奇束缚根与阱外衰减尾",
    "intro": "原来无限高的盒壁现在变成有限高。电子被制备在一个束缚定态中，阱外却仍有非零概率密度。这是否意味着电子会不断逃离势阱？先调节无量纲深度，观察束缚能级和衰减尾；再切换能级，比较阱外概率。",
    "modelNote": "V=−V₀(|x|<a)、外V=0；z₀=a√(2mV₀)/ℏ。用单调相位方程分支二分求根，排除E=0阈值；序号超出能级数时明确回到最高可用态。ψ按全实轴解析归一化；图画到每侧3个衰减长度并报告遗漏概率，不对画窗重归一化。横轴u=x/a；绿线√aψ、紫线a|ψ|²。",
    "prediction": {
      "q": "任意正深度的一维吸引方阱是否有束缚基态？",
      "options": [
        "没有",
        "有",
        "只有深度超过固定阈值才有"
      ],
      "correct": 1,
      "explain": "一维吸引方阱的偶基态任意正深度存在。"
    },
    "derive": {
      "q": "归一化有限方阱束缚态，需要积分哪里？",
      "options": [
        "只在阱内",
        "只在阱外",
        "整个实数轴"
      ],
      "correct": 2,
      "explain": "衰减尾也携带非零概率。"
    },
    "derivation": "<p><b>物理问题</b>　阱外密度非零，为什么仍是束缚态？能量E<0使外部解指数衰减，全实轴积分仍有限。</p><p><b>列式理由</b>　对称势可选偶、奇宇称；有限跳跃且同质量时ψ和ψ′连续。</p><p><b>关键一步</b>　z=ka、w=κa，z²+w²=z₀²；偶态z tan z=w，奇态−z cot z=w。求根采用无极点相位形式z+asin(z/z₀)=(n+1)π/2。</p><p><b>极限检验</b>　任意z₀>0有偶基态；新根恰在E=0时不算束缚态。深阱时内部能级趋近硬壁结果，外尾逐渐变短。</p>",
    "check": "偶内积分1+sin2z/(2z)，奇内积分1−sin2z/(2z)，两侧总尾积分为边界振幅平方/w；再核对ψ与ψ′连续及无极点匹配残差。"
  },
  {
    "mapId": "QM4.2",
    "id": "QM4.2",
    "courseId": "quantum",
    "short": "量子力学 · QM4.2",
    "controls": [
      {
        "id": "ratio",
        "label": "能量比 E/V₀",
        "min": 0.05,
        "max": 4,
        "step": 0.05,
        "value": 1.5,
        "unit": ""
      },
      {
        "id": "V0",
        "label": "势阶高度 V₀",
        "min": 0.1,
        "max": 5,
        "step": 0.1,
        "value": 1,
        "unit": "eV"
      }
    ],
    "simTitle": "势阶复振幅与通量比",
    "intro": "一束能量固定的电子从左侧遇到势能突然升高的台阶。台阶右侧的波函数幅度有时反而更大，难道透过去的概率超过了1？让能量比E/V₀依次低于、等于和高于1，对照复振幅与反射、透射通量比，找出幅度和概率的区别。",
    "modelNote": "左入射，左V=0、右V=V₀延伸到无穷远，同一电子质量。s=x/ℓ，ℓ=ℏ/√(2mV₀)。入射振幅1，散射态非平方可积，纵轴Reψ/Imψ为相对入射振幅；j/j入无量纲。E=V₀采用连续阈值，右侧为常数且通量为0。",
    "prediction": {
      "q": "势阶右侧只有单一衰减解，其透射流是多少？",
      "options": [
        "正数",
        "零",
        "取决于振幅是否大于1"
      ],
      "correct": 1,
      "explain": "单一实指数乘整体复系数的概率流为零。"
    },
    "derive": {
      "q": "两侧波数不同时，T应该是？",
      "options": [
        "|t|²",
        "|r|²",
        "(k₂/k₁)|t|²"
      ],
      "correct": 2,
      "explain": "同质量通量正比k乘振幅模方。"
    },
    "derivation": "<p><b>物理问题</b>　透射振幅大于1是否破坏概率守恒？透射率比较的是通量，不只比较振幅平方。</p><p><b>列式理由</b>　有限势阶两侧ψ与ψ′连续；右侧无入射，低于势阶时只留衰减解。</p><p><b>关键一步</b>　r=(k₁−k₂)/(k₁+k₂)，t=2k₁/(k₁+k₂)；E>V₀时T=(k₂/k₁)|t|²。</p><p><b>极限检验</b>　E<V₀时k₂=iκ，R=1而T=0；右侧非零衰减振幅并不意味着有透射流。阈值t→2，T→0。</p>",
    "check": "独立由两个边界方程求r与t；计算j=ℏIm(ψ*ψ′)/m并核对R+T=1。阈值常数解不是归一化束缚态。"
  },
  {
    "mapId": "QM4.3",
    "id": "QM4.3",
    "courseId": "quantum",
    "short": "量子力学 · QM4.3",
    "controls": [
      {
        "id": "ratio",
        "label": "能量比 E/V₀",
        "min": 0.05,
        "max": 1,
        "step": 0.01,
        "value": 0.5,
        "unit": ""
      },
      {
        "id": "d",
        "label": "势垒宽度 a/ℓ",
        "min": 0,
        "max": 12,
        "step": 0.1,
        "value": 3,
        "unit": ""
      },
      {
        "id": "V0",
        "label": "势垒高度 V₀",
        "min": 0.1,
        "max": 5,
        "step": 0.1,
        "value": 1,
        "unit": "eV"
      }
    ],
    "simTitle": "禁区中的复振幅与恒定流",
    "intro": "现在把入射电子束送向一段有限宽的势垒，并让电子能量低于垒高。势垒另一侧仍可能出现透射流，这与上一关低于势阶时只有衰减、没有透射流的情况有何不同？先固定能量比，逐渐加宽势垒，比较透射率、垒内复振幅和三段概率流。",
    "modelNote": "0<x<a内V=V₀，两侧零势，同质量。ℓ=ℏ/√(2mV₀)，横轴s=x/ℓ，宽度d=a/ℓ。由右侧出射边界反向匹配复ψ及ψ′，R和T分别由复振幅求得，再检查三段j/j入。控件κa≤12避免双曲函数溢出；更厚势垒需对数或缩放算法，本模型拒绝d>350。不做时间传播模拟；很小T时反射区净流有浮点消减，须结合绝对通量残差判断。",
    "prediction": {
      "q": "势垒厚度趋近零，精确T趋于？",
      "options": [
        "1",
        "0",
        "1/2"
      ],
      "correct": 0,
      "explain": "两界面重合，势垒消失。"
    },
    "derive": {
      "q": "两侧同波数时，哪个量给出透射率？",
      "options": [
        "透射振幅实部",
        "透射振幅模方",
        "势垒中密度积分"
      ],
      "correct": 1,
      "explain": "T=j透/j入=|t|²。"
    },
    "derivation": "<p><b>物理问题</b>　禁区内有振幅就等于有流吗？单一衰减解无流，但有限势垒内必须保留两个指数的复线性组合。</p><p><b>列式理由</b>　在两端同时匹配ψ、ψ′，把左侧入射幅固定为1；两侧波数相同，T=|t|²。</p><p><b>关键一步</b>　E<V₀时T=[1+V₀²sinh²(κa)/(4E(V₀−E))]⁻¹；κ=√(2m(V₀−E))/ℏ。</p><p><b>极限检验</b>　a→0时T→1；厚垒近似为16(E/V₀)(1−E/V₀)e⁻²κa，只有κa≫1才可靠；阈值用连续极限。</p>",
    "check": "独立解四个匹配方程；检查三个区域Im(ψ*ψ′)/k相同。厚垒近似的前因子不可省略，近阈值需单独检验。"
  },
  {
    "mapId": "QM4.4",
    "id": "QM4.4",
    "courseId": "quantum",
    "short": "量子力学 · QM4.4",
    "controls": [
      {
        "id": "ratio",
        "label": "能量比 E/V₀",
        "min": 1,
        "max": 8,
        "step": 0.01,
        "value": 2,
        "unit": ""
      },
      {
        "id": "d",
        "label": "势垒宽度 a/ℓ",
        "min": 0,
        "max": 10,
        "step": "any",
        "value": 3.141592653589793,
        "unit": ""
      },
      {
        "id": "V0",
        "label": "势垒高度 V₀",
        "min": 0.1,
        "max": 5,
        "step": 0.1,
        "value": 1,
        "unit": "eV"
      },
      {
        "id": "resolution",
        "label": "扫描能量步长 Δ(E/V₀)",
        "min": 0.005,
        "max": 0.1,
        "step": 0.005,
        "value": 0.025,
        "unit": ""
      }
    ],
    "simTitle": "共振扫描、能量分辨率与阈值",
    "intro": "你继续提高这束电子的能量，让它超过垒高。明明有足够能量越过势垒，为什么仍会被反射，甚至只在某些能量完全透射？先改变能量比，再改变势垒宽度与扫描步长，观察共振位置，以及较粗的能量采样会不会漏掉窄峰。",
    "modelNote": "与QM4.3同一矩形势垒。左图Reψ与Imψ，右图E/V₀扫描的离散R/T样点；步长明确显示，不平滑或插值制造窄峰。表列解析共振E/V₀=1+(Nπ/d)²及qa，d=0时无离散共振。E=V₀使用T=[1+d²/4]⁻¹，不把qa=0当作共振。",
    "prediction": {
      "q": "qa=0的阈值能量必定是完美透射共振吗？",
      "options": [
        "是",
        "否",
        "只要V₀>0就是"
      ],
      "correct": 1,
      "explain": "qa=0与分母同时趋零，应取连续极限。"
    },
    "derive": {
      "q": "非零宽度势垒完美透射的条件为？",
      "options": [
        "qa=Nπ，N≥1",
        "qa=0",
        "所有E>V₀"
      ],
      "correct": 0,
      "explain": "多次反射相位干涉在这些离散能量上消除反射。"
    },
    "derivation": "<p><b>物理问题</b>　粒子能量高于势垒，为什么仍有反射？两界面上的振幅匹配及相位干涉与经典越障不同。</p><p><b>列式理由</b>　垒内q=√(2m(E−V₀))/ℏ为实数，仍有向两侧传播的分量。</p><p><b>关键一步</b>　T=[1+V₀²sin²(qa)/(4E(E−V₀))]⁻¹；qa=Nπ且N≥1时反射相消，T=1。</p><p><b>极限检验</b>　E→V₀±时T→[1+mV₀a²/(2ℏ²)]⁻¹=[1+d²/4]⁻¹；粗能量采样可能错过峰，有限波包宽度还会平均共振。</p>",
    "check": "对比E/V₀=1±ε与阈值解析式；用独立多界面传输矩阵核验共振位置。步长改变只改变可见采样点，不改变解析模型。"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:row.title||design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请明确比较条件，并写下一项数值或极限核验。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、文字和图示由项目实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
