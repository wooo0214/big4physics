const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm6-physics.js');
const lessons=require('../assets/js/lessons/cm6-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

const l=M.legendre(2,3,.4,.7);near(l.p,1.4);near(l.H,.5*2*.7**2+.5*2*9*.4**2);near(l.H,l.p*.7-l.L);
const h=M.oscillator(2,3,.8,-.4,1.7);for(let t=0;t<=10;t+=.17)near(h.p(t)**2/4+9*h.q(t)**2,h.E,3e-14);near(h.q(0),.8);near(h.p(0),-.4);near(h.q(Math.PI/6),-.4/6,1e-12);
const libration=M.pendulumPhase(1,1,10,1,Math.PI);assert.equal(libration.moment,null);near(M.pendulumPhase(1,1,10,2,Math.PI).moment,0);assert.ok(M.pendulumPhase(1,1,10,3,Math.PI).moment>0);
// Independent polygon shoelace areas before and after exact flow.
for(const kind of [0,1]){const f=M.liouville(2,1.3,4,kind,.7,1.2),n=1000,points=Array.from({length:n},(_,i)=>[f.q(2*Math.PI*i/n),f.p(2*Math.PI*i/n)]),area=Math.abs(points.reduce((a,p,i)=>{const r=points[(i+1)%n];return a+p[0]*r[1]-p[1]*r[0];},0))/2;near(f.det,1,1e-14);near(area,.7*1.2*n*Math.sin(2*Math.PI/n)/2,3e-13);}
assert.throws(()=>M.legendre(0,1,1,1),RangeError);assert.throws(()=>M.liouville(1,1,1,2,1,1),RangeError);

console.log('PASS CM6: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
