/* Tensor/matrix verification independent of three-vector transformation code. */
const assert=require('node:assert/strict'),M=require('../assets/js/physics/ed8-physics.js');
const near=(a,b,rtol=2e-7,atol=1e-15)=>assert.ok(Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=atol+rtol*Math.abs(b),`${a} != ${b}`);
const vec=(a,b,atol=1e-15)=>a.forEach((x,i)=>near(x,b[i],2e-7,atol));
const interval=a=>a[0]**2-a[1]**2-a[2]**2-a[3]**2;
for(const beta of [-.9,-.5,0,.5,.9])for(const ct of [-4,0,3])for(const x of [-4,0,1])for(const y of [-2,0,2]){
 const f=M.events(ct,x,y,beta);near(interval(f.transformed),interval(f.original),2e-7,2e-13);
 vec(M.boost(f.transformed,-beta),f.original,1e-13);near(f.transformed[2],y);
 if(beta===0)vec(f.transformed,f.original);
}
assert.ok(M.events(0,1,0,.5).transformed[0]<0);
for(const rho of [-2,0,1,2])for(const j of [-600,0,600])for(const beta of [-.9,0,.5,.9]){
 const f=M.current(rho,j,beta),g=1/Math.sqrt(1-beta**2);
 near(f.rhoPrime,g*(rho*1e-9-beta*j*1e-3/M.C));near(f.jPrime,g*(j*1e-3-beta*M.C*rho*1e-9));
 near(interval(f.transformed),interval(f.original),2e-7,2e-14);
 vec(M.boost(f.transformed,-beta),f.original,1e-14);
 if(j===0){near(f.cellCharge,rho*1e-9);near(f.cellVolume,1/g);}else assert.equal(f.cellVolume,null);
}
for(const a of [-100,0,60,100])for(const b of [-.5,0,.2,.5])for(const x of [-1,0,.6,1]){
 const upper=M.tensorExample(a,b,x,0,.4),e=upper.e,mag=upper.b,h=1e-4;
 // Independent derivatives of phi and A recover E, B and the Lorenz gauge.
 const pot=(xx,yy)=>M.potentials(a,b,xx,yy),y=.3;
 near(-(pot(x+h,y).phi-pot(x-h,y).phi)/(2*h),e[0],1e-7,1e-9);
 near(-(pot(x,y+h).phi-pot(x,y-h).phi)/(2*h),e[1],1e-7,1e-9);
 const curlAz=(pot(x+h,y).avec[1]-pot(x-h,y).avec[1])/(2*h)-(pot(x,y+h).avec[0]-pot(x,y-h).avec[0])/(2*h);
 near(curlAz,mag[2],1e-7,1e-17);
 // Cartesian derivative of F^{1 nu} independently reconstructs source equation.
 for(let nu=0;nu<4;nu++){
  const hi=M.tensorExample(a,b,x+h,0,0).upper[1][nu],lo=M.tensorExample(a,b,x-h,0,0).upper[1][nu];
  near((hi-lo)/(2*h),upper.source[nu],1e-6,1e-16);
 }
 for(const mode of [0,1,2]){
  const f=M.tensorExample(a,b,x,mode,.4),s=[1,-1,-1,-1];
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){
   near(f.matrix[i][j],upper.upper[i][j]*(mode===1?s[i]*s[j]:mode===2?s[j]:1));
   near(upper.upper[i][j],-upper.upper[j][i]);
  }
  const g=1/Math.sqrt(1-.4**2),q=1e-9,ux=.4*M.C;
  vec(f.force,[g*q*e[0]*ux/M.C,g*q*e[0],g*q*(e[1]-ux*mag[2]),0]);
  near(f.orthogonality,0,0,1e-13);
 }
}
for(const amplitude of [0,10,100])for(const preset of [0,1,2,3,4,5])for(const beta of [-.9,-.5,0,.5,.9])for(const axis of [0,1,2]){
 const f=M.fieldExample(amplitude,preset,beta,axis),g=1/Math.sqrt(1-beta**2),lambda=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
 lambda[0][0]=lambda[axis+1][axis+1]=g;lambda[0][axis+1]=lambda[axis+1][0]=-g*beta;
 const tensor=M.tensor(f.e,f.b),prime=Array.from({length:4},()=>[0,0,0,0]);
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)for(let k=0;k<4;k++)for(let l=0;l<4;l++)prime[i][j]+=lambda[i][k]*lambda[j][l]*tensor[k][l];
 // F'=Lambda F Lambda^T, independently of the cross-product implementation.
 vec([-M.C*prime[0][1],-M.C*prime[0][2],-M.C*prime[0][3]],f.prime.e,1e-12);
 vec([-prime[2][3],prime[1][3],-prime[1][2]],f.prime.b,1e-19);
 const inverse=M.transformFields(f.prime.e,f.prime.b,-beta,axis);vec(inverse.e,f.e,1e-12);vec(inverse.b,f.b,1e-19);
 near(f.transformed.dot,f.original.dot,1e-7,1e-17);near(f.transformed.difference,f.original.difference,1e-7,2e-10);
 near(f.prime.e[axis],f.e[axis],1e-7,1e-12);near(f.prime.b[axis],f.b[axis],1e-7,1e-19);
 if(amplitude===0)assert.equal(f.classification,'零场');
 if(preset===3&&amplitude>0)assert.ok(Math.hypot(...f.prime.e)>0&&Math.hypot(...f.prime.b)>0);
}
vec(M.fieldExample(60,2,.5,2).prime.b,[0,0,0],1e-20);
vec(M.fieldExample(60,5,.5,2).prime.e,[0,0,0],1e-12);
for(const bad of [()=>M.gamma(1),()=>M.gamma(-1),()=>M.events(1,1,0,NaN),()=>M.boost([1,2,3],0),()=>M.boost([1,2,3,4],0,3),()=>M.tensor([1,2,3],[0,0,0],3),()=>M.fieldExample(-1,0,0,0),()=>M.fieldExample(1,6,0,0)])assert.throws(bad,RangeError);
for(const l of require('../assets/js/lessons/ed8-lessons.js'))for(const q of [l.prediction,l.derive])assert.ok(q.options[q.correct]&&q.explain);
console.log('PASS ED8: intervals/inverse/zero boost, four-current invariants and comoving charge, potential derivatives, tensor source equation and index signs, four-force orthogonality, independent Lambda F Lambda^T, field invariants/inverses, pure-field and nonzero-null limits.');
