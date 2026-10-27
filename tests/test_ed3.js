/* Deterministic independent SI checks. Run with Node, no browser or user data. */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ed3-physics.js');
const near=(a,b,rtol=1e-8,atol=1e-16)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
const mu=1/(8.8541878128e-12*299792458**2),h=1e-5;
for(const i of [-5,0,3])for(const r of [.2,.6,1.2]){
  near(M.wire(i,r,0).by,mu*i/(2*Math.PI*r));
  near(M.wire(i,2*r,0).by,M.wire(i,r,0).by/2);
  for(const offset of [0,.4,.6,1.4,2,-.5,-2]){
    const f=M.ampere(i,r,offset);
    near(f.integral,Math.abs(offset)<1?mu*i:0,1e-9);
    if(offset===0)near(f.minB,f.maxB);
    else if(i!==0)assert.ok(f.maxB>f.minB);
  }
}
assert.equal(M.wire(3,0,0).bx,null);assert.equal(M.ampere(3,.6,1).integral,null);
assert.equal(M.ampere(0,.6,1).integral,null,'Geometric exclusion remains even at zero I.');
// Wire is source-free away from the axis; verify derivatives numerically.
const x=.7,y=.4;
near((M.wire(2,x+h,y).by-M.wire(2,x-h,y).by)/(2*h)-(M.wire(2,x,y+h).bx-M.wire(2,x,y-h).bx)/(2*h),0,0,1e-14);
near((M.wire(2,x+h,y).bx-M.wire(2,x-h,y).bx)/(2*h)+(M.wire(2,x,y+h).by-M.wire(2,x,y-h).by)/(2*h),0,0,1e-14);
// Independently sum the three-dimensional Biot-Savart cross product of loop elements.
for(const i of [-3,0,4])for(const r of [.2,.6,1.2])for(const z of [-5,-.4,0,1,5]){
  let bx=0,by=0,bz=0;const n=2400,dt=2*Math.PI/n;
  for(let k=0;k<n;k++){
    const t=(k+.5)*dt,sx=r*Math.cos(t),sy=r*Math.sin(t),dlx=-r*Math.sin(t)*dt,dly=r*Math.cos(t)*dt,den=(r*r+z*z)**1.5;
    bx+=dly*z/den;by-=dlx*z/den;bz+=(-dlx*sy+dly*sx)/den;
  }
  const f=M.coil(i,r,z),factor=mu*i/(4*Math.PI);
  near(bx*factor,0);near(by*factor,0);near(bz*factor,f.exact);
  near(f.exact,M.coil(i,r,-z).exact);
  near(M.coil(i,2*r,2*z).exact,f.exact/2);
  near(M.coil(i,r,0).exact,mu*i/(2*r));
}
near(M.coil(3,.6,60).exact/M.coil(3,.6,120).exact,8,2e-4);
assert.ok(M.coil(3,.6,10).relativeError<M.coil(3,.6,3).relativeError);
assert.equal(M.coil(0,1,2).relativeError,null);assert.equal(M.coil(2,1,0).far,null);
for(const b of [-5,0,3])for(const g of [-4,0,5]){
  const at=(x,y)=>M.gauge(b,g,x,y),f=at(.6,.4);
  for(const [ax,ay] of [['ax','ay'],['transformedX','transformedY']]){
    const curl=(at(.6+h,.4)[ay]-at(.6-h,.4)[ay])/(2*h)-(at(.6,.4+h)[ax]-at(.6,.4-h)[ax])/(2*h);
    near(curl,b*1e-6);
    const div=(at(.6+h,.4)[ax]-at(.6-h,.4)[ax])/(2*h)+(at(.6,.4+h)[ay]-at(.6,.4-h)[ay])/(2*h);
    near(div,ax==='ax'?0:g*1e-6);
  }
  near(f.transformedX-f.ax,(at(.6+h,.4).chi-at(.6-h,.4).chi)/(2*h));
  near(f.transformedY-f.ay,(at(.6,.4+h).chi-at(.6,.4-h).chi)/(2*h));
}
for(const i of [0,2,5])for(const b of [0,2,5])for(const a of [0,35,90,180]){
  const f=M.dipole(i,.1,b,a),dr=1e-5,deg=180/Math.PI;
  near(f.moment,i*Math.PI*.1**2);near(f.torqueY,-f.mx*b*1e-3);
  if(a>0&&a<180)near(-(M.dipole(i,.1,b,a+dr*deg).energy-M.dipole(i,.1,b,a-dr*deg).energy)/(2*dr),f.torqueY);
  near(M.dipole(i,.1,b,0).torqueY,0);near(M.dipole(i,.1,b,180).torqueY,0);
  near(M.dipole(i,.1,b,0).energy,-M.dipole(i,.1,b,180).energy);
}
for(const invalid of [()=>M.wire(NaN,1,1),()=>M.ampere(1,0,0),()=>M.ampere(1,.6,0,3),()=>M.coil(1,0,0),()=>M.gauge(1,Infinity,0,0),()=>M.dipole(1,.1,1,181)])assert.throws(invalid,RangeError);
for(const lesson of require('../assets/js/lessons/ed3-lessons.js'))for(const q of [lesson.prediction,lesson.derive])assert.ok(Number.isInteger(q.correct)&&q.options[q.correct]&&q.explain);
console.log('PASS ED3: Ampere integrals inside/outside/asymmetric contours, wire masks and derivatives, independent 3D Biot-Savart, coil symmetry/scaling/far limits, finite-difference gauge curl/divergence, torque-energy derivative and invalid inputs.');
