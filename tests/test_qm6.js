const assert=require('node:assert/strict'),Q=require('../assets/js/physics/qm1-physics.js'),A=require('../assets/js/physics/qm2-physics.js'),P=require('../assets/js/physics/qm6-physics.js');
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
for(let twiceJ=0;twiceJ<=6;twiceJ++)for(let index=0;index<=6;index++){
 const f=P.angular(twiceJ,index);near(f.commResidual,0);assert.equal(f.dimension,twiceJ+1);assert.ok(f.m>=-f.j&&f.m<=f.j);
 const square=[f.Jx,f.Jy,f.Jz].map(J=>A.mm(J,J));for(let i=0;i<f.dimension;i++)for(let j=0;j<f.dimension;j++)near(square.reduce((s,a)=>s+a[i][j][0],0),i===j?f.j2:0);
 if(f.m===f.j)near(f.up,0);if(f.m===-f.j)near(f.down,0);
 if(f.orbital)near(2*Math.PI*Q.integrate(z=>P.spherical(f.j,f.m,z),-1,1,3200),1,1e-10);
}
for(const theta of [0,.7,Math.PI])for(const phi of [0,.4,2])for(const beta of [0,1.2,Math.PI])for(const outcome of [0,1]){
 const f=P.spin(theta,phi,beta,.3,outcome),state=Q.state(theta/2,phi),sigma=P.sigma(P.direction(beta,.3)),expected=(1+A.inner(state,A.mv(sigma,state))[0])/2;near(f.plus,expected);near(f.plus+f.minus,1);assert.ok(f.plus>=0&&f.plus<=1);if(f.conditional)near(P.dot(f.conditional,f.conditional),1);
}
assert.equal(P.spin(0,0,0,0,1).conditional,null);near(P.spin(0,0,Math.PI/2,0,0).plus,.5);
for(const angle of [0,.6,2*Math.PI,4*Math.PI])for(const axisTheta of [0,.9,Math.PI/2]){
 const f=P.rotation(.8,.7,axisTheta,.2,angle,0);for(let i=0;i<2;i++)for(let j=0;j<2;j++)near(Math.hypot(...Q.C.sub(f.unitary[i][j],[i===j?1:0,0])),0);
 // Independent Rodrigues rotation of the initial Bloch vector.
 const r=P.direction(.8,.7),n=P.direction(axisTheta,.2),cross=[n[1]*r[2]-n[2]*r[1],n[2]*r[0]-n[0]*r[2],n[0]*r[1]-n[1]*r[0]];
 for(let i=0;i<3;i++)near(f.r[i],r[i]*Math.cos(angle)+cross[i]*Math.sin(angle)+n[i]*P.dot(n,r)*(1-Math.cos(angle)));
 if(angle===2*Math.PI){near(f.port,0);near(f.overlap[0],-1);}if(angle===4*Math.PI)near(f.port,1);
}
for(let kind=0;kind<4;kind++)for(const alpha of [0,.7,Math.PI])for(const beta of [0,1.1,Math.PI]){
 const f=P.coupling(kind,alpha,beta);near(f.j2,kind===0?0:2);near(f.joint.reduce((s,x)=>s+x,0),1);assert.ok(f.joint.every(x=>x>=-1e-14&&x<=1+1e-14));
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)near(Math.hypot(...Q.C.sub(f.unitary[i][j],[i===j?1:0,0])),0);
 if(kind===0)near(f.correlation,-Math.cos(alpha-beta));
 // Swap in the actual product basis, rather than reading the declared parity.
 const swapped=[f.v[0],f.v[2],f.v[1],f.v[3]];near(A.inner(f.v,swapped)[0],f.exchange);
}
for(const fn of [()=>P.angular(-1,0),()=>P.spherical(1,2,0),()=>P.spin(0,0,0,0,3),()=>P.coupling(4,0,0)])assert.throws(fn,RangeError);
console.log('PASS QM6: full angular matrices/Casimir/commutator/endpoints, spherical normalization, independent spin projectors, Rodrigues rotations/2pi interference, coupled unitary and probabilities.');
