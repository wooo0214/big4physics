/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts6-physics.js');
const lessons=require('../assets/js/lessons/ts6-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

for(const T of [10,300,10000])for(const mass of [1,4,40]){const f=M.gas(T,mass);raw(f);near(midpoint(f.component,-9*f.sigma,9*f.sigma),1,1e-12);near(midpoint(f.speed,0,9*f.sigma),1,1e-12);relative(midpoint(v=>v*v*f.component(v),-9*f.sigma,9*f.sigma),M.KB*T/(mass*M.AMU),1e-12);relative(midpoint(v=>v*f.speed(v),0,9*f.sigma),f.mean,1e-12);relative(midpoint(v=>v*v*f.speed(v),0,9*f.sigma),f.rms**2,1e-12);assert.ok(f.mp<f.mean&&f.mean<f.rms);near(f.componentMissing,0.0000633424837,3e-9);assert.ok(f.speedMissing>.001);relative(f.FWHM,2*Math.sqrt(2*Math.log(2))*f.sigma);}
near(M.gas(300,4).sigma/M.gas(300,1).sigma,.5);const e=M.equipartition(1e8,1000);near(e.Cvib/M.KB,1,1e-9);assert.ok(M.equipartition(1,1000).Cvib/M.KB<1e-100);near(M.equipartition(300,1000).transU/(M.KB*300),1.5);
const a=M.phaseSpace(300,1,25,1),b=M.phaseSpace(75,1,25,1),d=M.phaseSpace(300,1,26,1);near(b.lambda/a.lambda,2);near(b.density/a.density,8);near(d.density/a.density,10);near(M.phaseSpace(300,1,25,2).density/a.density,.5);near(a.lambda,1.0079506698834148e-10,1e-20);
for(const fn of [()=>M.gas(0,1),()=>M.gas(1,0),()=>M.equipartition(300,0),()=>M.phaseSpace(1,1,20,0)])assert.throws(fn,RangeError);

console.log('PASS TS6: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
