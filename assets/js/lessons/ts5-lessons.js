/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS5Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "thermal",
    "mapId": "TS5.1",
    "courseId": "thermal",
    "short": "热统 · TS5.1",
    "title": "两能级与配分函数",
    "intro": "只用一个两能级系统，观察温度如何改变占据概率、平均能量和熵。",
    "simTitle": "两能级与配分函数：模型与核验",
    "controls": [
      {
        "id": "x",
        "label": "能级差 / 热能 Δ/(kBT)",
        "min": 0.2,
        "max": 6,
        "step": 0.1,
        "value": 2,
        "unit": ""
      }
    ],
    "goal": "x→0时p_1→1/2、S/k_B→ln2；x→∞时趋唯一基态。",
    "math": "Z=1+e^(−x)，p_1=1/(1+e^x)，U=Δp_1，S/k_B=lnZ+xp_1。",
    "modelNote": "单个非简并两能级，E=0、Δ>0；x不是独立T与Δ，U/Δ和S/k_B无量纲。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "推导C/k_B=x²p_1(1−p_1)，找到Schottky峰并解释高低温热容均趋0。",
      "check": "C/kB=x²p1(1−p1)，对 x 求导找 Schottky 峰约 x=2.3994；高低温均趋零，但激发态只在高温趋半占据。"
    },
    "reflection": "温度改变时，激发态为何最多趋于半占据？ 请先写出预测，再结合核验表中的独立条件解释；推导C/k_B=x²p_1(1−p_1)，找到Schottky峰并解释高低温热容均趋0。",
    "prediction": {
      "q": "固定能级差 Δ>0，逐渐提高温度 T，激发态的平衡占据率会如何变化？",
      "options": [
        "单调增大并趋于 1/2",
        "单调增大并趋于 1",
        "单调减小并趋于 0"
      ],
      "correct": 0,
      "explain": "p₁=1/(1+e^(Δ/kBT))；T 增大时 x=Δ/(kBT) 减小，p₁ 由接近 0 趋于 1/2。"
    },
    "derive": {
      "q": "对 Z=1+e^(−βΔ)，平均能量 ⟨E⟩=−∂lnZ/∂β 等于？",
      "options": [
        "Δ/(1+e^(−βΔ))",
        "Δ·e^(−βΔ)",
        "Δ/(1+e^(βΔ))"
      ],
      "correct": 2,
      "explain": "⟨E⟩=Δe^(−βΔ)/(1+e^(−βΔ))=Δ/(1+e^(βΔ))，即激发态能量乘其占据概率。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　温度改变时，激发态为何最多趋于半占据？ 只用一个两能级系统，观察温度如何改变占据概率、平均能量和熵。</p><p><b>列式理由</b>　正则系综按 e^−βE 加权；Z 既保证归一，也把能量与熵联系到同一个生成函数。</p><p><b>关键一步</b>　Z=1+e^(−x)，p_1=1/(1+e^x)，U=Δp_1，S/k_B=lnZ+xp_1。</p><p><b>极限检验</b>　x→0时p_1→1/2、S/k_B→ln2；x→∞时趋唯一基态。 C/kB=x²p1(1−p1)，对 x 求导找 Schottky 峰约 x=2.3994；高低温均趋零，但激发态只在高温趋半占据。</p>"
  },
  {
    "id": "TS5.2",
    "mapId": "TS5.2",
    "courseId": "thermal",
    "short": "热统 · TS5.2",
    "title": "量子谐振子的热激发",
    "intro": "量子振子即使在最低温仍有零点能，这是否意味着热容也不为零？先改变 ℏω/kBT，分清总能量与可随温度变化的热激发部分。",
    "simTitle": "量子谐振子的热激发：模型与核验",
    "controls": [
      {
        "id": "x",
        "label": "ℏω/(kBT)",
        "min": 0.1,
        "max": 12,
        "step": 0.1,
        "value": 2,
        "unit": ""
      }
    ],
    "goal": "低温U→ℏω/2、C→0；高温C→k_B；区分总能与去零点热能。",
    "math": "Z=e^(−x/2)/(1−e^(−x))，U=ℏω[1/2+1/(e^x−1)]。",
    "modelNote": "单个理想量子振子；能量按ℏω缩放，热容C/k_B；无截断伪高温。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从lnZ独立求S和C，用能量方差复核C；说明振子频率改变时何者算功。",
      "check": "lnZ=−x/2−ln(1−e^−x)，热容由能量方差或 −x²∂(U/ℏω)/∂x 得到。频率改变可对系统做功，不可混作升温。"
    },
    "reflection": "零点能为什么不会增加热容？ 请先写出预测，再结合核验表中的独立条件解释；从lnZ独立求S和C，用能量方差复核C；说明振子频率改变时何者算功。",
    "prediction": {
      "q": "振子零点能 ℏω/2 是否贡献固定频率下的热容？",
      "options": [
        "贡献恒定 kB/2",
        "导致低温热容发散",
        "不贡献，它与温度无关"
      ],
      "correct": 2,
      "explain": "C 是固定频率时 U 对 T 的导数，常数零点项导数为零。"
    },
    "derive": {
      "q": "振子高温 x≪1 时 C/kB 趋于多少？",
      "options": [
        "1",
        "1/2",
        "0"
      ],
      "correct": 0,
      "explain": "x²e^x/(e^x−1)² 的小 x 极限为 1。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　零点能为什么不会增加热容？ 量子振子即使在最低温仍有零点能，这是否意味着热容也不为零？先改变 ℏω/kBT，分清总能量与可随温度变化的热激发部分。</p><p><b>列式理由</b>　等间距无限能谱使玻尔兹曼和成为等比级数；温度无关的零点常数改变总能量而不改变其温度导数。</p><p><b>关键一步</b>　Z=e^(−x/2)/(1−e^(−x))，U=ℏω[1/2+1/(e^x−1)]。</p><p><b>极限检验</b>　低温U→ℏω/2、C→0；高温C→k_B；区分总能与去零点热能。 lnZ=−x/2−ln(1−e^−x)，热容由能量方差或 −x²∂(U/ℏω)/∂x 得到。频率改变可对系统做功，不可混作升温。</p>"
  },
  {
    "id": "TS5.3",
    "mapId": "TS5.3",
    "courseId": "thermal",
    "short": "热统 · TS5.3",
    "title": "独立磁矩与顺磁响应",
    "intro": "一个磁矩在外磁场中有两种能量。提高磁场或降低温度会怎样重分配取向？先反转 B，检查总磁矩是否反号，再比较弱场线性与饱和。",
    "simTitle": "独立磁矩与顺磁响应：模型与核验",
    "controls": [
      {
        "id": "B",
        "label": "磁场 B",
        "min": -10,
        "max": 10,
        "step": 0.2,
        "value": 2,
        "unit": "T"
      },
      {
        "id": "T",
        "label": "温度 T",
        "min": 1,
        "max": 30,
        "step": 1,
        "value": 5,
        "unit": "K"
      },
      {
        "id": "logN",
        "label": "log10 磁矩数 N",
        "min": 1,
        "max": 23,
        "step": 1,
        "value": 20,
        "unit": ""
      }
    ],
    "goal": "B=0磁化0；低场M≈Nμ²B/(k_BT)；B反号M反号。",
    "math": "E_s=−μBs，Z_1=2cosh(βμB)，M=Nμtanh(βμB)。",
    "modelNote": "独立经典取向二值磁矩，μ单位J/T，M为总磁矩J/T；不是每体积磁化强度。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "推导Curie响应和C_B，区分微观单磁矩、总磁矩及体积磁化强度。",
      "check": "低场 M≈Nμ²B/(kBT)，C_B/(NkB)=y²sech²y。偏导必须固定 B；场源做功和磁场能的系统边界需单独定义。"
    },
    "reflection": "磁场增强为何能改变占据、能量和磁化？ 请先写出预测，再结合核验表中的独立条件解释；推导Curie响应和C_B，区分微观单磁矩、总磁矩及体积磁化强度。",
    "prediction": {
      "q": "独立二值磁矩在 B=0 且 T>0 时总磁矩平均值？",
      "options": [
        "0",
        "Nμ",
        "−Nμ"
      ],
      "correct": 0,
      "explain": "两个取向等概率，平均有符号磁矩相消；不是每个构型都无磁矩。"
    },
    "derive": {
      "q": "弱场独立磁矩的总响应 dM/dB 是？",
      "options": [
        "Nμ/(kBT)",
        "Nμ²/(kBT)",
        "Nμ²kBT"
      ],
      "correct": 1,
      "explain": "把 tanh y 展开为 y，M≈Nμ²B/(kBT)。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　磁场增强为何能改变占据、能量和磁化？ 一个磁矩在外磁场中有两种能量。提高磁场或降低温度会怎样重分配取向？先反转 B，检查总磁矩是否反号，再比较弱场线性与饱和。</p><p><b>列式理由</b>　单磁矩能量为 −μBs；两个取向的配分和给 tanh 响应。M 是所有磁矩求和，其量纲不同于每单位体积磁化强度。</p><p><b>关键一步</b>　E_s=−μBs，Z_1=2cosh(βμB)，M=Nμtanh(βμB)。</p><p><b>极限检验</b>　B=0磁化0；低场M≈Nμ²B/(k_BT)；B反号M反号。 低场 M≈Nμ²B/(kBT)，C_B/(NkB)=y²sech²y。偏导必须固定 B；场源做功和磁场能的系统边界需单独定义。</p>"
  },
  {
    "id": "TS5.4",
    "mapId": "TS5.4",
    "courseId": "thermal",
    "short": "热统 · TS5.4",
    "title": "转动配分函数与数值截断",
    "intro": "温度升高后，固定几个转动能级可能不够用。热容下降是量子冻结还是算法漏掉高能级？先保持小截断升温，再增加截断与大窗口参考比较。",
    "simTitle": "转动配分函数与数值截断：模型与核验",
    "controls": [
      {
        "id": "t",
        "label": "温度 T/θr",
        "min": 0.1,
        "max": 30,
        "step": 0.1,
        "value": 3,
        "unit": ""
      },
      {
        "id": "cut",
        "label": "当前截断 l_max",
        "min": 0,
        "max": 30,
        "step": 1,
        "value": 5,
        "unit": ""
      }
    ],
    "goal": "低温C→0、高温经典C→k_B；固定小截断的虚假下降须标为截断失效。",
    "math": "E_l=k_Bθ_r l(l+1)，Z=Σ(2l+1)e^(−E_l/k_BT)。",
    "modelNote": "异核线性刚性转子；忽略核自旋统计、振动和离心畸变；θ_r单位K。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "用更大独立截断及积分近似检查收敛，解释同核分子奇偶限制为何改变结果。",
      "check": "以自适应 l_ref 使 exp[−l(l+1)/t] 极小，并用尾积分估计复核；高温 C→kB。低截断热容的假下降不代表物理。"
    },
    "reflection": "增加温度时，何时必须保留更多转动能级？ 请先写出预测，再结合核验表中的独立条件解释；用更大独立截断及积分近似检查收敛，解释同核分子奇偶限制为何改变结果。",
    "prediction": {
      "q": "高温时固定很小 l_max 得到热容下降，首先该怀疑什么？",
      "options": [
        "真实转子必然量子冻结",
        "转动能谱截断不足",
        "能量均分在所有高温必然失效"
      ],
      "correct": 1,
      "explain": "有限能级人工饱和会使热容降至零，必须比较大截断参考。"
    },
    "derive": {
      "q": "异核线性刚性转子第 l 能级简并度是多少？",
      "options": [
        "l+1",
        "始终为 1",
        "2l+1"
      ],
      "correct": 2,
      "explain": "给定 l 的磁量子数从 −l 到 l，共 2l+1 个态。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　增加温度时，何时必须保留更多转动能级？ 温度升高后，固定几个转动能级可能不够用。热容下降是量子冻结还是算法漏掉高能级？先保持小截断升温，再增加截断与大窗口参考比较。</p><p><b>列式理由</b>　刚性异核转子每个 l 有 2l+1 简并；在截断权重中归一会制造有限谱饱和，因此另用更大窗口评估遗漏。</p><p><b>关键一步</b>　E_l=k_Bθ_r l(l+1)，Z=Σ(2l+1)e^(−E_l/k_BT)。</p><p><b>极限检验</b>　低温C→0、高温经典C→k_B；固定小截断的虚假下降须标为截断失效。 以自适应 l_ref 使 exp[−l(l+1)/t] 极小，并用尾积分估计复核；高温 C→kB。低截断热容的假下降不代表物理。</p>"
  }
];
});
