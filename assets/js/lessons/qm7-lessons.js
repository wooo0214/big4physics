/* QM7: original stories, controls, questions and four-step explanations. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM7Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "intro": "把电子从一维势阱移到球对称势中，你希望只研究它离中心有多远。角向运动消去后，径向方程为何多出一个离心项？先选库仑势并增加l，比较R与u=rR；再切到三维谐振子，检查原点边界和归一化体积元。",
    "controls": [
      {
        "id": "kind",
        "label": "中心势",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "库仑势；n=l+1"
          },
          {
            "value": 1,
            "label": "三维谐振子；径向nᵣ=0"
          }
        ]
      },
      {
        "id": "l",
        "label": "轨道量子数 l",
        "min": 0,
        "max": 3,
        "step": 1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "Z",
        "label": "核电荷 Z（仅库仑）",
        "min": 1,
        "max": 4,
        "step": 1,
        "value": 1,
        "unit": ""
      },
      {
        "id": "omega",
        "label": "角频率 ω",
        "min": 0.2,
        "max": 4,
        "step": 0.1,
        "value": 1,
        "unit": "10¹⁵ rad/s"
      }
    ],
    "modelNote": "三维中心势正规束缚态，库仑用质子质量比M/m=1836.15267343、谐振子用电子质量。横轴s=r/b，左图为b³ᐟ²R与b¹ᐟ²u，右图势能按对应自然能量缩放。r=0奇异势不取有限值；不求奇异吸引势的自伴延拓。",
    "derivation": "<p><b>物理问题</b>　径向不是一条普通直线：球壳体积元带r²，不能把|R|²直接当半径概率密度。</p><p><b>列式理由</b>　ψ=RYlm且角函数归一；设u=rR，径向动能的一阶导数项消去。</p><p><b>关键一步</b>　−ℏ²u″/(2μ)+[V+ℏ²l(l+1)/(2μr²)]u=Eu；∫|u|²dr=∫r²|R|²dr=1。</p><p><b>极限检验</b>　本页正规解u(0)=0，R在原点按rˡ变化；l=0离心项消失。左图两个函数的缩放和单位不同。</p>",
    "prediction": {
      "q": "半径在r…r+dr内的概率为？",
      "options": [
        "|R|²dr",
        "r²|R|²dr",
        "4πr²|R|²dr（Y已归一）"
      ],
      "correct": 1,
      "explain": "角函数已按dΩ积分为1，不能重复乘4π。"
    },
    "derive": {
      "q": "引入u=rR的主要作用是？",
      "options": [
        "去掉全部角动量效应",
        "令概率变成0",
        "使归一化为∫|u|²dr并消去径向一阶导数"
      ],
      "correct": 2,
      "explain": "离心有效势仍保留。"
    },
    "check": "独立由球坐标拉普拉斯算符推径向式，数值核对两种归一化积分相同；原点正规性与势的适用域要同时检查。",
    "mapId": "QM7.1",
    "id": "QM7.1",
    "courseId": "quantum",
    "short": "量子力学 · QM7.1",
    "simTitle": "原子结构与交换 · 实验1"
  },
  {
    "intro": "你反复制备氢样原子的1s态，用两种方式统计电子位置：一种比较相同微小体积，另一种比较相同厚度的球壳。为什么两种“最可能”位置不同？先看1s的径向分布与体密度切片，再改变n、l、m及Z，比较节点、尺度和能量。",
    "controls": [
      {
        "id": "n",
        "label": "主量子数 n",
        "min": 1,
        "max": 4,
        "step": 1,
        "value": 1,
        "unit": ""
      },
      {
        "id": "l",
        "label": "请求轨道量子数 l",
        "min": 0,
        "max": 3,
        "step": 1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "m",
        "label": "请求磁量子数 m",
        "min": -3,
        "max": 3,
        "step": 1,
        "value": 0,
        "unit": ""
      },
      {
        "id": "Z",
        "label": "核电荷 Z",
        "min": 1,
        "max": 4,
        "step": 1,
        "value": 1,
        "unit": ""
      },
      {
        "id": "massRatio",
        "label": "核质量 M/mₑ",
        "min": 1836.15267343,
        "max": 30000,
        "step": "any",
        "value": 1836.15267343,
        "unit": ""
      }
    ],
    "modelNote": "点核、非相对论、单电子库仑模型，μ=mM/(m+M)，忽略精细、超精细及外场，Z≤4。非法l、m请求明确限制到l≤n−1、|m|≤l，并列实际值。横轴s=r/b，b=aμ/Z；右图为y=0切片的b³|ψ|²，不是投影或归一化二维概率。热图仅线性色标，无平滑。",
    "derivation": "<p><b>物理问题</b>　相同体积概率与球壳概率有不同测度；“最可能半径”不等于某个唯一空间位置。</p><p><b>列式理由</b>　正规径向解由广义拉盖尔多项式给出，角向Ylm已单独归一。</p><p><b>关键一步</b>　Eₙ=−(μ/m)Z²Eₕ/(2n²)，p(s)=s²|Rdim|²。1s体密度在原点最大，而壳层密度在s=1最大。</p><p><b>极限检验</b>　m改变角分布但不改本近似能量；固定n有n²个空间态，含自由自旋为2n²。1s的⟨r⟩=3b/2。</p>",
    "prediction": {
      "q": "1s态的最可能半径为？",
      "options": [
        "0",
        "b=aμ/Z",
        "3b/2"
      ],
      "correct": 1,
      "explain": "p(s)=4s²e⁻²ˢ在s=1取最大；均值是3b/2。"
    },
    "derive": {
      "q": "本模型只改变m，能量怎样？",
      "options": [
        "不变",
        "正比m",
        "总变为正"
      ],
      "correct": 0,
      "explain": "无外场的非相对论库仑能量仅依赖n、Z和约化质量。"
    },
    "check": "积分r²|R|²dr核对归一化；1s另验⟨r⟩=3b/2和体密度原点极大。切片图不能作为完整概率积分。",
    "mapId": "QM7.2",
    "id": "QM7.2",
    "courseId": "quantum",
    "short": "量子力学 · QM7.2",
    "simTitle": "原子结构与交换 · 实验2"
  },
  {
    "intro": "你想把两个电子放进同一个空间轨道。泡利原理是否立即禁止这件事，还是还要看自旋？先选相同轨道并切换单重态、三重态；再让两个轨道具有可调重叠，观察反对称化后的范数何时消失。",
    "controls": [
      {
        "id": "mode",
        "label": "空间轨道关系",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "完全相同"
          },
          {
            "value": 1,
            "label": "正交不同"
          },
          {
            "value": 2,
            "label": "非正交：可调重叠"
          }
        ]
      },
      {
        "id": "spin",
        "label": "两电子自旋",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "反对称单重态"
          },
          {
            "value": 1,
            "label": "对称三重态"
          }
        ]
      },
      {
        "id": "overlap",
        "label": "实重叠 S（仅非正交）",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "value": 0.5,
        "unit": ""
      }
    ],
    "modelNote": "以正交抽象模基e₀、e₁表示φa=e₀、φb=S e₀+√(1−S²)e₁。图中是两粒子在模基中的概率，不是空间轨迹。空间对称性与自旋合并后总态反对称；范数为零时禁止归一化。非正交归一因子保留S，无额外交换力或电子互斥计算。",
    "derivation": "<p><b>物理问题</b>　禁止的是重复占据相同完整自旋轨道；相同空间轨道配不同自旋可以构成允许态。</p><p><b>列式理由</b>　电子总态必须交换反对称：自旋单重态配空间对称，自旋三重态配空间反对称。</p><p><b>关键一步</b>　空间组合φa(1)φb(2)±φb(1)φa(2)的范数平方为2(1±|S|²)，归一化前必须计算。</p><p><b>极限检验</b>　S=1且空间取减号时总向量为零，不能除以零；单重态的空间加号仍允许。S=0才可直接用1/√2。</p>",
    "prediction": {
      "q": "两个电子处于同一空间轨道，什么自旋态允许？",
      "options": [
        "只允许三重态",
        "单重态",
        "所有态都禁止"
      ],
      "correct": 1,
      "explain": "相同轨道的空间部分对称，必须配反对称自旋单重态。"
    },
    "derive": {
      "q": "非正交轨道的反对称空间组合范数平方为？",
      "options": [
        "2",
        "2(1+|S|²)",
        "2(1−|S|²)"
      ],
      "correct": 2,
      "explain": "两项交叉内积为|S|²，带负号相减。"
    },
    "check": "直接交换两粒子指标验证空间与自旋奇偶性；在S→1的反对称分支检查零范数，不把条件归一极限当作S=1允许态。",
    "mapId": "QM7.3",
    "id": "QM7.3",
    "courseId": "quantum",
    "short": "量子力学 · QM7.3",
    "simTitle": "原子结构与交换 · 实验3"
  },
  {
    "intro": "你用氢样轨道给氦原子的两个电子记能量账，泡利原理已经满足，预测却仍漏了一项正能量。电子之间的排斥会怎样改变轨道尺度？先看1s²单重态的动能、核吸引与电子互斥，再调有效电荷ζ寻找试探能量最低点；切换组态检查模型边界。",
    "controls": [
      {
        "id": "Z",
        "label": "核电荷 Z",
        "min": 2,
        "max": 4,
        "step": 1,
        "value": 2,
        "unit": ""
      },
      {
        "id": "zeta",
        "label": "试探有效电荷 ζ",
        "min": 0.3,
        "max": 5,
        "step": 0.05,
        "value": 1.6875,
        "unit": ""
      },
      {
        "id": "configuration",
        "label": "组态与自旋",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "1s² 单重态"
          },
          {
            "value": 1,
            "label": "1s² 平行自旋"
          },
          {
            "value": 2,
            "label": "1s2s 单重态"
          },
          {
            "value": 3,
            "label": "1s2s 三重态"
          }
        ]
      }
    ],
    "modelNote": "固定无限重核的两电子哈密顿量；1s²归一化乘积轨道φζ∝e⁻ζr/a₀配自旋单重态。能量eV，Eₕ为Hartree；显式保留电子互斥直接项5ζEₕ/8。仅1s²计算该试探能量；1s2s仅列项标签，不套用1s²公式。没有算出精确氦能级、相关能或丰度诊断。",
    "derivation": "<p><b>物理问题</b>　泡利原理限制允许态，但不能代替电子互斥项与相关运动的求解。</p><p><b>列式理由</b>　H=Σ[pᵢ²/(2m)−Ze²/(4πε₀rᵢ)]+e²/(4πε₀r₁₂)，试探轨道的核电荷ζ可调。</p><p><b>关键一步</b>　E试/Eₕ=ζ²−2Zζ+5ζ/8，极小在ζ=Z−5/16；动能、核吸引、互斥必须在同一物理H下求期望。</p><p><b>极限检验</b>　去掉互斥且ζ=Z得到−Z²Eₕ；加入排斥后能量升高。该试探族的最小值是上界，缺少充分的电子相关，不能称精确。</p>",
    "prediction": {
      "q": "1s²单重态的电子互斥直接项符号为？",
      "options": [
        "正",
        "负",
        "总为零"
      ],
      "correct": 0,
      "explain": "库仑排斥的期望为正，不能因为自旋反对称就删去。"
    },
    "derive": {
      "q": "调ζ得到试探能量最小值，保证什么？",
      "options": [
        "波函数精确",
        "该模型基态能量的上界",
        "所有激发谱线精确"
      ],
      "correct": 1,
      "explain": "变分原理约束能量上界，不保证完整波函数或谱线准确。"
    },
    "check": "对ζ求导验证极值Z−5/16；独立积分1/r和1/r₁₂。相反自旋轨道的交换积分为零不等于没有互斥，相关能需先指定参考。洪特规则用于给定组态及近似LS耦合下的低能项排序，不能跨任意组态或场强套用；本页未计算1s2s交换分裂。",
    "mapId": "QM7.4",
    "id": "QM7.4",
    "courseId": "quantum",
    "short": "量子力学 · QM7.4",
    "simTitle": "原子结构与交换 · 实验4"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请写下预测、一次参数对照及模型适用边界。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、故事与图示由项目原创实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
