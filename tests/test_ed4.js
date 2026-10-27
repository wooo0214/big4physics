/* Deterministic macroscopic SI checks including total-source reconciliation. */
const assert=require('node:assert/strict');
const M=require('../assets/js/physics/ed4-physics.js');
const near=(a,b,rtol=1e-8,atol=1e-18)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
const eps=8.8541878128e-12,mu=1/(eps*299792458**2);
for(const p of [-5,0,3])for(const angle of [0,40,90,180]){
  const f=M.polarization(p,angle),r=angle*Math.PI/180;
  const normals=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  f.faces.forEach((face,i)=>near(face[1],p*1e-6*(normals[i][0]*Math.sin(r)+normals[i][2]*Math.cos(r))));
  near(f.totalCharge,0);near(f.rho,0);
}
const c0=eps*.02/.005;
for(const er of [1,1.5,3,8])for(const v0 of [0,100,200])for(const mode of [0,1]){
  const f=M.capacitor(er,mode,v0);
  near(f.capacitance,er*c0);near(f.charge,f.capacitance*f.voltage);
  near(f.displacement,eps*er*f.field);near(f.polarization,eps*(er-1)*f.field);
  near(f.energy,.5*eps*er*f.field**2*.02*.005);
  near(f.energy,mode===0?.5*c0*v0*v0/er:.5*c0*v0*v0*er);
  near(f.charge,mode===0?c0*v0:er*c0*v0);
  near(f.field,mode===0?v0/(.005*er):v0/.005);
  near(f.sourceWork,mode===0?0:v0*(f.charge-c0*v0));
  near(f.deltaEnergy+f.mechanicalWork,f.sourceWork);near(f.balance,0);
  assert.ok(f.mechanicalWork>=-1e-18);
  if(mode===1)near(f.sourceWork,2*f.deltaEnergy);
  if(er===1){near(f.mechanicalWork,0);near(f.deltaEnergy,0);near(f.sourceWork,0);}
  if(v0===0)near(f.energy+f.charge+f.field,0);
}
for(const m of [-5,0,3])for(const angle of [0,40,90,180])for(const h0 of [-5,0,1]){
  const f=M.magnetization(m,angle,h0);
  near(f.bx,mu*(f.hx+f.mx));near(f.bz,mu*(f.hz+f.mz));
  near(f.hz-h0,-f.mz);near(f.bz,f.outsideBz);
  near(f.topKy,-f.mx);near(f.bottomKy,f.mx);near(f.jb,0);
  // Across the top plane n=+z: n x (Bout-Bin) = mu0 Kb.
  near(-f.bx,mu*f.topKy);near(f.bz-f.outsideBz,0);
}
for(const e1 of [1,2,6])for(const e2 of [1,4,8])for(const m1 of [1,4])for(const m2 of [1,3])for(const sigma of [-2,0,.6,2])for(const k of [-.5,0,.3,.5]){
  const f=M.boundary(e1,e2,m1,m2,sigma,k),a=f.one,b=f.two;
  near(b.dz-a.dz,sigma*1e-9);near(b.hy-a.hy,-k);
  near(b.ex,a.ex);near(b.bz,a.bz);
  near(a.dz,eps*e1*a.ez);near(b.dz,eps*e2*b.ez);near(a.by,mu*m1*a.hy);near(b.by,mu*m2*b.hy);
  near(a.bz,mu*m1*a.hz);near(b.bz,mu*m2*b.hz);
  const p1=a.dz-eps*a.ez,p2=b.dz-eps*b.ez;
  const boundSigma=p1-p2;
  // Microphysical vacuum jump is sourced by free PLUS bound charge/current.
  near(eps*(b.ez-a.ez),sigma*1e-9+boundSigma);
  const magnet1=a.by/mu-a.hy,magnet2=b.by/mu-b.hy,boundKx=magnet1-magnet2;
  near(-(b.by-a.by),mu*(k+boundKx));
  for(const residual of [f.dResidual,f.hResidual,f.eResidual,f.bResidual])near(residual,0,0,1e-15);
}
const equal=M.boundary(2,2,3,3,0,0);for(const key of Object.keys(equal.one))near(equal.one[key],equal.two[key]);
for(const invalid of [()=>M.polarization(Infinity,0),()=>M.polarization(1,-1),()=>M.capacitor(.9,0,100),()=>M.capacitor(2,2,100),()=>M.magnetization(1,181,0),()=>M.boundary(0,1,1,1,0,0),()=>M.boundary(1,1,1,1,NaN,0)])assert.throws(invalid,RangeError);
for(const lesson of require('../assets/js/lessons/ed4-lessons.js'))for(const q of [lesson.prediction,lesson.derive])assert.ok(Number.isInteger(q.correct)&&q.options[q.correct]&&q.explain);
console.log('PASS ED4: six-face bound charge, constitutive and capacitor energy/source/mechanical budget, zero/vacuum limits, slab demagnetization/total B and sheet currents, all four interface jumps, free+bound source reconciliation, equal-media and invalid inputs.');
