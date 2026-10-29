/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS6Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS6.1",
    "mapId": "TS6.1",
    "courseId": "thermal",
    "short": "热统 · TS6.1",
    "title": "速度分量与速率分布",
    "intro": "测速器能记录正负速度分量，也能只报告三维速率。两张直方图为何形状不同？先调温度和粒子质量，比较三个速率尺度与一维宽度。",
    "simTitle": "速度分量与速率分布：模型与核验",
    "controls": [
      {
        "id": "T",
        "label": "温度 T",
        "min": 10,
        "max": 10000,
        "step": 10,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "mass",
        "label": "单粒子质量",
        "min": 1,
        "max": 40,
        "step": 1,
        "value": 1,
        "unit": "u"
      }
    ],
    "goal": "两分布分别归一；v_mp<⟨v⟩<v_rms；有限画窗遗漏单列。",
    "math": "f(v)=4π[m/(2πk_BT)]^(3/2)v²e^(−mv²/(2k_BT))；分量方差k_BT/m。",
    "modelNote": "非相对论经典理想气体；速度m/s，密度单位s/m；粒子质量不得混用mol质量。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "独立求三个速率尺度及二阶矩，解释三维相空间壳层因子v²。",
      "check": "积分速率分布得 vmp=√(2kBT/m)、⟨v⟩=√(8kBT/πm)、vrms=√(3kBT/m)。每分量二阶矩 kBT/m。"
    },
    "reflection": "最概然速率、平均速率和均方根速率相同吗？ 请先写出预测，再结合核验表中的独立条件解释；独立求三个速率尺度及二阶矩，解释三维相空间壳层因子v²。",
    "prediction": {
      "q": "同温气体质量增为四倍，所有特征热速率如何变？",
      "options": [
        "变为 2 倍",
        "保持不变",
        "变为 1/2"
      ],
      "correct": 2,
      "explain": "热速率均正比于 √(kBT/m)，粒子质量不能误用为 mol 质量。"
    },
    "derive": {
      "q": "三维速率分布比一维 Gaussian 多出什么因子？",
      "options": [
        "速度空间球壳测度 4πv²",
        "额外温度平方，且无速度因子",
        "任意归一常数即可"
      ],
      "correct": 0,
      "explain": "对速度向量的角度积分会得到球壳面积，改变形状而非只改常数。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　最概然速率、平均速率和均方根速率相同吗？ 测速器能记录正负速度分量，也能只报告三维速率。两张直方图为何形状不同？先调温度和粒子质量，比较三个速率尺度与一维宽度。</p><p><b>列式理由</b>　三维 Maxwell 权重可分成三个 Gaussian 分量；改用速率后必须计入速度空间球壳 4πv² 的测度。</p><p><b>关键一步</b>　f(v)=4π[m/(2πk_BT)]^(3/2)v²e^(−mv²/(2k_BT))；分量方差k_BT/m。</p><p><b>极限检验</b>　两分布分别归一；v_mp<⟨v⟩<v_rms；有限画窗遗漏单列。 积分速率分布得 vmp=√(2kBT/m)、⟨v⟩=√(8kBT/πm)、vrms=√(3kBT/m)。每分量二阶矩 kBT/m。</p>"
  },
  {
    "id": "TS6.2",
    "mapId": "TS6.2",
    "courseId": "thermal",
    "short": "热统 · TS6.2",
    "title": "能量均分与量子冻结",
    "intro": "经典均分给每个二次项 kBT/2，但低温分子振动似乎停住了。先对照平动与振动，再把热能与量子能隙比较，检查什么时候可用经典结果。",
    "simTitle": "能量均分与量子冻结：模型与核验",
    "controls": [
      {
        "id": "T",
        "label": "温度 T",
        "min": 10,
        "max": 3000,
        "step": 10,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "theta",
        "label": "振动温度 θv",
        "min": 100,
        "max": 5000,
        "step": 100,
        "value": 1000,
        "unit": "K"
      }
    ],
    "goal": "三维平动U=3Nk_BT/2；单振动高温C→Nk_B、低温冻结。",
    "math": "每个独立二次项贡献k_BT/2；振动同时含动能与势能二次项。",
    "modelNote": "稀薄非相对论气体；把模式数与二次项数分开；忽略相互作用和化学反应。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从Gaussian积分推能量均分，并用转动与振动量子尺度估计适用温区。",
      "check": "经典 Gaussian 积分给每二次项 kBT/2；单振动高温热容 NkB、低温指数冻结。三维平动为 3NkB/2，不是 3NkB。"
    },
    "reflection": "每个模式总能贡献k_BT吗？ 请先写出预测，再结合核验表中的独立条件解释；从Gaussian积分推能量均分，并用转动与振动量子尺度估计适用温区。",
    "prediction": {
      "q": "一个一维振动高温时的热容是多少？",
      "options": [
        "每粒子 kB",
        "每粒子 kB/2",
        "每粒子 3kB/2"
      ],
      "correct": 0,
      "explain": "振动含动能、势能两个独立二次项，热容为 kB。"
    },
    "derive": {
      "q": "能量均分中每个独立二次项的平均能量？",
      "options": [
        "kBT",
        "kBT/2",
        "3kBT/2"
      ],
      "correct": 1,
      "explain": "均分针对哈密顿量中的每一独立二次项，不是每个模式一概同值。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　每个模式总能贡献k_BT吗？ 经典均分给每个二次项 kBT/2，但低温分子振动似乎停住了。先对照平动与振动，再把热能与量子能隙比较，检查什么时候可用经典结果。</p><p><b>列式理由</b>　振动坐标同时含动能和势能两个二次项；量子能级间隔使小于能隙的热能难以激发该模式。</p><p><b>关键一步</b>　每个独立二次项贡献k_BT/2；振动同时含动能与势能二次项。</p><p><b>极限检验</b>　三维平动U=3Nk_BT/2；单振动高温C→Nk_B、低温冻结。 经典 Gaussian 积分给每二次项 kBT/2；单振动高温热容 NkB、低温指数冻结。三维平动为 3NkB/2，不是 3NkB。</p>"
  },
  {
    "id": "TS6.3",
    "mapId": "TS6.3",
    "courseId": "thermal",
    "short": "热统 · TS6.3",
    "title": "压强与视线热速度",
    "intro": "同一团氢气既给容器施压，也给 H I 谱线带来热宽。先调温度与质量，再检查压强和谱线标准差是否来自同一个视线速度二阶矩。",
    "simTitle": "压强与视线热速度：模型与核验",
    "controls": [
      {
        "id": "T",
        "label": "温度 T",
        "min": 10,
        "max": 10000,
        "step": 10,
        "value": 100,
        "unit": "K"
      },
      {
        "id": "mass",
        "label": "单粒子质量",
        "min": 1,
        "max": 40,
        "step": 1,
        "value": 1,
        "unit": "u"
      },
      {
        "id": "logn",
        "label": "log10 数密度 n",
        "min": 2,
        "max": 20,
        "step": 1,
        "value": 6,
        "unit": "m⁻³"
      }
    ],
    "goal": "压强用三维各向同性和一维分量；FWHM不等于σ；质量增加线宽减小。",
    "math": "P=nm⟨v_z²⟩=nk_BT；σ_v=√(k_BT/m)，FWHM=2√(2ln2)σ_v。",
    "modelNote": "n为数密度m⁻³；热速度m/s或明确km/s；纯热光薄Gaussian，不含湍流、仪器及辐射转移。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "推导H I温度上限与线宽关系，说明非热宽化时为何只能给上限。",
      "check": "T≤m(ΔvFWHM)²/(8ln2 kB) 是加入非热展宽后的上限，仅在独立 Gaussian 方差可加等条件下解释；不能把所有观测线型当纯热。"
    },
    "reflection": "三维热运动怎样同时决定压强和一维谱线宽？ 请先写出预测，再结合核验表中的独立条件解释；推导H I温度上限与线宽关系，说明非热宽化时为何只能给上限。",
    "prediction": {
      "q": "纯热 Gaussian 线宽 FWHM 与一维 σ 的关系？",
      "options": [
        "FWHM=σ",
        "FWHM=2√(2ln2)σ",
        "FWHM=3σ"
      ],
      "correct": 1,
      "explain": "在半峰处 Gaussian 指数为 −ln2，两侧间距给该系数。"
    },
    "derive": {
      "q": "动理学压强的正确形式是？",
      "options": [
        "P=nm⟨v²⟩，无需 1/3",
        "P=nkB/T",
        "P=nm⟨vz²⟩=nkBT"
      ],
      "correct": 2,
      "explain": "各向同性使 ⟨vz²⟩=⟨v²⟩/3；n 是数密度。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　三维热运动怎样同时决定压强和一维谱线宽？ 同一团氢气既给容器施压，也给 H I 谱线带来热宽。先调温度与质量，再检查压强和谱线标准差是否来自同一个视线速度二阶矩。</p><p><b>列式理由</b>　各向同性动量通量只需一个分量方差；纯热光薄谱线正是该视线速度 Gaussian 的映射，FWHM 与 σ 有固定比例。</p><p><b>关键一步</b>　P=nm⟨v_z²⟩=nk_BT；σ_v=√(k_BT/m)，FWHM=2√(2ln2)σ_v。</p><p><b>极限检验</b>　压强用三维各向同性和一维分量；FWHM不等于σ；质量增加线宽减小。 T≤m(ΔvFWHM)²/(8ln2 kB) 是加入非热展宽后的上限，仅在独立 Gaussian 方差可加等条件下解释；不能把所有观测线型当纯热。</p>"
  },
  {
    "id": "TS6.4",
    "mapId": "TS6.4",
    "courseId": "thermal",
    "short": "热统 · TS6.4",
    "title": "相空间密度与经典适用边界",
    "intro": "把气体降温或压密，粒子的波包开始彼此重叠。稀薄是否足以保证经典统计？先计算热波长，再改变温度和数密度比较相空间占据。",
    "simTitle": "相空间密度与经典适用边界：模型与核验",
    "controls": [
      {
        "id": "T",
        "label": "温度 T",
        "min": 0.1,
        "max": 10000,
        "step": 0.1,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "mass",
        "label": "单粒子质量",
        "min": 1,
        "max": 40,
        "step": 1,
        "value": 1,
        "unit": "u"
      },
      {
        "id": "logn",
        "label": "log10 数密度 n",
        "min": 10,
        "max": 30,
        "step": 1,
        "value": 25,
        "unit": "m⁻³"
      },
      {
        "id": "g",
        "label": "内部简并度 g",
        "min": 1,
        "max": 4,
        "step": 1,
        "value": 1,
        "unit": ""
      }
    ],
    "goal": "降温或增密使量子效应增强；超界只提示经典近似失效，不裁剪参数。",
    "math": "λ_th=h/√(2πmk_BT)，非简并要求nλ_th³/g≪1。",
    "modelNote": "三维非相对论理想气体；λ单位m、n单位m⁻³，g为内部简并度。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "联系Sackur–Tetrode熵的经典条件，解释负的经典外推熵不能直接当物理结果。",
      "check": "Sackur–Tetrode 经典熵仅在 nλ³/g≪1 有效；负的经典外推熵提示越界，不是物理负熵证明。需采用正确量子统计。"
    },
    "reflection": "气体很稀薄就一定可以忽略量子统计吗？ 请先写出预测，再结合核验表中的独立条件解释；联系Sackur–Tetrode熵的经典条件，解释负的经典外推熵不能直接当物理结果。",
    "prediction": {
      "q": "固定 n,m,g 降低温度，nλ³/g 怎样变化？",
      "options": [
        "减小，更经典",
        "保持不变",
        "增大，更需量子统计"
      ],
      "correct": 2,
      "explain": "λ∝T^−1/2，因此相空间占据正比 T^−3/2。"
    },
    "derive": {
      "q": "热德布罗意波长是多少？",
      "options": [
        "h/√(2πmkBT)",
        "h/(mkBT)",
        "√(2πmkBT)/h"
      ],
      "correct": 0,
      "explain": "需有长度量纲，经典相空间单态计数给 2π 因子。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　气体很稀薄就一定可以忽略量子统计吗？ 把气体降温或压密，粒子的波包开始彼此重叠。稀薄是否足以保证经典统计？先计算热波长，再改变温度和数密度比较相空间占据。</p><p><b>列式理由</b>　经典统计需要每个内部态的平均相空间占据远小于一；质量、温度及内部简并度共同决定波长与可用态数。</p><p><b>关键一步</b>　λ_th=h/√(2πmk_BT)，非简并要求nλ_th³/g≪1。</p><p><b>极限检验</b>　降温或增密使量子效应增强；超界只提示经典近似失效，不裁剪参数。 Sackur–Tetrode 经典熵仅在 nλ³/g≪1 有效；负的经典外推熵提示越界，不是物理负熵证明。需采用正确量子统计。</p>"
  }
];
});
