const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm2-physics.js');
const lessons=require('../assets/js/lessons/cm2-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

near(M.virtualWork(2,10,30,.1).work,1);near(M.virtualWork(2,10,30,-.1).work,-1);
// Direct elliptic integral quadrature, independent of the AGM algorithm.
for(const angle of [0,30,90,120,170]){const p=M.pendulum(1.3,9.8,angle),k=Math.sin(angle*Math.PI/360),expected=4*Math.sqrt(1.3/9.8)*integral(u=>1/Math.sqrt(1-k*k*Math.sin(u)**2),0,Math.PI/2);near(p.tExact,expected,2e-9);assert.ok(p.tExact>=p.tSmall-1e-12);}
near(M.pendulum(4,9.8,30).tExact/M.pendulum(1,9.8,30).tExact,2);
for(const T of [1,Math.PI,5]){const f=M.action(1,1,T,.8),numeric=integral(t=>.5*(.8*Math.PI/T*Math.cos(Math.PI*t/T))**2-.5*(.8*Math.sin(Math.PI*t/T))**2,0,T);near(f.action,numeric,1e-11);}
assert.ok(M.action(1,1,1,1).coefficient>0);assert.ok(M.action(1,1,5,1).coefficient<0);near(M.action(1,1,Math.PI,1).action,0);
near(M.cyclic(2,3,4,1).angular,72);assert.throws(()=>M.pendulum(1,9.8,180),RangeError);assert.throws(()=>M.action(1,1,0,1),RangeError);
// The exact original controls and two question orders are a storage compatibility contract.
const legacy=lessons[1];assert.equal(legacy.id,'mechanics');assert.equal(legacy.mapId,'CM2.2');assert.deepEqual(legacy.controls.map(({id,min,max,step,value,unit})=>({id,min,max,step,value,unit})),[{id:'length',min:.4,max:3,step:.1,value:1,unit:'m'},{id:'g',min:2,max:20,step:.5,value:9.8,unit:'m/s²'},{id:'theta',min:5,max:120,step:5,value:30,unit:'°'}]);assert.deepEqual(legacy.prediction.options,['增大到 4 倍','增大到 2 倍','缩短到 1/2']);assert.equal(legacy.prediction.correct,1);assert.deepEqual(legacy.derive.options,['θ̈ + (g/L)θ = 0','θ̈ − (g/L)θ = 0','θ̈ + (g/L²)θ = 0']);assert.equal(legacy.derive.correct,0);

console.log('PASS CM2: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
