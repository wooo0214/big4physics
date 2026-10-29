/* Original thermal/statistical course design. All logarithms are natural.
 * SI unless display scales are explicit; ΔU = Q - W_by.
 * TS5.1 has exactly one implementation/progress id: thermal.
 * Prerequisites are teaching suggestions, not locks or mastery claims.
 */
(function(root,factory){
  const data=factory();
  if(typeof module==='object' && module.exports) module.exports=data;
  root.ThermalCurriculum=data;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  return {
  "version": "0.1-course-map",
  "updated": "2026-10-28",
  "title": "热力学与统计物理课程地图",
  "modules": [
    {
      "id": "TS1",
      "title": "热力学定律、状态变量与过程",
      "short": "热与功的账本",
      "question": "同一初末态，热、功和熵为什么表现不同？",
      "outcome": "能用统一符号记录状态变化和过程能量，区分状态函数、热、功与熵产生。",
      "requires": [],
      "recommended": [],
      "tools": [
        "TB1",
        "TB2"
      ],
      "concepts": [
        "状态方程",
        "第一定律",
        "可逆热机",
        "熵产生"
      ],
      "assumptions": "简单可压缩理想气体是基础模型；热库和准静态条件逐关说明。",
      "misconception": "Q不是系统储存的热；绝热不等于等温，系统熵增加也不一定由吸热造成。",
      "mastery": "给出两条同终态路径并分别核对能量与熵收支。",
      "transfer": "为星际气体压缩、膨胀和热过程建立账本；页面不求冷却函数。",
      "readings": [
        [
          "tong",
          "第4章：经典热力学"
        ],
        [
          "stp",
          "第2章：热力学概念与过程"
        ]
      ],
      "lessons": [
        {
          "title": "状态与状态方程",
          "question": "改变体积会同时改变哪些状态量？",
          "experiment": "调n、T、V，画P–V等温线及当前状态点。",
          "derivation": "PV=nRT；同一平衡态不记录到达路径。",
          "acceptance": "固定n、T时V加倍P减半；检查Pa·m³=J。",
          "model": "稀薄理想气体；n为mol，T为K，V为m³，P为Pa。",
          "graduateTask": "从热运动图景解释理想状态方程，并说明相互作用和量子简并导致的失效。",
          "id": "TS1.1",
          "requires": [],
          "status": "available",
          "implementationId": "TS1.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "第一定律：过程的能量账本",
          "question": "相同温度变化为何不保证相同吸热？",
          "experiment": "切换等容、等压、等温及可逆绝热，改变体积比与温度。",
          "derivation": "ΔU=Q−W_by；W_by=∫P_ext dV；准静态时P_ext取体系P。",
          "acceptance": "等温理想气体ΔU=0，可逆绝热Q=0；两题区分热和功的路径依赖。",
          "model": "单组分理想气体；U=nC_VT，C_V=fR/2；Q流入为正，W_by对外做功为正，单位J。",
          "graduateTask": "独立积分四类过程，检查γ=(f+2)/f及绝热PV^γ不变。",
          "id": "TS1.2",
          "requires": [
            "TS1.1"
          ],
          "status": "available",
          "implementationId": "TS1.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "卡诺循环与效率",
          "question": "为何降低冷库温度能提高可逆热机效率？",
          "experiment": "调热库温度、冷库温度与等温膨胀比，画四段循环和热功收支。",
          "derivation": "两条等温线与两条可逆绝热线闭合；η=1−T_c/T_h。",
          "acceptance": "T_h>T_c>0，Q_h+Q_c=W_cycle；温差趋零效率趋零。",
          "model": "理想气体可逆热机；热量带符号，温度K，功J，不能用摄氏比。",
          "graduateTask": "由循环熵收支推导卡诺效率，解释不可逆热机为何不能超过同热库上界。",
          "id": "TS1.3",
          "requires": [
            "TS1.2"
          ],
          "status": "available",
          "implementationId": "TS1.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "同一终态：自由膨胀与等温膨胀",
          "question": "孤立自由膨胀没有吸热，系统熵为何增加？",
          "experiment": "比较理想气体向真空自由膨胀及连接热库的可逆等温膨胀。",
          "derivation": "同终态ΔS=nRln(V_f/V_i)；自由膨胀Q=W=0，可逆等温Q=TΔS。",
          "acceptance": "两路径ΔU及ΔS相同，Q/W和环境熵不同；总熵产生非负。",
          "model": "绝热自由膨胀与理想热库可逆参照；V_f≥V_i>0，熵J/K。",
          "graduateTask": "明确δQ/T只在可逆路径直接积分给状态熵差，另列环境熵与熵产生。",
          "id": "TS1.4",
          "requires": [
            "TS1.3"
          ],
          "status": "available",
          "implementationId": "TS1.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS2",
      "title": "热力学势、勒让德变换与平衡",
      "short": "约束与平衡",
      "question": "实验约束如何决定应极小化哪个热力学势？",
      "outcome": "能选择自然变量、写势的微分并用正确约束判断平衡。",
      "requires": [
        {
          "id": "TS1",
          "reason": "需要第一律、状态函数与熵"
        }
      ],
      "recommended": [],
      "tools": [
        "TB1",
        "TB2"
      ],
      "concepts": [
        "自然变量",
        "自由能极小",
        "麦克斯韦关系",
        "化学势"
      ],
      "assumptions": "势的极小判据需固定对应环境变量；偏导仅在光滑单相区域使用。",
      "misconception": "不同约束下不能一律最小化内能；局部极小不一定为全局平衡。",
      "mastery": "从dU推四种势并完成一次组成平衡和交叉偏导检验。",
      "transfer": "为星际气体化学平衡建立化学势语言；不等同有限速率反应网络。",
      "readings": [
        [
          "tong",
          "第1、4、5章中的化学势、麦克斯韦关系和平衡主题"
        ],
        [
          "stp",
          "第2、7章：热力学及化学势"
        ]
      ],
      "lessons": [
        {
          "title": "自然变量与热力学势",
          "question": "固定温度的实验为何更适合使用自由能？",
          "experiment": "切换U、H、F、G，显示同一理想气体状态的势及自然变量。",
          "derivation": "F=U−TS，H=U+PV，G=U+PV−TS；dF=−SdT−PdV+μdN。",
          "acceptance": "辨认各势的自然变量及能量单位，不把勒让德变换当物理过程。",
          "model": "简单可压缩、单组分平衡体系；熵零点需指定；能量J。",
          "graduateTask": "从dU=TdS−PdV+μdN独立推导其余三势微分。",
          "id": "TS2.1",
          "requires": [
            "TS1.2",
            "TS1.4"
          ],
          "status": "available",
          "implementationId": "TS2.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "热库约束与自由能极小",
          "question": "平衡态是能量最低，还是自由能最低？",
          "experiment": "调温度与两组分能差，画组成x的F及稳定点。",
          "derivation": "F/(Nk_BT)=xlnx+(1−x)ln(1−x)+xδ；极小点由F′=0。",
          "acceptance": "0<x<1内F″>0；δ=0时平衡x=1/2；不要把有限温平衡等同最低内能。",
          "model": "无相互作用的二态组成、固定T,V,N；δ=Δ/(k_BT)，x无量纲。",
          "graduateTask": "通过系统加热库总熵最大化推导F最小，并检查端点对数极限。",
          "id": "TS2.2",
          "requires": [
            "TS2.1"
          ],
          "status": "available",
          "implementationId": "TS2.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "麦克斯韦关系与交叉导数",
          "question": "可测压强导数怎样给出熵的体积导数？",
          "experiment": "调理想气体状态及差分步长，对照解析导数和数值导数残差。",
          "derivation": "dF=−SdT−PdV的混合偏导相等，给(∂S/∂V)_T=(∂P/∂T)_V。",
          "acceptance": "两侧均为nR/V；减小步长不保证浮点误差单调下降。",
          "model": "平衡可微单相区域；导数单位Pa/K；差分步长带相应单位。",
          "graduateTask": "独立推导四类麦克斯韦关系，说明相边界不可直接沿用光滑偏导假设。",
          "id": "TS2.3",
          "requires": [
            "TS2.2"
          ],
          "status": "available",
          "implementationId": "TS2.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "化学势与组成平衡",
          "question": "两种可互转状态在何种组成下不再净转化？",
          "experiment": "调标准自由能差与温度，比较G(x)、μ_B−μ_A和零斜率位置。",
          "derivation": "G/(Nk_BT)=xlnx+(1−x)ln(1−x)+xΔg⁰/(k_BT)；μ_B−μ_A=∂G/∂N_B。",
          "acceptance": "Δg⁰=0给x=1/2；平衡化学势相等且G取全局极小。",
          "model": "固定T,P、总粒子数的理想二组分A↔B；μ按每粒子J，不与摩尔化学势混用。",
          "graduateTask": "推导平衡常数与标准化学势之差，说明改变标准态不能改变物理预测。",
          "id": "TS2.4",
          "requires": [
            "TS2.3"
          ],
          "status": "available",
          "implementationId": "TS2.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS3",
      "title": "微观态、宏观态与玻尔兹曼熵",
      "short": "计数与熵",
      "question": "可逆微观规则怎样给出宏观态的概率优势？",
      "outcome": "能明确样本空间、计算重数，并区分等概率计数熵与一般概率熵。",
      "requires": [],
      "recommended": [],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "组合计数",
        "熵的广延性",
        "不可区分性",
        "Gibbs概率熵"
      ],
      "assumptions": "基础为有限离散可区分对象；混合关另明确经典全同粒子修正。",
      "misconception": "一个最可能宏观态并非唯一微观态；最大熵并不等于任意分布都均匀。",
      "mastery": "精确归一二项式分布，量化Stirling误差，解释混合操作边界。",
      "transfer": "帮助区分天文统计的采样概率与物理热平衡的微观概率。",
      "readings": [
        [
          "tong",
          "第1章：微正则、熵和二态自旋"
        ],
        [
          "stp",
          "第3章：概率工具"
        ]
      ],
      "lessons": [
        {
          "title": "从微观排列到宏观概率",
          "question": "相同总激发数为何对应不同数量的微观排列？",
          "experiment": "调二态对象数N和激发数n，显示精确二项式重数和宏观态概率。",
          "derivation": "Ω(N,n)=N!/[n!(N−n)!]；所有微观态等概率时P(n)=Ω/2^N。",
          "acceptance": "n=0,N的重数为1；对称Ω(n)=Ω(N−n)，总概率为1。",
          "model": "可区分独立二态对象，等概率制备；Ω是计数，熵以k_B为单位。",
          "graduateTask": "用生成函数(1+z)^N独立证明归一化及二项式均值和方差。",
          "id": "TS3.1",
          "requires": [],
          "status": "available",
          "implementationId": "TS3.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "广延熵与有限尺寸修正",
          "question": "把粒子数放大，熵为何近似正比于粒子数？",
          "experiment": "调N与组成，比较ln组合数、Stirling熵密度及绝对误差。",
          "derivation": "lnΩ≈−N[xlnx+(1−x)ln(1−x)]；端点用解析极限。",
          "acceptance": "有限尺寸下主项并不精确；端点0ln0=0，不计算ln(0)。",
          "model": "精确值用log-factorial；x=n/N，N为整数；S/k_B无量纲。",
          "graduateTask": "加入高阶Stirling项，区分固定x的大N极限与固定激发数极限。",
          "id": "TS3.2",
          "requires": [
            "TS3.1"
          ],
          "status": "available",
          "implementationId": "TS3.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "混合熵与不可区分性",
          "question": "移去隔板一定产生额外混合熵吗？",
          "experiment": "调两侧粒子数与体积，对照不同气体及同种气体等温等压混合。",
          "derivation": "不同理想气体ΔS=−k_B[N_A ln x_A+N_B ln x_B]；同种等温等压移隔板无新可分辨组分。",
          "acceptance": "等份不同气体ΔS=Nk_Bln2；相同气体为0；标明比较所需分离操作。",
          "model": "经典理想混合、初始同T同P；总N固定；不是任意不同密度初态的通式。",
          "graduateTask": "从Z_N=z_1^N/N!解释Gibbs修正，并说明可分辨性的操作定义。",
          "id": "TS3.3",
          "requires": [
            "TS3.2"
          ],
          "status": "available",
          "implementationId": "TS3.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "非等概率：从计数熵到概率熵",
          "question": "相同可访问态数为何仍可有不同熵？",
          "experiment": "调三态概率，画概率柱和S/k_B；比较等概率与偏置制备。",
          "derivation": "S=−k_BΣp_i ln p_i；p_i=1/Ω时回到k_BlnΩ。",
          "acceptance": "纯确定态熵0；均匀三态熵k_Bln3最大；概率归一化与0ln0极限。",
          "model": "离散经典概率分布；不是任意连续变量的绝对微分熵，非平衡分布不自动等同热力学熵。",
          "graduateTask": "带平均能量约束最大化概率熵，预告正则权重并检验拉格朗日乘子单位。",
          "id": "TS3.4",
          "requires": [
            "TS3.3"
          ],
          "status": "available",
          "implementationId": "TS3.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS4",
      "title": "微正则、正则与巨正则系综",
      "short": "环境与系综",
      "question": "环境允许交换哪些守恒量，如何改变概率权重？",
      "outcome": "能根据交换条件选系综，计算有限热库效应与数目能量涨落。",
      "requires": [
        {
          "id": "TS3",
          "reason": "概率、计数与熵是系综的基础"
        },
        {
          "id": "TS1",
          "reason": "温度和第一律定义热交换"
        }
      ],
      "recommended": [],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "微正则约束",
        "热库展开",
        "巨配分函数",
        "相对涨落"
      ],
      "assumptions": "系综是制备和环境约束的概率描述，不代表真实时间轨迹；系综等价有条件。",
      "misconception": "微正则能量固定不代表每个子系统能量固定；相对涨落小不等于绝对涨落为零。",
      "mastery": "比较有限热库与正则权重，并用独立矩检验涨落尺度。",
      "transfer": "为开放天体气体的统计描述准备工具；引力长程系统不能无条件套系综等价。",
      "readings": [
        [
          "tong",
          "第1章：三类系综、涨落与化学势"
        ],
        [
          "stp",
          "第4章：统计方法"
        ]
      ],
      "lessons": [
        {
          "title": "隔离复合体系的能量交换",
          "question": "为何最可能的能量分配由两侧重数的乘积决定？",
          "experiment": "调两组Einstein固体振子数和总量子数，画各能量分配的概率。",
          "derivation": "Ω(N,q)=C(q+N−1,q)，P(q_A)∝Ω_A(q_A)Ω_B(Q−q_A)。",
          "acceptance": "Q固定且概率和1；两组相同时关于Q/2对称；最可能值不必等于均值。",
          "model": "有限独立振子、等能量量子、隔离微正则；忽略零点常数，能量单位ℏω。",
          "graduateTask": "从总熵最大化得到温度平衡，并比较精确离散概率和Gaussian近似。",
          "id": "TS4.1",
          "requires": [
            "TS3.1",
            "TS3.4",
            "TS1.2"
          ],
          "status": "available",
          "implementationId": "TS4.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "有限热库到玻尔兹曼权重",
          "question": "小系统接触有限热库时，指数权重为何只是近似？",
          "experiment": "调热库尺寸及总量子数，对照两能级系统的精确热库重数比和正则近似。",
          "derivation": "P(E_s)∝Ω_b(E_tot−E_s)；lnΩ_b的一阶展开给exp(−βE_s)。",
          "acceptance": "热库不允许的能量分支概率严格0；增大热库后比较正则近似误差。",
          "model": "有限Einstein热库、两能级能隙为整数能量量子；温度定义须说明离散导数。",
          "graduateTask": "保留熵展开二阶项，关联热库有限热容与正则权重的误差。",
          "id": "TS4.2",
          "requires": [
            "TS4.1"
          ],
          "status": "available",
          "implementationId": "TS4.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "粒子交换与巨正则系综",
          "question": "开放体系中粒子数为何也会涨落？",
          "experiment": "调平均粒子数，画经典理想气体子体积的Poisson分布和截断尾概率。",
          "derivation": "Ξ=exp(z)，P(N)=e^(−z)z^N/N!，⟨N⟩=Var(N)=z。",
          "acceptance": "均值和方差相等；分布截断遗漏单列，不静默重新归一化。",
          "model": "经典非相互作用、固定T,V,μ；z为无量纲单粒子活度总权重，不与逸度e^(βμ)混用。",
          "graduateTask": "由Ξ对βμ求导得到均值和数目涨落，解释相互作用气体一般非Poisson。",
          "id": "TS4.3",
          "requires": [
            "TS4.2"
          ],
          "status": "available",
          "implementationId": "TS4.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "系综等价与相对涨落",
          "question": "宏观体系涨落小，是否意味着微观涨落不存在？",
          "experiment": "调独立两态粒子数与占据率，对照正则总能量分布及固定能量微正则约束。",
          "derivation": "Var(E)=NΔ²p(1−p)，σ_E/⟨E⟩=√[(1−p)/(Np)]。",
          "acceptance": "p>0固定时相对涨落∝N^(−1/2)；p=0均值为0时相对量未定义。",
          "model": "比较指定可加独立模型；不宣称所有长程系统及相变点普遍系综等价。",
          "graduateTask": "区分绝对涨落增长与相对涨落下降，并分析低温Np不大的稀有激发区。",
          "id": "TS4.4",
          "requires": [
            "TS4.3"
          ],
          "status": "available",
          "implementationId": "TS4.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS5",
      "title": "配分函数与宏观热力学量",
      "short": "微观权重到热量",
      "question": "一个配分函数怎样同时给出能量、熵和响应？",
      "outcome": "能由lnZ求宏观量并说明能量零点、简并度与数值截断。",
      "requires": [
        {
          "id": "TS4",
          "reason": "正则权重及环境约束已明确"
        }
      ],
      "recommended": [
        {
          "id": "TS2",
          "reason": "自由能及自然变量提供热力学解释"
        }
      ],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "配分函数",
        "零点能",
        "顺磁响应",
        "转动态简并"
      ],
      "assumptions": "非相互作用的可解模型；转子有限截断必须检查高温遗漏。",
      "misconception": "能量零点改变U和F但不改C；简并能级必须按微观态计数。",
      "mastery": "独立求U、S、C并用方差复核，发现截断造成的假热容下降。",
      "transfer": "用于分子内配分函数和热激发直觉；实际分子需要核自旋和能级数据。",
      "readings": [
        [
          "tong",
          "第1–3章：二态自旋、分子振动及转动主题"
        ],
        [
          "stp",
          "第4–6章：统计方法、磁体系与多粒子体系"
        ]
      ],
      "lessons": [
        {
          "title": "两能级与配分函数",
          "question": "温度改变时，激发态为何最多趋于半占据？",
          "experiment": "沿用原x=Δ/(k_BT)控件、两能级占据图和原两题。",
          "derivation": "Z=1+e^(−x)，p_1=1/(1+e^x)，U=Δp_1，S/k_B=lnZ+xp_1。",
          "acceptance": "x→0时p_1→1/2、S/k_B→ln2；x→∞时趋唯一基态。",
          "model": "单个非简并两能级，E=0、Δ>0；x不是独立T与Δ，U/Δ和S/k_B无量纲。",
          "graduateTask": "推导C/k_B=x²p_1(1−p_1)，找到Schottky峰并解释高低温热容均趋0。",
          "id": "TS5.1",
          "requires": [
            "TS4.2"
          ],
          "status": "available",
          "implementationId": "thermal",
          "implementationNote": "沿用原两能级x控件、两题、笔记和thermal学习记录；不另建TS5.1完成项、不重复计分。",
          "legacyLessonId": "thermal",
          "legacyLabel": "T1"
        },
        {
          "title": "量子谐振子的热激发",
          "question": "零点能为什么不会增加热容？",
          "experiment": "调x=ℏω/(k_BT)，分别画热激发能、总能量、熵和热容。",
          "derivation": "Z=e^(−x/2)/(1−e^(−x))，U=ℏω[1/2+1/(e^x−1)]。",
          "acceptance": "低温U→ℏω/2、C→0；高温C→k_B；区分总能与去零点热能。",
          "model": "单个理想量子振子；能量按ℏω缩放，热容C/k_B；无截断伪高温。",
          "graduateTask": "从lnZ独立求S和C，用能量方差复核C；说明振子频率改变时何者算功。",
          "id": "TS5.2",
          "requires": [
            "TS5.1"
          ],
          "status": "available",
          "implementationId": "TS5.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "独立磁矩与顺磁响应",
          "question": "磁场增强为何能改变占据、能量和磁化？",
          "experiment": "调B、T、N，画两个磁矩取向概率及M(B)、U、S。",
          "derivation": "E_s=−μBs，Z_1=2cosh(βμB)，M=Nμtanh(βμB)。",
          "acceptance": "B=0磁化0；低场M≈Nμ²B/(k_BT)；B反号M反号。",
          "model": "独立经典取向二值磁矩，μ单位J/T，M为总磁矩J/T；不是每体积磁化强度。",
          "graduateTask": "推导Curie响应和C_B，区分微观单磁矩、总磁矩及体积磁化强度。",
          "id": "TS5.3",
          "requires": [
            "TS5.2"
          ],
          "status": "available",
          "implementationId": "TS5.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "转动配分函数与数值截断",
          "question": "增加温度时，何时必须保留更多转动能级？",
          "experiment": "调T/θ_r和l_max，画带简并度的转动态权重与热容及遗漏估计。",
          "derivation": "E_l=k_Bθ_r l(l+1)，Z=Σ(2l+1)e^(−E_l/k_BT)。",
          "acceptance": "低温C→0、高温经典C→k_B；固定小截断的虚假下降须标为截断失效。",
          "model": "异核线性刚性转子；忽略核自旋统计、振动和离心畸变；θ_r单位K。",
          "graduateTask": "用更大独立截断及积分近似检查收敛，解释同核分子奇偶限制为何改变结果。",
          "id": "TS5.4",
          "requires": [
            "TS5.3"
          ],
          "status": "available",
          "implementationId": "TS5.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS6",
      "title": "经典气体与Maxwell–Boltzmann分布",
      "short": "经典气体与线宽",
      "question": "三维速度统计如何连接压强与视线观测？",
      "outcome": "能区分速度分量和速率、标准差和FWHM，并判断经典近似。",
      "requires": [
        {
          "id": "TS5",
          "reason": "使用配分函数与可解模式热容"
        }
      ],
      "recommended": [],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "Maxwell速率",
        "能量均分",
        "热多普勒宽化",
        "相空间密度"
      ],
      "assumptions": "非相对论稀薄气体；谱线例仅纯热、光薄、无仪器卷积。",
      "misconception": "速率分布不是单个速度分量Gaussian；稀薄不保证低温时仍经典。",
      "mastery": "核对两种分布的归一及二阶矩，给线宽温度换算并写适用条件。",
      "transfer": "连接H I热宽化、星际气体热压；非热线宽必须另建模型。",
      "readings": [
        [
          "tong",
          "第2章：经典气体、均分与Maxwell分布"
        ],
        [
          "stp",
          "第8章：经典气体与液体"
        ]
      ],
      "lessons": [
        {
          "title": "速度分量与速率分布",
          "question": "最概然速率、平均速率和均方根速率相同吗？",
          "experiment": "调T与质量，比较一维速度分量Gaussian和三维速率分布。",
          "derivation": "f(v)=4π[m/(2πk_BT)]^(3/2)v²e^(−mv²/(2k_BT))；分量方差k_BT/m。",
          "acceptance": "两分布分别归一；v_mp<⟨v⟩<v_rms；有限画窗遗漏单列。",
          "model": "非相对论经典理想气体；速度m/s，密度单位s/m；粒子质量不得混用mol质量。",
          "graduateTask": "独立求三个速率尺度及二阶矩，解释三维相空间壳层因子v²。",
          "id": "TS6.1",
          "requires": [
            "TS5.2"
          ],
          "status": "available",
          "implementationId": "TS6.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "能量均分与量子冻结",
          "question": "每个模式总能贡献k_BT吗？",
          "experiment": "调振动能隙与温度，对照经典平动和量子振动热容。",
          "derivation": "每个独立二次项贡献k_BT/2；振动同时含动能与势能二次项。",
          "acceptance": "三维平动U=3Nk_BT/2；单振动高温C→Nk_B、低温冻结。",
          "model": "稀薄非相对论气体；把模式数与二次项数分开；忽略相互作用和化学反应。",
          "graduateTask": "从Gaussian积分推能量均分，并用转动与振动量子尺度估计适用温区。",
          "id": "TS6.2",
          "requires": [
            "TS6.1"
          ],
          "status": "available",
          "implementationId": "TS6.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "压强与视线热速度",
          "question": "三维热运动怎样同时决定压强和一维谱线宽？",
          "experiment": "调T、质量与数密度，画视线速度分布并显示压强与热FWHM。",
          "derivation": "P=nm⟨v_z²⟩=nk_BT；σ_v=√(k_BT/m)，FWHM=2√(2ln2)σ_v。",
          "acceptance": "压强用三维各向同性和一维分量；FWHM不等于σ；质量增加线宽减小。",
          "model": "n为数密度m⁻³；热速度m/s或明确km/s；纯热光薄Gaussian，不含湍流、仪器及辐射转移。",
          "graduateTask": "推导H I温度上限与线宽关系，说明非热宽化时为何只能给上限。",
          "id": "TS6.3",
          "requires": [
            "TS6.2"
          ],
          "status": "available",
          "implementationId": "TS6.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "相空间密度与经典适用边界",
          "question": "气体很稀薄就一定可以忽略量子统计吗？",
          "experiment": "调数密度、温度与质量，显示λ_th和nλ_th³及经典有效性提示。",
          "derivation": "λ_th=h/√(2πmk_BT)，非简并要求nλ_th³/g≪1。",
          "acceptance": "降温或增密使量子效应增强；超界只提示经典近似失效，不裁剪参数。",
          "model": "三维非相对论理想气体；λ单位m、n单位m⁻³，g为内部简并度。",
          "graduateTask": "联系Sackur–Tetrode熵的经典条件，解释负的经典外推熵不能直接当物理结果。",
          "id": "TS6.4",
          "requires": [
            "TS6.3"
          ],
          "status": "available",
          "implementationId": "TS6.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS7",
      "title": "Bose–Einstein与Fermi–Dirac分布",
      "short": "量子气体",
      "question": "全同粒子的统计约束如何改变低温占据？",
      "outcome": "能区分每态占据和能量密度、求固定N化学势，解释BEC和光子谱。",
      "requires": [
        {
          "id": "TS4",
          "reason": "巨正则制备与化学势"
        },
        {
          "id": "TS5",
          "reason": "配分函数和平均占据"
        }
      ],
      "recommended": [
        {
          "id": "TS6",
          "reason": "经典极限提供稀占据基准"
        }
      ],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "BE与FD占据",
        "化学势",
        "Bose凝聚",
        "黑体光子"
      ],
      "assumptions": "理想非相对论物质粒子与真空光子分别处理；BEC指定均匀三维热力学极限。",
      "misconception": "占据函数不是归一概率密度；光子μ=0不代表物质粒子也必须μ=0。",
      "mastery": "检查BE允许域、FD容量和求根残差，推导一项经典极限或T⁴律。",
      "transfer": "为白矮星简并压与宇宙背景辐射提供概念；页面不计算完整恒星结构。",
      "readings": [
        [
          "tong",
          "第3章：量子气体与黑体辐射"
        ],
        [
          "stp",
          "第6–7章相关主题；本项目量子分布细节另参Tong第3章"
        ]
      ],
      "lessons": [
        {
          "title": "同一能谱下的三种统计",
          "question": "量子统计为何使同一能级的平均占据不同？",
          "experiment": "调T、μ，比较MB、BE、FD占据随能量曲线。",
          "derivation": "n̄_MB=e^(−β(ε−μ))，n̄_BE=[e^(β(ε−μ))−1]⁻¹，n̄_FD=[e^(β(ε−μ))+1]⁻¹。",
          "acceptance": "稀占据极限三者重合；FD每单态≤1，BE无此上限；BE μ必须低于最低能。",
          "model": "占据为每单粒子态平均数，不是已归一的能量概率密度；能量单位须与k_BT一致。",
          "graduateTask": "由单态巨配分函数推三种占据，再加入态密度求粒子数。",
          "id": "TS7.1",
          "requires": [
            "TS4.3",
            "TS5.1"
          ],
          "status": "available",
          "implementationId": "TS7.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "费米面与温度展宽",
          "question": "固定粒子数加热，化学势为何需要随之调整？",
          "experiment": "有限离散能级固定平均N，调温度并求μ，画占据和数目残差。",
          "derivation": "Σg_i/[e^(β(ε_i−μ))+1]=N；有限T下左侧对μ单调。",
          "acceptance": "概率在0和1之间；显示求根残差；N需严格在有限态容量内。",
          "model": "指定有限能谱与简并度，T>0；不把有限能级曲线直接称连续电子气方程。",
          "graduateTask": "用独立括区求根检查μ，并研究低温阶跃与能级间隙的关系。",
          "id": "TS7.2",
          "requires": [
            "TS7.1"
          ],
          "status": "available",
          "implementationId": "TS7.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "理想Bose气体的凝聚份额",
          "question": "低能激发态能否容纳全部粒子？",
          "experiment": "调0≤T/T_c≤1，显示凝聚与激发份额及三维态密度图景。",
          "derivation": "热力学极限N_ex/N=(T/T_c)^(3/2)，N_0/N=1−(T/T_c)^(3/2)。",
          "acceptance": "T=0全在基态、T=T_c凝聚份额0；不把有限体系交叉称真正奇点。",
          "model": "均匀三维非相互作用Bose气体、热力学极限；非谐振阱，幂指数不是3。",
          "graduateTask": "从三维态密度积分得ζ(3/2)及T_c，解释不同维数和陷阱的改变。",
          "id": "TS7.3",
          "requires": [
            "TS7.2"
          ],
          "status": "available",
          "implementationId": "TS7.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "光子气体与黑体谱",
          "question": "温度怎样同时改变谱峰和总辐射能量？",
          "experiment": "调T，画频率能量密度与无量纲谱并显示有限积分遗漏。",
          "derivation": "μ=0；u_ν=8πhν³/[c³(e^(hν/k_BT)−1)]；u=aT⁴。",
          "acceptance": "总能随T⁴；频率谱峰与波长谱峰不是互相简单取倒数。",
          "model": "真空平衡光子气体，两偏振；ν为Hz，u_ν为J·m⁻³·Hz⁻¹，非单位立体角强度。",
          "graduateTask": "独立积分得π⁴/15，推P=u/3与辐射常数并检查谱变量雅可比。",
          "id": "TS7.4",
          "requires": [
            "TS7.3"
          ],
          "status": "available",
          "implementationId": "TS7.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    },
    {
      "id": "TS8",
      "title": "相变、临界现象、涨落与输运",
      "short": "集体行为与输运",
      "question": "怎样区分有限体系峰值、平均场临界点和真实输运？",
      "outcome": "能量化有限涨落、选择全局自由能极小，检查扩散守恒和熵产生。",
      "requires": [
        {
          "id": "TS2",
          "reason": "需要自由能和稳定性判据"
        },
        {
          "id": "TS4",
          "reason": "有限系综和统计平均"
        },
        {
          "id": "TS5",
          "reason": "配分函数导数和响应"
        }
      ],
      "recommended": [
        {
          "id": "TS7",
          "reason": "量子气体是另一种集体现象参照，但非本章必要先修"
        }
      ],
      "tools": [
        "TB1",
        "TB2",
        "TB3"
      ],
      "concepts": [
        "有限Ising链",
        "Landau理论",
        "涨落响应",
        "扩散与熵产生"
      ],
      "assumptions": "有限链精确枚举、平均场势与连续扩散是三个不同模型，不能混用结论。",
      "misconception": "有限尺寸尖峰不是热力学奇点；亚稳态不等于平衡；涨落响应需匹配共轭变量。",
      "mastery": "以独立解析或差分复核Ising矩，保留Landau简并极小，核对扩散粒子数。",
      "transfer": "为星际介质热不稳定和混合输运建立模型审查习惯；不把Ising直接当星际气体方程。",
      "readings": [
        [
          "tong",
          "第5章：Ising、Landau、涨落；扩散另见STP第10章"
        ],
        [
          "stp",
          "第9、10章：临界现象与时间相关过程"
        ]
      ],
      "lessons": [
        {
          "title": "有限Ising链与圆滑响应",
          "question": "有限系统的尖峰能否直接证明存在热力学相变？",
          "experiment": "对小型周期一维Ising链精确枚举，调N、T、外场并显示M、E、C、χ。",
          "derivation": "H=−JΣs_i s_(i+1)−hΣs_i；用全部2^N构型计算Z和矩。",
          "acceptance": "零场有限链⟨M⟩=0；反场磁化反号；一维有限程零场无有限温相变。",
          "model": "小N精确枚举而非Monte Carlo；k_BT/J和h/J无量纲；总自旋M无量纲。",
          "graduateTask": "对照零场转移矩阵Z=(2coshK)^N+(2sinhK)^N并讨论热力学极限。",
          "id": "TS8.1",
          "requires": [
            "TS2.2",
            "TS4.4",
            "TS5.3"
          ],
          "status": "available",
          "implementationId": "TS8.1",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "Landau自由能与临界图景",
          "question": "双阱出现后，哪个极小值代表平衡？",
          "experiment": "调a、h，画f(m)=am²/2+bm⁴/4−hm和全部驻点，标全局平衡与亚稳点。",
          "derivation": "f′=am+bm³−h=0；f″>0仅给局部稳定，还要比较自由能。",
          "acceptance": "b>0；h=0且a<0有±√(−a/b)；零场两最低点应保留简并。",
          "model": "无量纲Landau标量平均场模型；m为序参量，不自动限制为微观自旋区间。",
          "graduateTask": "推平均场临界指数并解释涨落会使实际低维临界行为偏离。",
          "id": "TS8.2",
          "requires": [
            "TS8.1"
          ],
          "status": "available",
          "implementationId": "TS8.2",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "涨落与响应的定量关系",
          "question": "响应为何能从平衡自发涨落计算？",
          "experiment": "复用精确Ising权重，对比能量方差热容及磁矩方差磁响应与独立差分。",
          "derivation": "C=Var(H)/(k_BT²)，χ_h=βVar(M)，h为能量型外场。",
          "acceptance": "方差非负；差分步长收敛；必须用⟨M²⟩−⟨M⟩²而非|M|方差。",
          "model": "正则平衡、固定外场和耦合；χ_h是对h的响应，不混作SI对B的体积磁化率。",
          "graduateTask": "由lnZ二阶导数独立推两种恒等式，区分平衡涨落公式与一般动态响应。",
          "id": "TS8.3",
          "requires": [
            "TS8.2"
          ],
          "status": "available",
          "implementationId": "TS8.3",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        },
        {
          "title": "扩散、通量与熵产生",
          "question": "粒子数不变时，浓度起伏为何仍会消失？",
          "experiment": "周期一维c=c₀[1+Aexp(−Dk²t)cos(kx)]，调D、t、A，画c和j。",
          "derivation": "∂_tc=D∂²_xc，j=−D∂_xc；模式衰减率Dk²。",
          "acceptance": "积分粒子数恒定；D=0不衰减、A=0无流；理想稀体系熵不减。",
          "model": "周期L、k=2π/L、|A|<1、D≥0；c为线数密度m⁻¹，j单位s⁻¹，D为m²/s。",
          "graduateTask": "用∂_tS=k_BD∫(∂_xc)²/c dx核对熵产生，并说明Fick定律的局域平衡近似。",
          "id": "TS8.4",
          "requires": [
            "TS8.3"
          ],
          "status": "available",
          "implementationId": "TS8.4",
          "implementationNote": "参数交互、定量图示、四步讲解、两道示范题及进阶自评；示范题完成不等于整章掌握。"
        }
      ]
    }
  ],
  "bridges": [
    {
      "id": "TB1",
      "title": "微积分与量纲",
      "check": "会积分、偏导、全微分和自然对数；区分状态函数与路径积分，检查单位及独立变量。"
    },
    {
      "id": "TB2",
      "title": "概率与期望",
      "check": "会概率归一化、条件概率、均值、方差和密度积分；不把概率密度当单点概率。"
    },
    {
      "id": "TB3",
      "title": "组合、渐近与数值",
      "check": "会阶乘、二项式、Taylor/Stirling展开和无量纲参数；求和、求根和有限差分必须检查残差与截断。"
    }
  ],
  "route": [
    "TS1",
    "TS2",
    "TS3",
    "TS4",
    "TS5",
    "TS6",
    "TS7",
    "TS8"
  ],
  "routeNote": "TS1→TS2与TS3→TS4构成两条起步线，TS4→TS5→TS6；TS7需要TS4/TS5，TS6仅建议先学；TS8需要TS2/TS4/TS5，TS7仅建议先学。先修是教学建议，无锁定，不代表已掌握。",
  "rubric": [
    "预测：操作前写出占据、能量、响应或谱形怎样变化，提出可检验比例或极限。",
    "解释：明确环境约束、宏微观变量、能量零点、概率测度和模型近似。",
    "推导：独立补全核心步骤，用守恒、归一化、量纲或另一算法复核；截断须报告遗漏。",
    "迁移：更换约束、尺寸、统计或观测量后重新判断。解释和迁移为自评，整章综合验收未实现。"
  ],
  "teachingApproach": "32关采用故事问题导入及“物理问题→列式理由→关键一步→极限检验”四步正文。每关两题验证示范操作与核心关系，另有进阶自评；32关示范覆盖不等于完整研究生课程。TS5.1保留原thermal记录，其余31关使用TS编号；课程设计与物理实现需通过独立核验。",
  "conventions": "内部SI：T用K，能量J，n_mol为mol而n_number为m⁻³；β=1/(k_BT)，所有对数为自然对数。ΔU=Q−W_by，Q流入为正、W_by对外做功为正；磁场B与能量型Ising外场h区分。显式声明无量纲尺度、画窗遗漏和有限尺寸；不将随机示意、有限链或平均场当真实天体模拟。",
  "sources": [
    {
      "id": "tong",
      "title": "David Tong · Statistical Physics（剑桥课程讲义）",
      "url": "https://davidtong.org/teaching/statistical-physics/",
      "use": "已核查官方课程主页列出的5章主题目录，定位系综、经典气体、量子气体、热力学和相变；未逐页核读讲义，不虚构页码。本课程设计重新编排顺序，不宣称是原目录。"
    },
    {
      "id": "stp",
      "title": "Gould与Tobochnik · Statistical and Thermal Physics Programs",
      "url": "https://www.compadre.org/stpbook/",
      "use": "已核查公开配套资源目录，作为交互探究与扩散主题参考；本项目模型和释义原创，不复制配套程序，也不声称逐一运行了外部模拟。"
    }
  ]
};
});
