/* QM6: original stories, controls, questions and four-step explanations. */
(function(root,factory){const rows=factory(typeof module==='object'&&module.exports?require('../data/quantum-curriculum.js'):root.QuantumCurriculum);if(typeof module==='object'&&module.exports)module.exports=rows;root.QM6Lessons=rows;})(typeof globalThis!=='undefined'?globalThis:this,function(curriculum){
  'use strict';
  const rows=[
  {
    "intro": "你试图给一个量子角动量同时指定长度和竖直投影，却发现投影不能连续调节。为什么固定j后只有有限个m？先改变2j，再沿梯子选择m序号，观察升降系数何时归零；整数j时另看轨道角密度。",
    "controls": [
      {
        "id": "twiceJ",
        "label": "两倍角动量量子数 2j",
        "min": 0,
        "max": 6,
        "step": 1,
        "value": 2,
        "unit": ""
      },
      {
        "id": "index",
        "label": "m序号（从−j起）",
        "min": 0,
        "max": 6,
        "step": 1,
        "value": 1,
        "unit": ""
      }
    ],
    "modelNote": "J²/ℏ²=j(j+1)、Jz/ℏ=m；一般j允许半整数。m序号超出2j时明确取最高合法m并显示提示。整数j分支同时作为l=j的轨道例子，角密度|Ylm|²按dΩ归一；半整数分支不绘轨道球谐。",
    "derivation": "<p><b>物理问题</b>　J²与Jz可同时确定，三个方向的角动量一般不能同时确定。</p><p><b>列式理由</b>　对易代数[Ji,Jj]=iℏεijkJk使J±在固定j中改变m；范数平方必须非负。</p><p><b>关键一步</b>　J±系数为ℏ√((j∓m)(j±m+1))。上下终止给m=−j,…,j，共2j+1态。</p><p><b>极限检验</b>　端点相应系数为零，j=0只有m=0。轨道单值性要求l为整数；半整数自旋不能当作普通球谐函数。</p>",
    "prediction": {
      "q": "固定j=3/2，共有几个m态？",
      "options": [
        "2",
        "3",
        "4"
      ],
      "correct": 2,
      "explain": "2j+1=4。"
    },
    "derive": {
      "q": "J+作用于|j,j⟩得到？",
      "options": [
        "零向量",
        "|j+1,j+1⟩",
        "|j,j−1⟩"
      ],
      "correct": 0,
      "explain": "升降算符不改变j，顶端升阶范数为零。"
    },
    "check": "独立用矩阵核对[Jx,Jy]=iℏJz；整数轨道分支计算2π∫|Ylm|²dcosθ=1，二维截面不能代替dΩ。",
    "mapId": "QM6.1",
    "id": "QM6.1",
    "courseId": "quantum",
    "short": "量子力学 · QM6.1",
    "simTitle": "角动量与测量 · 实验1"
  },
  {
    "intro": "一束重复制备的自旋1/2粒子先沿同一方向极化，再经过可转动的理想分析器。转动分析器会让单次测量结果连续变化，还是改变两个结果的比例？先对齐两轴，再转成垂直，最后选择一个结果检查条件测后态。",
    "controls": [
      {
        "id": "theta",
        "label": "制备极角 θ",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "phi",
        "label": "制备方位 φ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "beta",
        "label": "测量轴极角 β",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.5707963267948966,
        "unit": "rad"
      },
      {
        "id": "eta",
        "label": "测量轴方位 η",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "outcome",
        "label": "选择条件结果",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "+ℏ/2"
          },
          {
            "value": 1,
            "label": "−ℏ/2"
          }
        ]
      }
    ],
    "modelNote": "理想纯态自旋1/2及投影测量；S=ℏσ/2。图中r为布洛赫向量、n为分析轴，不表示电子空间位置或自转。显示重复制备的概率与条件态，无随机分束轨迹；零概率结果的条件态明确未定义。",
    "derivation": "<p><b>物理问题</b>　沿不同轴测量仍只有±ℏ/2两个结果，变化的是统计概率。</p><p><b>列式理由</b>　ρ=(I+r·σ)/2，P±=(I±n·σ)/2；由Tr(ρP±)计算。</p><p><b>关键一步</b>　p±=(1±r·n)/2。得到±结果后的理想态布洛赫向量为±n，同轴重复得到相同结果。</p><p><b>极限检验</b>　对齐时p+=1，反向时p+=0，垂直时两结果各半；零概率事件没有可归一化的条件态。</p>",
    "prediction": {
      "q": "制备+z，沿x测量，得到+ℏ/2的概率为？",
      "options": [
        "1",
        "1/2",
        "0"
      ],
      "correct": 1,
      "explain": "两轴垂直，r·n=0。"
    },
    "derive": {
      "q": "若某结果概率为0，应如何表示其条件测后态？",
      "options": [
        "零向量归一化",
        "任意指定一个态",
        "未定义"
      ],
      "correct": 2,
      "explain": "条件态分母是该结果概率的平方根；零概率不能条件化。"
    },
    "check": "用泡利矩阵直接计算投影概率；比较同轴重复与转回原制备轴测量，后者一般不确定。",
    "mapId": "QM6.2",
    "id": "QM6.2",
    "courseId": "quantum",
    "short": "量子力学 · QM6.2",
    "simTitle": "角动量与测量 · 实验2"
  },
  {
    "intro": "你把一个自旋态主动旋转一整圈，计算出的旋量却多了负号。既然实验通常测不出整体相位，这个负号什么时候能留下痕迹？先拖到2π比较单支统计，再把旋转放在相干两路中的一路，观察输出端口。",
    "controls": [
      {
        "id": "theta",
        "label": "初态极角 θ",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.5707963267948966,
        "unit": "rad"
      },
      {
        "id": "phi",
        "label": "初态方位 φ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "axisTheta",
        "label": "旋转轴极角",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "axisPhi",
        "label": "旋转轴方位",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "angle",
        "label": "主动旋转角 θR",
        "min": 0,
        "max": 12.566370614359172,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "reference",
        "label": "两路附加相位 χ",
        "min": 0,
        "max": 6.283185307179586,
        "step": "any",
        "value": 0,
        "unit": "rad"
      }
    ],
    "modelNote": "主动旋转U=exp(−iθR n·σ/2)，不模拟坐标被动变换。平衡相干干涉仪仅一路施加U，另一支作为同初态参考；端口概率含⟨ψ|U|ψ⟩，不是孤立旋量的整体相位测量。若解释磁场进动，H=−γS·B对应θR=−γBt，γ符号须保留。",
    "derivation": "<p><b>物理问题</b>　孤立态乘−1不改密度矩阵；两条相干路径只有一路乘−1则相对相位改变。</p><p><b>列式理由</b>　(n·σ)²=I，因此U=cos(θR/2)I−i sin(θR/2)n·σ。</p><p><b>关键一步</b>　单支统计由UρU†给出。平衡合束端口p=(1+Re[eⁱχ⟨ψ|U|ψ⟩])/2；旋转还可能改变两路自旋重叠。</p><p><b>极限检验</b>　2π时U=−I，单支统计复原但χ=0的端口由1变0；4π时旋量复原。相干参考不可省略。</p>",
    "prediction": {
      "q": "孤立自旋经过2π主动旋转后，任意单支测量统计？",
      "options": [
        "改变符号",
        "保持相同",
        "全部变零"
      ],
      "correct": 1,
      "explain": "密度矩阵中整体负号抵消。"
    },
    "derive": {
      "q": "本页为什么能在干涉端口看到2π的负号？",
      "options": [
        "只有一路旋转，存在相干参考",
        "负概率被直接测出",
        "探测器能看到所有整体相位"
      ],
      "correct": 0,
      "explain": "对两路联合态而言，这是相对相位。"
    },
    "check": "独立核对U†U=I及旋转后的布洛赫向量；把χ再加π检查端口互换。进动方向按θR=−γBt映射。",
    "mapId": "QM6.3",
    "id": "QM6.3",
    "courseId": "quantum",
    "short": "量子力学 · QM6.3",
    "simTitle": "角动量与测量 · 实验3"
  },
  {
    "intro": "你手中有两个自旋1/2，分别测量时各只有两个结果。把它们改用总角动量来描述，为什么会出现一组单重态和三组投影态？先切换耦合态，对照两种基的系数，再转动两地分析轴检查联合概率。",
    "controls": [
      {
        "id": "kind",
        "label": "耦合态",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "单重态 |0,0⟩"
          },
          {
            "value": 1,
            "label": "三重态 |1,1⟩"
          },
          {
            "value": 2,
            "label": "三重态 |1,0⟩"
          },
          {
            "value": 3,
            "label": "三重态 |1,−1⟩"
          }
        ]
      },
      {
        "id": "alpha",
        "label": "A轴极角（xz平面）",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 0,
        "unit": "rad"
      },
      {
        "id": "beta",
        "label": "B轴极角（xz平面）",
        "min": 0,
        "max": 3.141592653589793,
        "step": "any",
        "value": 1.0471975511965976,
        "unit": "rad"
      },
      {
        "id": "basis",
        "label": "矩阵显示",
        "type": "select",
        "value": 0,
        "options": [
          {
            "value": 0,
            "label": "基变换 U"
          },
          {
            "value": 1,
            "label": "非耦合基密度矩阵"
          },
          {
            "value": 2,
            "label": "耦合基密度矩阵"
          }
        ]
      }
    ],
    "modelNote": "两个可区分自旋1/2；非耦合基序++、+−、−+、−−；耦合列序单重、三重M=1、0、−1。J²单位ℏ²；关联用各地σ·n的±1结果，相应自旋关联再乘ℏ²/4。这里的基变换不引入相互作用；全同电子总交换约束见QM7。",
    "derivation": "<p><b>物理问题</b>　角动量大小不能按普通标量相加；先对联合空间中的J²和Jz对角化。</p><p><b>列式理由</b>　J=S₁+S₂，J²=S₁²+S₂²+2S₁·S₂；四维空间分解成J=0和J=1。</p><p><b>关键一步</b>　单重态=(|+−⟩−|−+⟩)/√2；三重M=0取加号，M=±1为|++⟩及|−−⟩。</p><p><b>极限检验</b>　单重态J²=0且关联−a·b；四个联合概率和为1。交换奇偶性只描述自旋部分，不单独决定电子总态是否允许。</p>",
    "prediction": {
      "q": "两个自旋1/2的单重态，J²是多少？",
      "options": [
        "0",
        "ℏ²",
        "2ℏ²"
      ],
      "correct": 0,
      "explain": "J=0，因此J(J+1)ℏ²=0。"
    },
    "derive": {
      "q": "单重态沿相同轴测量两地σ，结果关联为？",
      "options": [
        "0",
        "+1",
        "−1"
      ],
      "correct": 2,
      "explain": "同轴完全反关联，跨轴为−a·b。"
    },
    "check": "以总J±构造三重态，乘出耦合变换矩阵的U†U；计算四个投影概率，避免只由示意图判断关联。",
    "mapId": "QM6.4",
    "id": "QM6.4",
    "courseId": "quantum",
    "short": "量子力学 · QM6.4",
    "simTitle": "角动量与测量 · 实验4"
  }
];
  return rows.map(row=>{const design=curriculum.modules.flatMap(m=>m.lessons).find(l=>l.id===row.mapId);const {check,...lesson}=row;return {...lesson,title:design.title,goal:design.acceptance,math:design.derivation,reflection:design.question+' 请写下预测、一次参数对照及模型适用边界。',graduate:{task:design.graduateTask,check},resourceTitle:'麻省理工学院 · 量子物理讲义',resourceDescription:'公开课程入口供补充阅读；本页模型、故事与图示由项目原创实现，不复制教材图。',resourceUrl:'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/'};});
});
