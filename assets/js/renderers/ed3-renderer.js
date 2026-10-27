/* Canvas views: SI model values; diagram arrows are explicitly scaled/schematic. */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(v,u='')=>v===null?'无定义':(v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e4?v.toExponential(3):v.toFixed(3))+(u?' '+u:'');
  function model(id,p,M){
    if(id==='ED3.1')return M.ampere(p.current,p.radius,p.offset);
    if(id==='ED3.2')return M.coil(p.current,p.radius,p.z);
    if(id==='ED3.3')return M.gauge(p.field,p.gauge,p.x,p.y);
    return M.dipole(p.current,p.radius,p.field,p.angle);
  }
  function metrics(id,p,M){
    const f=model(id,p,M);
    if(id==='ED3.1')return [['Bφ(r,0)',num(f.field*1e6,'μT')],['数值 ∮B·dl',f.integral===null?'环路靠近导线：未定义':num(f.integral*1e6,'μT·m')],['μ₀I_enc',num(f.expected===null?null:f.expected*1e6,'μT·m')]];
    if(id==='ED3.2')return [['精确 Bz',num(f.exact*1e6,'μT')],['远场首项 Bz',num(f.far===null?null:f.far*1e6,'μT')],['相对误差',num(f.relativeError===null?null:100*f.relativeError,'%')]];
    if(id==='ED3.3')return [['原 Bz',num(f.bz*1e6,'μT')],['变换后 Bz',num(f.transformedBz*1e6,'μT')],['变换后 ∇·A′',num(f.transformedDivergence*1e6,'μT')]];
    return [['磁矩 m',num(f.moment,'A·m²')],['有符号 τy',num(f.torqueY*1e6,'μN·m')],['相互作用能 U',num(f.energy*1e6,'μJ')]];
  }
  function table(id,p,M){
    const f=model(id,p,M);
    if(id==='ED3.1')return {headers:['环路核验量','数值'],rows:[['包围电流 (A)',num(f.enclosed)],['环上最小 |B| (μT)',num(f.minB===null?null:f.minB*1e6)],['环上最大 |B| (μT)',num(f.maxB===null?null:f.maxB*1e6)],['积分减 μ₀I_enc (T·m)',num(f.integral===null?null:f.integral-f.expected)]]};
    if(id==='ED3.2')return {headers:['线圈量','数值'],rows:[['磁矩 mz (A·m²)',num(f.moment)],['中心 Bz (μT)',num(M.coil(p.current,p.radius,0).exact*1e6)],['|z|/R',num(Math.abs(p.z)/p.radius)],['远场绝对误差 (μT)',num(f.far===null?null:Math.abs(f.far-f.exact)*1e6)],['轴线适用范围','远场仅当 |z|≫R；z=0 时首项无定义']]};
    if(id==='ED3.3')return {headers:['采样量','原 A','A′=A+∇χ'],rows:[['Ax (μT·m)',num(f.ax*1e6),num(f.transformedX*1e6)],['Ay (μT·m)',num(f.ay*1e6),num(f.transformedY*1e6)],['Bz (μT)',num(f.bz*1e6),num(f.transformedBz*1e6)],['∇·A (μT)',num(f.divergence*1e6),num(f.transformedDivergence*1e6)]]};
    return {headers:['取向核验量','数值'],rows:[['mx (A·m²)',num(f.mx)],['mz (A·m²)',num(f.mz)],['θ=0° 时 U (μJ)',num(M.dipole(p.current,p.radius,p.field,0).energy*1e6)],['θ=180° 时 U (μJ)',num(M.dipole(p.current,p.radius,p.field,180).energy*1e6)],['平衡判断',p.current===0||p.field===0?'所有取向等能，无恢复转矩':'平行稳定、反平行不稳定；静止需另考虑耗散']]};
  }
  function draw(ctx,id,p,M,palette=null){
    const C=palette||night;
    function line(x,y,tx,ty,c=C.grid,w=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.strokeStyle=c;ctx.lineWidth=w;ctx.stroke();}
    function label(s,x,y,c=C.text,size=12){ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':c;ctx.fillText(s,x,y);}
    function circle(x,y,r,c,fill=false){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);if(fill){ctx.fillStyle=c;ctx.fill();}else{ctx.strokeStyle=c;ctx.lineWidth=1.5;ctx.stroke();}}
    function arrow(x,y,tx,ty,c=C.green){line(x,y,tx,ty,c,2);const a=Math.atan2(ty-y,tx-x);if(Math.hypot(tx-x,ty-y)<1)return;line(tx,ty,tx-6*Math.cos(a-.45),ty-6*Math.sin(a-.45),c,2);line(tx,ty,tx-6*Math.cos(a+.45),ty-6*Math.sin(a+.45),c,2);}
    function graph(fn1,fn2,xmin,xmax,ymax,xname,yname){
      const l=490,t=90,w=264,h=178,px=x=>l+w*(x-xmin)/(xmax-xmin),py=y=>t+h/2-h*y/(2*ymax);
      for(let i=0;i<=4;i++){
        const x=xmin+(xmax-xmin)*i/4,y=-ymax+2*ymax*i/4;
        line(px(x),t,px(x),t+h);line(l,py(y),l+w,py(y));
        label(x.toFixed(1),px(x)-9,t+h+17,C.muted,10);label(y.toFixed(2),l-48,py(y)+3,C.muted,10);
      }
      label(xname,650,312,C.muted,11);label(yname,458,74,C.muted,11);
      [fn1,fn2].forEach((fn,j)=>{
        if(!fn)return;ctx.beginPath();let started=false;
        for(let i=0;i<=240;i++){
          const x=xmin+(xmax-xmin)*i/240,y=fn(x);
          if(y===null||!Number.isFinite(y)){started=false;continue;}
          if(started)ctx.lineTo(px(x),py(y));else{ctx.moveTo(px(x),py(y));started=true;}
        }
        ctx.strokeStyle=j?C.purple:C.green;ctx.lineWidth=2;ctx.stroke();
      });return {px,py};
    }
    const f=model(id,p,M);
    if(id==='ED3.1'){
      const cx=150,cy=171,s=60/p.radius;
      arrow(45,cy,397,cy,C.muted);arrow(cx,280,cx,48,C.muted);label('x (m)',350,cy+23);label('y (m)',cx+9,48);
      for(let x=65;x<=370;x+=45)for(let y=75;y<=265;y+=38){
        const b=M.wire(p.current,(x-cx)/s,(cy-y)/s),n=b.valid?Math.hypot(b.bx,b.by):0;
        if(n>0)arrow(x,y,x+12*b.bx/n,y-12*b.by/n,C.green);
      }
      circle(cx,cy,M.MASK*s,C.gold);circle(cx,cy,4,C.gold,true);
      label(p.current>0?'I：⊙ +z':p.current<0?'I：⊗ −z':'I=0',47,30,C.gold);
      circle(cx+p.offset*60,cy,60,C.purple);
      arrow(cx+p.offset*60+60,cy+15,cx+p.offset*60+60,cy-15,C.purple);
      circle(cx+60,cy,4,C.gold,true);label('P=(r,0)',cx+42,cy+42,C.gold,11);
      label('圆半径 r='+p.radius.toFixed(1)+' m；x₀/r='+p.offset,48,302,C.muted,11);
      label('绿：B 方向；紫：逆时针积分环路',48,319,C.muted,11);
      label('偏心环路数值核验',451,34,C.text,17);
      if(f.integral===null){label('环路进入导线排除区',451,105,C.gold,15);label('不定义包围电流与数值积分',451,140,C.muted);label('请移动圆心离开 x₀/r≈1',451,180,C.muted);}
      else{
        label('∮B·dl = '+num(f.integral*1e6,'μT·m'),451,100,C.green,14);
        label('μ₀Ienc = '+num(f.expected*1e6,'μT·m'),451,143,C.purple,14);
        label('环上 |B|min = '+num(f.minB*1e6,'μT'),451,191,C.muted);
        label('环上 |B|max = '+num(f.maxB*1e6,'μT'),451,223,C.muted);
        label(p.offset===0?'同心圆：B 沿切线且大小恒定':'偏心圆：不能直接用 B×周长',451,273,C.gold);
        label('箭头仅示方向；比较强度请看数值',451,310,C.muted,11);
      }
    }else if(id==='ED3.2'){
      const cx=213,cy=177,s=122/Math.max(p.radius,Math.abs(p.z),1);
      arrow(52,cy,391,cy,C.muted);arrow(cx,275,cx,55,C.muted);label('x (m)',345,cy+22);label('z (m)',cx+8,55);
      line(cx-p.radius*s,cy,cx+p.radius*s,cy,C.gold,3);
      circle(cx-p.radius*s,cy,5,C.gold);circle(cx+p.radius*s,cy,5,C.gold);
      label('−R',cx-p.radius*s-17,cy+20,C.gold,10);label('+R',cx+p.radius*s+4,cy+20,C.gold,10);
      const py=cy-p.z*s;circle(cx,py,4,C.green,true);
      if(f.exact!==0)arrow(cx,py,cx,py-30*Math.sign(f.exact),C.green);
      label('P：z='+p.z.toFixed(1)+' m',48,37,C.green);
      label('线圈在 xy 平面；此处为 xz 侧投影',48,300,C.muted,11);
      label('几何等比例，随参数缩放；B 箭头仅方向',48,319,C.muted,11);
      label('绿：精确场；紫：远场首项',458,34,C.text,14);
      label('首项仅画 |z|/R≥2；适用性请看误差',458,54,C.muted,11);
      const ymax=Math.max(Math.abs(M.coil(p.current,p.radius,0).exact*1e6)*1.12,.1);
      const g=graph(x=>M.coil(p.current,p.radius,x*p.radius).exact*1e6,x=>Math.abs(x)<2?null:M.coil(p.current,p.radius,x*p.radius).far*1e6,-8,8,ymax,'z/R','Bz (μT)');
      if(Math.abs(p.z/p.radius)<=8)circle(g.px(p.z/p.radius),g.py(f.exact*1e6),4,C.gold,true);
      else label('采样点超出曲线范围，数值仍有效',458,324,C.gold,10);
    }else if(id==='ED3.3'){
      label('均匀 Bz；左右 A 使用同一长度尺度',46,30,C.text,14);
      const scale=100/Math.max(Math.hypot(f.ax,f.ay)*1e6,Math.hypot(f.transformedX,f.transformedY)*1e6,1);
      for(const [cx,ax,ay,name,color] of [[133,f.ax,f.ay,'A',C.green],[338,f.transformedX,f.transformedY,'A′',C.purple]]){
        line(cx-65,177,cx+65,177);line(cx,242,cx,105);
        label('x',cx+65,195,C.muted,10);label('y',cx+8,103,C.muted,10);
        arrow(cx,177,cx+ax*1e6*scale,177-ay*1e6*scale,color);
        label(name,cx-5,80,color,20);
      }
      label('采样 (x,y)=('+p.x.toFixed(1)+','+p.y.toFixed(1)+') m',48,282,C.muted);
      label('箭头为采样点的矢势分量；单位 μT·m',48,309,C.muted,11);
      label('旋度不变，散度可以改变',470,35,C.text,16);
      label('Bz = '+num(f.bz*1e6,'μT'),470,107,C.green,17);
      label('B′z = '+num(f.transformedBz*1e6,'μT'),470,153,C.purple,17);
      label('∇·A = 0',470,212,C.green,15);
      label('∇·A′ = '+num(f.transformedDivergence*1e6,'μT'),470,252,C.purple,15);
      label('g≠0：A′ 离开库仑规范',470,309,C.muted,11);
    }else{
      const cx=221,cy=192,a=p.angle*Math.PI/180;
      arrow(60,cy,395,cy,C.muted);arrow(cx,279,cx,64,C.muted);label('x',384,cy+20);label('z',cx+9,62);
      for(const x of [92,339])if(p.field>0)arrow(x,245,x,90,C.purple);
      label(p.field===0?'B外=0':'B外沿 +z（方向示意）',50,34,C.purple);
      if(f.moment!==0)arrow(cx,cy,cx+85*Math.sin(a),cy-85*Math.cos(a),C.green);
      // The loop projects to a line perpendicular to n in the xz plane.
      line(cx-43*Math.cos(a),cy-43*Math.sin(a),cx+43*Math.cos(a),cy+43*Math.sin(a),C.gold,3);
      label('θ='+p.angle+'°；m=IπR²n̂',48,291,C.green,12);
      label('环与矢量仅示取向，不模拟自由转动',48,316,C.muted,11);
      label('绿：U；紫：τy（右侧注明单位）',456,34,C.text,13);
      label('能量与转矩数值共用刻度，量纲分别标注',456,54,C.muted,10);
      const amplitude=Math.max(f.moment*p.field*1e3*1.12,.1);
      const g=graph(t=>M.dipole(p.current,p.radius,p.field,t).energy*1e6,t=>M.dipole(p.current,p.radius,p.field,t).torqueY*1e6,0,180,amplitude,'θ (°)','U (μJ) / τy (μN·m)');
      circle(g.px(p.angle),g.py(f.energy*1e6),4,C.gold,true);
    }
  }
  root.ED3Renderer={metrics,table,draw};
})(typeof globalThis!=='undefined'?globalThis:this);
