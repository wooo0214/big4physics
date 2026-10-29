/* Reusable quantum charts: axes include units; legends name each curve.
 * Signed amplitudes and densities have explicitly stated scaling. No smoothing.
 */
(function(root){
  'use strict';
  const night={text:'#eaf4ff',muted:'#a5b8cd',grid:'#2b3e54',green:'#69e0c3',purple:'#b8a4ff',gold:'#ffd18b'};
  const num=(x,u='')=>x===null?'未定义':(x===0?'0':Math.abs(x)<.001||Math.abs(x)>1e4?x.toExponential(4):x.toFixed(5))+(u?' '+u:'');
  const complex=z=>z===null?'未定义':num(z[0])+(z[1]<0?' − ':' + ')+num(Math.abs(z[1]))+'i';
  function tools(ctx,palette){const C=palette||night;
    const text=(s,x,y,size=12)=>{ctx.font=`${size}px -apple-system,sans-serif`;ctx.textAlign='left';ctx.fillStyle=palette?'#000000':C.text;ctx.fillText(s,x,y);};
    const line=(x,y,a,b,c=C.grid)=>{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(a,b);ctx.strokeStyle=c;ctx.lineWidth=1;ctx.stroke();};
    function chart(panel,title,xlabel,ylabel,xmin,xmax,series,options={}){
      const left=panel===0?64:462,top=84,width=292,height=181,points=series.map(s=>Array.from({length:241},(_,i)=>{const x=xmin+(xmax-xmin)*i/240;return [x,s.fn(x)];}));
      const values=points.flatMap(a=>a.map(v=>v[1])).filter(Number.isFinite),min=options.min??Math.min(0,...values),max=options.max??Math.max(0,...values),span=Math.max(max-min,1e-8),ymin=min-.08*span,ymax=max+.08*span,px=x=>left+width*(x-xmin)/(xmax-xmin),py=y=>top+height*(ymax-y)/(ymax-ymin);
      text(title,left-24,23,14);text(ylabel,left-24,69,11);text(xlabel,left+width-106,307,11);
      for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;line(px(x),top,px(x),top+height);line(left,py(y),left+width,py(y));text(x.toFixed(2),px(x)-13,285,10);text(Math.abs(y)<1e-8?'0':y.toFixed(2),left-49,py(y)+3,10);}
      if(options.shade){const [a,b,fn]=options.shade;ctx.beginPath();ctx.moveTo(px(a),py(0));for(let i=0;i<=160;i++){const x=a+(b-a)*i/160;ctx.lineTo(px(x),py(fn(x)));}ctx.lineTo(px(b),py(0));ctx.closePath();ctx.globalAlpha=.18;ctx.fillStyle=C.gold;ctx.fill();ctx.globalAlpha=1;}
      series.forEach((s,j)=>{ctx.beginPath();let start=false;for(const [x,y] of points[j]){if(!Number.isFinite(y)){start=false;continue;}if(start)ctx.lineTo(px(x),py(y));else{ctx.moveTo(px(x),py(y));start=true;}}ctx.strokeStyle=s.color||[C.green,C.purple,C.gold][j];ctx.lineWidth=2;ctx.stroke();line(left+j*105,43,left+j*105+14,43,ctx.strokeStyle);text(s.label,left+18+j*105,47,10);});
      return {px,py};
    }
    function matrix(panel,title,a,labels){const left=panel===0?42:432,top=91,w=320/a.length,h=Math.min(49,170/a.length);text(title,left,27,14);text('复数：3位有效数字；绝对值<10⁻¹²显示0',left,52,10);
      a.forEach((row,i)=>{text(labels?.[i]||String(i),left-18,top+i*h+18,10);row.forEach((z,j)=>{line(left+j*w,top+i*h,left+(j+1)*w,top+i*h);text((Math.abs(z[0])<1e-12?'0':String(Number(z[0].toPrecision(3))))+(z[1]<0?'−':'+')+(Math.abs(z[1])<1e-12?'0':String(Number(Math.abs(z[1]).toPrecision(3))))+'i',left+j*w+3,top+i*h+20,a.length>3?10:12);});});
      text('行、列基序：'+(labels?labels.join(', '):a.map((_,i)=>i).join(', ')),left,300,11);
    }
    return {C,text,line,chart,matrix};
  }
  function model(id,p,M){if(id==='quantum'||id==='QM1.1')return M.well(p.n,p.L);if(id==='QM1.2')return M.interval(p.n,p.L,p.a,p.b);if(id==='QM1.3')return M.superposition(p.theta,p.phase,p.chi);return M.gaussian(p.sigma,p.x0,p.k0);}
  function metrics(id,p,M){const f=model(id,p,M);if(id==='quantum'||id==='QM1.1')return [['能量 Eₙ',num(f.energyEv,'eV')],['内部节点',String(p.n-1)],['数值 ∫|ψ|²dx',num(f.norm)]];
    if(id==='QM1.2')return [['解析区间概率',num(f.probability)],['独立数值积分',num(f.numeric)],['积分残差',num(f.numeric-f.probability)]];
    if(id==='QM1.3')return [['P(E₁)',num(f.p1)],['P(E₂)',num(f.p2)],['数值归一化',num(f.norm)]];
    return [['σₓ',num(f.sigmaX,'m')],['σₚ',num(f.sigmaP,'kg·m/s')],['σₓσₚ/ℏ',num(f.product)]];}
  function table(id,p,M){const f=model(id,p,M);let rows;
    if(id==='quantum'||id==='QM1.1')rows=[['ψ(L/4) [m⁻¹ᐟ²]',num(f.psiSI(.25))],['|ψ(L/4)|² [nm⁻¹]',num(f.densityNm(.25))],['数值积分减1',num(f.norm-1)],['图形缩放','√Lψ 与 L|ψ|²；横轴ξ=x/L']];
    else if(id==='QM1.2')rows=[['实际排序区间 [nm]',num(f.lo*p.L)+' → '+num(f.hi*p.L)],['ξ区间',num(f.lo)+' → '+num(f.hi)],['全区间概率',num(f.norm)],['密度峰值 [nm⁻¹]',num(2/p.L)],['端点规则',p.a>p.b?'已交换端点，按小到大积分':'按小到大积分']];
    else if(id==='QM1.3')rows=[['⟨x⟩/L',num(f.meanX)],['相对相位 δ [rad]',num(p.phase)],['整体相位 χ [rad]',num(p.chi)],['混合态归一化',num(M.integrate(f.mixture,0,1))]];
    else rows=[['σₚ/ℏ [nm⁻¹]',num(1/(2*p.sigma))],['x显示窗口遗漏概率',num(f.missingX)],['k显示窗口遗漏概率',num(f.missingP)],['傅里叶与显示','k=p/ℏ；右图密度单位nm；窗口不重新归一化']];
    return {headers:['核验量','数值 / 约定'],rows};}
  function draw(ctx,id,p,M,palette){const f=model(id,p,M),{chart}=tools(ctx,palette);
    if(id==='quantum'||id==='QM1.1'){chart(0,'归一化驻波','ξ=x/L','√Lψ [无量纲]',0,1,[{label:'波函数',fn:f.psi}]);chart(1,'同一态的概率密度','ξ=x/L','L|ψ|² [无量纲]',0,1,[{label:'概率密度',fn:f.density}]);}
    else if(id==='QM1.2'){chart(0,'排序端点之间的概率面积','ξ=x/L','L|ψ|² [无量纲]',0,1,[{label:'密度',fn:f.density}],{shade:[f.lo,f.hi,f.density]});chart(1,'累计概率 F(ξ)','ξ=x/L','P(0≤x≤Lξ)',0,1,[{label:'累计概率',fn:x=>x-Math.sin(2*p.n*Math.PI*x)/(2*p.n*Math.PI)}],{min:0,max:1});}
    else if(id==='QM1.3'){chart(0,'相干纯态与经典混合','ξ=x/L','L|ψ|² [无量纲]',0,1,[{label:'相干',fn:f.density},{label:'混合',fn:f.mixture}]);chart(1,'纯态复振幅','ξ=x/L','√Lψ [无量纲]',0,1,[{label:'实部',fn:x=>f.amplitude(x)[0]},{label:'虚部',fn:x=>f.amplitude(x)[1]}]);}
    else{chart(0,'位置分布：均值±3σₓ','x [nm]','位置密度 [nm⁻¹]',p.x0-3*p.sigma,p.x0+3*p.sigma,[{label:'位置密度',fn:f.density}]);const sk=1/(2*p.sigma);chart(1,'动量分布：均值±3σk','k=p/ℏ [nm⁻¹]','k密度 [nm]',p.k0-3*sk,p.k0+3*sk,[{label:'动量密度',fn:f.momentum}]);}
  }
  root.QM1Renderer={model,metrics,table,draw,tools,num,complex};
})(typeof globalThis!=='undefined'?globalThis:this);
