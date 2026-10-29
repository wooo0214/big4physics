/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts1-physics.js');
const lessons=require('../assets/js/lessons/ts1-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

near(M.state(1,300,.02).P,124716.93927229861,1e-8);near(M.state(1,300,.04).P/M.state(1,300,.02).P,.5);relative(M.state(1,300,.02).U,1.5*M.R*300);
for(const kind of [0,1,2,3])for(const r of [.5,1,3])for(const f of [3,5]){const a=M.process(1,300,.02,r,f,kind);raw(a);near(a.deltaU-a.Q+a.W,0,1e-10);if(kind===0)near(a.W,0);if(kind===2)near(a.deltaU,0);if(kind===3){near(a.Q,0,1e-10);relative(a.Tf*a.Vf**(a.gamma-1),300*.02**(a.gamma-1));}if(kind!==0){const P0=M.R*300/.02,fn=v=>kind===1?P0:kind===2?M.R*300/v:P0*(.02/v)**a.gamma;near(midpoint(fn,.02,a.Vf),a.W,1e-5);}}
// Regression: isochoric line is vertical, not a null/1000 = 0 horizontal line.
const iso=M.model('TS1.2',{n:1,T:300,V:.02,r:2,f:3,kind:0});assert.equal(iso.plots[0].series[0].fn(.02),null);assert.deepEqual(iso.plots[0].options.vertical,[.02,M.R*300/.02/1000,M.R*600/.02/1000]);
// Most separated adiabats: V4>V2. Both complete envelopes must survive overlap.
const p={n:1,Tc:100,dT:400,r:1.1},f=M.carnot(p.n,p.Tc+p.dT,p.Tc,p.r),g=M.model('TS1.3',p).plots[0];assert.equal(g.series.length,2);near(g.series[0].fn(g.min),g.series[1].fn(g.min),1e-9);near(g.series[0].fn(g.max),g.series[1].fn(g.max),1e-9);const V2=.01*p.r,V4=.01*f.expansion;assert.ok(V4>V2);for(const v of [V2,(V2+V4)/2,V4])assert.ok(g.series[0].fn(v)>g.series[1].fn(v));const breaks=[g.min,V2,V4,g.max].sort((a,b)=>a-b);let area=0;for(let i=1;i<breaks.length;i++)area+=midpoint(v=>1000*(g.series[0].fn(v)-g.series[1].fn(v)),breaks[i-1],breaks[i],80000);near(area,f.W,1e-6);near(f.eta,.8);near(f.Qh/(p.Tc+p.dT)+f.Qc/p.Tc,0,1e-10);
const ex=M.expansion(1,300,2);near(ex.S,M.R*Math.log(2));near(ex.Q/300,ex.S);assert.throws(()=>M.state(1,0,1),RangeError);assert.throws(()=>M.carnot(1,100,200,2),RangeError);assert.throws(()=>M.expansion(1,300,.5),RangeError);

console.log('PASS TS1: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
