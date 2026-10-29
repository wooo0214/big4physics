/* Thermal/statistical chapter 4. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS4Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  const solidLog=(N,q)=>logChoose(q+N-1,q);
  function exchange(A,B,Q){integer(A,1,100);integer(B,1,100);integer(Q,0,100);const logs=Array.from({length:Q+1},(_,q)=>solidLog(A,q)+solidLog(B,Q-q)),z=normalized(logs),mean=z.probabilities.reduce((s,p,q)=>s+p*q,0);return {...z,mean,variance:z.probabilities.reduce((s,p,q)=>s+p*(q-mean)**2,0)};}
  function bath(N,Q,gap){integer(N,2,1000);integer(Q,0,5000);integer(gap,1,100);const logs=[solidLog(N,Q),Q>=gap?solidLog(N,Q-gap):-Infinity],exact=normalized(logs).probabilities[1];
    // Forward entropy derivative at the unperturbed reservoir energy; NOT a fitted gap secant.
    const beta=solidLog(N,Q+1)-solidLog(N,Q),canonical=logistic(beta*gap);return {exact,canonical,beta,error:canonical-exact,allowed:Q>=gap};}
  function poisson(z,cut){positive(z);integer(cut,1,200);const ps=Array.from({length:cut+1},(_,n)=>Math.exp(-z+n*Math.log(z)-logFact(n))),norm=ps.reduce((s,p)=>s+p,0);return {ps,norm,missing:Math.max(0,1-norm),mean:z,variance:z,windowMean:ps.reduce((s,p,n)=>s+p*n,0)};}
  function fluctuations(N,p){integer(N,1,200);finite(p);if(p<0||p>1)throw new RangeError('probability');return {mean:N*p,variance:N*p*(1-p),sigma:Math.sqrt(N*p*(1-p)),relative:p===0?null:Math.sqrt((1-p)/(N*p)),ps:Array.from({length:N+1},(_,k)=>p===0?(k===0?1:0):p===1?(k===N?1:0):Math.exp(logChoose(N,k)+k*Math.log(p)+(N-k)*Math.log1p(-p)))};}
  const schema={"TS4.1": {"A": {"min": 1, "max": 30, "integer": true}, "B": {"min": 1, "max": 30, "integer": true}, "Q": {"min": 0, "max": 60, "integer": true}}, "TS4.2": {"N": {"min": 2, "max": 80, "integer": true}, "Q": {"min": 0, "max": 100, "integer": true}, "gap": {"min": 1, "max": 20, "integer": false}}, "TS4.3": {"z": {"min": 0.2, "max": 30, "integer": false}, "cut": {"min": 2, "max": 80, "integer": true}}, "TS4.4": {"N": {"min": 2, "max": 200, "integer": true}, "prob": {"min": 0, "max": 1, "integer": false}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS4.1'){const f=exchange(p.A,p.B,p.Q),points=f.probabilities.map((v,q)=>[q,v]);return view([['⟨qA⟩',f.mean],['Var(qA)',f.variance],['概率和',f.probabilities.reduce((a,b)=>a+b,0)]],[['固定总能量',p.Q,'ℏω'],['⟨qB⟩',p.Q-f.mean],['振子 A / B',p.A+' / '+p.B],['微观约束','qA+qB=Q；忽略共同零点，不模拟时间轨迹']],[graph('复合体系的精确分配','qA [量子数]','P(qA)',0,Math.max(1,p.Q),[curve('微正则权重',x=>x>p.Q?null:interp(points,x))],{marker:[Math.round(f.mean),f.probabilities[Math.round(f.mean)]]}),graph('两侧熵和决定权重','qA [量子数]','ln(ΩAΩB)',0,Math.max(1,p.Q),[curve('总计数熵',x=>{if(x>p.Q)return null;const q=Math.round(x);return solidLog(p.A,q)+solidLog(p.B,p.Q-q);})])]);}
    if(id==='TS4.2'){const f=bath(p.N,p.Q,p.gap);return view([['精确激发概率',f.exact],['正则一阶近似',f.canonical],['近似−精确',f.error]],[['热库 β（每量子）',f.beta],['能量分支',f.allowed?'可访问':'热库能量不足：精确概率严格 0'],['β 的定义','未扰动 Q 处 lnΩ(Q+1)−lnΩ(Q)，不是跨能隙拟合'],['总量子数 Q',p.Q]],[graph('能隙增大，检验有限热库','整数能隙 Δ/ℏω','p_excited',1,20,[curve('精确',g=>bath(p.N,p.Q,Math.round(g)).exact),curve('热库一阶展开',g=>bath(p.N,p.Q,Math.round(g)).canonical)]),graph('固定热库能量密度 Q/N','热库振子数 N','近似−精确',2,80,[curve('有限库误差',n=>{const N=Math.round(n);return bath(N,Math.round(p.Q/p.N*N),p.gap).error;})])]);}
    if(id==='TS4.3'){const f=poisson(p.z,p.cut);let total=0;const cumulative=f.ps.map((v,n)=>{total+=v;return [n,total];});return view([['完整分布 ⟨N⟩',f.mean],['完整分布 Var(N)',f.variance],['画窗遗漏概率',f.missing]],[['保留概率和',f.norm],['未归一画窗一阶矩',f.windowMean],['画窗 N_max',p.cut],['活度含义','z 含单粒子配分权重，不只是 exp(βμ)；有限窗不重新归一']],[graph('开放子体积的 Poisson 分布','粒子数 N','P(N)',0,p.cut,[curve('原分布',x=>interp(f.ps.map((v,n)=>[n,v]),x))]),graph('截断窗口的累计概率','粒子数上界','累计概率',0,p.cut,[curve('保留质量',x=>interp(cumulative,x)),curve('完整概率 1',()=>1)])]);}
    const f=fluctuations(p.N,p.prob);return view([['⟨E⟩/Δ',f.mean],['Var(E)/Δ²',f.variance],['σE/⟨E⟩',f.relative]],[['绝对 σE/Δ',f.sigma],['微正则对照','固定总激发数：总能量方差严格 0'],['正则概率和',f.ps.reduce((a,b)=>a+b,0)],['p=0 约定','平均能量为零时相对涨落未定义，不填零']],[graph('正则总激发数分布','总激发数 n','P(n)',0,p.N,[curve('正则',x=>interp(f.ps.map((v,n)=>[n,v]),x)),curve('固定 n≈Np',x=>Math.round(x)===Math.round(f.mean)?1:0)]),graph('相对下降与绝对增长','粒子数 N','无量纲',1,200,[curve('σE/Δ',n=>Math.sqrt(n*p.prob*(1-p.prob))),curve('相对涨落',n=>p.prob===0?null:Math.sqrt((1-p.prob)/(n*p.prob)))])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,exchange,bath,poisson,fluctuations};
});
