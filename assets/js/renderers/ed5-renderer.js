/* ED5 physical values and snapshot plots. No animation at a fictitious light speed. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>v===null?'无定义':(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  const complex=v=>num(v.re)+(v.im<0?' − ':' + ')+num(Math.abs(v.im))+'i';
  function model(id,p,M){
    if(id==='ED5.1')return M.induction(p.flux,p.current);
    if(id==='ED5.2')return M.wave(p.amplitude,p.k,p.direction,p.phase,p.z);
    if(id==='ED5.3')return M.interfaceWave(p.epsilon1,p.mu1,p.epsilon2,p.mu2,p.angle,p.polarization);
    return M.plasma(p.density,p.ratio);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED5.1')return [['感应电动势',num(f.emf*1e3,'mV')],['间隙位移电流',num(f.displacement*1e3,'mA')],['沿间隙场方向 dE/dt',num(f.eDot,'V/(m·s)')]];
    if(id==='ED5.2')return [['频率 f',num(f.frequency*1e-6,'MHz')],['采样 Ex / cBy',num(f.ex)+' / '+num(M.C*f.by)+' V/m'],['有符号平均 Sz',num(f.meanS,'W/m²')]];
    if(id==='ED5.3')return [['反射功率 R',num(f.reflectance)],['法向透射功率 T',num(f.transmittance)],['能量残差 R+T−1',num(f.residual)]];
    return [['状态',f.state],['等离子体频率 fp',num(f.wp/(2*Math.PI)*1e-6,'MHz')],['群速度 vg/c',f.vg===null?'无定义':num(f.vg/M.C)]];
  }
  function table(id,p,M){
    const f=model(id,p,M);let rows;
    if(id==='ED5.1')rows=[['正向环流 ∮E·dl (V)',num(f.emf)],['环上 Eφ，关于 +z (V/m)',num(f.ePhi)],['传导曲面 I (A)',num(f.current)],['间隙 ε₀A dE/dt (A)',num(f.displacement)],['两曲面电流差 (A)',num(f.displacement-f.current)],['电容外 r=0.6 m，关于 −z 的 Bφ (T)',num(f.bPhi)]];
    else if(id==='ED5.2')rows=[['ω (rad/s)',num(f.omega)],['λ (m)',num(f.wavelength)],['kz (rad/m)',num(p.direction*p.k)],['Ex (V/m)',num(f.ex)],['By (T)',num(f.by)],['瞬时 Sz (W/m²)',num(f.s)],['瞬时 u (J/m³)',num(f.energy)],['|E|/|B| (m/s)',Math.abs(f.ex)<1e-12?'零场附近不取比值':num(Math.abs(f.ex/f.by))]];
    else if(id==='ED5.3')rows=[['状态',f.state],['Z₁ / Z₂ (Ω)',num(f.z1)+' / '+num(f.z2)],['n₁ / n₂',num(f.n1)+' / '+num(f.n2)],['θt (°)',num(f.transmittedAngle)],['cosθt',complex(f.ct)],['完整 E 基矢的 r',complex(f.r)],['完整 E 基矢的 t',complex(f.t)],['R / T',num(f.reflectance)+' / '+num(f.transmittance)],['R+T−1',num(f.residual)],['左图范围','仅入射偏振；右图选定一个 s/p 分量']];
    else rows=[['ω / ωp (rad/s)',num(f.omega)+' / '+num(f.wp)],['εr(ω)',num(f.epsilonR)],['Re k / Im k (m⁻¹)',num(f.k)+' / '+num(f.kappa)],['振幅衰减长度 1/κ (m)',num(f.skin)],['vp (m/s)',num(f.vp)],['vg (m/s)',num(f.vg)],['vp vg / c²',f.vp===null?'仅传播支定义':num(f.vp*f.vg/M.C**2)],['密度与频率说明','固定 ω/ωp 改变 ne 时，绝对 ω 同时改变']];
    return {headers:['物理量 / 约定','数值 / 说明'],rows};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night,f=model(id,p,M);
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,2);if(Math.hypot(tx-x,ty-y)<1)return;const a=Math.atan2(ty-y,tx-x);line(tx,ty,tx-7*Math.cos(a-.45),ty-7*Math.sin(a-.45),c,2);line(tx,ty,tx-7*Math.cos(a+.45),ty-7*Math.sin(a+.45),c,2);}
    function circle(x,y,r,c){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();}
    function graph(functions,xmin,xmax,ymin,ymax,xname,yname){
      const l=469,t=83,w=281,h=177,px=x=>l+w*(x-xmin)/(xmax-xmin),py=y=>t+h-h*(y-ymin)/(ymax-ymin);
      for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;line(px(x),t,px(x),t+h);line(l,py(y),l+w,py(y));label(x.toFixed(1),px(x)-7,279,C.muted,10);label(y.toFixed(1),l-36,py(y)+3,C.muted,10);}
      label(yname,450,65,C.muted,11);label(xname,650,298,C.muted,11);
      functions.forEach(([fn,c])=>{ctx.beginPath();for(let i=0;i<=180;i++){const x=xmin+(xmax-xmin)*i/180,y=fn(x);if(i)ctx.lineTo(px(x),py(y));else ctx.moveTo(px(x),py(y));}ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();});
      return {px,py};
    }
    if(id==='ED5.1'){
      label('装置 A：从 +z 看固定环路',40,29,C.text,14);circle(209,160,76,C.gold);
      const sign=Math.sign(f.emf);if(sign)for(let i=0;i<8;i++){const a=i*Math.PI/4,x=209+76*Math.cos(a),y=160-76*Math.sin(a);arrow(x,y,x-sign*24*Math.sin(a),y-sign*24*Math.cos(a));}
      label('ΦB 法向 +z：⊙ 出屏',115,161,C.gold,12);label('正向：逆时针；R=0.5 m',75,272,C.muted,12);
      label('Eφ='+num(f.ePhi,'V/m'),75,296,C.green,12);
      label('装置 B：电容器的两种选面',446,29,C.text,14);
      line(510,114,718,114,C.gold,4);line(510,224,718,224,C.gold,4);line(615,63,615,114,C.purple,2);line(615,224,615,260,C.purple,2);
      label('上极板 Q',640,99,C.gold,12);label('下极板 −Q',640,245,C.gold,12);
      if(p.current!==0){const d=Math.sign(p.current);arrow(575,169-27*d,575,169+27*d,C.green);arrow(615,69-13*d,615,69+13*d,C.purple);}
      label('dE/dt 的正方向：−z（向下）',454,283,C.muted,11);
      label('I导线 = I位移 = '+num(f.current*1e3,'mA'),454,306,C.text,12);
    }else if(id==='ED5.2'){
      label('采样点横截面：x 右、y 上',40,29,C.text,14);
      line(70,170,365,170);line(210,62,210,269);label('+x',347,188);label('+y',221,69);
      const scale=83/Math.max(p.amplitude,1);arrow(210,170,210+f.ex*scale,170,C.green);arrow(210,170,210,170-M.C*f.by*scale,C.purple);
      label('绿 Ex；紫 cBy：共同 V/m 尺度',40,292,C.muted,11);label('传播沿 '+(p.direction===1?'+z':'−z')+'；不是轨迹动画',40,313,C.muted,11);
      label('绿 Ex(z)；紫 cBy(z)',454,29,C.text,14);
      const range=Math.max(p.amplitude*1.12,1);
      const g=graph([[z=>M.wave(p.amplitude,p.k,p.direction,p.phase,z).ex,C.green],[z=>M.C*M.wave(p.amplitude,p.k,p.direction,p.phase,z).by,C.purple]],0,3,-range,range,'z (m)','Ex、cBy (V/m)');
      line(g.px(p.z),83,g.px(p.z),260,C.gold,1.5);label('金线：采样 z；+z 时两曲线重合',454,319,C.muted,11);
    }else if(id==='ED5.3'){
      label('入射偏振横截面（归一化）',40,29,C.text,14);
      line(78,168,362,168);line(220,58,220,275);label('Es/E₀',312,188,C.green,11);label('Ep/E₀',229,66,C.purple,11);
      ctx.beginPath();for(let i=0;i<=240;i++){const a=M.polarization(p.delta,p.ratio,i*1.5),x=220+100*a.s,y=168-100*a.p;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.strokeStyle=C.green;ctx.lineWidth=2;ctx.stroke();
      label('相位差 '+p.delta+'°；峰值比 '+p.ratio,48,298,C.muted,12);
      label('右侧独立选定 '+(p.polarization===0?'s':'p')+' 单分量',48,317,C.muted,11);
      label('z=0 界面：xz 入射面，z 向上',444,29,C.text,14);
      line(453,171,753,171,C.gold,2);arrow(735,204,735,142,C.gold);label('+z',742,144,C.gold,10);
      const a=p.angle*Math.PI/180,cx=600,cy=171;
      arrow(cx-98*Math.sin(a),cy+98*Math.cos(a),cx,cy,C.green);
      if(f.reflectance>1e-14)arrow(cx,cy,cx+88*Math.sin(a),cy+88*Math.cos(a),C.purple);
      if(f.transmittedAngle!==null&&f.transmittance>0){const b=f.transmittedAngle*Math.PI/180;arrow(cx,cy,cx+88*Math.sin(b),cy-88*Math.cos(b),C.green);}
      else if(f.ct.im>0){for(let i=0;i<5;i++)line(500,151-i*13,701,151-i*13,C.grid,Math.max(.5,3-i*.6));label('倏逝：不画传播射线',469,70,C.muted,11);}
      label('区域 2',458,107,C.muted,11);label('区域 1',458,227,C.muted,11);
      label('绿：入射/透射；紫：反射（方向示意）',444,287,C.muted,10);
      label('R='+num(f.reflectance)+'；T='+num(f.transmittance),444,307,C.text,12);
    }else{
      label('绿 vp/c；紫 vg/c（仅传播支）',40,29,C.text,13);
      const l=74,t=77,w=297,h=181;
      for(let i=0;i<=4;i++){line(l,t+i*h/4,l+w,t+i*h/4);label((4-i).toFixed(0),46,t+i*h/4+3,C.muted,10);}
      for(const [fn,c] of [[r=>r/Math.sqrt(r*r-1),C.green],[r=>Math.sqrt(r*r-1)/r,C.purple]]){ctx.beginPath();for(let i=0;i<=180;i++){const r=1.04+1.96*i/180,v=Math.min(4,fn(r)),x=l+w*(r-1)/2,y=t+h-h*v/4;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();}
      label('1（截止）',67,281,C.muted,11);label('3    ω/ωp',299,281,C.muted,11);label('vp 在截止附近发散，图顶截于 4c',40,307,C.muted,11);
      label(f.state+'：t=0 场 / 倏逝振幅包络',442,29,C.text,13);
      graph([[x=>p.ratio<1?Math.exp(-Math.sqrt(1-p.ratio**2)*x):Math.cos(Math.sqrt(p.ratio**2-1)*x),C.green]],0,8,-1.1,1.1,'ξ=zωp/c','E/E₀ 或包络（无量纲）');
      label(p.ratio<1?'k=iκ，沿 +z 衰减；不是传播群速度':p.ratio===1?'k=0；vg=0；vp 无定义':'vp vg=c²；群速度用于窄带波包',442,319,C.muted,11);
    }
  }
  root.ED5Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
