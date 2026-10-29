/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts7-physics.js');
const lessons=require('../assets/js/lessons/ts7-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

for(const energy of [0,1,4]){const f=M.occupations(energy,1,-1);raw(f);assert.ok(f.BE>f.MB&&f.MB>f.FD&&f.FD<=1);}const dilute=M.occupations(20,1,-1);relative(dilute.BE,dilute.MB,1e-8);relative(dilute.FD,dilute.MB,1e-8);
for(const T of [.05,.5,5])for(const N of [.5,1,6,11.5]){const f=M.fermi(T,N);raw(f);assert.ok(f.ps.every(p=>p>=0&&p<=1));near(f.ps.reduce((a,b)=>a+b,0),N,1e-12);near(f.residual,0,1e-12);const independent=M.fermi(T,12-N);near(f.mu+independent.mu,11,1e-10);}near(M.fermi(.05,6).mu,5.5,1e-10);near(M.fermi(5,6).mu,5.5,1e-10);
near(M.bose(0).condensed,1);near(M.bose(1).condensed,0);near(M.bose(.25).excited,.125);
near(M.A,7.565733250280006e-16,1e-29);const f=M.photon(3000,30);raw(f);near(midpoint(f.shape,0,50),Math.PI**4/15,1e-12);relative(M.photon(6000,30).u/f.u,16);relative(f.pressure,f.u/3);const scale=M.KB*3000/M.H;relative(midpoint(f.spectral,0,30*scale),f.u*(1-f.missing),1e-8);assert.ok(f.missing<1e-8);assert.ok(M.photon(3000,2).missing>.8);const dx=1e-5;near((f.shape(2.8214393721220787+dx)-f.shape(2.8214393721220787-dx))/(2*dx),0,1e-8);
for(const fn of [()=>M.occupations(0,1,0),()=>M.fermi(0,6),()=>M.fermi(1,12),()=>M.bose(1.01),()=>M.photon(0,10)])assert.throws(fn,RangeError);

console.log('PASS TS7: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
