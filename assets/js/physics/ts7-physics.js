/* Thermal/statistical chapter 7. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS7Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  function occupations(e,T,mu){finite(e,mu);positive(T);const x=(e-mu)/T;if(x<=0)throw new RangeError('BE requires mu below all energies');return {MB:Math.exp(-x),BE:1/Math.expm1(x),FD:logistic(x)};}
  function fermi(T,N){positive(T,N);const energies=Array.from({length:12},(_,i)=>i),capacity=energies.length;if(N>=capacity)throw new RangeError('N strictly inside capacity');let lo=-Math.max(100,100*T),hi=11+Math.max(100,100*T);const count=mu=>energies.reduce((s,e)=>s+logistic((e-mu)/T),0);for(let k=0;k<150;k++){const mid=(lo+hi)/2;if(count(mid)<N)lo=mid;else hi=mid;}const mu=(lo+hi)/2,ps=energies.map(e=>logistic((e-mu)/T));return {energies,mu,ps,residual:ps.reduce((a,b)=>a+b,0)-N,capacity,U:ps.reduce((s,p,i)=>s+p*energies[i],0)};}
  function bose(t){finite(t);if(t<0||t>1)throw new RangeError('0<=T/Tc<=1');return {excited:t**1.5,condensed:1-t**1.5};}
  const A=8*Math.PI**5*KB**4/(15*H**3*C**3);
  function photon(T,cut){positive(T,cut);const shape=x=>x===0?0:x>700?0:x*x*x/Math.expm1(x),integral=integrate(shape,0,cut,3000),exact=Math.PI**4/15;return {u:A*T**4,peak:2.8214393721220787*KB*T/H,shape,integral,missing:Math.max(0,1-integral/exact),spectral:nu=>8*Math.PI*H*nu**3/C**3/(Math.expm1(H*nu/(KB*T))||1),pressure:A*T**4/3};}
  const schema={"TS7.1": {"T": {"min": 0.2, "max": 4, "integer": false}, "distance": {"min": 0.05, "max": 6, "integer": false}, "energy": {"min": 0, "max": 8, "integer": false}}, "TS7.2": {"T": {"min": 0.05, "max": 5, "integer": false}, "N": {"min": 0.5, "max": 11.5, "integer": false}}, "TS7.3": {"t": {"min": 0, "max": 1, "integer": false}}, "TS7.4": {"T": {"min": 2, "max": 10000, "integer": false}, "cut": {"min": 2, "max": 30, "integer": true}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS7.1'){const mu=-p.distance,f=occupations(p.energy,p.T,mu);return view([['MB 每态占据',f.MB],['BE 每态占据',f.BE],['FD 每态占据',f.FD]],[['μ/ε0（负值）',mu],['kBT/ε0',p.T],['态密度约定','图为每单粒子态平均数；不是已归一能量概率密度'],['BE 允许域','μ=−distance < 最低能 ε=0；不跨越极点']],[graph('同一能谱的三种统计','ε/ε0','每态平均占据',0,8,[curve('MB',e=>occupations(e,p.T,mu).MB),curve('BE',e=>occupations(e,p.T,mu).BE),curve('FD',e=>occupations(e,p.T,mu).FD)]),graph('稀占据区趋于经典','(ε−μ)/(kBT)','量子 / MB',.1,8,[curve('BE/MB',x=>1/(-Math.expm1(-x))),curve('FD/MB',x=>1/(1+Math.exp(-x))),curve('经典',()=>1)])]);}
    if(id==='TS7.2'){const f=fermi(p.T,p.N),temperature=samples(t=>fermi(t,p.N).mu,.05,5,60);return view([['求得 μ/ε0',f.mu],['数目残差 Σn−N',f.residual],['U/ε0',f.U]],[['固定平均粒子数',p.N],['有限能谱容量',f.capacity],['最低 / 最高能 ε/ε0','0 / 11，各态简并度 1'],['模型边界','固定平均 N 的有限能级 FD；不声称连续电子气方程']],[graph('固定 N 的费米占据','ε/ε0','每态占据',0,11,[curve('求解 μ(T)',e=>logistic((e-f.mu)/p.T))]),graph('粒子数约束调整化学势','kBT/ε0','μ/ε0',.05,5,[curve('括区二分解',t=>interp(temperature,t))])]);}
    if(id==='TS7.3'){const f=bose(p.t);return view([['凝聚份额 N0/N',f.condensed],['激发份额 Nex/N',f.excited],['份额和',f.condensed+f.excited]],[['当前 T/Tc',p.t],['几何与极限','均匀三维、理想气体、热力学极限'],['ζ(3/2)',2.612375348685488],['不能直接迁移','谐振阱的态密度不同；有限体系交叉不等同真正奇点']],[graph('凝聚粒子与激发粒子','T/Tc','粒子份额',0,1,[curve('凝聚',t=>bose(t).condensed),curve('激发',t=>bose(t).excited)],{marker:[p.t,f.condensed]}),graph('均匀三维态密度','ε/ε0','g(ε)/g(ε0)',0,4,[curve('三维 √ε',e=>Math.sqrt(e))])]);}
    const f=photon(p.T,p.cut),scale=KB*p.T/H;return view([['辐射总能量密度',f.u,'J/m³'],['频率谱峰 νmax',f.peak,'Hz'],['有限窗遗漏估计',f.missing]],[['辐射压强 u/3',f.pressure,'Pa'],['辐射常数 a',A,'J·m⁻³·K⁻⁴'],['窗积分 / (π⁴/15)',f.integral/(Math.PI**4/15)],['谱密度约定','uν 是 J·m⁻³·Hz⁻¹，含两偏振；不是单位立体角强度；频率/波长转换需雅可比']],[graph('频率谱：横轴明确缩放','ν/(kBT/h)','uν / [8π(kBT)³/(h²c³)]',0,p.cut,[curve('Planck 能量密度',x=>f.shape(x))]),graph('总能量密度的 T⁴ 标度','T / 当前温度','u / 当前 u',.1,2,[curve('完整积分 aT⁴',r=>r**4),curve('当前画窗积分',r=>r**4*(1-f.missing))])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,occupations,fermi,bose,photon,A};
});
