/* Thermal/statistical chapter 1. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS1Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';

  const R=8.31446261815324,KB=1.380649e-23,H=6.62607015e-34,C=299792458,AMU=1.66053906660e-27;
  function positive(...xs){if(xs.some(x=>!Number.isFinite(x)||x<=0))throw new RangeError('positive finite inputs required');}
  function finite(...xs){if(xs.some(x=>!Number.isFinite(x)))throw new RangeError('finite inputs required');}
  function integer(x,min=0,max=10000){if(!Number.isInteger(x)||x<min||x>max)throw new RangeError('integer outside model domain');}
  const xl=x=>x===0?0:x*Math.log(x);
  const logistic=x=>x>=0?Math.exp(-x)/(1+Math.exp(-x)):1/(1+Math.exp(x));
  function logFact(n){integer(n);let s=0;for(let k=2;k<=n;k++)s+=Math.log(k);return s;}
  const logChoose=(n,k)=>{integer(n);integer(k,0,n);return logFact(n)-logFact(k)-logFact(n-k);};
  function normalized(logs){const top=Math.max(...logs),z=logs.reduce((s,x)=>s+Math.exp(x-top),0);return {probabilities:logs.map(x=>Math.exp(x-top)/z),logZ:top+Math.log(z)};}
  function integrate(fn,a,b,n=1000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
  function samples(fn,a,b,n=100){return Array.from({length:n+1},(_,i)=>[a+(b-a)*i/n,fn(a+(b-a)*i/n)]);}
  function interp(points,x){if(x<=points[0][0])return points[0][1];if(x>=points.at(-1)[0])return points.at(-1)[1];const i=Math.floor((x-points[0][0])/(points.at(-1)[0]-points[0][0])*(points.length-1)),a=points[i],b=points[i+1];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);}
  const curve=(label,fn)=>({label,fn});
  const graph=(title,xlabel,ylabel,min,max,series,options={})=>({title,xlabel,ylabel,min,max,series,options});
  function fmt(x,unit=''){return (x===null?'未定义':typeof x==='string'?x:x===0?'0':Math.abs(x)<.001||Math.abs(x)>1e4?x.toExponential(4):x.toFixed(5))+(unit?' '+unit:'');}
  function view(values,rows,plots){return {metrics:values.map(([k,v,u])=>[k,fmt(v,u)]),rows:rows.map(([k,v,u])=>[k,fmt(v,u)]),plots};}

  function state(n,T,V,f=3){positive(n,T,V,f);return {P:n*R*T/V,U:n*f*R*T/2};}
  function process(n,T,V,r,f,kind){positive(n,T,V,r,f);integer(kind,0,3);const gamma=1+2/f,Cv=f*R/2;let Tf=T,W;
    if(kind===0){Tf=T*r;W=0;} // Isochoric: r is final/initial temperature.
    if(kind===1){Tf=T*r;W=n*R*(Tf-T);}
    if(kind===2)W=n*R*T*Math.log(r);
    if(kind===3){Tf=T*r**(1-gamma);W=n*Cv*(T-Tf);}
    const deltaU=n*Cv*(Tf-T);return {Tf,W,Q:deltaU+W,deltaU,gamma,Vf:kind===0?V:V*r};
  }
  function carnot(n,Th,Tc,r){positive(n,Th,Tc,r);if(Tc>=Th||r<=1)throw new RangeError('Th>Tc and r>1');const Qh=n*R*Th*Math.log(r),Qc=-n*R*Tc*Math.log(r);return {Qh,Qc,W:Qh+Qc,eta:1-Tc/Th,expansion:(Th/Tc)**1.5};}
  function expansion(n,T,r){positive(n,T,r);if(r<1)throw new RangeError('expansion ratio >=1');return {S:n*R*Math.log(r),Q:n*R*T*Math.log(r),W:n*R*T*Math.log(r)};}
  const schema={"TS1.1": {"n": {"min": 0.1, "max": 3, "integer": false}, "T": {"min": 100, "max": 1000, "integer": false}, "V": {"min": 0.005, "max": 0.1, "integer": false}}, "TS1.2": {"kind": {"options": [0, 1, 2, 3]}, "n": {"min": 0.5, "max": 2, "integer": false}, "T": {"min": 200, "max": 600, "integer": false}, "V": {"min": 0.01, "max": 0.05, "integer": false}, "r": {"min": 0.5, "max": 3, "integer": false}, "f": {"min": 3, "max": 5, "integer": true}}, "TS1.3": {"n": {"min": 0.5, "max": 2, "integer": false}, "Tc": {"min": 100, "max": 400, "integer": false}, "dT": {"min": 10, "max": 400, "integer": false}, "r": {"min": 1.1, "max": 4, "integer": false}}, "TS1.4": {"n": {"min": 0.5, "max": 2, "integer": false}, "T": {"min": 200, "max": 600, "integer": false}, "r": {"min": 1, "max": 6, "integer": false}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS1.1'){const f=state(p.n,p.T,p.V);return view([['压强 P',f.P,'Pa'],['内能 U',f.U,'J'],['PV/(nRT)',1]],[['n 为物质的量',p.n,'mol'],['Pa·m³ = J',f.P*p.V,'J'],['不含相互作用','经典稀薄、单原子理想气体']], [graph('同温等温线','V [m³]','P [kPa]',.005,.1,[curve('当前 T',v=>state(p.n,p.T,v).P/1000),curve('T/2',v=>state(p.n,p.T/2,v).P/1000)],{marker:[p.V,f.P/1000]}),graph('固定 V 的升温','T [K]','P [kPa]',100,1000,[curve('压强',t=>state(p.n,t,p.V).P/1000)])]);}
    if(id==='TS1.2'){const f=process(p.n,p.T,p.V,p.r,p.f,p.kind),pi=state(p.n,p.T,p.V).P;const a=Math.min(p.V,f.Vf)*.8,b=Math.max(p.V,f.Vf)*1.2;return view([['ΔU',f.deltaU,'J'],['Q 流入',f.Q,'J'],['W_by',f.W,'J']],[['第一律残差 ΔU−Q+W',f.deltaU-f.Q+f.W,'J'],['终温',f.Tf,'K'],['γ',f.gamma],['等容比值定义','等容时 r=T_f/T_i；其余 r=V_f/V_i']],[graph('过程的压强关系','V [m³]','P [kPa]',a,b,[curve('当前过程',v=>(p.kind===0?null:(p.kind===1?pi:p.kind===2?p.n*R*p.T/v:pi*(p.V/v)**f.gamma)/1000)),curve('初温等温参考',v=>p.n*R*p.T/v/1000)],p.kind===0?{vertical:[p.V,pi/1000,pi*p.r/1000],min:0,max:Math.max(pi,pi*p.r)/1000*1.2}:{}),graph('沿过程的能量账本','进度 s [无量纲]','能量 [kJ]',0,1,[curve('Q',s=>process(p.n,p.T,p.V,1+(p.r-1)*s,p.f,p.kind).Q/1000),curve('W_by',s=>process(p.n,p.T,p.V,1+(p.r-1)*s,p.f,p.kind).W/1000),curve('ΔU',s=>process(p.n,p.T,p.V,1+(p.r-1)*s,p.f,p.kind).deltaU/1000)])]);}
    if(id==='TS1.3'){const Th=p.Tc+p.dT,f=carnot(p.n,Th,p.Tc,p.r),V1=.01,V2=V1*p.r,V3=V2*f.expansion,V4=V1*f.expansion;return view([['效率 η',f.eta],['吸热 Qh',f.Qh,'J'],['循环功',f.W,'J']],[['冷库 Tc',p.Tc,'K'],['热库 Th=Tc+ΔT',Th,'K'],['Qh+Qc−W',f.Qh+f.Qc-f.W,'J'],['循环熵 Qh/Th+Qc/Tc',f.Qh/Th+f.Qc/p.Tc,'J/K']],[graph('四段可逆循环','V [m³]','P [kPa]',V1,V3,[curve('膨胀：热等温→绝热',v=>(v<=V2?p.n*R*Th/v:p.n*R*Th/V2*(V2/v)**(5/3))/1000),curve('压缩：绝热←冷等温',v=>(v<=V4?p.n*R*Th/V1*(V1/v)**(5/3):p.n*R*p.Tc/v)/1000)]),graph('冷库改变的效率','Tc/Th [无量纲]','η [无量纲]',.05,1,[curve('卡诺上界',x=>1-x)])]);}
    const f=expansion(p.n,p.T,p.r);return view([['同终态 ΔS',f.S,'J/K'],['自由膨胀 Q=W',0,'J'],['可逆参照 Q=W',f.Q,'J']],[['两路径 ΔU',0,'J'],['自由膨胀总熵产生',f.S,'J/K'],['可逆环境熵',-f.S,'J/K'],['可逆总熵产生',0,'J/K']],[graph('同终态状态熵变化','V_f/V_i','ΔS [J/K]',1,6,[curve('两路径同一 ΔS',r=>expansion(p.n,p.T,r).S)]),graph('可逆过程与自由膨胀','V_f/V_i','Q = W_by [kJ]',1,6,[curve('可逆等温',r=>expansion(p.n,p.T,r).Q/1000),curve('自由膨胀',()=>0)])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,state,process,carnot,expansion};
});
