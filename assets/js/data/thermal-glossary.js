/* Original thermal glossary; references anchor topics, not copied definitions.
 * SI and explicit dimensionless scales. Consulting terms never writes progress.
 */
(function(root,factory){
 const data=factory();
 if(typeof module==='object' && module.exports) module.exports=data;
 root.ThermalGlossary=data;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 return {
  "version": "0.1",
  "updated": "2026-10-28",
  "sources": {
    "tong": {
      "title": "David Tong · Statistical Physics官方课程目录",
      "url": "https://davidtong.org/teaching/statistical-physics/"
    },
    "stp": {
      "title": "Gould与Tobochnik · Statistical and Thermal Physics Programs",
      "url": "https://www.compadre.org/stpbook/"
    }
  },
  "scope": "名称与主题定位参照Tong官方课程目录及Gould–Tobochnik公开交互资源目录，已在线核查目录，未逐页核读正文，也未逐项运行外部程序；所有释义、易混点与32关结构为本项目原创，不声称逐字对应某一译本，不虚构页码。",
  "conventions": "内部SI；T为K，能量J；ln为自然对数。ΔU=Q−W_by；摩尔数、数密度、总磁矩与体积磁化强度明确区分。词条小节编号采用TS设计号；TS5.1学习记录只使用thermal，查词不计XP。",
  "modules": [
    {
      "id": "TS1",
      "title": "热与功的账本",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第4章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS1按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "状态变量",
          "en": "State Variable",
          "symbol": "P：Pa；V：m³；T：K",
          "definition": "指定平衡态所需的宏观量。",
          "caveat": "独立变量数取决于状态方程与组分约束。",
          "lessons": [
            "TS1.1"
          ]
        },
        {
          "zh": "理想气体状态方程",
          "en": "Ideal Gas Equation of State",
          "symbol": "PV=n_mol RT",
          "definition": "忽略相互作用和量子简并时连接压强、体积和温度。",
          "caveat": "n_mol为摩尔数；与数密度n_number区分。",
          "lessons": [
            "TS1.1"
          ]
        },
        {
          "zh": "内能",
          "en": "Internal Energy",
          "symbol": "U；J",
          "definition": "体系内部能量的状态函数。",
          "caveat": "不含整体质心运动；绝对零点可平移。",
          "lessons": [
            "TS1.2"
          ]
        },
        {
          "zh": "对外做功",
          "en": "Work Done by the System",
          "symbol": "W_by=∫P_ext dV；J",
          "definition": "体系通过膨胀向环境转移的机械能。",
          "caveat": "第一律采用ΔU=Q−W_by；压缩时W_by负。",
          "lessons": [
            "TS1.2"
          ]
        },
        {
          "zh": "可逆过程",
          "en": "Reversible Process",
          "symbol": "S_gen=0；J/K",
          "definition": "理想化为体系及环境都能沿原路无净变化恢复的过程。",
          "caveat": "准静态仍可能含摩擦，因此不自动可逆。",
          "lessons": [
            "TS1.3",
            "TS1.4"
          ]
        },
        {
          "zh": "绝热过程",
          "en": "Adiabatic Process",
          "symbol": "Q=0",
          "definition": "没有热量穿越边界的过程。",
          "caveat": "温度一般可变；PV^γ不变还需理想气体、可逆及定热容。",
          "lessons": [
            "TS1.2",
            "TS1.3"
          ]
        },
        {
          "zh": "卡诺效率",
          "en": "Carnot Efficiency",
          "symbol": "η_C=1−T_c/T_h；无量纲",
          "definition": "同一高低温热库间可逆热机的效率。",
          "caveat": "温度必须用K，T_h>T_c>0；不能套摄氏比。",
          "lessons": [
            "TS1.3"
          ]
        },
        {
          "zh": "熵产生",
          "en": "Entropy Production",
          "symbol": "S_gen；J/K",
          "definition": "因不可逆性增加的体系加环境总熵。",
          "caveat": "系统熵变可正可负；孤立总熵产生不为负。",
          "lessons": [
            "TS1.4"
          ]
        }
      ]
    },
    {
      "id": "TS2",
      "title": "约束与平衡",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第4章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS2按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "自然变量",
          "en": "Natural Variables",
          "symbol": "U(S,V,N)；F(T,V,N)",
          "definition": "使热力学势的全微分直接给出共轭量的变量组。",
          "caveat": "更换势需同步更换所固定的变量。",
          "lessons": [
            "TS2.1"
          ]
        },
        {
          "zh": "勒让德变换",
          "en": "Legendre Transform",
          "symbol": "F=U−TS",
          "definition": "以共轭变量替换自变量的数学变换。",
          "caveat": "不是实际吸热、冷却或做功的过程。",
          "lessons": [
            "TS2.1"
          ]
        },
        {
          "zh": "亥姆霍兹自由能",
          "en": "Helmholtz Free Energy",
          "symbol": "F=U−TS；J",
          "definition": "适用于固定T,V,N约束的热力学势。",
          "caveat": "平衡极小判据需相应环境约束，不能任意套用。",
          "lessons": [
            "TS2.1",
            "TS2.2"
          ]
        },
        {
          "zh": "吉布斯自由能",
          "en": "Gibbs Free Energy",
          "symbol": "G=U+PV−TS；J",
          "definition": "适用于固定T,P,N约束的热力学势。",
          "caveat": "总N固定的可互转组分，其各分量N_i仍可变。",
          "lessons": [
            "TS2.1",
            "TS2.4"
          ]
        },
        {
          "zh": "麦克斯韦关系",
          "en": "Maxwell Relation",
          "symbol": "(∂S/∂V)_T=(∂P/∂T)_V；Pa/K",
          "definition": "由热力学势交叉偏导相等得到的关系。",
          "caveat": "要求相关势光滑，跨相边界需另判断导数含义。",
          "lessons": [
            "TS2.3"
          ]
        },
        {
          "zh": "化学势",
          "en": "Chemical Potential",
          "symbol": "μ_i=(∂G/∂N_i)_(T,P,N_j)；J",
          "definition": "加入一个粒子时相应热力学势的变化率。",
          "caveat": "按每粒子J或每摩尔J/mol必须显式区分。",
          "lessons": [
            "TS2.4"
          ]
        },
        {
          "zh": "热力学稳定性",
          "en": "Thermodynamic Stability",
          "symbol": "F″或G″；单位由组成变量决定",
          "definition": "给定约束下平衡态对允许扰动的稳定程度。",
          "caveat": "局部曲率正不足以证明全局最低自由能。",
          "lessons": [
            "TS2.2",
            "TS2.4"
          ]
        },
        {
          "zh": "标准态",
          "en": "Standard State",
          "symbol": "μ_i⁰；J或J/mol",
          "definition": "用于定义活度和标准化学势的参照。",
          "caveat": "标准态变更需同步改变活度约定，不能改变预测。",
          "lessons": [
            "TS2.4"
          ]
        }
      ]
    },
    {
      "id": "TS3",
      "title": "计数与熵",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第1章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS3按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "微观态",
          "en": "Microstate",
          "symbol": "单个构型；无量纲标签",
          "definition": "与指定宏观约束相容的完整微观描述。",
          "caveat": "标签是否可区分必须在计数前明确。",
          "lessons": [
            "TS3.1"
          ]
        },
        {
          "zh": "宏观态",
          "en": "Macrostate",
          "symbol": "N、n、E等",
          "definition": "忽略微观细节后由少数宏观量分类的状态。",
          "caveat": "一个宏观态一般包含多个微观态。",
          "lessons": [
            "TS3.1"
          ]
        },
        {
          "zh": "重数",
          "en": "Multiplicity",
          "symbol": "Ω=C(N,n)",
          "definition": "与一个宏观态相容的微观态数目。",
          "caveat": "宏观态概率正比Ω仅在微观态等概率时成立。",
          "lessons": [
            "TS3.1"
          ]
        },
        {
          "zh": "玻尔兹曼熵",
          "en": "Boltzmann Entropy",
          "symbol": "S_B=k_BlnΩ；J/K",
          "definition": "用指定宏观态重数衡量的熵。",
          "caveat": "样本空间和粗粒化约定必须写明。",
          "lessons": [
            "TS3.1",
            "TS3.2"
          ]
        },
        {
          "zh": "Stirling近似",
          "en": "Stirling Approximation",
          "symbol": "lnN!≈NlnN−N",
          "definition": "大整数阶乘对数的渐近近似。",
          "caveat": "有限N及组成端点须检查误差，不直接求ln0。",
          "lessons": [
            "TS3.2"
          ]
        },
        {
          "zh": "不可区分性",
          "en": "Indistinguishability",
          "symbol": "Z_N=z_1^N/N!（经典极限）",
          "definition": "交换全同粒子标签不产生新的物理态。",
          "caveat": "N!修正有经典非简并适用条件；不能替代完整BE/FD。",
          "lessons": [
            "TS3.3"
          ]
        },
        {
          "zh": "混合熵",
          "en": "Entropy of Mixing",
          "symbol": "ΔS=−k_BΣN_i ln x_i；J/K",
          "definition": "指定组分从分隔状态到均匀混合的熵差。",
          "caveat": "同种气体同T同P移隔板没有新增可分辨组分熵。",
          "lessons": [
            "TS3.3"
          ]
        },
        {
          "zh": "吉布斯概率熵",
          "en": "Gibbs Entropy",
          "symbol": "S=−k_BΣp_i lnp_i；J/K",
          "definition": "对离散概率分布定义的统计熵。",
          "caveat": "p_i=0取0ln0=0；一般非平衡概率熵须说明与热力学的联系。",
          "lessons": [
            "TS3.4"
          ]
        }
      ]
    },
    {
      "id": "TS4",
      "title": "环境与系综",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第1章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS4按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "微正则系综",
          "en": "Microcanonical Ensemble",
          "symbol": "E,V,N固定",
          "definition": "用隔离条件下允许微观态的概率描述制备。",
          "caveat": "总能量固定不要求每个子系统能量固定。",
          "lessons": [
            "TS4.1"
          ]
        },
        {
          "zh": "Einstein固体",
          "en": "Einstein Solid",
          "symbol": "Ω(N,q)=C(q+N−1,q)",
          "definition": "由共享同一能量量子的独立谐振模式组成的计数模型。",
          "caveat": "这里省略共同零点常数；不是任意固体的精确模型。",
          "lessons": [
            "TS4.1",
            "TS4.2"
          ]
        },
        {
          "zh": "热库",
          "en": "Heat Bath",
          "symbol": "T；K",
          "definition": "与小系统交换能量、温度变化可忽略的环境理想化。",
          "caveat": "有限热库温度随交换而变，指数权重需检验。",
          "lessons": [
            "TS4.2"
          ]
        },
        {
          "zh": "正则系综",
          "en": "Canonical Ensemble",
          "symbol": "p_i=e^(−βE_i)/Z",
          "definition": "固定温度、体积和粒子数的热平衡概率。",
          "caveat": "β不等于1/T，必须含k_B。",
          "lessons": [
            "TS4.2",
            "TS4.4"
          ]
        },
        {
          "zh": "巨正则系综",
          "en": "Grand Canonical Ensemble",
          "symbol": "p_(i,N)∝e^(−β(E_i−μN))",
          "definition": "允许能量与粒子交换、固定T,V,μ的平衡描述。",
          "caveat": "固定μ不意味着每次N相同。",
          "lessons": [
            "TS4.3"
          ]
        },
        {
          "zh": "Poisson分布",
          "en": "Poisson Distribution",
          "symbol": "P(N)=e^(−z)z^N/N!",
          "definition": "这里描述经典理想气体的粒子数涨落。",
          "caveat": "均值方差都为z；相互作用体系一般不满足。",
          "lessons": [
            "TS4.3"
          ]
        },
        {
          "zh": "相对涨落",
          "en": "Relative Fluctuation",
          "symbol": "σ_E/⟨E⟩；无量纲",
          "definition": "用标准差相对于均值衡量分布宽度。",
          "caveat": "均值为0时比值未定义，不能强制填0。",
          "lessons": [
            "TS4.4"
          ]
        },
        {
          "zh": "系综等价",
          "en": "Ensemble Equivalence",
          "symbol": "热力学极限及指定可观测量",
          "definition": "适当条件下不同环境约束给相同宏观预测。",
          "caveat": "有限尺寸、长程引力或临界涨落可能破坏常用论证。",
          "lessons": [
            "TS4.4"
          ]
        }
      ]
    },
    {
      "id": "TS5",
      "title": "微观权重到热量",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第2章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS5按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "配分函数",
          "en": "Partition Function",
          "symbol": "Z=Σ_i e^(−βE_i)；无量纲",
          "definition": "对允许微观态玻尔兹曼权重求和的归一因子。",
          "caveat": "简并度必须计入；能量零点平移会改变Z本身。",
          "lessons": [
            "TS5.1"
          ]
        },
        {
          "zh": "逆温度",
          "en": "Inverse Temperature",
          "symbol": "β=1/(k_BT)；J⁻¹",
          "definition": "将能量变为无量纲指数的热力学参数。",
          "caveat": "本课程正温模型不覆盖负温制备。",
          "lessons": [
            "TS5.1"
          ]
        },
        {
          "zh": "平均能量",
          "en": "Mean Energy",
          "symbol": "U=−∂_βlnZ；J",
          "definition": "按正则权重平均的体系能量。",
          "caveat": "求导时能谱和其他外参保持相应固定。",
          "lessons": [
            "TS5.1",
            "TS5.2",
            "TS5.3",
            "TS5.4"
          ]
        },
        {
          "zh": "零点能",
          "en": "Zero-point Energy",
          "symbol": "E_0=ℏω/2；J",
          "definition": "指定谐振子能量零点后基态仍有的总能量。",
          "caveat": "固定ω时是温度无关常数，因此不贡献热容。",
          "lessons": [
            "TS5.2"
          ]
        },
        {
          "zh": "量子振动热容",
          "en": "Quantum Vibrational Heat Capacity",
          "symbol": "C/k_B=x²e^x/(e^x−1)²",
          "definition": "单谐振模式的温度响应。",
          "caveat": "低温冻结、高温趋k_B；不要只计算动能半份。",
          "lessons": [
            "TS5.2"
          ]
        },
        {
          "zh": "顺磁响应",
          "en": "Paramagnetic Response",
          "symbol": "M=Nμtanh(βμB)；J/T",
          "definition": "独立二值磁矩对外场的平衡取向响应。",
          "caveat": "此处M是总磁矩；不是SI单位A/m的磁化强度。",
          "lessons": [
            "TS5.3"
          ]
        },
        {
          "zh": "能级简并度",
          "en": "Level Degeneracy",
          "symbol": "g_l=2l+1；无量纲",
          "definition": "具有相同能量的单态数目。",
          "caveat": "求配分函数时按单态加权，不能每个能级只计一次。",
          "lessons": [
            "TS5.4"
          ]
        },
        {
          "zh": "转动温度",
          "en": "Rotational Temperature",
          "symbol": "θ_r=B_rot/k_B；K",
          "definition": "线性刚性转子的能级间隔尺度。",
          "caveat": "异核模型忽略核自旋统计；高温求和上限必须收敛。",
          "lessons": [
            "TS5.4"
          ]
        }
      ]
    },
    {
      "id": "TS6",
      "title": "经典气体与线宽",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第2章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS6按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "速度分量分布",
          "en": "Velocity-component Distribution",
          "symbol": "f(v_z)；s/m",
          "definition": "一个笛卡尔速度分量的概率密度。",
          "caveat": "取值含正负；不是非负速率v的三维分布。",
          "lessons": [
            "TS6.1"
          ]
        },
        {
          "zh": "Maxwell速率分布",
          "en": "Maxwell Speed Distribution",
          "symbol": "f(v)∝v²e^(−mv²/(2k_BT))；s/m",
          "definition": "三维各向同性经典气体的速率概率密度。",
          "caveat": "v≥0；v²来自速度空间球壳体积元。",
          "lessons": [
            "TS6.1"
          ]
        },
        {
          "zh": "能量均分定理",
          "en": "Equipartition Theorem",
          "symbol": "每二次项k_BT/2；J",
          "definition": "经典平衡下每个独立二次能量项的平均贡献。",
          "caveat": "量子低温冻结和非二次项不能直接套。",
          "lessons": [
            "TS6.2"
          ]
        },
        {
          "zh": "热容冻结",
          "en": "Freeze-out of Heat Capacity",
          "symbol": "k_BT≪能隙",
          "definition": "低温下激发受抑，使相应模式热容减小。",
          "caveat": "并非能级消失；零点能仍可非零。",
          "lessons": [
            "TS6.2"
          ]
        },
        {
          "zh": "动量通量",
          "en": "Momentum Flux",
          "symbol": "P=nm⟨v_z²⟩；Pa",
          "definition": "单位面积单位时间穿越或转移的法向动量。",
          "caveat": "此式假设各向同性平衡及相应壁面条件。",
          "lessons": [
            "TS6.3"
          ]
        },
        {
          "zh": "热多普勒线宽",
          "en": "Thermal Doppler Width",
          "symbol": "σ_v=√(k_BT/m)；m/s",
          "definition": "纯热视线速度分散对应的谱线速度宽度。",
          "caveat": "湍流和仪器宽化存在时不能把总宽度直接当纯热。",
          "lessons": [
            "TS6.3"
          ]
        },
        {
          "zh": "半高全宽",
          "en": "Full Width at Half Maximum",
          "symbol": "FWHM=2√(2ln2)σ",
          "definition": "Gaussian曲线在半峰值处的两端间距。",
          "caveat": "FWHM与σ不同，此换算只适用于Gaussian。",
          "lessons": [
            "TS6.3"
          ]
        },
        {
          "zh": "热德布罗意波长",
          "en": "Thermal de Broglie Wavelength",
          "symbol": "λ_th=h/√(2πmk_BT)；m",
          "definition": "用于经典与量子简并判据的热长度尺度。",
          "caveat": "nλ_th³/g≪1才支持非简并经典近似。",
          "lessons": [
            "TS6.4"
          ]
        }
      ]
    },
    {
      "id": "TS7",
      "title": "量子气体",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第3章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS7按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "平均单态占据",
          "en": "Mean Single-state Occupation",
          "symbol": "n̄_i；无量纲",
          "definition": "一个单粒子态中的平均粒子数。",
          "caveat": "不等同归一的能量概率；积分总数还需态密度。",
          "lessons": [
            "TS7.1"
          ]
        },
        {
          "zh": "Bose–Einstein分布",
          "en": "Bose–Einstein Distribution",
          "symbol": "n̄=[e^(β(ε−μ))−1]⁻¹",
          "definition": "理想全同Bose粒子的平衡平均占据。",
          "caveat": "有限T要求μ低于最低单态能；凝聚极限需单独处理基态。",
          "lessons": [
            "TS7.1"
          ]
        },
        {
          "zh": "Fermi–Dirac分布",
          "en": "Fermi–Dirac Distribution",
          "symbol": "n̄=[e^(β(ε−μ))+1]⁻¹",
          "definition": "理想全同Fermi粒子的平衡平均占据。",
          "caveat": "每个完整单态占据不超过1；能级总占据可达简并度g。",
          "lessons": [
            "TS7.1",
            "TS7.2"
          ]
        },
        {
          "zh": "费米面",
          "en": "Fermi Surface",
          "symbol": "ε=μ(T→0)",
          "definition": "连续动量空间中零温占据与空态的分界。",
          "caveat": "本关离散能级只示范展宽，不等同完整连续费米面。",
          "lessons": [
            "TS7.2"
          ]
        },
        {
          "zh": "Bose–Einstein凝聚",
          "en": "Bose–Einstein Condensation",
          "symbol": "N_0/N；无量纲",
          "definition": "热力学极限中单态获得宏观占据的现象。",
          "caveat": "本关均匀三维理想气体；不宣称是相互作用超流模型。",
          "lessons": [
            "TS7.3"
          ]
        },
        {
          "zh": "临界温度",
          "en": "Critical Temperature",
          "symbol": "T_c；K",
          "definition": "指定模型热力学极限中凝聚起始的温标。",
          "caveat": "均匀气体与谐振阱的态密度及温度幂律不同。",
          "lessons": [
            "TS7.3"
          ]
        },
        {
          "zh": "Planck能量密度谱",
          "en": "Planck Energy-density Spectrum",
          "symbol": "u_ν；J·m⁻³·Hz⁻¹",
          "definition": "平衡光子气体按频率分辨的体积能量密度。",
          "caveat": "非辐射强度B_ν；变为波长谱必须乘雅可比。",
          "lessons": [
            "TS7.4"
          ]
        },
        {
          "zh": "辐射常数",
          "en": "Radiation Constant",
          "symbol": "a；J·m⁻³·K⁻⁴",
          "definition": "黑体总能量密度u=aT⁴的系数。",
          "caveat": "不是Stefan–Boltzmann表面出射功率系数σ；a=4σ/c。",
          "lessons": [
            "TS7.4"
          ]
        }
      ]
    },
    {
      "id": "TS8",
      "title": "集体行为与输运",
      "readings": [
        [
          "tong",
          "课程主页对应主题：第5章；仅核查公开目录"
        ],
        [
          "stp",
          "配套目录相关主题；TS8按本项目重新编排"
        ]
      ],
      "terms": [
        {
          "zh": "Ising模型",
          "en": "Ising Model",
          "symbol": "H=−JΣs_i s_j−hΣs_i",
          "definition": "二值局域变量通过近邻相互作用形成的模型。",
          "caveat": "本关为一维周期有限链精确枚举，不含Monte Carlo采样误差。",
          "lessons": [
            "TS8.1"
          ]
        },
        {
          "zh": "热力学极限",
          "en": "Thermodynamic Limit",
          "symbol": "N,V→∞且N/V固定",
          "definition": "定义宏观非解析相变时使用的极限。",
          "caveat": "有限N曲线尖锐并不证明存在奇点；一维短程零场无有限温相变。",
          "lessons": [
            "TS8.1"
          ]
        },
        {
          "zh": "序参量",
          "en": "Order Parameter",
          "symbol": "m；本关无量纲",
          "definition": "区分不同对称性平衡态的宏观量。",
          "caveat": "Landau连续序参量不自动等于某个微观自旋的允许值。",
          "lessons": [
            "TS8.2"
          ]
        },
        {
          "zh": "Landau自由能",
          "en": "Landau Free Energy",
          "symbol": "f=am²/2+bm⁴/4−hm",
          "definition": "用低阶序参量展开表述的平均场自由能模型。",
          "caveat": "b>0保证高阶稳定；平均场临界指数一般不等于低维精确值。",
          "lessons": [
            "TS8.2"
          ]
        },
        {
          "zh": "亚稳态",
          "en": "Metastable State",
          "symbol": "局部极小、非全局最低",
          "definition": "对小扰动稳定、但自由能高于平衡态的状态。",
          "caveat": "曲率正不能独自证明全局平衡；本页不求成核寿命。",
          "lessons": [
            "TS8.2"
          ]
        },
        {
          "zh": "涨落响应关系",
          "en": "Fluctuation–Response Relation",
          "symbol": "χ_h=βVar(M)；能量⁻¹",
          "definition": "把平衡外场响应与共轭变量的自发方差联系起来。",
          "caveat": "此处h是能量型场；不得误当SI对磁场B的磁化率。",
          "lessons": [
            "TS8.3"
          ]
        },
        {
          "zh": "Fick定律",
          "en": "Fick’s Law",
          "symbol": "j=−D∂_xc；s⁻¹",
          "definition": "局域扩散通量与浓度梯度成正比的关系。",
          "caveat": "本关一维线密度c为m⁻¹；三维通量单位不同。",
          "lessons": [
            "TS8.4"
          ]
        },
        {
          "zh": "扩散熵产生",
          "en": "Diffusive Entropy Production",
          "symbol": "dS/dt=k_BD∫(∂_xc)²/c dx；J·K⁻¹·s⁻¹",
          "definition": "理想稀扩散模型中由浓度均匀化产生的熵。",
          "caveat": "需c>0、D≥0并采用周期或无通量边界；不可直接套自引力热演化。",
          "lessons": [
            "TS8.4"
          ]
        }
      ]
    }
  ]
};
});
