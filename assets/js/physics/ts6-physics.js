/* Thermal/statistical chapter 6. Deterministic analytical/finite models.
 * All logarithms natural; all display scalings and constrained domains explicit.
 * Q flows in and W_by is work by the system. No dependencies or storage access.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.TS6Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
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

  function gas(T,mass){positive(T,mass);const m=mass*AMU,sigma=Math.sqrt(KB*T/m),component=v=>Math.exp(-v*v/(2*sigma*sigma))/(Math.sqrt(2*Math.PI)*sigma),speed=v=>v<0?0:Math.sqrt(2/Math.PI)*v*v/(sigma**3)*Math.exp(-v*v/(2*sigma*sigma));return {sigma,mp:Math.sqrt(2)*sigma,mean:Math.sqrt(8/Math.PI)*sigma,rms:Math.sqrt(3)*sigma,component,speed,componentMissing:1-integrate(component,-4*sigma,4*sigma),speedMissing:1-integrate(speed,0,4*sigma),FWHM:2*Math.sqrt(2*Math.log(2))*sigma};}
  function equipartition(T,theta){positive(T,theta);const x=theta/T,e=Math.exp(-x),den=-Math.expm1(-x);return {transU:1.5*KB*T,vibThermal:KB*theta*e/den,Cvib:KB*x*x*e/(den*den)};}
  function phaseSpace(T,mass,logn,g){positive(T,mass,g);finite(logn);const n=10**logn,lambda=H/Math.sqrt(2*Math.PI*mass*AMU*KB*T);return {n,lambda,density:n*lambda**3/g};}
  const schema={"TS6.1": {"T": {"min": 10, "max": 10000, "integer": false}, "mass": {"min": 1, "max": 40, "integer": false}}, "TS6.2": {"T": {"min": 10, "max": 3000, "integer": false}, "theta": {"min": 100, "max": 5000, "integer": false}}, "TS6.3": {"T": {"min": 10, "max": 10000, "integer": false}, "mass": {"min": 1, "max": 40, "integer": false}, "logn": {"min": 2, "max": 20, "integer": false}}, "TS6.4": {"T": {"min": 0.1, "max": 10000, "integer": false}, "mass": {"min": 1, "max": 40, "integer": false}, "logn": {"min": 10, "max": 30, "integer": false}, "g": {"min": 1, "max": 4, "integer": true}}};
  function validate(id,p){if(!schema[id]||!p||typeof p!=='object')throw new RangeError('unknown thermal lesson or missing parameters');for(const [key,c] of Object.entries(schema[id])){const v=p[key];if(!Number.isFinite(v)||c.options&&!c.options.includes(v)||!c.options&&(v<c.min||v>c.max||c.integer&&!Number.isInteger(v)))throw new RangeError('invalid parameter '+key);}}
  function model(id,p){validate(id,p);
    if(id==='TS6.1'){const f=gas(p.T,p.mass),scale=f.sigma;return view([['最概然速率',f.mp,'m/s'],['平均速率',f.mean,'m/s'],['均方根速率',f.rms,'m/s']],[['一维 σv',f.sigma,'m/s'],['分量画窗遗漏',f.componentMissing],['速率画窗遗漏',f.speedMissing],['概率密度单位','原密度 s/m；图中以 σv 缩放，未重新归一化']],[graph('带符号速度分量','vz/σv','σv f(vz)',-4,4,[curve('一维 Gaussian',x=>f.component(x*scale)*scale)]),graph('三维速率与壳层因子','v/σv ≥ 0','σv f_speed(v)',0,4,[curve('三维速率',x=>f.speed(x*scale)*scale)])]);}
    if(id==='TS6.2'){const f=equipartition(p.T,p.theta);return view([['平动 U/N',f.transU,'J'],['振动热能/N',f.vibThermal,'J'],['振动 C/(NkB)',f.Cvib/KB]],[['平动 C/(NkB)',1.5],['振动二次项数',2],['振动高温极限 C/(NkB)',1],['零点约定','仅热激发能；温度无关的零点能不贡献 C']],[graph('平动与振动热容','T/θv','C/(NkB)',.02,4,[curve('量子振动',t=>equipartition(t*p.theta,p.theta).Cvib/KB),curve('三维平动',()=>1.5)]),graph('热激发能与经典能量','T/θv','U/(NkBθv)',.02,4,[curve('振动热能',t=>equipartition(t*p.theta,p.theta).vibThermal/(KB*p.theta)),curve('经典振动',t=>t)])]);}
    if(id==='TS6.3'){const f=gas(p.T,p.mass),n=10**p.logn,P=n*KB*p.T;return view([['热 FWHM',f.FWHM/1000,'km/s'],['一维 σv',f.sigma/1000,'km/s'],['压强 P',P,'Pa']],[['数密度（非 mol 密度）',n,'m⁻³'],['动理学 nm⟨vz²⟩',n*p.mass*AMU*f.sigma**2,'Pa'],['若全部线宽皆为热，温度上限系数',p.mass*AMU*1e6/(8*Math.log(2)*KB),'K/(km/s)²'],['模型边界','纯热、光薄 Gaussian；湍流、仪器及辐射转移未包括']],[graph('视线纯热线型','vz [km/s]','概率密度 [(km/s)⁻¹]',-4*f.sigma/1000,4*f.sigma/1000,[curve('热 Gaussian',v=>1000*f.component(v*1000))]),graph('同温不同粒子质量','质量 [u]','FWHM [km/s]',1,40,[curve('纯热宽',m=>2*Math.sqrt(2*Math.log(2)*KB*p.T/(m*AMU))/1000)])]);}
    const f=phaseSpace(p.T,p.mass,p.logn,p.g);return view([['热德布罗意波长',f.lambda,'m'],['nλ³/g',f.density],['经典适用判断',f.density<.01?'稀占据：经典近似可用':f.density<1?'量子修正需检查':'经典非简并近似失效']],[['数密度 n',f.n,'m⁻³'],['内部简并度 g',p.g],['质量单位',p.mass,'u'],['量子边界','nλ³/g≪1 是非简并条件；超界只提示，参数不裁剪']],[graph('降温增强相空间密度','log10 T [K]','log10(nλ³/g)',-1,4,[curve('当前密度',x=>Math.log10(phaseSpace(10**x,p.mass,p.logn,p.g).density)),curve('简并尺度 1',()=>0)]),graph('增密跨越非简并边界','log10 n [m⁻³]','log10(nλ³/g)',10,30,[curve('当前 T',x=>Math.log10(phaseSpace(p.T,p.mass,x,p.g).density)),curve('简并尺度 1',()=>0)])]);
  }

return {model,R,KB,H,C,AMU,integrate,logFact,logChoose,fmt,gas,equipartition,phaseSpace};
});
