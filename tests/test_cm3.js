const assert=require('node:assert/strict');
const M=require('../assets/js/physics/cm3-physics.js');
const lessons=require('../assets/js/lessons/cm3-lessons.js');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t,`${a} != ${b}; tolerance ${t}`);
function integral(fn,a,b,n=10000){const h=(b-a)/n;let s=fn(a)+fn(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*fn(a+i*h);return h*s/3;}
function check(f){assert.equal(f.plots.length,2);for(const g of f.plots){assert.ok(g.x&&g.y&&g.title);if(g.kind==='scatter'){for(const xy of g.points.concat(g.otherPoints||[]))assert.ok(xy.every(Number.isFinite));}else{assert.ok(g.lo<g.hi);for(const s of g.series)for(let i=0;i<=20;i++){const y=s.fn(g.lo+(g.hi-g.lo)*i/20);assert.ok(y===null||Number.isFinite(y),'Nonfinite graph value');}}}for(const [,x] of f.metrics.concat(f.rows))assert.ok(typeof x!=='number'||Number.isFinite(x));}
for(const l of lessons){assert.equal(l.courseId,'mechanics');assert.equal(l.controls.length>0,true);assert.ok(l.intro.includes('？')&&l.intro.includes('先'));assert.equal((l.derivation.match(/<p>/g)||[]).length,4);assert.ok(l.graduate.task&&l.graduate.check);assert.ok(l.modelNote.length>40);for(const key of ['prediction','derive']){assert.equal(l[key].options.length,3);assert.ok(l[key].correct>=0&&l[key].correct<3);}
 const p=Object.fromEntries(l.controls.map(c=>[c.id,c.value]));check(M.evaluate(l.id,p));for(const c of l.controls){for(const v of [c.min,c.max])check(M.evaluate(l.id,{...p,[c.id]:v}));assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:NaN}),RangeError);assert.throws(()=>M.evaluate(l.id,{...p,[c.id]:Infinity}),RangeError);}for(const edge of ['min','max'])check(M.evaluate(l.id,Object.fromEntries(l.controls.map(c=>[c.id,c[edge]]))));}

for(const E of [-.5,-.3,0,.7]){const f=M.effective(1,1,E);near(f.rc,1);near(f.emin,-.5);for(const r of f.turning)near(1/(2*r*r)-1/r,E);if(E<-.5)assert.equal(f.turning.length,0);}
assert.equal(M.effective(1,1,-1).turning.length,0);
for(const e of [0,.3,1,1.5]){const f=M.conic(2,1.3,e);for(const phi of [-.5,0,.7]){const r=f.p/(1+e*Math.cos(phi)),rdot=2*e*Math.sin(phi)/1.3,vt=1.3/r;near(.5*(rdot*rdot+vt*vt)-2/r,f.energy);}}
near(M.conic(1,1,0).peri,1);near(M.conic(1,1,1).energy,0);near(M.area(2,4,.2).period/M.area(2,1,.8).period,8);near(M.area(2,1,.1).ratio,4*Math.PI**2/2);
const s=M.scattering(1,2,3);near(Math.tan(s.chi/2),1/18);assert.ok(s.rp<2);near(s.e,Math.sqrt(1+18**2));assert.ok(M.scattering(1,2,6).chi<s.chi);assert.ok(Math.abs(M.scattering(1,100,10).chi/(2/10000)-1)<1e-8);
assert.throws(()=>M.effective(1,0,0),RangeError);assert.throws(()=>M.area(1,1,1),RangeError);assert.throws(()=>M.scattering(1,0,1),RangeError);

console.log('PASS CM3: independent physical benchmarks, conservation, units, limiting cases, invalid inputs, and slider-domain graph checks.');
