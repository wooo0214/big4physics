/* Thermal/statistical chapter 5. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS5Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  function twoLevel(x){finite(x);if(x<0)throw new RangeError('nonnegative gap/thermal energy');const p=logistic(x),logZ=Math.log1p(Math.exp(-x));return {p,logZ,Z:1+Math.exp(-x),U:p,S:logZ+x*p,C:x*x*p*(1-p)};}
  function oscillator(x){positive(x);const e=Math.exp(-x),den=-Math.expm1(-x),occupation=e/den;return {occupation,U:.5+occupation,thermal:occupation,C:x*x*e/(den*den),S:x*occupation-Math.log(den),logZ:-x/2-Math.log(den)};}
  const MU=9.2740100783e-24;
  function magnet(B,T,N){finite(B);positive(T,N);const y=MU*B/(KB*T),t=Math.tanh(y),logZ=Math.abs(y)+Math.log1p(Math.exp(-2*Math.abs(y)));return {y,M:N*MU*t,reducedM:t,U:-N*MU*B*t,S:N*KB*(logZ-y*t),C:N*KB*y*y*(1-t*t),up:logistic(-2*y),down:logistic(2*y)};}
  function rotor(t,cut){positive(t);integer(cut,0,200);const terms=Array.from({length:cut+1},(_,l)=>(2*l+1)*Math.exp(-l*(l+1)/t)),Z=terms.reduce((a,b)=>a+b,0),mean=terms.reduce((s,v,l)=>s+v*l*(l+1),0)/Z,second=terms.reduce((s,v,l)=>s+v*(l*(l+1))**2,0)/Z;const refCut=Math.max(cut+20,Math.ceil(Math.sqrt(45*t))+10);let refZ=0,refE=0,refE2=0;for(let l=0;l<=refCut;l++){const E=l*(l+1),w=(2*l+1)*Math.exp(-E/t);refZ+=w;refE+=w*E;refE2+=w*E*E;}const missing=Math.max(0,1-Z/refZ);return {Z,U:mean,C:Math.max(0,second-mean*mean)/(t*t),ps:terms.map(v=>v/Z),missing,referenceC:(refE2/refZ-(refE/refZ)**2)/(t*t),refCut,tailBound:t*Math.exp(-refCut*(refCut+1)/t)/refZ};}
  const schema={"thermal": {"x": {"min": 0.2, "max": 6, "integer": false}}, "TS5.1": {"x": {"min": 0.2, "max": 6, "integer": false}}, "TS5.2": {"x": {"min": 0.1, "max": 12, "integer": false}}, "TS5.3": {"B": {"min": -10, "max": 10, "integer": false}, "T": {"min": 1, "max": 30, "integer": false}, "logN": {"min": 1, "max": 23, "integer": false}}, "TS5.4": {"t": {"min": 0.1, "max": 30, "integer": false}, "cut": {"min": 0, "max": 30, "integer": true}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='thermal'||id==='TS5.1'){const f=twoLevel(p.x);return view([['激发态概率',f.p],['平均能量 U/Δ',f.U],['熵 S/kB',f.S]],[['Z',f.Z],['p0+p1',1],['C/kB',f.C],['能量约定','E0=0，E1=Δ>0；横轴 x=Δ/(kBT)']],[graph('两能级正则占据','x=Δ/(kBT)','概率',0,6,[curve('基态',x=>1-twoLevel(x).p),curve('激发态',x=>twoLevel(x).p)],{marker:[p.x,f.p]}),graph('熵与 Schottky 热容','x=Δ/(kBT)','以 kB 缩放',0,8,[curve('S/kB',x=>twoLevel(x).S),curve('C/kB',x=>twoLevel(x).C)])]);}
    if(id==='TS5.2'){const f=oscillator(p.x);return view([['总 U/ℏω',f.U],['热激发能/ℏω',f.thermal],['C/kB',f.C]],[['S/kB',f.S],['lnZ',f.logZ],['零点能/ℏω',.5],['求和约定','无限等间距能谱闭式，无固定截断造成的伪高温下降']],[graph('热激发与零点能','x=ℏω/(kBT)','能量 / ℏω',.1,10,[curve('总能量',x=>oscillator(x).U),curve('热激发',x=>oscillator(x).thermal)]),graph('热容与经典极限','x=ℏω/(kBT)','C/kB',.1,10,[curve('量子振子',x=>oscillator(x).C),curve('经典',()=>1)])]);}
    if(id==='TS5.3'){const N=10**p.logN,f=magnet(p.B,p.T,N);return view([['总磁矩 M',f.M,'J/T'],['平均能量 U',f.U,'J'],['熵 S/(NkB)',f.S/(N*KB)]],[['p(s=+1)',f.up],['p(s=−1)',f.down],['μ（单磁矩）',MU,'J/T'],['C/(NkB)',f.C/(N*KB)],['总磁矩定义','M 为 J/T，不是体积磁化强度 A/m']],[graph('独立磁矩的饱和','外场 B [T]','M/(Nμ)',-10,10,[curve('精确 tanh',B=>magnet(B,p.T,N).reducedM),curve('Curie 线性',B=>MU*B/(KB*p.T))]),graph('单磁矩的占据','外场 B [T]','取向概率',-10,10,[curve('s=+1',B=>magnet(B,p.T,N).up),curve('s=−1',B=>magnet(B,p.T,N).down)])]);}
    const f=rotor(p.t,p.cut);return view([['截断热容 C/kB',f.C],['大截断参考 C/kB',f.referenceC],['遗漏配分权重估计',f.missing]],[['能级窗口',p.cut===0?'仅保留 l=0，不能推断真实高温热容':'l=0 至 l_max'],['Z（当前截断）',f.Z],['U/(kBθr)',f.U],['独立参考 l_max',f.refCut],['参考尾界估计',f.tailBound],['数值告警',f.missing>1e-5?'截断失效：当前下降不可当作物理冻结':'当前窗口通过参考权重比较']],[graph('带简并度的转动态概率','角动量 l [整数]','截断归一 p_l',0,Math.max(1,p.cut),[curve('保留能级',x=>x>p.cut?null:f.ps[Math.round(x)])],{marker:[0,f.ps[0]]}),graph('截断误差与真实经典极限','T/θr','C/kB',.1,30,[curve('当前 l_max',t=>rotor(t,p.cut).C),curve('自适应大截断',t=>rotor(t,p.cut).referenceC),curve('经典',()=>1)])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,twoLevel,oscillator,magnet,rotor,MU};
});
