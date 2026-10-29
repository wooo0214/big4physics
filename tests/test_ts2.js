/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts2-physics.js');
const lessons=require('../assets/js/lessons/ts2-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

for(const n of [.5,1,2])for(const T of [100,300,800])for(const V of [.01,.04]){const a=M.potentials(n,T,V),b=M.potentials(2*n,T,2*V);for(const key of ['S','U','H','F','G'])near(b[key],2*a[key],1e-8);near(a.H-a.U,n*M.R*T,1e-8);near(a.U-a.F,T*a.S,1e-8);near(a.H-a.G,T*a.S,1e-8);const d=.00001;near((M.potentials(n,T+d,V).F-M.potentials(n,T-d,V).F)/(2*d),-a.S,1e-6*Math.max(1,Math.abs(a.S)));}
for(const delta of [-12,-2,0,3,12]){const a=M.composition(delta,.3),e=M.composition(delta,a.equilibrium);near(e.slope,0,5e-10);assert.ok(e.curvature>0);for(const x of [0,.2,.5,.8,1])assert.ok(M.composition(delta,x).F>=e.F-1e-10);}near(M.composition(0,.5).equilibrium,.5);assert.equal(M.composition(1,0).slope,null);near(M.composition(1,0).F,0);near(M.composition(1,1).F,1);
for(const V of [.005,.02,.1]){const f=M.maxwell(1,300,V,1e-4);relative(f.dSdV,M.R/V,1e-8);relative(f.dPdT,M.R/V,1e-10);}
for(const fn of [()=>M.potentials(1,-1,.01),()=>M.composition(0,-.1),()=>M.maxwell(1,300,.02,1)])assert.throws(fn,RangeError);

console.log('PASS TS2: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
