/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts3-physics.js');
const lessons=require('../assets/js/lessons/ts3-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

const pascal=[1,4,6,4,1];for(let k=0;k<=4;k++){const f=M.binomial(4,k);near(f.omega,pascal[k],1e-12);near(f.distribution[k],pascal[k]/16,1e-12);}
for(const N of [2,20,100,200]){const f=M.binomial(N,Math.floor(N/2));raw(f);near(f.norm,1,2e-12);near(f.distribution.reduce((s,p,n)=>s+p*n,0),N/2,1e-9);near(f.distribution.reduce((s,p,n)=>s+p*(n-N/2)**2,0),N/4,1e-8);for(let n=0;n<=N;n++)near(f.distribution[n],f.distribution[N-n],1e-12);near(M.binomial(N,0).logOmega,0);near(M.binomial(N,N).leading,0);assert.ok(f.error>0);}
near(M.mixing(100,.5,0).entropy,100*Math.log(2));near(M.mixing(100,.5,1).entropy,0);near(M.mixing(100,0,0).entropy,0);near(M.entropy(1,0).S,0);near(M.entropy(1/3,.5).S,Math.log(3));for(const a of [0,.3,1])for(const b of [0,.7,1]){const e=M.entropy(a,b);raw(e);near(e.norm,1);assert.ok(e.S>=0&&e.S<=Math.log(3)+1e-14);}
for(const fn of [()=>M.binomial(2.5,1),()=>M.binomial(2,3),()=>M.entropy(-.1,.5),()=>M.mixing(100,1.1,0)])assert.throws(fn,RangeError);

console.log('PASS TS3: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
