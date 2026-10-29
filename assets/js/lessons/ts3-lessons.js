/* Four original evidence-led lessons. Stable IDs preserve existing thermal progress. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.TS3Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
return [
  {
    "id": "TS3.1",
    "mapId": "TS3.1",
    "courseId": "thermal",
    "short": "热统 · TS3.1",
    "title": "从微观排列到宏观概率",
    "intro": "把一排带编号的二态对象逐个翻转，只有总激发数进入宏观记录。中间的宏观态为何常见？先选 N 和 n，把一个宏观结果背后的微观排列数算出来。",
    "simTitle": "从微观排列到宏观概率：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "可区分二态数 N",
        "min": 2,
        "max": 100,
        "step": 1,
        "value": 20,
        "unit": ""
      },
      {
        "id": "fraction",
        "label": "请求激发比例 n/N",
        "min": 0,
        "max": 1,
        "step": 0.02,
        "value": 0.5,
        "unit": ""
      }
    ],
    "goal": "n=0,N的重数为1；对称Ω(n)=Ω(N−n)，总概率为1。",
    "math": "Ω(N,n)=N!/[n!(N−n)!]；所有微观态等概率时P(n)=Ω/2^N。",
    "modelNote": "可区分独立二态对象，等概率制备；Ω是计数，熵以k_B为单位。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "用生成函数(1+z)^N独立证明归一化及二项式均值和方差。",
      "check": "生成函数 (1+z)^N 的 z^n 系数为 Ω；取 z=1 得 ΣΩ=2^N。求一、二阶导数给均值 N/2、方差 N/4。"
    },
    "reflection": "相同总激发数为何对应不同数量的微观排列？ 请先写出预测，再结合核验表中的独立条件解释；用生成函数(1+z)^N独立证明归一化及二项式均值和方差。",
    "prediction": {
      "q": "独立等概率二态 N=4，n=0 的重数是多少？",
      "options": [
        "4",
        "16",
        "1"
      ],
      "correct": 2,
      "explain": "全在基态只有一个微观排列，全部宏观态的重数和才为 16。"
    },
    "derive": {
      "q": "等概率二态制备中，宏观概率 P(n) 是？",
      "options": [
        "C(N,n)/2^N",
        "1/(N+1)，所有宏观态等概率",
        "C(N,n) 本身，不必归一"
      ],
      "correct": 0,
      "explain": "可分辨微观串总数为 2^N，各宏观态权重由组合数给出。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　相同总激发数为何对应不同数量的微观排列？ 把一排带编号的二态对象逐个翻转，只有总激发数进入宏观记录。中间的宏观态为何常见？先选 N 和 n，把一个宏观结果背后的微观排列数算出来。</p><p><b>列式理由</b>　等概率制备的是全部有编号的二进制串，而不是把每一个总激发数宏观态设成等概率。</p><p><b>关键一步</b>　Ω(N,n)=N!/[n!(N−n)!]；所有微观态等概率时P(n)=Ω/2^N。</p><p><b>极限检验</b>　n=0,N的重数为1；对称Ω(n)=Ω(N−n)，总概率为1。 生成函数 (1+z)^N 的 z^n 系数为 Ω；取 z=1 得 ΣΩ=2^N。求一、二阶导数给均值 N/2、方差 N/4。</p>"
  },
  {
    "id": "TS3.2",
    "mapId": "TS3.2",
    "courseId": "thermal",
    "short": "热统 · TS3.2",
    "title": "广延熵与有限尺寸修正",
    "intro": "同样激发比例的一小盒和一大盒对象，熵密度会完全相同吗？先增大 N，再把精确计数与只保留广延主项的 Stirling 近似并排比较。",
    "simTitle": "广延熵与有限尺寸修正：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "可区分二态数 N",
        "min": 2,
        "max": 200,
        "step": 2,
        "value": 50,
        "unit": ""
      },
      {
        "id": "fraction",
        "label": "请求激发比例 n/N",
        "min": 0,
        "max": 1,
        "step": 0.02,
        "value": 0.3,
        "unit": ""
      }
    ],
    "goal": "有限尺寸下主项并不精确；端点0ln0=0，不计算ln(0)。",
    "math": "lnΩ≈−N[xlnx+(1−x)ln(1−x)]；端点用解析极限。",
    "modelNote": "精确值用log-factorial；x=n/N，N为整数；S/k_B无量纲。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "加入高阶Stirling项，区分固定x的大N极限与固定激发数极限。",
      "check": "固定 0<x<1 时 lnΩ=NH(x)−½ln[2πNx(1−x)]+O(1/N)。固定 n 或端点不满足这个均匀展开，必须回到精确式。"
    },
    "reflection": "把粒子数放大，熵为何近似正比于粒子数？ 请先写出预测，再结合核验表中的独立条件解释；加入高阶Stirling项，区分固定x的大N极限与固定激发数极限。",
    "prediction": {
      "q": "有限 N 的 Stirling 广延主项是否等于精确 lnΩ？",
      "options": [
        "一般不等，有有限尺寸修正",
        "对所有 N 都精确",
        "端点一定发散"
      ],
      "correct": 0,
      "explain": "Stirling 主项省略了对数及更高阶项；端点按极限处理。"
    },
    "derive": {
      "q": "组成端点中的 0ln0 应如何处理？",
      "options": [
        "直接计算 ln0 后乘 0",
        "按极限取 0",
        "按 NaN 置为 1"
      ],
      "correct": 1,
      "explain": "xlnx 在 x→0+ 时趋零，不能直接做 0×负无穷。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　把粒子数放大，熵为何近似正比于粒子数？ 同样激发比例的一小盒和一大盒对象，熵密度会完全相同吗？先增大 N，再把精确计数与只保留广延主项的 Stirling 近似并排比较。</p><p><b>列式理由</b>　大 N 固定组成时 lnN! 的主项给 N 倍的二元熵；有限尺寸对数修正仍能使总熵出现可测偏差。</p><p><b>关键一步</b>　lnΩ≈−N[xlnx+(1−x)ln(1−x)]；端点用解析极限。</p><p><b>极限检验</b>　有限尺寸下主项并不精确；端点0ln0=0，不计算ln(0)。 固定 0<x<1 时 lnΩ=NH(x)−½ln[2πNx(1−x)]+O(1/N)。固定 n 或端点不满足这个均匀展开，必须回到精确式。</p>"
  },
  {
    "id": "TS3.3",
    "mapId": "TS3.3",
    "courseId": "thermal",
    "short": "热统 · TS3.3",
    "title": "混合熵与不可区分性",
    "intro": "隔板两侧看起来都在混合，但是否真的新增可分辨的状态？先切换气体是否相同，再改变粒子份额；体积分配随同温同压条件同步改变。",
    "simTitle": "混合熵与不可区分性：模型与核验",
    "controls": [
      {
        "id": "N",
        "label": "总粒子数 N",
        "min": 10,
        "max": 1000,
        "step": 10,
        "value": 100,
        "unit": ""
      },
      {
        "id": "x",
        "label": "NA/N（同时固定 VA/V）",
        "min": 0,
        "max": 1,
        "step": 0.02,
        "value": 0.5,
        "unit": ""
      },
      {
        "id": "same",
        "type": "select",
        "label": "隔板两侧",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "不同气体，可选择性区分"
          },
          {
            "value": 1,
            "label": "相同气体，同 T 同 P"
          }
        ]
      }
    ],
    "goal": "等份不同气体ΔS=Nk_Bln2；相同气体为0；标明比较所需分离操作。",
    "math": "不同理想气体ΔS=−k_B[N_A ln x_A+N_B ln x_B]；同种等温等压移隔板无新可分辨组分。",
    "modelNote": "经典理想混合、初始同T同P；总N固定；不是任意不同密度初态的通式。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "从Z_N=z_1^N/N!解释Gibbs修正，并说明可分辨性的操作定义。",
      "check": "Z_N=z1^N/N! 消除全同粒子排列重复。同种、同 T 同 P 移隔板 ΔS=0；不同密度初态另有弛豫熵，不能套零结果。"
    },
    "reflection": "移去隔板一定产生额外混合熵吗？ 请先写出预测，再结合核验表中的独立条件解释；从Z_N=z_1^N/N!解释Gibbs修正，并说明可分辨性的操作定义。",
    "prediction": {
      "q": "同种理想气体初始同 T 同 P，移去隔板的额外混合熵？",
      "options": [
        "NkBln2，总会翻倍",
        "0",
        "必定为负"
      ],
      "correct": 1,
      "explain": "同种粒子没有新增可操作区分的组分；不能计人为标签。"
    },
    "derive": {
      "q": "不同气体等份混合的熵增是？",
      "options": [
        "2NkBln2",
        "0，无论组分是否相同",
        "NkBln2"
      ],
      "correct": 2,
      "explain": "每组分初体积为 V/2，两个组分合计 NkBln2。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　移去隔板一定产生额外混合熵吗？ 隔板两侧看起来都在混合，但是否真的新增可分辨的状态？先切换气体是否相同，再改变粒子份额；体积分配随同温同压条件同步改变。</p><p><b>列式理由</b>　不同气体可由选择性操作分离，解除空间约束产生组分混合熵；同种粒子的人为标签不是可测新组分。</p><p><b>关键一步</b>　不同理想气体ΔS=−k_B[N_A ln x_A+N_B ln x_B]；同种等温等压移隔板无新可分辨组分。</p><p><b>极限检验</b>　等份不同气体ΔS=Nk_Bln2；相同气体为0；标明比较所需分离操作。 Z_N=z1^N/N! 消除全同粒子排列重复。同种、同 T 同 P 移隔板 ΔS=0；不同密度初态另有弛豫熵，不能套零结果。</p>"
  },
  {
    "id": "TS3.4",
    "mapId": "TS3.4",
    "courseId": "thermal",
    "short": "热统 · TS3.4",
    "title": "非等概率：从计数熵到概率熵",
    "intro": "同样能访问三个状态，一种制备偏爱第一个状态，另一种均匀抽取。哪一种信息更少？先改变 p1，再分配剩余概率，检查归一与熵的上界。",
    "simTitle": "非等概率：从计数熵到概率熵：模型与核验",
    "controls": [
      {
        "id": "a",
        "label": "p1=a",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.3333333333333333,
        "unit": ""
      },
      {
        "id": "b",
        "label": "其余两态分配 b",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "value": 0.5,
        "unit": ""
      }
    ],
    "goal": "纯确定态熵0；均匀三态熵k_Bln3最大；概率归一化与0ln0极限。",
    "math": "S=−k_BΣp_i ln p_i；p_i=1/Ω时回到k_BlnΩ。",
    "modelNote": "离散经典概率分布；不是任意连续变量的绝对微分熵，非平衡分布不自动等同热力学熵。 本关两幅图为解析或精确有限模型定量结果；折线仅连接离散态，不模拟时间演化。熵与配分函数中的对数为自然对数；参数或图轴标明 log10 时使用十进对数。无随机采样、无平滑、无静默归一。",
    "graduate": {
      "task": "带平均能量约束最大化概率熵，预告正则权重并检验拉格朗日乘子单位。",
      "check": "以 Σp=1 与 ΣpE=U 约束极大化 −Σplnp，变分得 p∝exp(−βE)，β 的单位为能量倒数。"
    },
    "reflection": "相同可访问态数为何仍可有不同熵？ 请先写出预测，再结合核验表中的独立条件解释；带平均能量约束最大化概率熵，预告正则权重并检验拉格朗日乘子单位。",
    "prediction": {
      "q": "三态概率熵何时最大？",
      "options": [
        "只有一个态概率为 1",
        "任意非均匀概率都一样",
        "各态概率都为 1/3"
      ],
      "correct": 2,
      "explain": "离散固定三态下，凹性使均匀分布熵为 kBln3，确定态为 0。"
    },
    "derive": {
      "q": "一般离散概率的熵表达式是？",
      "options": [
        "−kBΣp_i ln p_i",
        "kBΣln p_i",
        "只要三态就恒为 kBln3"
      ],
      "correct": 0,
      "explain": "概率权重决定熵；仅均匀制备达到固定态数最大值。"
    },
    "resourceTitle": "David Tong · Statistical Physics",
    "resourceDescription": "课程地图已核查官方主题目录；本关模型与释义为项目原创。外链供延伸阅读，不声称完成外部练习。",
    "resourceUrl": "https://davidtong.org/teaching/statistical-physics/",
    "derivation": "<p><b>物理问题</b>　相同可访问态数为何仍可有不同熵？ 同样能访问三个状态，一种制备偏爱第一个状态，另一种均匀抽取。哪一种信息更少？先改变 p1，再分配剩余概率，检查归一与熵的上界。</p><p><b>列式理由</b>　一般离散概率熵对实际制备的各态权重求平均；仅当所有可访问态等概率时才简化为计数熵。</p><p><b>关键一步</b>　S=−k_BΣp_i ln p_i；p_i=1/Ω时回到k_BlnΩ。</p><p><b>极限检验</b>　纯确定态熵0；均匀三态熵k_Bln3最大；概率归一化与0ln0极限。 以 Σp=1 与 ΣpE=U 约束极大化 −Σplnp，变分得 p∝exp(−βE)，β 的单位为能量倒数。</p>"
  }
];
});
