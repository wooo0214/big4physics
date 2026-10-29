/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts8-physics.js');
const lessons=require('../assets/js/lessons/ts8-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

for(const N of [2,4,8])for(const T of [.2,1,5]){const f=M.ising(N,T,0);raw(f);near(f.M,0,1e-10);const K=1/T,Z=(2*Math.cosh(K))**N+(2*Math.sinh(K))**N;near(f.logZ,Math.log(Z),1e-10);near(f.distribution.reduce((s,[,p])=>s+p,0),1,1e-12);near(f.distribution.reduce((s,[m,p])=>s+p*m*m,0),f.M2,1e-10);const d=M.ising(N,T,.3),opposite=M.ising(N,T,-.3);near(d.M,-opposite.M,1e-10);near(d.E,opposite.E,1e-10);const r=M.response(N,T,.1,1e-5);relative(r.numericC,r.C,2e-7);relative(r.numericChi,r.chi,2e-7);}
for(const a of [-2,-1,0,1,2])for(const h of [-.8,0,.8]){const f=M.landau(a,1,h);raw(f);assert.ok(f.global.length>=1);for(const s of f.points)near(a*s.m+s.m**3-h,0,1e-10);for(const s of f.global)assert.ok(s.F<=f.globalValue+1e-10);for(let i=0;i<=200;i++){const m=-3+6*i/200;assert.ok(f.f(m)>=f.globalValue-1e-8);}}const l=M.landau(-1,1,0);assert.equal(l.global.length,2);near(l.global[0].m,-1);near(l.global[1].m,1);near(M.landau(0,1,.125).global[0].m,.5);assert.equal(M.landau(0,1,0).global.length,1);const outside=M.landau(-2,.5,0);near(outside.global[0].m,-2);near(outside.global[1].m,2);
for(const D of [0,.02,.1])for(const amp of [-.9,0,.9])for(const time of [0,2,20]){const f=M.diffusion(D,time,amp,1,100);raw(f);near(f.numericN,f.N,1e-10);assert.ok(f.production>=0&&f.S<=1e-10);for(const x of [0,.2,.8,1])assert.ok(f.c(x)>0);if(D===0||amp===0)near(f.production,0);const delta=1e-4;if(time>delta){const derivative=(M.diffusion(D,time+delta,amp,1,100).S-M.diffusion(D,time-delta,amp,1,100).S)/(2*delta);near(derivative,f.production,2e-7);}}
for(const fn of [()=>M.ising(1,1,0),()=>M.ising(4,0,0),()=>M.landau(1,0,0),()=>M.response(4,1,0,2),()=>M.diffusion(-1,0,.5,1,1),()=>M.diffusion(1,0,1,1,1)])assert.throws(fn,RangeError);

console.log('PASS TS8: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
