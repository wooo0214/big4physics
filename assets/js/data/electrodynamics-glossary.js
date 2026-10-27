/* SI terminology and original teaching definitions, not copied textbook prose.
 * Source locators below were checked against publishers' public contents.
 * A source catalogue is a terminology/coverage reference, not full-text verification.
 * Lesson IDs are curriculum IDs; ED1.2 still uses `electro` only in progress storage.
 */
(function(root,factory){
  const data=factory();
  if(typeof module==='object'&&module.exports)module.exports=data;
  root.ElectrodynamicsGlossary=data;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const sources={
    wang:{title:'王振林《现代电动力学》· 中文教材目录',url:'https://xuanshu.hep.com.cn/front/book/findBookDetails?bookId=66d3516d74ce561611bda731'},
    zangwill:{title:'Zangwill《现代电动力学》· 英文教材目录',url:'https://assets.cambridge.org/97805218/96979/toc/9780521896979_toc.pdf'},
    tong:{title:'剑桥大学讲义 · 电磁学与相对论',url:'https://www.damtp.cam.ac.uk/user/tong/em/el4.pdf'},
    radiation:{title:'得克萨斯大学讲义 · 赫兹偶极子',url:'https://farside.ph.utexas.edu/teaching/em/lectures/node94.html'},
    reflection:{title:'得克萨斯大学讲义 · 全反射',url:'https://farside.ph.utexas.edu/teaching/jk1/Electromagnetism/node87.html'}
  };
  // Rows: Chinese, English, SI symbol/unit, definition, caveat, lesson suffixes.
  const rows=[
    {id:'ED1',title:'矢量场与边界条件',readings:[['wang','第1章，§2.2～2.3、§2.6'],['zangwill','第1章，§3.2～3.4']],terms:[
      ['电场强度','electric field','E；V/m = N/C','单位正试探电荷受到的电场力。','矢量分量可为负，模长非负。','1 2 4'],
      ['叠加原理','superposition principle','E=ΣEᵢ','各源电场按矢量相加。','有导体时还须求诱导电荷。','1'],
      ['电场线','electric field line','切线沿 E','以曲线切向表示场的局部方向。','线的条数不是可观测物理量。','1 2'],
      ['电通量','electric flux','ΦE；N·m²/C','电场穿过定向曲面的面积积分。','闭合面净通量为零不代表场为零。','2 3'],
      ['高斯定律','Gauss’s law','∮E·dA=Q内/ε₀','闭合面的电通量由包围总电荷决定。','由通量直接求场还需要对称性。','2'],
      ['梯度','gradient','∇φ；V/m','标量场的局部空间变化率矢量。','静电场为负电势梯度。','1 3'],
      ['散度','divergence','∇·F','描述矢量场局部的净流出密度。','点源处可能须用分布解释。','2 3'],
      ['旋度','curl','∇×F','描述局部环流密度及其轴向。','不等于某个粒子的自转。','3'],
      ['环流','circulation','∮F·dl','矢量场沿定向闭合曲线的线积分。','不能与穿面的通量混用。','3'],
      ['散度定理','divergence theorem','∮F·n dA=∫∇·F dV','联系闭合面通量与内部散度。','又称高斯散度定理；面法向朝外。','3'],
      ['斯托克斯定理','Stokes’s theorem','∮F·dl=∫(∇×F)·n dA','联系边界环流与面内旋度通量。','环向与面法向遵守右手规则。','3'],
      ['法向与切向分量','normal and tangential components','Fn=F·n；Ft=F−Fnn','相对于指定界面法向分解矢量。','变更区域编号时要同步改变跳跃定义。','4'],
      ['面电荷密度','surface charge density','σ；C/m²','单位面积上的电荷量。','与体电荷密度 ρ 的单位不同。','4'],
      ['面电流密度','surface current density','K；A/m','穿过单位横向线长的电流。','不是单位面积的体电流密度 J。','4']
    ]},
    {id:'ED2',title:'静电势与边值问题',readings:[['wang','§3.1～3.6'],['zangwill','第3～4、7～8章']],terms:[
      ['静电势','electrostatic potential','φ；V','静电场的标量势，E=−∇φ。','电势参考零点可加常数。','1'],
      ['电势差','potential difference','Δφ=−∫E·dl；V','两点静电势的差值。','积分方向须从起点指向终点。','1'],
      ['泊松方程','Poisson’s equation','∇²φ=−ρ/ε₀','真空中联系电势与电荷密度。','点源需按 δ 分布处理。','1 3 4'],
      ['拉普拉斯方程','Laplace’s equation','∇²φ=0','无电荷区域的电势方程。','无源不意味着无场。','1 3'],
      ['狄利克雷边界条件','Dirichlet boundary condition','φ|边界=f；V','在边界上指定电势。','齐次条件是 f=0。','2 3 4'],
      ['诺伊曼边界条件','Neumann boundary condition','∂nφ|边界；V/m','在边界上指定外法向导数。','须满足相容条件，解只唯一到常数。','3'],
      ['唯一性定理','uniqueness theorem','区域、源与边界','说明满足给定条件的解何时唯一。','构造解后仍须核对全部边界。','2 3'],
      ['镜像法','method of images','物理区域内求 φ','用辅助源构造满足边界条件的解。','镜像源不是导体内部真实电荷。','2 4'],
      ['诱导面电荷','induced surface charge','σ诱导；C/m²','导体为满足静电边界而重排的电荷。','真实分布通常不是一个镜像点源。','2'],
      ['分离变量法','separation of variables','φ=X(x)Y(y)','用可分离模态求解边值问题。','模态和还须匹配给定边界。','3'],
      ['格林函数','Green’s function','本页 ∇²G=−δ³；m⁻¹','给定区域与边界下的点源响应核。','不同教材的 4π 和符号约定可不同。','3 4'],
      ['多极展开','multipole expansion','Q、p、四极矩等','按源尺度与观测距离之比展开场。','中性源不保证偶极矩非零。','4'],
      ['电偶极矩','electric dipole moment','p=∫r′ρdV′；C·m','电荷分布的一阶空间矩。','净电荷非零时依赖原点。','4'],
      ['均方根残差','root-mean-square residual','√⟨(φN−f)²⟩；V','本节指顶边采样残差的均方根。','不是内部偏微分方程残差。','3']
    ]},
    {id:'ED3',title:'静磁场与矢势',readings:[['wang','§2.3、§4.1～4.4'],['zangwill','第9～12章']],terms:[
      ['稳恒电流','steady current','J；A/m²','满足稳恒连续性 ∇·J=0 的电流。','电荷密度不随时间变化。','1'],
      ['磁感应强度','magnetic flux density','B；T','磁场矢量，进入洛伦兹力公式。','中文也常简称磁场，须与 H 区分。','1 2 3 4'],
      ['安培环路定律','Ampère’s circuital law','∮B·dl=μ₀I内','静磁真空场的环流定律。','时变情形要加位移电流项。','1'],
      ['毕奥—萨伐尔定律','Biot–Savart law','dB=μ₀I dl′×R/(4πR³)','给出稳恒线电流产生的磁场。','叉积次序与源到场点方向须明确。','2'],
      ['矢势','vector potential','A；T·m','通过 B=∇×A 描述磁场。','矢势数值依赖规范选择。','3'],
      ['规范变换','gauge transformation','A′=A+∇χ','改变势表示而保持物理场。','时变 χ 还要求 φ′=φ−∂tχ。','3'],
      ['库仑规范','Coulomb gauge','∇·A=0','对矢势散度作出的规范选择。','不是对磁场新增的物理定律。','3'],
      ['剩余规范自由度','residual gauge freedom','静磁时 ∇²χ=0','已选规范内仍允许的势变换。','还须满足所采用的边界要求。','3'],
      ['磁偶极矩','magnetic dipole moment','m=ISn；A·m²','小闭合电流环的磁矩。','方向依电流右手规则。','2 4'],
      ['磁偶极近似','magnetic dipole approximation','B∝r⁻³；A∝r⁻²','局域稳恒电流的远区首阶描述。','观测距离须远大于电流分布尺度。','2'],
      ['转矩','torque','τ=m×B；N·m','外场对磁偶极产生的力矩。','零转矩不等于稳定平衡。','4'],
      ['取向势能','orientation potential energy','U=−m·B；J','固定磁矩在外场中的机械取向能。','完整电路账目还需包含维持电流的电源。','4']
    ]},
    {id:'ED4',title:'介质响应与宏观场',readings:[['wang','§2.5～2.6、§3.1、§4.3'],['zangwill','第6、13章']],terms:[
      ['极化强度','polarization','P；C/m²','单位体积的电偶极矩。','本页预设 P 不等于自动求得材料响应。','1 2'],
      ['束缚电荷','bound charge','ρb=−∇·P；C/m³','用极化描述的等效电荷。','界面项须通过 σb=P·n 计入。','1'],
      ['自由电荷','free charge','ρ自由；C/m³','宏观方程中与极化源分开记账的源。','不等同于微观全部电荷。','2 4'],
      ['电位移矢量','electric displacement field','D=ε₀E+P；C/m²','以自由电荷为散度源的宏观场。','并非任意介质都满足标量 D=εE。','2 4'],
      ['介电常数','permittivity','ε；F/m','线性本构中联系 D 与 E 的参数。','可随频率变化，也可为张量。','2 4'],
      ['相对介电常数','relative permittivity','εr=ε/ε₀；无量纲','介电常数相对于真空值的比。','不能与 ε 的单位混用。','2 4'],
      ['磁化强度','magnetization','M；A/m','单位体积的磁偶极矩。','预设 M 与自洽 M=χmH 是不同问题。','3'],
      ['束缚电流','bound current','Jb=∇×M；Kb=M×n','静态磁化对应的体电流及面电流。','时变极化还贡献 ∂tP 电流。','3'],
      ['磁场强度','magnetic field strength','H=B/μ₀−M；A/m','以自由电流为旋度源的宏观辅助场。','外加场 H₀ 不一定等于内部总 H。','3 4'],
      ['退磁场','demagnetizing field','H退磁；A/m','磁化体几何与边界引起的 H 贡献。','无限薄板公式不能套到任意形状。','3'],
      ['磁导率','permeability','μ；H/m','线性本构中联系 B 与 H 的参数。','一般材料不必有标量常数 μ。','4'],
      ['本构关系','constitutive relation','D(E)、B(H) 等','描述材料响应与宏观场的联系。','需说明线性、各向同性、频散和耗散。','2 3 4'],
      ['电容','capacitance','C=Q/V；F','规定导体系统中电荷与电势差的比例。','能量变化取决于固定 Q 或固定 V。','2'],
      ['准静态可逆插入','quasistatic reversible insertion','ΔU+W机械=W电源','缓慢插入介质时的理想能量比较。','终态能差不能直接给出位置相关插入力。','2']
    ]},
    {id:'ED5',title:'时变场与电磁波',readings:[['wang','§2.4、§5.1～5.2、§5.4～5.6'],['zangwill','第14、16～18章'],['reflection','全反射中的场分量与能流']],terms:[
      ['法拉第电磁感应定律','Faraday’s law of induction','∮E·dl=−dΦB/dt','固定环路的电场环流由磁通变化决定。','运动回路的电动势还须考虑 u×B。','1'],
      ['位移电流','displacement current','∂tD；A/m²','时变电位移在宏观旋度方程中的贡献。','不是电荷穿越真空间隙。','1'],
      ['安培—麦克斯韦定律','Ampère–Maxwell law','∇×H=J自由+∂tD','时变宏观场的旋度方程。','取散度与自由电荷连续性相容。','1'],
      ['横波','transverse wave','k·E=k·B=0','本节真空平面波的场垂直波矢。','不代表所有介质模式都是横波。','2'],
      ['波矢','wave vector','k；rad/m','给出空间相位变化方向和大小。','反向传播时方向与大小须分开。','2'],
      ['角频率','angular frequency','ω=2πf；rad/s','时间相位的变化率。','不能把 ω 与 f 混用。','2 4'],
      ['偏振','polarization','分量振幅比、相位差','固定位置电场矢量随时间的取向规律。','圆偏振的左右旋命名还需指定观察方向。','3'],
      ['波阻抗','wave impedance','Z=√(μ/ε)；Ω','简单无损介质行波中电磁场的比例。','斜入射的切向匹配还与角度有关。','3'],
      ['菲涅耳公式','Fresnel equations','r、t；无量纲','界面反射和透射的复振幅关系。','基矢约定不同可改变 rp 的符号。','3'],
      ['垂直偏振与平行偏振','s and p polarization','s：E⊥入射面；p：E∥入射面','按电场相对于入射面定义偏振。','不是相对于界面法向来命名。','3'],
      ['反射率与透射率','reflectance and transmittance','R、T；无量纲','反射或透射的法向平均功率份额。','通常不能把 T 直接写成 |t|²。','3'],
      ['全反射','total internal reflection','R=1；法向平均 T=0','无损界面超过临界角后的反射情形。','透射侧仍可存在倏逝场。','3'],
      ['倏逝场','evanescent field','kz=iκ；κ>0','沿指定法向呈指数衰减的场。','亦称消逝场；衰减不必意味着吸收。','3 4'],
      ['色散','dispersion','ω(k) 或 ε(ω)','波的频率与波数关系不再是固定比例。','频散是常见同义译法。','4'],
      ['相速度','phase velocity','vp=ω/k；m/s','等相位面的传播速度。','超过 c 不等于信息超光速。','4'],
      ['群速度','group velocity','vg=dω/dk；m/s','窄带波包包络的速度近似。','须检查模式、带宽、吸收与截止条件。','4'],
      ['等离子体频率','plasma frequency','ωp=√(nee²/meε₀)；rad/s','本节冷电子集体响应的特征频率。','fp=ωp/(2π)，不同于 ωp。','4'],
      ['截止','cutoff','本页 ω=ωp','横向模式实波数降为零的边界。','截止下的虚波数不能当成实传播速度。','4']
    ]},
    {id:'ED6',title:'能量与动量守恒',readings:[['wang','§2.7、§5.1.4～5.1.5、§5.2.5'],['zangwill','§15.4～15.8、§17.4']],terms:[
      ['坡印廷矢量','Poynting vector','S=E×B/μ₀；W/m²','本节真空电磁场的能流密度。','局部非零 S 不自动意味着远区辐射。','1 2'],
      ['坡印廷定理','Poynting’s theorem','∂tu+∇·S=−J·E','联系储能变化、能流与场对物质做功。','积分通量按控制面外法向计正。','1 2'],
      ['电磁能量密度','electromagnetic energy density','u=(ε₀E²+B²/μ₀)/2；J/m³','本页真空场单位体积的储能。','不能直接当作频散介质的完整储能。','1 2'],
      ['电功率密度','electric power density','J·E；W/m³','场向物质传递电能的局部速率。','负值表示物质向场供能。','1'],
      ['控制体','control volume','V；m³','用于积分守恒的选定空间区域。','本页固定控制体；移动边界需另处理。','1 2 4'],
      ['净外流功率','net outward power','∮S·n dA；W','穿过闭合控制面的带符号净功率。','流入区域时贡献为负。','1 2 4'],
      ['驻波','standing wave','等幅相干反向波叠加','具有固定节点的波场。','平均净能流零不代表瞬时能流零。','2'],
      ['周期平均','cycle average','⟨f⟩=(1/T)∫fdt','在一个完整周期上取时间平均。','平均 cos² 为 1/2，不是零。','2 3 4'],
      ['电磁动量密度','electromagnetic momentum density','g=S/c²；N·s/m³','本节真空场携带的单位体积动量。','介质中须连同物质贡献说明约定。','3'],
      ['麦克斯韦应力张量','Maxwell stress tensor','Tij；Pa','由电磁场构造的应力张量。','本页 f=∇·T−∂tg；动量外流张量为 −T。','3 4'],
      ['辐射压力','radiation pressure','p；Pa = N/m²','辐射向目标转移法向动量产生的压力。','正常入射理想吸收 I/c，反射 2I/c。','3'],
      ['动量通量','momentum flux','动量／时间／面积；Pa','动量穿越定向面的输运速率密度。','方向改变时，能流与动量流符号不同。','3 4']
    ]},
    {id:'ED7',title:'推迟势、辐射与天线',readings:[['wang','§6.1～6.4、§8.2.2'],['zangwill','§20.2～20.6、§23.3'],['radiation','局域电流源、偶极辐射与辐射电阻']],terms:[
      ['推迟时间','retarded time','t推迟=t−R/c；s','源影响经传播后到达观测点所对应的源时刻。','扩展源积分中 R 随源点变化。','1'],
      ['推迟势','retarded potentials','φ；V，A；T·m','在推迟时刻对源求值构造的电磁势。','本页另选无入射自由场的因果解。','1'],
      ['洛伦茨规范','Lorenz gauge','∇·A+c⁻²∂tφ=0','使势方程呈波动形式的规范条件。','Lorenz 与 Lorentz 是不同人名。','1'],
      ['近区','near zone','kr≪1；在源区外','相位延迟小且准静态项常占主导的区域。','有限源还须检查观测点相对源的尺度。','2'],
      ['感应场','induction field','偶极项 ∝r⁻²','点偶极场中含偶极矩一阶时间导数的项。','不宜把该项单独视为辐射功率。','2'],
      ['辐射区','radiation zone','kr≫1；r≫源尺度','可由横向 1/r 项主导的远区。','有限源电偶极近似还要求源尺度≪λ。','2 3'],
      ['近场往返储能','reactive near-field energy','场与源间的周期性交换','近场中周期储存及返还的能量。','与向无穷远净输运的能量不同。','2'],
      ['电偶极辐射','electric dipole radiation','d⟨P⟩/dΩ∝sin²θ；W/sr','由时变电偶极矩产生的远区辐射。','功率图 sin²θ 与场幅图 |sinθ| 不同。','2 3'],
      ['拉莫尔公式','Larmor formula','P=q²a²/(6πε₀c³)；W','非相对论点电荷的瞬时辐射总功率。','平均功率需用 ⟨a²⟩。','3'],
      ['辐射方向图','radiation pattern','归一化功率或场幅','描述辐射随观测方向的相对变化。','必须标明画的是功率还是场幅。','3 4'],
      ['赫兹偶极子','Hertzian dipole','ℓ≪λ 的理想电流元','预设近似均匀同相电流的短元模型。','不等同任意中心馈电短天线。','4'],
      ['有效长度','effective length','本页 ℓ有效=∫I(z)dz/I馈电；m','本页按电流积分定义的短天线等效长度。','均匀短元与三角电流分布对应不同值。','4'],
      ['辐射电阻','radiation resistance','⟨P⟩=I₀²R辐射/2；Ω','以馈电峰值电流等效表示辐射功率。','不等于导线的欧姆损耗电阻。','4'],
      ['天线互易性','antenna reciprocity','发射／接收方向响应','在线性互易条件下联系收发方向特性。','不适用于任意非互易介质或装置。','4']
    ]},
    {id:'ED8',title:'相对论与协变电动力学',readings:[['wang','§7.1～7.4'],['zangwill','§22.4～22.7、附录D'],['tong','相对论、电流与场张量章节']],terms:[
      ['惯性参考系','inertial frame','S、S′','自由粒子保持匀速直线运动的参考系。','本节不涉及加速坐标系。','1 2 3 4'],
      ['洛伦兹变换','Lorentz transformation','x′^μ=Λ^μ_νx^ν','保持闵可夫斯基度规的时空变换。','本页 boost 指无空间旋转的洛伦兹变换。','1 2 4'],
      ['洛伦兹因子','Lorentz factor','γ=1/√(1−β²)；无量纲','相对速率 β=v/c 对应的运动学因子。','惯性系间须 |β|<1。','1 2 4'],
      ['闵可夫斯基度规','Minkowski metric','η=diag(+1,−1,−1,−1)','本页用于四维内积和指标升降的度规。','另一符号约定也可成立，但不能混用。','1 3'],
      ['时空间隔','spacetime interval','s²=c²Δt²−|Δr|²；m²','两事件位移的洛伦兹不变量。','不是欧氏距离平方。','1'],
      ['类时、类空与零间隔','timelike, spacelike and null intervals','本页 s²>0、<0、=0','按时空间隔分类事件对。','二维投影可能不足以完成分类。','1'],
      ['同时性的相对性','relativity of simultaneity','Δt=0 不必有 Δt′=0','不同惯性系对分离事件的同时判断可不同。','不是同一事件在同一系中有两个时刻。','1 2'],
      ['四矢量','four-vector','V^μ，μ=0,1,2,3','按洛伦兹矩阵变换的四维量。','任意四个数不自动构成四矢量。','1 2'],
      ['四维电流密度','four-current density','J^μ=(cρ,J)；A/m²','把电荷密度与电流密度组合的四矢量。','多组分时 J/ρ 不一定是粒子速度。','2'],
      ['连续性方程','continuity equation','∂μJ^μ=0','电荷局域守恒的协变表达。','全局电荷还需检查边界通量及积分收敛。','2'],
      ['同时超曲面','simultaneity hypersurface','同一惯性系的 t=常数','各系定义总电荷积分时采用的空间截面。','不同系的同时截面通常不同。','2'],
      ['四势','four-potential','A^μ=(φ/c,A)；T·m','电标势与磁矢势的四维组合。','规范变换后场仍不变。','3'],
      ['电磁场张量','electromagnetic field tensor','F^0i=−Ei/c；F^ij=−εijkBk；T','将 E 与 B 统一表示的反对称张量。','混合指标矩阵未必在普通转置下反对称。','3 4'],
      ['指标升降','raising and lowering indices','Vμ=ημνV^ν','用度规变换协变及逆变分量。','空间指标降一次产生一个负号。','3'],
      ['四维洛伦兹力','four-dimensional Lorentz force','f^μ=qF^μνUν；N','粒子四动量对固有时的变化率。','空间分量是 γu 倍三维力。','3'],
      ['电磁场不变量','electromagnetic field invariants','E·B；E²−c²B²','有限洛伦兹变换下保持的两个场组合。','SI 下两者的量纲不同。','4'],
      ['纯电与纯磁参考系','purely electric and magnetic frames','E·B=0 且差平方非零','某系中仅 E 或仅 B 非零的场描述。','存在性不保证当前所选变换能实现。','4'],
      ['非零零型电磁场','nonzero null electromagnetic field','E·B=0；E²=c²B²；F≠0','两个不变量为零而场本身非零的类型。','局部波型场不能仅凭不变量认定为全局平面波。','4']
    ]}
  ];
  return {version:'1.0',sources,modules:rows.map(m=>({...m,terms:m.terms.map(([zh,en,symbol,definition,caveat,suffixes])=>({zh,en,symbol,definition,caveat,lessons:suffixes.split(' ').map(n=>m.id+'.'+n)}))}))};
});
