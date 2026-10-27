/* ED5: source continuity, vacuum waves, lossless interfaces, cold electron plasma. */
(function(root,factory){const lessons=factory();if(typeof module==='object'&&module.exports)module.exports=lessons;root.ED5Lessons=lessons;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const slider=(id,label,min,max,step,value,unit='')=>({id,label,min,max,step,value,unit});
  const select=(id,label,value,options)=>({id,type:'select',label,value,options:options.map(([value,label])=>({value,label}))});
  const common={courseId:'electro',resourceTitle:'麻省理工学院开放课程 · 电磁学Ⅱ',resourceDescription:'官方电磁学讲义；下方模型在本地计算，外部资源按需打开。',resourceUrl:'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/'};
  return [
    {...common,id:'ED5.1',short:'电动力学 · ED5.1',title:'感应与位移电流',
      intro:"磁通变化如何产生环流？充电间隙又怎样满足电流选面一致性？分别用固定环路和理想电容器检查。",simTitle:'固定感应环路 / 理想电容间隙：两种时变源',
      controls:[slider('flux','沿 +z 磁通变化率 dΦB/dt',-5,5,.5,2,'mWb/s'),slider('current','流向上极板的充电电流 I',-5,5,.5,2,'mA')],
      goal:'用环路正向核对感应电动势；说明安培—麦克斯韦定律如何与电荷守恒相容。',
      math:'∮E·dl=−dΦB/dt；∮B·dl=μ₀(I穿面+ε₀dΦE/dt)。',
      modelNote:'左图：半径 0.5 m 固定圆环，正向从 +z 看逆时针，磁通法向 +z，给定磁通斜率而非完整磁场演化。右图：圆板半径 0.5 m、真空间隙、忽略边缘的准静态电容器；I>0 时上极板正电荷增加，间隙 Ez 沿 −z 增长。表中 dE/dt 指沿间隙场方向（−z）的有符号分量，选面法向也取 −z；Bφ 在柱坐标 r=0.6 m 处按关于 −z 的右手方向计正。位移电流为 ε₀A dE/dt；不模拟有限尺寸高频馈电和辐射。两图不是同一电路，无平滑。',
      graduate:{"task":"由宏观安培—麦克斯韦定律推导自由电荷连续性，并与真空微观形式比较。","check":"由 ∇×H=J自由+∂tD、∇·D=ρ自由得 ∂tρ自由+∇·J自由=0。固定回路的感应式不可直接代替运动导体中含 u×B 的电动势。"},
      reflection:'改变环路正向后负号怎样表达？位移电流等于 I，为什么仍不能说电荷穿过了真空？若忽略位移项，连续性方程会出什么问题？',
      prediction:{q:'+z 磁通正在增加，从 +z 看感应环流方向如何？',options:['逆时针','顺时针','必为零'],correct:1,explain:'选逆时针为正，法拉第定律给环流 −dΦB/dt<0，故为顺时针。'},
      derivation:"<p><b>物理问题</b>　时变磁通产生电场环流；充电电容器的真空间隙无传导电流，却不能使磁场环路定律因选面而矛盾。</p><p><b>列式理由</b>　固定环路取右手正向，法拉第定律为 ∮E·dl=−dΦB/dt；安培定律补入位移项 ε₀dΦE/dt。</p><p><b>关键一步</b>　间隙 E=Q/(ε₀A)，故 ε₀A dE/dt=dQ/dt=I。对 ∇×B=μ₀J+μ₀ε₀∂tE 取散度，恢复 ∂tρ+∇·J=0。</p><p><b>极限检验</b>　磁通斜率为零时感应环流为零；停止充电时位移电流为零。位移项不是电荷穿过真空，也不能把固定环路式直接用于运动导体。</p>",
      derive:{q:'在理想真空充电电容间隙，哪个量等于导线电流？',options:['穿过间隙的传导电流','磁通变化率','ε₀dΦE/dt'],correct:2,explain:'传导电流为零，位移电流 ε₀A dE/dt=dQ/dt=I；二者物理含义不同。'}},
    {...common,id:'ED5.2',short:'电动力学 · ED5.2',title:'由方程到传播',
      intro:"无源区域为什么仍能有波？把麦克斯韦方程组合起来，再用平面波检查速度、方向与相位。",simTitle:'真空横波：E 沿 x，B 沿 y，传播沿 ±z',
      controls:[slider('amplitude','电场峰值 E₀',0,100,5,50,'V/m'),slider('k','波数大小 |k|',.5,6,.5,2,'rad/m'),select('direction','传播方向',1,[[1,'+z'],[-1,'−z']]),slider('phase','时间相位 ωt',0,360,15,60,'°'),slider('z','采样坐标 z',0,3,.1,1,'m')],
      goal:'从无源麦克斯韦方程得到波动方程，并核对波速、横向性、E/B 比和相位。',
      math:'ω=c|k|；E=E₀cos(kz−ωt)x̂；B=k×E/ω；c=1/√(ε₀μ₀)。',
      modelNote:'真空无源单色无限平面波，采用 exp[i(kz−ωt)]；k 为有符号矢量的 z 分量，滑块给其大小，方向单独选取。ω=c|k|，不能独立选任意 k 与 ω。显示相位快照，不是按真实光速播放。右图 E 与 cB 同用 V/m 尺度；对 −z 传播，By=−Ex/c，是方向反转而非额外时间延迟。零振幅时 E/B 比值无定义，仍成立矢量关系。无包络、无平滑。',
      graduate:{"task":"把完整麦克斯韦方程组代入复平面波，逐一检查散度式与旋度式。","check":"应得 k·E₀=k·B₀=0、k×E₀=ωB₀、k×B₀=−ωE₀/c²；仅满足某一个波动方程不足以保证 E、B 是相容的一组电磁场。"},
      reflection:'为什么反向传播时 By 变号？旋度的旋度恒等式中使用了哪个无源条件？无源是否意味着场必须为零？',
      prediction:{q:'真空单色波沿 +z，E 沿 +x 的时刻 B 指向哪里？',options:['+y，E 与 B 同相','−y，B 落后四分之一周期','+z，B 与传播方向平行'],correct:0,explain:'B=k×E/ω，ẑ×x̂=ŷ。真空行波的 E 和 B 同相；感应方程含空间与时间导数，不能据此推断相差 90°。'},
      derivation:"<p><b>物理问题</b>　无自由源不等于场为零；时变场可以在满足初始与边界条件时传播。</p><p><b>列式理由</b>　对 ∇×E=−∂tB 再取旋度，用无源条件 ∇·E=0 和 ∇×B=μ₀ε₀∂tE 消去 B。</p><p><b>关键一步</b>　∇²E−μ₀ε₀∂²tE=0，故 c=1/√(μ₀ε₀)、ω=c|k|。散度给横向性，旋度给 B=k×E/ω。</p><p><b>极限检验</b>　反向传播时 B 随之反向，E×B 指向传播方向；真空行波 E、B 同相。振幅为零时场归零，E/B 比值无定义。</p>",
      derive:{q:'给定真空波数大小 k，角频率应满足什么约束？',options:['ω=k/c','ω=ck','ω 与 k 完全无关'],correct:1,explain:'波动方程给 ω²=c²k²，正角频率 ω=c|k|；单位为 s⁻¹。'}},
    {...common,id:'ED5.3',short:'电动力学 · ED5.3',title:'偏振与界面：匹配场',
      intro:"波遇到介质界面时，为什么会反射？先在正常入射下匹配切向场，再区分振幅与功率。",simTitle:'偏振椭圆与菲涅耳界面：正常 / 斜入射',
      controls:[slider('epsilon1','区域 1：εr₁',1,4,1,1),slider('mu1','区域 1：μr₁',1,2,1,1),slider('epsilon2','区域 2：εr₂',1,4,1,4),slider('mu2','区域 2：μr₂',1,2,1,1),slider('angle','入射角（相对 +z 法向）',0,75,5,0,'°'),select('polarization','菲涅耳单分量',0,[[0,'s：E 垂直入射面'],[1,'p：E 位于入射面']]),slider('ratio','偏振图入射 Ep / Es 峰值',0,1,.25,1),slider('delta','偏振图相位差 δ',0,180,15,90,'°')],
      goal:'用切向 E/H 匹配场，区分复振幅系数 r/t 与法向功率系数 R/T；观察阻抗匹配和全反射。',
      math:'Z=√(μ/ε)；n₁sinθi=n₂sinθt；正常入射 r=(Z₂−Z₁)/(Z₂+Z₁)、t=1+r。',
      modelNote:'平面 z=0、入射面 xz、从区域 1 向 +z 入射，无自由面源；均匀、无损、正实 ε/μ。右图单独选择 s/p；左图仅为入射横截面偏振轨迹，不冒充反射或透射偏振。传播区的 r/t 按所选单位偏振基矢的电场复振幅系数计，p 的入射/反射基矢切向均为 +x，因此正常入射 rp=rs（某些教材反射 p 基矢相反）。p 在斜入射时 (1+r)cosθi=t cosθt，不能直接 t=1+r。全反射取复数 cosθt；p 偏振的解析延拓基矢不再是实单位矢量，t 不等于完整电场峰值之比。法向平均 T=0，不画传播折射线；不是透射场为零。图中射线长度仅示方向，无平滑。',
      graduate:{"task":"独立由切向 E/H 推出斜入射 s/p 系数，核对正常入射极限，再讨论全反射及偏振。","check":"令 ci=cosθi、ct=cosθt。本页基矢下 rs=(Z₂ci−Z₁ct)/(Z₂ci+Z₁ct)，ts=1+rs；rp=(Z₂ct−Z₁ci)/(Z₂ct+Z₁ci)，tp=2Z₂ci/(Z₂ct+Z₁ci)。传播区 T=(Z₁/Z₂)(ct/ci)|t|²。全反射取 ct=iγ、γ>0；p 基矢为复延拓，t 不是完整电场峰值比，T=0 仅指法向平均能流。"},
      reflection:'负 r 表示怎样的相位变化？为什么匹配阻抗在斜入射时还要考虑角度？全反射时 T=0 与存在倏逝场是否矛盾？',
      prediction:{q:'正常入射 Z₂<Z₁ 时，反射电场振幅 r 为负意味着什么？',options:['反射功率为负','反射场相对选定基矢翻相 π','没有反射'],correct:1,explain:'r=(Z₂−Z₁)/(Z₂+Z₁)<0，表示振幅翻相；反射率 R=|r|² 非负。'},
      derivation:"<p><b>物理问题</b>　偏振描述横向电场怎样随时间转动；界面上的入射、反射和透射场必须共同满足边界。</p><p><b>列式理由</b>　无自由面源时 Et、Ht 连续。正常入射取同向电场基矢，1+r=t，(1−r)/Z₁=t/Z₂，Z=√(μ/ε)。</p><p><b>关键一步</b>　联立得 r=(Z₂−Z₁)/(Z₂+Z₁)、t=1+r；正实阻抗下 R=|r|²、T=(Z₁/Z₂)|t|²，R+T=1。负 r 表示翻相。</p><p><b>极限检验</b>　Z₁=Z₂ 时正常入射无反射；等幅正交分量相差 90° 给圆偏振。斜入射须分 s/p；全反射 T=0 不代表透射场为零。</p>",
      derive:{q:'正常入射、正实阻抗，正确的透射功率系数是什么？',options:['T=t','T=|t|²，总是成立','T=(Z₁/Z₂)|t|²'],correct:2,explain:'平均强度为 |E₀|²/(2Z)，故 T=(Z₁/Z₂)|t|²。两侧阻抗不同，不能直接用振幅平方。'}},
    {...common,id:'ED5.4',short:'电动力学 · ED5.4',title:'色散、群速度与截止',
      intro:"同一等离子体为何允许高频波传播，却使低频场衰减？从电子响应求色散，再区分传播支与倏逝支。",simTitle:'无磁冷电子等离子体：传播与倏逝',
      controls:[slider('density','电子数密度 ne',1e6,1e8,1e6,1e7,'m⁻³'),slider('ratio','频率比 ω/ωp',.2,3,.1,1.5)],
      goal:'解释截止和低频延迟；区分相速度、群速度与信号前沿速度，避免把倏逝波数当实数。',
      math:'ωp²=ne e²/(me ε₀)；ω²=ωp²+c²k²；vg=c²k/ω。',
      modelNote:'均匀、无磁场、无碰撞、冷电子、固定中性离子背景的横向线性模式；不含磁化、碰撞吸收或密度梯度。ω>ωp：实 k，vp>c、vg<c；ω=ωp：k=0、vg=0，vp 无定义；ω<ωp：取 k=iκ（κ>0）沿 +z 衰减，vp/vg 不定义。衰减长度 1/κ 为振幅衰减至初值 1/e 的长度，不是吸收平均自由程。横轴 ξ=zωp/c；传播图为 t=0 的实场，倏逝图为归一化振幅包络，不是同一时间动画。无平滑。',
      resourceTitle:'得克萨斯大学讲义 · 无磁等离子体中的波',resourceDescription:'无磁冷等离子体的横向色散与截止推导。',resourceUrl:'https://farside.ph.utexas.edu/teaching/plasma/lectures/node72.html',
      graduate:{"task":"以 x=ωp²/ω² 为小参数独立展开群速度，估计截断误差，再推导稀薄无磁冷等离子体的路径群延迟。","check":"vg/c=1−x/2−x²/8+…，保留一阶的局部绝对误差为 O(x²)。Δt≈[e²/(2meε₀cω²)]∫ne dl；需窄带、路径缓变且远离截止，积分沿实际射线。近截止不能延用该展开。"},
      reflection:'固定绝对观测频率，提高 ne 会发生什么？本页频率比固定时频率也随密度改变，为什么不能混淆？脉冲到达时间需要哪种速度和路径信息？',
      prediction:{q:'在此理想模型中 ω<ωp，横向场如何随 +z 变化？',options:['k=iκ，振幅指数衰减','实 k，以超光速传能','所有位置的场严格为零'],correct:0,explain:'k²=(ω²−ωp²)/c²<0，取 Im k>0 的衰减支；这不是碰撞吸收，也不能赋予实传播群速度。'},
      derivation:"<p><b>物理问题</b>　电子随电场运动形成电流，改变介质响应；波数与频率因而不再满足真空关系。</p><p><b>列式理由</b>　在线性、冷、无磁、无碰撞模型中，me∂tv=−eE、J=−nee v，得到 εr=1−ωp²/ω²，ωp²=ne e²/(meε₀)。</p><p><b>关键一步</b>　k²c²=ω²−ωp²。传播支 vg=dω/dk=c²k/ω、vpvg=c²；低于截止取 k=iκ、κ>0，沿 +z 衰减。</p><p><b>极限检验</b>　ω≫ωp 时 vg→c；ω 降至 ωp 时 k→0、vg→0。倏逝支不定义实 vp、vg，衰减也不等同碰撞吸收。</p>",
      derive:{q:'传播支 ω>ωp 的群速度是多少？',options:['c/√(1−ωp²/ω²)','c√(1−ωp²/ω²)','恒为 c'],correct:1,explain:'对 ω²=ωp²+c²k² 求导，vg=c²k/ω=c√(1−ωp²/ω²)。'}}
  ];
});
