/* Thermal/statistical chapter 3. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS3Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  function binomial(N,n,prob=.5){integer(N,1,200);integer(n,0,N);finite(prob);if(prob<0||prob>1)throw new RangeError('probability');const distribution=Array.from({length:N+1},(_,k)=>prob===0?(k===0?1:0):prob===1?(k===N?1:0):Math.exp(logChoose(N,k)+k*Math.log(prob)+(N-k)*Math.log1p(-prob)));const exact=logChoose(N,n),x=n/N,leading=-N*(xl(x)+xl(1-x));return {logOmega:exact,omega:Math.exp(exact),distribution,leading,error:leading-exact,norm:distribution.reduce((a,b)=>a+b,0)};}
  function mixing(N,x,same){positive(N);finite(x);if(x<0||x>1)throw new RangeError('fraction');integer(same,0,1);return {entropy:same?0:-N*(xl(x)+xl(1-x)),VA:x,VB:1-x};}
  function entropy(a,b){finite(a,b);if(a<0||a>1||b<0||b>1)throw new RangeError('fractions');const ps=[a,(1-a)*b,(1-a)*(1-b)];return {ps,S:-ps.reduce((s,x)=>s+xl(x),0),norm:ps.reduce((s,x)=>s+x,0)};}
  const schema={"TS3.1": {"N": {"min": 2, "max": 100, "integer": true}, "fraction": {"min": 0, "max": 1, "integer": false}}, "TS3.2": {"N": {"min": 2, "max": 200, "integer": true}, "fraction": {"min": 0, "max": 1, "integer": false}}, "TS3.3": {"N": {"min": 10, "max": 1000, "integer": true}, "x": {"min": 0, "max": 1, "integer": false}, "same": {"options": [0, 1]}}, "TS3.4": {"a": {"min": 0, "max": 1, "integer": false}, "b": {"min": 0, "max": 1, "integer": false}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS3.1'||id==='TS3.2'){const n=Math.round(p.fraction*p.N),f=binomial(p.N,n);return view([['实际整数激发数 n',n],['lnΩ = S/kB',f.logOmega],['分布概率和',f.norm]],[['Ω（计数）',f.omega],['实际 n/N',n/p.N],['Stirling 主项',f.leading],['主项−精确值',f.error],['有限尺寸','N 整数；fraction 经四舍五入成 n/N；端点 0ln0=0']],[graph('精确宏观概率（折线连离散点）','n [整数]','P(n) [无量纲]',0,p.N,[curve('二项式',x=>interp(f.distribution.map((v,k)=>[k,v]),x))],{marker:[n,f.distribution[n]]}),graph('精确计数与广延主项','激发数 n [整数]','S/kB',0,p.N,[curve('精确 lnΩ',x=>logChoose(p.N,Math.round(x))),curve('Stirling 主项',x=>-p.N*(xl(x/p.N)+xl(1-x/p.N)))])]);}
    if(id==='TS3.3'){const f=mixing(p.N,p.x,p.same);return view([['ΔS/kB',f.entropy],['初态 VA/V',f.VA],['初态 VB/V',f.VB]],[['不同气体的参照 ΔS/kB',mixing(p.N,p.x,0).entropy],['同种等温等压',0],['初始条件','同 T 同 P，VA/V=NA/N；体积分数由粒子数确定，不能任意另调'],['分离操作','不同组分需可选择性区分；同种不凭人为标签产生熵']],[graph('可分辨性改变混合熵','NA/N','ΔS/(NkB)',0,1,[curve('不同气体',x=>mixing(1,x,0).entropy),curve('同种同 T,P',()=>0)]),graph('固定 T,P 的体积分配','NA/N','初始体积分数',0,1,[curve('VA/V',x=>x),curve('VB/V',x=>1-x)])]);}
    const f=entropy(p.a,p.b);return view([['S/kB',f.S],['概率和',f.norm],['相对均匀分布熵差',Math.log(3)-f.S]],[...f.ps.map((v,i)=>['p'+(i+1),v]),['概率控制定义','p1=a；p2=(1−a)b；p3=(1−a)(1−b)，自动归一；0ln0=0']],[graph('三个离散态概率（阶梯）','态序号 i','p_i',0,3,[curve('当前制备',x=>f.ps[Math.min(2,Math.floor(x))])]),graph('固定分配 b 的概率熵','p1=a','S/kB',0,1,[curve('当前 b',a=>entropy(a,p.b).S),curve('等分其余 b=1/2',a=>entropy(a,.5).S)])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,binomial,mixing,entropy};
});
