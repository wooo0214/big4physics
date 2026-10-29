/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS2Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS2.1",
    "mapId": "TS2.1",
    "courseId": "thermal",
    "short": "热统 · TS2.1",
    "title": "自然变量与热力学势",
    "intro": "同一团气体被不同的实验装置约束：有的固定体积，有的接恒压热库。该比较哪个势？先切换势的自然变量，再观察加减 TS、PV 只是表示的变换。",
    "simTitle": "自然变量与热力学势：模型与核验",
    "controls": [
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "T",
        "label": "温度 T",
        "min": 100,
        "max": 1000,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "V",
        "label": "体积 V",
        "min": 0.005,
        "max": 0.1,
        "step": 0.005,
        "value": 0.02,
        "unit": "m³"
      },
      {
        "id": "kind",
        "type": "select",
        "label": "选择势",
        "value": 2,
        "options": [
          {
            "value": 0,
            "label": "U(S,V,N)"
          },
          {
            "value": 1,
            "label": "H(S,P,N)"
          },
          {
            "value": 2,
            "label": "F(T,V,N)"
          },
          {
            "value": 3,
            "label": "G(T,P,N)"
          }
        ]
      }
    ],
    "goal": "辨认各势的自然变量及能量单位，不把勒让德变换当物理过程。",
    "math": "F=U−TS，H=U+PV，G=U+PV−TS；dF=−SdT−PdV+μdN。",
    "modelNote": "简单可压缩、单组分平衡体系；熵零点需指定；能量J。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从dU=TdS−PdV+μdN独立推导其余三势微分。",
      "check": "dH=TdS+VdP+μdN；dF=−SdT−PdV+μdN；dG=−SdT+VdP+μdN。对应环境约束下才可使用极小判据。"
    },
    "reflection": "固定温度的实验为何更适合使用自由能？ 请先写出预测，再结合核验表中的独立条件解释；从dU=TdS−PdV+μdN独立推导其余三势微分。",
    "prediction": {
      "q": "固定 T,V,N 的封闭体系平衡，应比较什么？",
      "options": [
        "无条件比较内能 U",
        "Helmholtz 自由能 F",
        "只比较焓 H"
      ],
      "correct": 1,
      "explain": "固定 T,V,N 时，热库总熵判据对应 F 极小。"
    },
    "derive": {
      "q": "由 F=U−TS 与 dU=TdS−PdV+μdN，dF 等于？",
      "options": [
        "TdS−PdV",
        "+SdT+VdP",
        "−SdT−PdV+μdN"
      ],
      "correct": 2,
      "explain": "对 TS 求微分，TdS 抵消后留下 −SdT。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　固定温度的实验为何更适合使用自由能？ 同一团气体被不同的实验装置约束：有的固定体积，有的接恒压热库。该比较哪个势？先切换势的自然变量，再观察加减 TS、PV 只是表示的变换。</p><p><b>列式理由</b>　从基本关系 dU=TdS−PdV+μdN 出发，更换自然变量可消去不受控制的 S 或 V；这不是一次真实吸放热过程。</p><p><b>关键一步</b>　F=U−TS，H=U+PV，G=U+PV−TS；dF=−SdT−PdV+μdN。</p><p><b>极限检验</b>　辨认各势的自然变量及能量单位，不把勒让德变换当物理过程。 dH=TdS+VdP+μdN；dF=−SdT−PdV+μdN；dG=−SdT+VdP+μdN。对应环境约束下才可使用极小判据。</p>"
  },
  {
    "id": "TS2.2",
    "mapId": "TS2.2",
    "courseId": "thermal",
    "short": "热统 · TS2.2",
    "title": "热库约束与自由能极小",
    "intro": "两个可互换内部状态有不同能量。全部待在低能态是否总是最稳定？先调能差，再在组成轴上寻找能量收益与混合熵竞争后的最低点。",
    "simTitle": "热库约束与自由能极小：模型与核验",
    "controls": [
      {
        "id": "delta",
        "label": "能差 δ=Δ/(kBT)",
        "min": -6,
        "max": 6,
        "step": 0.2,
        "value": 2,
        "unit": ""
      },
      {
        "id": "x",
        "label": "当前 B 组分比例",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.3,
        "unit": ""
      }
    ],
    "goal": "0<x<1内F″>0；δ=0时平衡x=1/2；不要把有限温平衡等同最低内能。",
    "math": "F/(Nk_BT)=xlnx+(1−x)ln(1−x)+xδ；极小点由F′=0。",
    "modelNote": "无相互作用的二态组成、固定T,V,N；δ=Δ/(k_BT)，x无量纲。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "通过系统加热库总熵最大化推导F最小，并检查端点对数极限。",
      "check": "F′/(NkBT)=ln[x/(1−x)]+δ=0 给 xeq=1/(1+e^δ)；F″/(NkBT)=1/x+1/(1−x)>0，端点用 xlnx→0。"
    },
    "reflection": "平衡态是能量最低，还是自由能最低？ 请先写出预测，再结合核验表中的独立条件解释；通过系统加热库总熵最大化推导F最小，并检查端点对数极限。",
    "prediction": {
      "q": "δ=0 时自由能最低点在哪里？",
      "options": [
        "x=0，全部低能态",
        "x=1，全部高能态",
        "x=1/2"
      ],
      "correct": 2,
      "explain": "无能差时混合熵在等份组成达到最大，所以 F 最小。"
    },
    "derive": {
      "q": "由 ln[x/(1−x)]+δ=0，平衡组成是多少？",
      "options": [
        "1/(1+e^δ)",
        "1/(1+e^−δ)",
        "e^−δ，始终无需归一"
      ],
      "correct": 0,
      "explain": "先求 x/(1−x)=e^−δ，再解 x，需要归一分母。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　平衡态是能量最低，还是自由能最低？ 两个可互换内部状态有不同能量。全部待在低能态是否总是最稳定？先调能差，再在组成轴上寻找能量收益与混合熵竞争后的最低点。</p><p><b>列式理由</b>　固定 T,V,N 时系统加热库总熵最大等价于 F 最小；内部态排列的混合熵与能量项竞争。</p><p><b>关键一步</b>　F/(Nk_BT)=xlnx+(1−x)ln(1−x)+xδ；极小点由F′=0。</p><p><b>极限检验</b>　0<x<1内F″>0；δ=0时平衡x=1/2；不要把有限温平衡等同最低内能。 F′/(NkBT)=ln[x/(1−x)]+δ=0 给 xeq=1/(1+e^δ)；F″/(NkBT)=1/x+1/(1−x)>0，端点用 xlnx→0。</p>"
  },
  {
    "id": "TS2.3",
    "mapId": "TS2.3",
    "courseId": "thermal",
    "short": "热统 · TS2.3",
    "title": "麦克斯韦关系与交叉导数",
    "intro": "压强很容易测量，熵却不能直接读出。能否通过升温时的压强变化推知熵的体积变化？先对照两侧解析值，再缩小差分步长观察误差。",
    "simTitle": "麦克斯韦关系与交叉导数：模型与核验",
    "controls": [
      {
        "id": "n",
        "label": "物质的量 n",
        "min": 0.5,
        "max": 2,
        "step": 0.5,
        "value": 1,
        "unit": "mol"
      },
      {
        "id": "T",
        "label": "温度 T",
        "min": 100,
        "max": 1000,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "V",
        "label": "体积 V",
        "min": 0.005,
        "max": 0.1,
        "step": 0.005,
        "value": 0.02,
        "unit": "m³"
      },
      {
        "id": "logStep",
        "label": "log10 相对差分步长",
        "min": -10,
        "max": -1,
        "step": 0.5,
        "value": -3,
        "unit": ""
      }
    ],
    "goal": "两侧均为nR/V；减小步长不保证浮点误差单调下降。",
    "math": "dF=−SdT−PdV的混合偏导相等，给(∂S/∂V)_T=(∂P/∂T)_V。",
    "modelNote": "平衡可微单相区域；导数单位Pa/K；差分步长带相应单位。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "独立推导四类麦克斯韦关系，说明相边界不可直接沿用光滑偏导假设。",
      "check": "F_TV=F_VT 导出 (∂S/∂V)T=(∂P/∂T)V=nR/V。相边界须先检查可微性；小步长会出现相减消去。"
    },
    "reflection": "可测压强导数怎样给出熵的体积导数？ 请先写出预测，再结合核验表中的独立条件解释；独立推导四类麦克斯韦关系，说明相边界不可直接沿用光滑偏导假设。",
    "prediction": {
      "q": "持续缩小差分步长，误差一定下降吗？",
      "options": [
        "不一定，浮点相减误差可占优",
        "一定，步长越小越精确",
        "误差完全与步长无关"
      ],
      "correct": 0,
      "explain": "截断误差下降后会遇到浮点消去，需要解析基准复核。"
    },
    "derive": {
      "q": "理想气体的两侧麦克斯韦导数共同等于？",
      "options": [
        "nRT/V",
        "nR/V",
        "−nR/V"
      ],
      "correct": 1,
      "explain": "P=nRT/V，对 T 的定容导数为 nR/V，单位 Pa/K。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　可测压强导数怎样给出熵的体积导数？ 压强很容易测量，熵却不能直接读出。能否通过升温时的压强变化推知熵的体积变化？先对照两侧解析值，再缩小差分步长观察误差。</p><p><b>列式理由</b>　自由能在光滑单相区域的混合偏导可交换，负熵与负压强同为它的一阶导数，因此交叉偏导带相同符号。</p><p><b>关键一步</b>　dF=−SdT−PdV的混合偏导相等，给(∂S/∂V)_T=(∂P/∂T)_V。</p><p><b>极限检验</b>　两侧均为nR/V；减小步长不保证浮点误差单调下降。 F_TV=F_VT 导出 (∂S/∂V)T=(∂P/∂T)V=nR/V。相边界须先检查可微性；小步长会出现相减消去。</p>"
  },
  {
    "id": "TS2.4",
    "mapId": "TS2.4",
    "courseId": "thermal",
    "short": "热统 · TS2.4",
    "title": "化学势与组成平衡",
    "intro": "A 与 B 可以互相转化，却不能凭空增加总粒子数。转化何时停止？先调标准自由能差与温度，找到 G 的斜率为零的位置，并核对化学势差。",
    "simTitle": "化学势与组成平衡：模型与核验",
    "controls": [
      {
        "id": "T",
        "label": "温度 T",
        "min": 100,
        "max": 1000,
        "step": 25,
        "value": 300,
        "unit": "K"
      },
      {
        "id": "gap",
        "label": "标准自由能差 Δg⁰/kB",
        "min": -1200,
        "max": 1200,
        "step": 50,
        "value": 400,
        "unit": "K"
      },
      {
        "id": "x",
        "label": "当前 B 组分比例",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.3,
        "unit": ""
      }
    ],
    "goal": "Δg⁰=0给x=1/2；平衡化学势相等且G取全局极小。",
    "math": "G/(Nk_BT)=xlnx+(1−x)ln(1−x)+xΔg⁰/(k_BT)；μ_B−μ_A=∂G/∂N_B。",
    "modelNote": "固定T,P、总粒子数的理想二组分A↔B；μ按每粒子J，不与摩尔化学势混用。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "推导平衡常数与标准化学势之差，说明改变标准态不能改变物理预测。",
      "check": "令 Δμ=Δg⁰+kBTln[x/(1−x)]=0，得到 x/(1−x)=exp(−Δg⁰/kBT)。每粒子化学势用 J，摩尔形式才用 RT。"
    },
    "reflection": "两种可互转状态在何种组成下不再净转化？ 请先写出预测，再结合核验表中的独立条件解释；推导平衡常数与标准化学势之差，说明改变标准态不能改变物理预测。",
    "prediction": {
      "q": "固定正 Δg⁰，提高 T 后 B 的平衡比例如何变化？",
      "options": [
        "增大并趋近 1",
        "增大并趋近 1/2",
        "必定下降至 0"
      ],
      "correct": 1,
      "explain": "正能差下 B 不利，升温削弱能差与热能比，混合熵的作用增强。"
    },
    "derive": {
      "q": "理想 A↔B 的平衡条件是什么？",
      "options": [
        "μB+μA=0",
        "只有内能最小即可",
        "μB−μA=0"
      ],
      "correct": 2,
      "explain": "固定总 N 下 dG=(μB−μA)dNB，内部平衡要求斜率为零。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　两种可互转状态在何种组成下不再净转化？ A 与 B 可以互相转化，却不能凭空增加总粒子数。转化何时停止？先调标准自由能差与温度，找到 G 的斜率为零的位置，并核对化学势差。</p><p><b>列式理由</b>　固定 T,P 与总 N 时，从 A 转一个粒子到 B 的势变化为 μB−μA；标准态能差与组成对数共同决定平衡。</p><p><b>关键一步</b>　G/(Nk_BT)=xlnx+(1−x)ln(1−x)+xΔg⁰/(k_BT)；μ_B−μ_A=∂G/∂N_B。</p><p><b>极限检验</b>　Δg⁰=0给x=1/2；平衡化学势相等且G取全局极小。 令 Δμ=Δg⁰+kBTln[x/(1−x)]=0，得到 x/(1−x)=exp(−Δg⁰/kBT)。每粒子化学势用 J，摩尔形式才用 RT。</p>"
  }
];
});
