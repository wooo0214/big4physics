/* Deterministic independent baselines and UI-domain coverage. No real data.
 * Model plots are sampled before formatting; null denotes explicitly excluded
 * domains. Endpoint/default sweeps plus named coupled branches are NOT a full
 * Cartesian product. Every public model rejects missing/illegal UI parameters.
 */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ts5-physics.js');
const lessons=require('../assets/js/lessons/ts5-lessons.js');
function near(a,b,t=1e-9){assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=t,`${a} ≠ ${b} (tol ${t})`);}
function relative(a,b,t=1e-9){near(a,b,t*Math.max(Math.abs(b),1e-100));}
function midpoint(fn,a,b,n=20000){let sum=0;for(let i=0;i<n;i++)sum+=fn(a+(i+.5)*(b-a)/n);return sum*(b-a)/n;}
function raw(value){if(typeof value==='number')assert.ok(Number.isFinite(value),'nonfinite raw model value');else if(Array.isArray(value))value.forEach(raw);else if(value&&typeof value==='object')Object.values(value).forEach(raw);}
function verify(lesson,p){const f=M.model(lesson.id,p);raw(f);assert.equal(f.plots.length,2);assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(f)));for(const g of f.plots){assert.ok(g.title&&g.xlabel&&g.ylabel&&g.max>g.min);for(const s of g.series)for(let i=0;i<=40;i++){const value=s.fn(g.min+(g.max-g.min)*i/40);assert.ok(value===null||typeof value==='number'&&Number.isFinite(value),lesson.id+' '+s.label+' nonfinite plot');}}return f;}
for(const lesson of lessons){const p=Object.fromEntries(lesson.controls.map(c=>[c.id,c.value]));verify(lesson,p);for(const c of lesson.controls){for(const value of c.type==='select'?c.options.map(o=>o.value):[...new Set([c.min,c.value,c.max])])verify(lesson,{...p,[c.id]:value});}for(const end of ['min','max'])verify(lesson,Object.fromEntries(lesson.controls.map(c=>[c.id,c.type==='select'?c.options[end==='min'?0:c.options.length-1].value:c[end]])));assert.equal((lesson.derivation.match(/<p>/g)||[]).length,4);assert.equal(lesson.courseId,'thermal');assert.ok(lesson.graduate.task.length>10&&lesson.graduate.check.length>20);for(const q of [lesson.prediction,lesson.derive])assert.ok(q.correct>=0&&q.correct<q.options.length&&q.explain.length>10);assert.throws(()=>M.model(lesson.id,{}),RangeError);assert.throws(()=>M.model(lesson.id,{...p,[lesson.controls[0].id]:NaN}),RangeError);}
assert.throws(()=>M.model('TS99.1',{}),RangeError);

near(M.twoLevel(0).p,.5);near(M.twoLevel(0).S,Math.log(2));near(M.twoLevel(40).p,0,1e-16);for(const x of [.2,2,6]){const f=M.twoLevel(x);raw(f);const dx=1e-5;near(-x*x*(M.twoLevel(x+dx).U-M.twoLevel(x-dx).U)/(2*dx),f.C,1e-9);near(f.S,-f.p*Math.log(f.p)-(1-f.p)*Math.log1p(-f.p));}
for(const x of [.1,1,10]){const f=M.oscillator(x),ps=Array.from({length:1000},(_,n)=>-Math.expm1(-x)*Math.exp(-n*x)),mean=ps.reduce((s,p,n)=>s+p*n,0),variance=ps.reduce((s,p,n)=>s+p*(n-mean)**2,0);near(f.thermal,mean,1e-12);near(f.C,x*x*variance,1e-10);}near(M.oscillator(1e-4).C,1,1e-8);near(M.oscillator(100).U,.5);assert.ok(M.oscillator(100).C<1e-36);
const mu=M.MU,T=5,N=1e20;for(const B of [-10,0,10]){const f=M.magnet(B,T,N);raw(f);near(f.up+f.down,1);relative(f.M,-M.magnet(-B,T,N).M,1e-12);if(B===0)near(f.S/(N*M.KB),Math.log(2));}const eps=1e-5;relative((M.magnet(eps,T,N).M-M.magnet(-eps,T,N).M)/(2*eps),N*mu*mu/(M.KB*T),1e-9);
function independentRotor(t){let Z=0,U=0,U2=0;for(let l=0;l<=400;l++){const E=l*(l+1),w=(2*l+1)*Math.exp(-E/t);Z+=w;U+=w*E;U2+=w*E*E;}return {Z,C:(U2/Z-(U/Z)**2)/(t*t)};}
for(const t of [.1,1,30,100]){const ref=independentRotor(t),f=M.rotor(t,30);near(f.referenceC,ref.C,1e-10);if(t<=30)near(f.C,ref.C,1e-9);assert.ok(f.tailBound<1e-15);}const truncated=M.rotor(30,0);near(truncated.C,0);assert.ok(truncated.missing>.95);const plot=M.model('TS5.4',{t:30,cut:0}).plots[0];assert.equal(plot.series[0].fn(1),null);assert.deepEqual(plot.options.marker,[0,1]);
assert.equal(lessons[0].id,'thermal');assert.equal(lessons[0].mapId,'TS5.1');assert.deepEqual(lessons[0].controls,[{id:'x',label:'能级差 / 热能 Δ/(kBT)',min:.2,max:6,step:.1,value:2,unit:''}]);assert.equal(lessons[0].prediction.correct,0);assert.equal(lessons[0].derive.correct,2);assert.deepEqual(M.model('thermal',{x:2}).metrics,M.model('TS5.1',{x:2}).metrics);
for(const fn of [()=>M.twoLevel(-1),()=>M.oscillator(0),()=>M.magnet(0,0,1),()=>M.rotor(1,1.5)])assert.throws(fn,RangeError);

console.log('PASS TS5: independent physical baselines, raw finite values, conservation/limits, domain errors, endpoint/default/selector and coupled branch checks.');
