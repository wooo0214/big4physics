/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS4Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS4.1",
    "mapId": "TS4.1",
    "courseId": "thermal",
    "short": "热统 · TS4.1",
    "title": "隔离复合体系的能量交换",
    "intro": "两个有限固体接触后可以交换能量，但总量子数固定。为什么平均分配未必是简单的一半？先调两侧振子数，再数出每一种能量分配的复合重数。",
    "simTitle": "隔离复合体系的能量交换：模型与核验",
    "controls": [
      {
        "id": "A",
        "label": "固体 A 振子数",
        "min": 1,
        "max": 30,
        "step": 1,
        "value": 5,
        "unit": ""
      },
      {
        "id": "B",
        "label": "固体 B 振子数",
        "min": 1,
        "max": 30,
        "step": 1,
        "value": 5,
        "unit": ""
      },
      {
        "id": "Q",
        "label": "总能量量子数 Q",
        "min": 0,
        "max": 60,
        "step": 1,
        "value": 20,
        "unit": ""
      }
    ],
    "goal": "Q固定且概率和1；两组相同时关于Q/2对称；最可能值不必等于均值。",
    "math": "Ω(N,q)=C(q+N−1,q)，P(q_A)∝Ω_A(q_A)Ω_B(Q−q_A)。",
    "modelNote": "有限独立振子、等能量量子、隔离微正则；忽略零点常数，能量单位ℏω。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从总熵最大化得到温度平衡，并比较精确离散概率和Gaussian近似。",
      "check": "总熵导数为 ∂SA/∂EA−∂SB/∂EB；峰值附近为零对应温度相等。有限离散分布的峰值和均值可不同。"
    },
    "reflection": "为何最可能的能量分配由两侧重数的乘积决定？ 请先写出预测，再结合核验表中的独立条件解释；从总熵最大化得到温度平衡，并比较精确离散概率和Gaussian近似。",
    "prediction": {
      "q": "两组相同振子数，隔离总量子数 Q 固定，P(qA) 有什么对称性？",
      "options": [
        "P(qA)=P(Q−qA)",
        "P(qA)始终等概率",
        "每次两侧必须恰好 Q/2"
      ],
      "correct": 0,
      "explain": "交换 A、B 不改变复合重数，允许单侧能量涨落。"
    },
    "derive": {
      "q": "Einstein 固体 N 个振子、q 个量子的重数？",
      "options": [
        "2^N",
        "C(q+N−1,q)",
        "N^q，总可直接分配"
      ],
      "correct": 1,
      "explain": "相同能量量子分配至可分辨振子，隔板计数给组合式。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　为何最可能的能量分配由两侧重数的乘积决定？ 两个有限固体接触后可以交换能量，但总量子数固定。为什么平均分配未必是简单的一半？先调两侧振子数，再数出每一种能量分配的复合重数。</p><p><b>列式理由</b>　隔离复合体系的允许微观态等概率；独立两侧在给定能量分配下的重数相乘，得到该分配的统计权重。</p><p><b>关键一步</b>　Ω(N,q)=C(q+N−1,q)，P(q_A)∝Ω_A(q_A)Ω_B(Q−q_A)。</p><p><b>极限检验</b>　Q固定且概率和1；两组相同时关于Q/2对称；最可能值不必等于均值。 总熵导数为 ∂SA/∂EA−∂SB/∂EB；峰值附近为零对应温度相等。有限离散分布的峰值和均值可不同。</p>"
  },
  {
    "id": "TS4.2",
    "mapId": "TS4.2",
    "courseId": "thermal",
    "short": "热统 · TS4.2",
    "title": "有限热库到玻尔兹曼权重",
    "intro": "一个两能级系统面对有限热库，高能态可能根本不够能量访问。指数权重何时失效？先增大能隙，比较精确重数比与未扰动热库的一阶熵展开。",
    "simTitle": "有限热库到玻尔兹曼权重：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "热库振子数",
        "min": 2,
        "max": 80,
        "step": 1,
        "value": 10,
        "unit": ""
      },
      {
        "id": "Q",
        "label": "总能量量子数",
        "min": 0,
        "max": 100,
        "step": 1,
        "value": 20,
        "unit": ""
      },
      {
        "id": "gap",
        "label": "两能级能隙",
        "min": 1,
        "max": 20,
        "step": 1,
        "value": 4,
        "unit": "ℏω"
      }
    ],
    "goal": "热库不允许的能量分支概率严格0；增大热库后比较正则近似误差。",
    "math": "P(E_s)∝Ω_b(E_tot−E_s)；lnΩ_b的一阶展开给exp(−βE_s)。",
    "modelNote": "有限Einstein热库、两能级能隙为整数能量量子；温度定义须说明离散导数。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "保留熵展开二阶项，关联热库有限热容与正则权重的误差。",
      "check": "βΔ 在本页是 [lnΩ(Q+1)−lnΩ(Q)]×gap；二阶熵项一般非零。若 gap>Q 精确 p=0，正则近似仍可能非零。"
    },
    "reflection": "小系统接触有限热库时，指数权重为何只是近似？ 请先写出预测，再结合核验表中的独立条件解释；保留熵展开二阶项，关联热库有限热容与正则权重的误差。",
    "prediction": {
      "q": "两能级能隙大于有限热库全部能量，精确激发概率？",
      "options": [
        "仍按正则近似取非零",
        "严格为 0",
        "等于 1/2"
      ],
      "correct": 1,
      "explain": "剩余热库能量为负，该复合分支不可访问；正则展开不再保证可用。"
    },
    "derive": {
      "q": "有限热库概率的精确权重是哪一项？",
      "options": [
        "exp(−βE_s)，对所有库都精确",
        "Ω_b(E_s)，忽略总能守恒",
        "Ω_b(E_tot−E_s)"
      ],
      "correct": 2,
      "explain": "系统能量增加必须从热库扣除，复合等概率由剩余库重数决定。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　小系统接触有限热库时，指数权重为何只是近似？ 一个两能级系统面对有限热库，高能态可能根本不够能量访问。指数权重何时失效？先增大能隙，比较精确重数比与未扰动热库的一阶熵展开。</p><p><b>列式理由</b>　用热库剩余能量的重数直接给精确概率；在固定热库能量处定义离散 β，再近似熵随系统能量的变化，不能反拟合两点让误差恒等于零。</p><p><b>关键一步</b>　P(E_s)∝Ω_b(E_tot−E_s)；lnΩ_b的一阶展开给exp(−βE_s)。</p><p><b>极限检验</b>　热库不允许的能量分支概率严格0；增大热库后比较正则近似误差。 βΔ 在本页是 [lnΩ(Q+1)−lnΩ(Q)]×gap；二阶熵项一般非零。若 gap>Q 精确 p=0，正则近似仍可能非零。</p>"
  },
  {
    "id": "TS4.3",
    "mapId": "TS4.3",
    "courseId": "thermal",
    "short": "热统 · TS4.3",
    "title": "粒子交换与巨正则系综",
    "intro": "在大气体中划出一个可交换粒子的子体积，每次记录的粒子数都不同。先调完整平均数，再缩短显示窗口，看看遗漏概率为何不能被悄悄重新归一。",
    "simTitle": "粒子交换与巨正则系综：模型与核验",
    "controls": [
      {
        "id": "z",
        "label": "完整分布平均粒子数 z",
        "min": 0.2,
        "max": 30,
        "step": 0.2,
        "value": 6,
        "unit": ""
      },
      {
        "id": "cut",
        "label": "显示最大粒子数",
        "min": 2,
        "max": 80,
        "step": 1,
        "value": 20,
        "unit": ""
      }
    ],
    "goal": "均值和方差相等；分布截断遗漏单列，不静默重新归一化。",
    "math": "Ξ=exp(z)，P(N)=e^(−z)z^N/N!，⟨N⟩=Var(N)=z。",
    "modelNote": "经典非相互作用、固定T,V,μ；z为无量纲单粒子活度总权重，不与逸度e^(βμ)混用。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "由Ξ对βμ求导得到均值和数目涨落，解释相互作用气体一般非Poisson。",
      "check": "由 lnΞ=z 与对 βμ 的导数得均值和方差同为 z。相互作用或粒子关联一般破坏 Poisson 结果；有限窗原权重必须保留。"
    },
    "reflection": "开放体系中粒子数为何也会涨落？ 请先写出预测，再结合核验表中的独立条件解释；由Ξ对βμ求导得到均值和数目涨落，解释相互作用气体一般非Poisson。",
    "prediction": {
      "q": "缩短 Poisson 显示窗口时，保留权重是否重新归一？",
      "options": [
        "必须除以保留概率和",
        "把尾部全部加在末点",
        "不重新归一，单列遗漏概率"
      ],
      "correct": 2,
      "explain": "窗口只是显示选择，重新归一会改变完整系综的概率。"
    },
    "derive": {
      "q": "经典理想子体积 Poisson 分布的方差是多少？",
      "options": [
        "等于均值 z",
        "等于 z²",
        "恒为 0"
      ],
      "correct": 0,
      "explain": "巨配分 lnΞ=z 对 βμ 的一、二阶导数都为 z。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　开放体系中粒子数为何也会涨落？ 在大气体中划出一个可交换粒子的子体积，每次记录的粒子数都不同。先调完整平均数，再缩短显示窗口，看看遗漏概率为何不能被悄悄重新归一。</p><p><b>列式理由</b>　经典独立粒子的巨配分函数为 exp(z)，按粒子数展开得到 Poisson 权重；z 含单粒子配分因子。</p><p><b>关键一步</b>　Ξ=exp(z)，P(N)=e^(−z)z^N/N!，⟨N⟩=Var(N)=z。</p><p><b>极限检验</b>　均值和方差相等；分布截断遗漏单列，不静默重新归一化。 由 lnΞ=z 与对 βμ 的导数得均值和方差同为 z。相互作用或粒子关联一般破坏 Poisson 结果；有限窗原权重必须保留。</p>"
  },
  {
    "id": "TS4.4",
    "mapId": "TS4.4",
    "courseId": "thermal",
    "short": "热统 · TS4.4",
    "title": "系综等价与相对涨落",
    "intro": "大系统更稳定是否意味着绝对涨落也更小？先固定激发概率增大 N，再分别看总能量标准差和标准差占平均能量的比例。",
    "simTitle": "系综等价与相对涨落：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "独立两态粒子数 N",
        "min": 2,
        "max": 200,
        "step": 2,
        "value": 40,
        "unit": ""
      },
      {
        "id": "prob",
        "label": "单粒子激发概率 p",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.3,
        "unit": ""
      }
    ],
    "goal": "p>0固定时相对涨落∝N^(−1/2)；p=0均值为0时相对量未定义。",
    "math": "Var(E)=NΔ²p(1−p)，σ_E/⟨E⟩=√[(1−p)/(Np)]。",
    "modelNote": "比较指定可加独立模型；不宣称所有长程系统及相变点普遍系综等价。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "区分绝对涨落增长与相对涨落下降，并分析低温Np不大的稀有激发区。",
      "check": "σE∝√N 而 σE/⟨E⟩∝N^−1/2；稀有激发 Np 不大时相对涨落未必小。p=0 平均能量为零，相对量无定义。"
    },
    "reflection": "宏观体系涨落小，是否意味着微观涨落不存在？ 请先写出预测，再结合核验表中的独立条件解释；区分绝对涨落增长与相对涨落下降，并分析低温Np不大的稀有激发区。",
    "prediction": {
      "q": "固定 0<p<1 增大 N，相对能量涨落如何变化？",
      "options": [
        "按 N^−1/2 下降",
        "保持不变",
        "按 N 增长"
      ],
      "correct": 0,
      "explain": "方差正比 N 而均值正比 N，因此标准差与均值的比下降。"
    },
    "derive": {
      "q": "能隙 Δ 的 N 个独立二态系统，能量方差？",
      "options": [
        "N²Δ²p",
        "NΔ²p(1−p)",
        "NΔp"
      ],
      "correct": 1,
      "explain": "独立 Bernoulli 方差相加，每项能量乘 Δ 因而方差乘 Δ²。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　宏观体系涨落小，是否意味着微观涨落不存在？ 大系统更稳定是否意味着绝对涨落也更小？先固定激发概率增大 N，再分别看总能量标准差和标准差占平均能量的比例。</p><p><b>列式理由</b>　独立可加能量使均值和方差均正比 N；标准差只按 √N 增长，因而相对涨落下降。</p><p><b>关键一步</b>　Var(E)=NΔ²p(1−p)，σ_E/⟨E⟩=√[(1−p)/(Np)]。</p><p><b>极限检验</b>　p>0固定时相对涨落∝N^(−1/2)；p=0均值为0时相对量未定义。 σE∝√N 而 σE/⟨E⟩∝N^−1/2；稀有激发 Np 不大时相对涨落未必小。p=0 平均能量为零，相对量无定义。</p>"
  }
];
});
