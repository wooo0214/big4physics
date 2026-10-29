/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS8Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS8.1",
    "mapId": "TS8.1",
    "courseId": "thermal",
    "short": "热统 · TS8.1",
    "title": "有限Ising链与圆滑响应",
    "intro": "小链上的自旋看起来突然排成一边，这能证明相变吗？先令 h=0 看全部构型平均，再反转外场，比较圆滑热容与磁化响应。",
    "simTitle": "有限Ising链与圆滑响应：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "周期 Ising 链自旋数",
        "min": 2,
        "max": 10,
        "step": 1,
        "value": 6,
        "unit": ""
      },
      {
        "id": "T",
        "label": "温度 kBT/J",
        "min": 0.2,
        "max": 5,
        "step": 0.1,
        "value": 1.5,
        "unit": ""
      },
      {
        "id": "h",
        "label": "能量型外场 h/J",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "value": 0,
        "unit": ""
      }
    ],
    "goal": "零场有限链⟨M⟩=0；反场磁化反号；一维有限程零场无有限温相变。",
    "math": "H=−JΣs_i s_(i+1)−hΣs_i；用全部2^N构型计算Z和矩。",
    "modelNote": "小N精确枚举而非Monte Carlo；k_BT/J和h/J无量纲；总自旋M无量纲。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "对照零场转移矩阵Z=(2coshK)^N+(2sinhK)^N并讨论热力学极限。",
      "check": "零场周期链 Z=(2coshK)^N+(2sinhK)^N。N→∞ 后自由能仍在有限温解析，一维短程零场无有限温相变。"
    },
    "reflection": "有限系统的尖峰能否直接证明存在热力学相变？ 请先写出预测，再结合核验表中的独立条件解释；对照零场转移矩阵Z=(2coshK)^N+(2sinhK)^N并讨论热力学极限。",
    "prediction": {
      "q": "零外场有限 Ising 链的有符号平均总自旋是多少？",
      "options": [
        "总是正的 N",
        "0",
        "等于平均绝对总自旋"
      ],
      "correct": 1,
      "explain": "构型与整体翻转伙伴等能，有限温下精确平均相消。"
    },
    "derive": {
      "q": "周期 Ising 哈密顿量是哪一个？",
      "options": [
        "H=−JΣs_i，完全无邻居项",
        "H=JΣ绝对自旋，可描述相互作用",
        "H=−JΣs_i s_(i+1)−hΣs_i"
      ],
      "correct": 2,
      "explain": "最近邻乘积给耦合，外场与有符号总自旋共轭；周期边界闭合链。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　有限系统的尖峰能否直接证明存在热力学相变？ 小链上的自旋看起来突然排成一边，这能证明相变吗？先令 h=0 看全部构型平均，再反转外场，比较圆滑热容与磁化响应。</p><p><b>列式理由</b>　有限构型集在 T>0 的配分和是光滑函数；零场每个构型都有翻转同能伙伴，平均磁化严格相消。</p><p><b>关键一步</b>　H=−JΣs_i s_(i+1)−hΣs_i；用全部2^N构型计算Z和矩。</p><p><b>极限检验</b>　零场有限链⟨M⟩=0；反场磁化反号；一维有限程零场无有限温相变。 零场周期链 Z=(2coshK)^N+(2sinhK)^N。N→∞ 后自由能仍在有限温解析，一维短程零场无有限温相变。</p>"
  },
  {
    "id": "TS8.2",
    "mapId": "TS8.2",
    "courseId": "thermal",
    "short": "热统 · TS8.2",
    "title": "Landau自由能与临界图景",
    "intro": "自由能双阱出现后，留在其中一个坑里是否就是平衡？先调外场找出所有驻点，再比较每个局部极小的高度；零场时保留两个同深最低点。",
    "simTitle": "Landau自由能与临界图景：模型与核验",
    "controls": [
      {
        "id": "a",
        "label": "Landau 二次系数 a",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "value": -1,
        "unit": ""
      },
      {
        "id": "b",
        "label": "四次系数 b>0",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "value": 1,
        "unit": ""
      },
      {
        "id": "h",
        "label": "共轭外场 h",
        "min": -0.8,
        "max": 0.8,
        "step": 0.05,
        "value": 0,
        "unit": ""
      }
    ],
    "goal": "b>0；h=0且a<0有±√(−a/b)；零场两最低点应保留简并。",
    "math": "f′=am+bm³−h=0；f″>0仅给局部稳定，还要比较自由能。",
    "modelNote": "无量纲Landau标量平均场模型；m为序参量，不自动限制为微观自旋区间。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "推平均场临界指数并解释涨落会使实际低维临界行为偏离。",
      "check": "h=0,a<0 的平衡 m=±√(−a/b)；a=0,h≠0 时 m=(h/b)^(1/3)。指数是平均场结果，涨落可改变低维临界行为。"
    },
    "reflection": "双阱出现后，哪个极小值代表平衡？ 请先写出预测，再结合核验表中的独立条件解释；推平均场临界指数并解释涨落会使实际低维临界行为偏离。",
    "prediction": {
      "q": "h=0、a<0、b>0 时，Landau 全局平衡有几个？",
      "options": [
        "只有 m=0",
        "只有正 m 最低点",
        "两个简并最低点"
      ],
      "correct": 2,
      "explain": "对称双阱 m=±√(−a/b) 同深，二者都应保留。"
    },
    "derive": {
      "q": "Landau 驻点条件及局部稳定判据是？",
      "options": [
        "am+bm³−h=0，并检查 f″ 与势值",
        "只要 f′=0 就必为全局最低",
        "把 m 强制裁到 ±1 即可"
      ],
      "correct": 0,
      "explain": "驻点可能为极大或亚稳，局部极小还须比较自由能；临界平坦点另看高阶项。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　双阱出现后，哪个极小值代表平衡？ 自由能双阱出现后，留在其中一个坑里是否就是平衡？先调外场找出所有驻点，再比较每个局部极小的高度；零场时保留两个同深最低点。</p><p><b>列式理由</b>　f′=0 只确定驻点，f″>0 只给局部稳定；全局平衡必须比较所有极小的自由能，另保留零场临界平坦极小。</p><p><b>关键一步</b>　f′=am+bm³−h=0；f″>0仅给局部稳定，还要比较自由能。</p><p><b>极限检验</b>　b>0；h=0且a<0有±√(−a/b)；零场两最低点应保留简并。 h=0,a<0 的平衡 m=±√(−a/b)；a=0,h≠0 时 m=(h/b)^(1/3)。指数是平均场结果，涨落可改变低维临界行为。</p>"
  },
  {
    "id": "TS8.3",
    "mapId": "TS8.3",
    "courseId": "thermal",
    "short": "热统 · TS8.3",
    "title": "涨落与响应的定量关系",
    "intro": "不用施加扰动，只看平衡涨落能知道响应吗？先把能量与总自旋方差换成热容和磁响应，再用独立小扰动差分复核。",
    "simTitle": "涨落与响应的定量关系：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "周期 Ising 链自旋数",
        "min": 2,
        "max": 8,
        "step": 1,
        "value": 6,
        "unit": ""
      },
      {
        "id": "T",
        "label": "温度 kBT/J",
        "min": 0.2,
        "max": 5,
        "step": 0.1,
        "value": 1.5,
        "unit": ""
      },
      {
        "id": "h",
        "label": "能量型外场 h/J",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "logStep",
        "label": "log10 差分步长",
        "min": -6,
        "max": -1,
        "step": 0.5,
        "value": -3,
        "unit": ""
      }
    ],
    "goal": "方差非负；差分步长收敛；必须用⟨M²⟩−⟨M⟩²而非|M|方差。",
    "math": "C=Var(H)/(k_BT²)，χ_h=βVar(M)，h为能量型外场。",
    "modelNote": "正则平衡、固定外场和耦合；χ_h是对h的响应，不混作SI对B的体积磁化率。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "由lnZ二阶导数独立推两种恒等式，区分平衡涨落公式与一般动态响应。",
      "check": "∂⟨M⟩/∂h=β(⟨M²⟩−⟨M⟩²)，C=Var(H)/(kBT²)。|M| 与 h 不共轭，不能替换。平衡恒等式不是任意频率动态响应。"
    },
    "reflection": "响应为何能从平衡自发涨落计算？ 请先写出预测，再结合核验表中的独立条件解释；由lnZ二阶导数独立推两种恒等式，区分平衡涨落公式与一般动态响应。",
    "prediction": {
      "q": "用涨落计算对 h 的磁响应，应该用哪个方差？",
      "options": [
        "有符号 M 的方差",
        "绝对总自旋的方差",
        "只用 ⟨M⟩²"
      ],
      "correct": 0,
      "explain": "外场共轭量是 M；用绝对总自旋会改变响应的定义并破坏恒等式。"
    },
    "derive": {
      "q": "正则能量涨落对应热容的公式是？",
      "options": [
        "C=Var(H)/(kBT)",
        "C=Var(H)/(kBT²)",
        "C=⟨H⟩²/T"
      ],
      "correct": 1,
      "explain": "对 β 的导数给负方差，再用 dβ/dT=−1/(kBT²) 得热容。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　响应为何能从平衡自发涨落计算？ 不用施加扰动，只看平衡涨落能知道响应吗？先把能量与总自旋方差换成热容和磁响应，再用独立小扰动差分复核。</p><p><b>列式理由</b>　对正则权重求参数导数，会把普通平均变成共轭变量的协方差；必须使用同一个能量型 h 与有符号总 M。</p><p><b>关键一步</b>　C=Var(H)/(k_BT²)，χ_h=βVar(M)，h为能量型外场。</p><p><b>极限检验</b>　方差非负；差分步长收敛；必须用⟨M²⟩−⟨M⟩²而非|M|方差。 ∂⟨M⟩/∂h=β(⟨M²⟩−⟨M⟩²)，C=Var(H)/(kBT²)。|M| 与 h 不共轭，不能替换。平衡恒等式不是任意频率动态响应。</p>"
  },
  {
    "id": "TS8.4",
    "mapId": "TS8.4",
    "courseId": "thermal",
    "short": "热统 · TS8.4",
    "title": "扩散、通量与熵产生",
    "intro": "周期环上的粒子总数不变，高浓度区却逐渐变平。先调扩散与时间，再关闭扩散或去掉初始起伏，检查通量、粒子数和熵产生。",
    "simTitle": "扩散、通量与熵产生：模型与核验",
    "controls": [
      {
        "id": "D",
        "label": "扩散系数 D",
        "min": 0,
        "max": 0.1,
        "step": 0.005,
        "value": 0.02,
        "unit": "m²/s"
      },
      {
        "id": "time",
        "label": "时间 t",
        "min": 0,
        "max": 20,
        "step": 0.5,
        "value": 2,
        "unit": "s"
      },
      {
        "id": "amp",
        "label": "初始幅度 A",
        "min": -0.9,
        "max": 0.9,
        "step": 0.1,
        "value": 0.7,
        "unit": ""
      },
      {
        "id": "L",
        "label": "周期长度 L",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "value": 1,
        "unit": "m"
      },
      {
        "id": "c0",
        "label": "平均线数密度 c0",
        "min": 10,
        "max": 1000,
        "step": 10,
        "value": 100,
        "unit": "m⁻¹"
      }
    ],
    "goal": "积分粒子数恒定；D=0不衰减、A=0无流；理想稀体系熵不减。",
    "math": "∂_tc=D∂²_xc，j=−D∂_xc；模式衰减率Dk²。",
    "modelNote": "周期L、k=2π/L、|A|<1、D≥0；c为线数密度m⁻¹，j单位s⁻¹，D为m²/s。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "用∂_tS=k_BD∫(∂_xc)²/c dx核对熵产生，并说明Fick定律的局域平衡近似。",
      "check": "周期边界积分消去通量，N=c0L；分部积分得 dS/dt=kBD∫(∂xc)²/c dx≥0。|A|<1 确保正浓度；相对均匀态熵差趋 0。"
    },
    "reflection": "粒子数不变时，浓度起伏为何仍会消失？ 请先写出预测，再结合核验表中的独立条件解释；用∂_tS=k_BD∫(∂_xc)²/c dx核对熵产生，并说明Fick定律的局域平衡近似。",
    "prediction": {
      "q": "周期扩散 D=0 时，起伏和通量怎样？",
      "options": [
        "起伏立即消失",
        "起伏不衰减，通量为 0",
        "粒子总数随时间减少"
      ],
      "correct": 1,
      "explain": "衰减率 Dk² 与 Fick 通量都正比 D，零扩散不会弛豫。"
    },
    "derive": {
      "q": "余弦扩散模式振幅随时间怎样变化？",
      "options": [
        "A exp(+Dk²t)",
        "A−Dt，所有时间都成立",
        "A exp(−Dk²t)"
      ],
      "correct": 2,
      "explain": "代入扩散方程，余弦二阶导数为 −k² 倍自身，给指数衰减。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　粒子数不变时，浓度起伏为何仍会消失？ 周期环上的粒子总数不变，高浓度区却逐渐变平。先调扩散与时间，再关闭扩散或去掉初始起伏，检查通量、粒子数和熵产生。</p><p><b>列式理由</b>　余弦是周期 Laplace 算符本征模，衰减率 Dk²；Fick 通量使连续性方程满足，正浓度才能定义理想稀体系对数熵。</p><p><b>关键一步</b>　∂_tc=D∂²_xc，j=−D∂_xc；模式衰减率Dk²。</p><p><b>极限检验</b>　积分粒子数恒定；D=0不衰减、A=0无流；理想稀体系熵不减。 周期边界积分消去通量，N=c0L；分部积分得 dS/dt=kBD∫(∂xc)²/c dx≥0。|A|<1 确保正浓度；相对均匀态熵差趋 0。</p>"
  }
];
});
