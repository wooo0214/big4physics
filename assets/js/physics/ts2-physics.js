/* Thermal/statistical chapter 2. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS2Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  function potentials(n,T,V){positive(n,T,V);const S=n*R*(1.5*Math.log(T/300)+Math.log((V/n)/.02)),U=1.5*n*R*T,PV=n*R*T;return {S,U,H:U+PV,F:U-T*S,G:U+PV-T*S};} // Extensive reference: molar entropy zero at T=300 K, V/n=.02 m³/mol.
  function composition(delta,x){finite(delta,x);if(x<0||x>1)throw new RangeError('x in [0,1]');const equilibrium=logistic(delta);return {F:xl(x)+xl(1-x)+delta*x,equilibrium,curvature:x>0&&x<1?1/x+1/(1-x):null,slope:x>0&&x<1?Math.log(x/(1-x))+delta:null};}
  function maxwell(n,T,V,step){positive(n,T,V,step);if(step>=1)throw new RangeError('relative step <1');const dV=V*step,dT=T*step,dSdV=(potentials(n,T,V+dV).S-potentials(n,T,V-dV).S)/(2*dV),dPdT=(n*R*(T+dT)/V-n*R*(T-dT)/V)/(2*dT);return {dSdV,dPdT,exact:n*R/V,residual:dSdV-dPdT};}
  const schema={"TS2.1": {"n": {"min": 0.5, "max": 2, "integer": false}, "T": {"min": 100, "max": 1000, "integer": false}, "V": {"min": 0.005, "max": 0.1, "integer": false}, "kind": {"options": [0, 1, 2, 3]}}, "TS2.2": {"delta": {"min": -6, "max": 6, "integer": false}, "x": {"min": 0, "max": 1, "integer": false}}, "TS2.3": {"n": {"min": 0.5, "max": 2, "integer": false}, "T": {"min": 100, "max": 1000, "integer": false}, "V": {"min": 0.005, "max": 0.1, "integer": false}, "logStep": {"min": -10, "max": -1, "integer": false}}, "TS2.4": {"T": {"min": 100, "max": 1000, "integer": false}, "gap": {"min": -1200, "max": 1200, "integer": false}, "x": {"min": 0, "max": 1, "integer": false}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS2.1'){const f=potentials(p.n,p.T,p.V),names=['U','H','F','G'],natural=['S,V,N','S,P,N','T,V,N','T,P,N'];return view([['当前势 '+names[p.kind],f[names[p.kind]],'J'],['熵 S',f.S,'J/K'],['PV',p.n*R*p.T,'J']],[['自然变量',natural[p.kind]],['U / H',fmt(f.U)+' / '+fmt(f.H),'J'],['F / G',fmt(f.F)+' / '+fmt(f.G),'J'],['参考约定','S=0 于 T=300 K、V/n=0.02 m³/mol；摩尔参考固定，适当广延；不用于第三定律']],[graph('同状态四势的温度依赖','T [K]','势 [kJ]',100,1000,[curve('U',t=>potentials(p.n,t,p.V).U/1000),curve('H',t=>potentials(p.n,t,p.V).H/1000),curve(names[p.kind],t=>potentials(p.n,t,p.V)[names[p.kind]]/1000)]),graph('勒让德项','T [K]','能量 [kJ]',100,1000,[curve('TS',t=>t*potentials(p.n,t,p.V).S/1000),curve('PV',t=>p.n*R*t/1000)])]);}
    if(id==='TS2.2'||id==='TS2.4'){const delta=id==='TS2.4'?p.gap/p.T:p.delta,f=composition(delta,p.x);return view([['平衡组成 x_eq',f.equilibrium],['当前势 / NkBT',f.F],['当前斜率 / kBT',f.slope]],[['二阶导数',f.curvature],['当前与平衡势差',f.F-composition(delta,f.equilibrium).F],['约束',id==='TS2.4'?'固定 T,P,N；Δg⁰/kB 以 K 输入':'固定 T,V,N；δ=Δ/(kBT)'],['端点解释','端点势连续；化学势差的对数发散，显示未定义']],[graph(id==='TS2.4'?'G 的组成极小':'F 的组成极小','B 组分比例 x','势 / NkBT',0,1,[curve('完整势',x=>composition(delta,x).F),curve('仅内能项',x=>delta*x)]),graph('斜率与平衡判据','B 组分比例 x','μB−μA / kBT',.002,.998,[curve('势导数',x=>composition(delta,x).slope),curve('零线',()=>0)])]);}
    const step=10**p.logStep,f=maxwell(p.n,p.T,p.V,step);return view([['(∂S/∂V)T',f.dSdV,'Pa/K'],['(∂P/∂T)V',f.dPdT,'Pa/K'],['两侧残差',f.residual,'Pa/K']],[['独立解析值 nR/V',f.exact,'Pa/K'],['残差图显示下限','log10 图中小于 10⁻¹⁶ Pa/K 的绝对误差按该显示下限绘制；指标保留实际值'],['相对步长',step],['dV',p.V*step,'m³'],['dT',p.T*step,'K']],[graph('两种数值偏导','V [m³]','导数 [Pa/K]',.005,.1,[curve('熵体积导数',v=>maxwell(p.n,p.T,v,step).dSdV),curve('压强温度导数',v=>maxwell(p.n,p.T,v,step).dPdT)]),graph('差分收敛与浮点误差','log10 相对步长','log10(|残差| / (1 Pa/K))',-10,-1,[curve('绝对残差',h=>Math.log10(Math.max(1e-16,Math.abs(maxwell(p.n,p.T,p.V,10**h).residual))))])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,potentials,composition,maxwell};
});
