/* Vacuum energy / momentum budgets, with explicit fixed outward surface normals. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  function model(id,p,M){
    if(id==='ED6.1')return M.wire(p.current,p.field);
    if(id==='ED6.2')return M.standing(p.amplitude,p.ratio,p.phase,p.time,p.z);
    if(id==='ED6.3')return M.pressure(p.intensity,p.mode);
    return M.budget(p.intensity,p.area,p.reflectance,p.absorption,p.direction);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED6.1')return [['径向 Sr（外向为正）',num(f.sRadial,'W/m²')],['物质获得 ∫J·E dV',num(f.joule,'W')],['能量残差',num(f.residual,'W')]];
    if(id==='ED6.2')return [['采样瞬时 u',num(f.energy*1e9,'nJ/m³')],['周期平均 Sz',num(f.meanS,'W/m²')],['dU/dt+Pout',num(f.residual,'W')]];
    if(id==='ED6.3')return [['压力（沿 +z）',num(f.pressure*1e6,'μPa')],['入射 g=I/c²',num(f.gIncident,'N·s/m³')],['吸收功率 / 面积',num(f.absorbed,'W/m²')]];
    return [['目标吸收功率',num(f.absorbed,'W')],['目标受力 Fz',num(f.force*1e6,'μN')],['能量残差',num(f.residual,'W')]];
  }
  function table(id,p,M){
    const f=model(id,p,M);let rows;
    if(id==='ED6.1')rows=[['表面 Bφ (T)',num(f.bPhi)],['体内 Jz (A/m²)',num(f.j)],['J·E (W/m³)',num(f.workDensity)],['净外流 Pout (W)',num(f.outward)],['净入流 Pin (W)',num(f.inward)],['物质电功率 (W)',num(f.joule)],['∂tU (W)','0（稳恒）'],['Pout+P物质 (W)',num(f.residual)]];
    else if(id==='ED6.2')rows=[['Ex / cBy (V/m)',num(f.ex)+' / '+num(M.C*f.by)],['采样瞬时 Sz (W/m²)',num(f.s)],['周期平均 u (nJ/m³)',num(f.meanEnergy*1e9)],['控制体 U (nJ)',num(f.stored*1e9)],['解析 dU/dt (W)',num(f.storedRate)],['左端外流 −S(0)×1 m² (W)',num(-f.left)],['右端外流 +S(L)×1 m² (W)',num(f.right)],['净外流 Pout (W)',num(f.outward)],['dU/dt+Pout (W)',num(f.residual)]];
    else if(id==='ED6.3')rows=[['入射行波 u (J/m³)',num(f.uIncident)],['入射行波 g (N·s/m³)',num(f.gIncident)],['真空入射侧平均 Tzz (Pa)',num(f.tzz)],['目标压力 pz (Pa)',num(f.pressure)],['反射平均功率 / 面积 (W/m²)',num(f.reflected)],['吸收平均功率 / 面积 (W/m²)',num(f.absorbed)],['应力公式','F物质=∮T·n dA−dP场/dt']];
    else rows=[['R / A吸 / T',num(f.r)+' / '+num(f.a)+' / '+num(f.t)],['入射 P入 (W)',num(f.input)],['反射 P反 (W)',num(f.reflected)],['透射 P透 (W)',num(f.transmitted)],['吸收 P吸 (W)',num(f.absorbed)],['左 / 右面带符号外流 (W)',num(f.leftOut)+' / '+num(f.rightOut)],['净外流+吸收 (W)',num(f.residual)],['入射 / 出射 z 动量率 (N)',num(f.incomingMomentum)+' / '+num(f.outgoingMomentum)],['光束动量差 Fz (N)',num(f.force)],['两面应力给力 A(T右−T左) (N)',num(p.area*(f.stressRight-f.stressLeft))]];
    return {headers:['物理量 / 守恒项','数值 / 说明'],rows};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night,f=model(id,p,M);
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,2);if(Math.hypot(tx-x,ty-y)<1)return;const a=Math.atan2(ty-y,tx-x);line(tx,ty,tx-7*Math.cos(a-.45),ty-7*Math.sin(a-.45),c,2);line(tx,ty,tx-7*Math.cos(a+.45),ty-7*Math.sin(a+.45),c,2);}
    function graph(l,t,w,h,functions,xmin,xmax,ymin,ymax,xlabel,ylabel){
      const px=x=>l+w*(x-xmin)/(xmax-xmin),py=y=>t+h-h*(y-ymin)/(ymax-ymin);
      for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;line(px(x),t,px(x),t+h);line(l,py(y),l+w,py(y));label(x.toFixed(2),px(x)-8,t+h+18,C.muted,10);label(Math.abs(y)<.01&&y!==0?y.toExponential(1):y.toFixed(1),l-43,py(y)+3,C.muted,10);}
      label(ylabel,l-24,t-17,C.muted,11);label(xlabel,l+w-65,t+h+39,C.muted,11);
      for(const [fn,c] of functions){ctx.beginPath();for(let i=0;i<=180;i++){const x=xmin+(xmax-xmin)*i/180,y=fn(x);if(i)ctx.lineTo(px(x),py(y));else ctx.moveTo(px(x),py(y));}ctx.strokeStyle=c;ctx.lineWidth=2;ctx.stroke();}
      return {px,py};
    }
    if(id==='ED6.1'){
      label('圆柱导线侧视：z 向上、r 向外',40,29,C.text,14);
      line(138,72,138,257,C.gold,2);line(287,72,287,257,C.gold,2);line(138,72,287,72,C.gold,2);line(138,257,287,257,C.gold,2);
      if(p.field!==0)arrow(193,166+40*Math.sign(p.field),193,166-40*Math.sign(p.field),C.purple);
      label('Ez',203,166,C.purple,13);
      if(f.sRadial!==0)for(const y of [105,165,225]){const s=Math.sign(f.sRadial);arrow(102+23*s,y,102-23*s,y,C.green);arrow(322-23*s,y,322+23*s,y,C.green);}
      label('绿色为能流方向（见右侧数值）',40,294,C.muted,11);
      label('a=0.01 m；L=1 m；端部忽略',40,315,C.muted,11);
      label('外法向通量 + 物质电功率 = 0',447,29,C.text,14);
      label('Pout = '+num(f.outward,'W'),455,105,C.green,18);label('∫J·E dV = '+num(f.joule,'W'),455,156,C.purple,18);
      label('∂tU = 0（稳恒）',455,207,C.gold,16);label(f.joule<0?'主动供能段：能量从物质流向场':'被动耗能 / 零功率：检查 IEz 的符号',447,272,C.muted,11);
      label('S 非零 ≠ 向无穷远净辐射',447,306,C.muted,12);
    }else if(id==='ED6.2'){
      label('绿：瞬时 u；紫：周期平均 u',40,29,C.text,13);
      const at=z=>M.standing(p.amplitude,p.ratio,p.phase,p.time,z),range=Math.max(2*M.EPS0*p.amplitude**2*1e9,1);
      const g=graph(77,83,286,170,[[z=>at(z).energy*1e9,C.green],[()=>f.meanEnergy*1e9,C.purple]],0,1,0,range,'z (m)','u (nJ/m³)');
      line(g.px(M.L),83,g.px(M.L),253,C.gold,2);line(g.px(p.z),83,g.px(p.z),253,C.grid,2);
      label('金线：控制体右端 0.375 m',40,318,C.muted,11);
      label('绿：瞬时 Sz；紫：周期平均 Sz',441,29,C.text,13);
      const sr=Math.max(M.EPS0*M.C*p.amplitude**2,.001);
      graph(484,83,272,170,[[z=>at(z).s,C.green],[()=>f.meanS,C.purple]],0,1,-sr,sr,'z (m)','Sz (W/m²)');
      label('左端 n=−z，右端 n=+z；面积 1 m²',441,318,C.muted,11);
    }else if(id==='ED6.3'){
      label('真空 +z 正常入射；目标静止',40,29,C.text,14);
      line(310,79,310,259,C.gold,5);if(p.intensity>0)arrow(65,128,298,128,C.green);label('入射 I='+num(p.intensity,'W/m²'),78,109,C.green,13);
      if(p.mode===1){if(p.intensity>0)arrow(298,213,65,213,C.purple);label('反射 I',78,241,C.purple,13);}else label('能量沉积于目标',99,227,C.purple,13);
      if(p.intensity>0)arrow(321,172,389,172,C.gold);label('Fz ≥ 0',318,198,C.gold,12);
      label('箭头长度仅表示方向；压力为周期平均',40,306,C.muted,11);
      label('绿：吸收 p；紫：反射 p',443,29,C.text,14);
      graph(485,83,272,170,[[i=>i/M.C*1e6,C.green],[i=>2*i/M.C*1e6,C.purple]],0,2000,0,14,'I (W/m²)','p (μPa)');
      label('静止理想镜：有力，平均吸收功率为零',443,318,C.muted,11);
    }else{
      label('固定控制面法向：左 −z，右 +z',40,29,C.text,14);
      line(102,73,102,257,C.grid,2);line(702,73,702,257,C.grid,2);line(403,73,403,257,C.gold,5);
      arrow(102,270,67,270,C.gold);label('n左=−z',49,295,C.gold,11);arrow(702,270,737,270,C.gold);label('n右=+z',683,295,C.gold,11);
      const d=p.direction,origin=d===1?138:665,target=403,far=d===1?665:138;
      if(f.input>0)arrow(origin,110,target-d*15,110,C.green);label('P入='+num(f.input,'W'),d===1?147:491,92,C.green,12);
      if(f.reflected>0)arrow(target-d*15,210,origin,210,C.purple);label('P反='+num(f.reflected,'W'),d===1?147:491,235,C.purple,12);
      if(f.transmitted>0)arrow(target+d*15,110,far,110,C.green);label('P透='+num(f.transmitted,'W'),d===1?491:147,145,C.green,12);
      label('P吸='+num(f.absorbed,'W'),435,183,C.gold,12);
      if(f.force!==0)arrow(403,247,403+65*Math.sign(f.force),247,C.gold);
      label('Fz='+num(f.force*1e6,'μN'),328,315,C.gold,12);
      label('箭头示方向，功率看数值；两侧真空',43,56,C.muted,11);
    }
  }
  root.ED6Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
