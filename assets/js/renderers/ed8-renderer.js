/* Common numerical scales compare frames; matrix index conventions remain explicit. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>v===null?'无定义':(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  const vector=v=>v.map(x=>num(x)).join('，');
  function model(id,p,M){
    if(id==='ED8.1')return M.events(p.ct,p.x,p.y,p.beta);
    if(id==='ED8.2')return M.current(p.rho,p.current,p.beta);
    if(id==='ED8.3')return M.tensorExample(p.gradient,p.magGradient,p.x,p.indices,p.speed);
    return M.fieldExample(p.amplitude,p.preset,p.beta,p.axis);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED8.1')return [['洛伦兹因子 γ',num(f.gamma)],['原系 / 新系 s²',num(f.interval)+' / '+num(f.intervalPrime)+' m²'],['时空间隔类型',Math.abs(f.interval)<1e-12?'零间隔':f.interval>0?'类时':'类空']];
    if(id==='ED8.2')return [['新系 ρ′',num(f.rhoPrime*1e9,'nC/m³')],['新系 Jx′',num(f.jPrime*1e3,'mA/m²')],['四电流范数差',num(f.invariantPrime-f.invariant,'(A/m²)²')]];
    if(id==='ED8.3')return [['局域 ρ',num(f.rho*1e9,'nC/m³')],['局域 Jy',num(f.j[1],'A/m²')],['张量源式最大残差',num(Math.max(...f.residual.map(Math.abs)),'T/m')]];
    return [['原场分类',f.classification],['I₁′−I₁',num(f.transformed.dot-f.original.dot,'V·T/m')],['I₂′−I₂',num(f.transformed.difference-f.original.difference,'(V/m)²')]];
  }
  function table(id,p,M){
    const f=model(id,p,M);let rows;
    if(id==='ED8.1')rows=[['S：ct / x / y / z (m)',vector(f.original)],['S′：ct′ / x′ / y′ / z′ (m)',vector(f.transformed)],['S / S′ 的 Δt (ns)',num(p.ct/M.C*1e9)+' / '+num(f.transformed[0]/M.C*1e9)],['s² / s′² (m²)',num(f.interval)+' / '+num(f.intervalPrime)],['s′²−s² (m²)',num(f.intervalPrime-f.interval)],['图像约定','两系坐标数值的共同刻度比较；光锥仅为 x–ct 投影']];
    else if(id==='ED8.2')rows=[['S：cρ / Jx (A/m²)',vector(f.original.slice(0,2))],['S′：cρ′ / Jx′ (A/m²)',vector(f.transformed.slice(0,2))],['四电流原 / 新范数 ((A/m²)²)',num(f.invariant)+' / '+num(f.invariantPrime)],['仅 Jx=0：随动团 V′ (m³)',num(f.cellVolume)],['仅 Jx=0：Q / Q′ (nC)',f.cellCharge===null?'无定义：不是原系静止电荷团':num(f.rho*1e9)+' / '+num(f.cellCharge*1e9)],['连续性','∂tρ+∇·J=0；常量局域示范，不替代时变全局检验']];
    else if(id==='ED8.3')rows=[...f.matrix.map((r,i)=>['矩阵行 μ='+i+' (T)',vector(r)]),['E (V/m) / B (μT)',vector(f.e)+' / '+vector(f.b.map(x=>x*1e6))],['φ (V) / A (T·m)，y=0.3 m',num(f.potential.phi)+' / '+vector(f.potential.avec)],['∂μF^μν，ν=0,1,2,3 (T/m)',vector(f.divergence)],['μ₀J^ν，同顺序 (T/m)',vector(f.source)],['f⁰ / fˣ / fʸ / fᶻ (nN)',vector(f.force.map(x=>x*1e9))],['Uμf^μ (N·m/s)',num(f.orthogonality)],['指标说明','四维力使用 F^μνUν；显示指标切换不改变物理力']];
    else rows=[['S：E (V/m)',vector(f.e)],['S′：E′ (V/m)',vector(f.prime.e)],['S：B (T)',vector(f.b)],['S′：B′ (T)',vector(f.prime.b)],['S / S′：E·B (V·T/m)',num(f.original.dot)+' / '+num(f.transformed.dot)],['S / S′：E²−c²B² ((V/m)²)',num(f.original.difference)+' / '+num(f.transformed.difference)],['分类说明',f.classification],['图像说明','xy 投影；z 分量单列；E 与 cB 共用 V/m 尺度']];
    return {headers:['物理量 / 分量约定','数值 / 说明'],rows};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night,f=model(id,p,M);
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,2);if(Math.hypot(tx-x,ty-y)<1)return;const a=Math.atan2(ty-y,tx-x);line(tx,ty,tx-7*Math.cos(a-.45),ty-7*Math.sin(a-.45),c,2);line(tx,ty,tx-7*Math.cos(a+.45),ty-7*Math.sin(a+.45),c,2);}
    function dot(x,y,c){ctx.beginPath();ctx.arc(x,y,4,0,2*Math.PI);ctx.fillStyle=c;ctx.fill();}
    if(id==='ED8.1'){
      label('坐标数值比较：绿 S，紫 S′',40,29,C.text,14);
      const range=Math.max(...f.original.map(Math.abs),...f.transformed.map(Math.abs),4)*1.1,s=102/range,cx=218,cy=172;
      line(100,cy,340,cy);line(cx,55,cx,287);label('x (m)',340,cy+5,C.muted,11);label('ct (m)',cx+9,59,C.muted,11);
      ctx.setLineDash([4,4]);line(cx-100,cy+100,cx+100,cy-100);line(cx-100,cy-100,cx+100,cy+100);ctx.setLineDash([]);
      for(const [v,c] of [[f.original,C.green],[f.transformed,C.purple]]){line(cx,cy,cx+v[1]*s,cy-v[0]*s,c,2);dot(cx+v[1]*s,cy-v[0]*s,c);}
      label('投影光线 ct=±x；比例 '+num(range)+' m',40,317,C.muted,11);
      label('同一事件，不同时空坐标',447,29,C.text,14);
      label('S：ct='+num(p.ct)+' m，x='+num(p.x)+' m',452,104,C.green,13);
      label('S′：ct′='+num(f.transformed[0])+' m',452,143,C.purple,13);
      label('      x′='+num(f.transformed[1])+' m',452,174,C.purple,13);
      label('y′=y='+num(p.y)+' m',452,212,C.gold,13);
      label('完整 s²='+num(f.interval,'m²'),452,260,C.text,15);
      label('Δy≠0 时不能仅靠二维光锥分类',447,310,C.muted,11);
    }else if(id==='ED8.2'){
      label('四电流：绿 S；紫 S′（A/m²）',40,29,C.text,13);
      const scale=107/Math.max(...f.original.map(Math.abs),...f.transformed.map(Math.abs),.1);
      for(const [name,i,y] of [['cρ',0,108],['Jx',1,218]]){line(69,y,371,y);label(name,40,y-28,C.text,13);arrow(218,y-9,218+f.original[i]*scale,y-9,C.green);arrow(218,y+9,218+f.transformed[i]*scale,y+9,C.purple);}
      label('共同数值尺度；不是速度矢量',40,310,C.muted,11);
      label('局域密度变化 ≠ 总电荷变化',447,29,C.text,14);
      label('ρ′='+num(f.rhoPrime*1e9,'nC/m³'),452,109,C.purple,15);
      label('Jx′='+num(f.jPrime*1e3,'mA/m²'),452,151,C.purple,15);
      if(f.cellVolume!==null){label('原系静止电荷团：V=1 m³',452,210,C.text,13);label('V′='+num(f.cellVolume,'m³'),452,244,C.gold,13);label('Q′=Q='+num(f.cellCharge*1e9,'nC'),452,276,C.gold,13);}
      else{label('Jx≠0：不套静止团的 V/γ 公式',452,225,C.gold,12);label('需要源组成与各系同时截面的信息',452,259,C.muted,11);}
      label('连续性：∂tρ+∇·J=0',447,313,C.muted,12);
    }else if(id==='ED8.3'){
      const title=['F^μν（双上）','F_μν（双下）','F^μ_ν（混合）'][p.indices];
      label(title+'；数值单位 μT',40,29,C.text,14);
      for(let i=0;i<4;i++){label(String(i),62,100+i*45,C.muted,11);label(String(i),111+i*77,63,C.muted,11);for(let j=0;j<4;j++){line(87+j*77,75+i*45,164+j*77,75+i*45);label(num(f.matrix[i][j]*1e6),96+j*77,100+i*45,i===0||j===0?C.green:C.purple,12);}}
      label('行 μ / 列 ν；空间块的升降符号不同',40,292,C.muted,11);label('混合指标矩阵不要求普通转置反对称',40,315,C.muted,11);
      label('由同一势得到场与源',447,29,C.text,14);
      label('Ex=ax='+num(f.e[0],'V/m'),452,90,C.green,13);label('Ey=40 V/m；Bz='+num(f.b[2]*1e6,'μT'),452,121,C.purple,12);
      label('ρ=ε₀a='+num(f.rho*1e9,'nC/m³'),452,163,C.text,13);label('Jy=−b/μ₀='+num(f.j[1],'A/m²'),452,197,C.text,13);
      label('四维力空间分量 = γu × 三维力',447,254,C.gold,12);
      label('麦克斯韦源式 / 四维力数值见下表',447,287,C.muted,11);label('常量 + 多项式局部场，不是有限源解',447,315,C.muted,11);
    }else{
      const range=Math.max(...f.e.map(Math.abs),...f.cb.map(Math.abs),...f.prime.e.map(Math.abs),...f.prime.cb.map(Math.abs),1),scale=89/range;
      for(const [name,e,b,x] of [['S',f.e,f.cb,215],['S′',f.prime.e,f.prime.cb,615]]){
        label(name+'：绿 E；紫 cB（V/m）',x-170,29,C.text,14);
        line(x-116,165,x+116,165);line(x,58,x,269);label('+x',x+121,169,C.muted,11);label('+y',x+7,61,C.muted,11);
        arrow(x,165,x+e[0]*scale,165-e[1]*scale,C.green);arrow(x,165,x+b[0]*scale,165-b[1]*scale,C.purple);
        label('Ez='+num(e[2])+'；cBz='+num(b[2])+' V/m',x-170,287,C.muted,11);
      }
      label('共同长度尺度；仅显示 xy 投影，z 分量单列',40,315,C.muted,11);label(f.classification,443,315,C.gold,11);
    }
  }
  root.ED8Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
