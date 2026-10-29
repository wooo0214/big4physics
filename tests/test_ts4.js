/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts4-physics.js');
const lessons=require('../assets/js/lessons/ts4-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

// Independent explicit enumeration of weak compositions for a tiny solid.
function enumerate(N,Q){if(N===1)return 1;let total=0;for(let q=0;q<=Q;q++)total+=enumerate(N-1,Q-q);return total;}
const ex=M.exchange(2,3,4),weights=Array.from({length:5},(_,q)=>enumerate(2,q)*enumerate(3,4-q)),total=weights.reduce((a,b)=>a+b,0);ex.probabilities.forEach((v,i)=>near(v,weights[i]/total));near(ex.probabilities.reduce((a,b)=>a+b,0),1);near(ex.mean,4*2/5);const sym=M.exchange(4,4,20);sym.probabilities.forEach((v,i)=>near(v,sym.probabilities[20-i],1e-14));
const b=M.bath(3,2,2);near(b.exact,1/7);near(b.beta,Math.log(10/6));assert.ok(Math.abs(b.error)>.001);near(M.bath(3,2,3).exact,0);assert.ok(!M.bath(3,2,3).allowed);const small=M.bath(10,20,4),large=M.bath(100,200,4);assert.ok(Math.abs(large.error)<Math.abs(small.error));
// UI worst coupling Qmax/Nmin propagates Q' up to 4000 in the size plot.
verify(lessons[1],{N:2,Q:100,gap:20});const zero=M.model('TS4.1',{A:1,B:1,Q:0});near(zero.plots[0].series[0].fn(0),1);assert.equal(zero.plots[0].series[0].fn(.1),null);assert.equal(zero.plots[1].series[0].fn(.1),null);
for(const z of [.2,6,30]){const f=M.poisson(z,200);near(f.norm,1,2e-13);near(f.windowMean,z,2e-11);const variance=f.ps.reduce((s,p,n)=>s+p*(n-z)**2,0);near(variance,z,2e-10);near(f.ps[0],Math.exp(-z));}assert.ok(M.poisson(30,2).missing>.99);
for(const N of [2,40,200])for(const p of [0,.1,.5,1]){const f=M.fluctuations(N,p);raw(f);near(f.ps.reduce((a,b)=>a+b,0),1,2e-12);near(f.ps.reduce((s,v,n)=>s+v*n,0),f.mean,1e-8);near(f.ps.reduce((s,v,n)=>s+v*(n-f.mean)**2,0),f.variance,1e-8);if(p===0)assert.equal(f.relative,null);}near(M.fluctuations(100,.2).relative/M.fluctuations(25,.2).relative,.5);
for(const fn of [()=>M.exchange(0,2,3),()=>M.bath(1,3,1),()=>M.poisson(0,2),()=>M.fluctuations(2,1.1)])assert.throws(fn,RangeError);

console.log('PASS TS4: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
