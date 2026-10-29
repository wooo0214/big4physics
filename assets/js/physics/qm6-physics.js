/* Angular momentum and ideal spin-1/2. Complex matrices reuse QM2 algebra.
 * Rotations are active, angles radians; axis vectors are physical directions,
 * Bloch vectors describe spin statistics and are not electron positions.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics,typeof module==='object'&&module.exports?require('./qm2-physics.js'):root.QM2Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM6Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q,A){
  'use strict';const {C}=Q;
  const direction=(theta,phi)=>{Q.finite(theta,phi);return [Math.sin(theta)*Math.cos(phi),Math.sin(theta)*Math.sin(phi),Math.cos(theta)];};
  const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
  function sigma(n){return [[[n[2],0],[n[0],-n[1]]],[[n[0],n[1]],[-n[2],0]]];}
  function spherical(l,m,z){if(!Number.isInteger(l)||l<0||l>6||!Number.isInteger(m)||Math.abs(m)>l)throw new RangeError('Invalid orbital labels.');Q.finite(z);if(Math.abs(z)>1)throw new RangeError('cos(theta) outside [-1,1].');m=Math.abs(m);let p=1;for(let k=1;k<=m;k++)p*=-(2*k-1)*Math.sqrt(Math.max(0,1-z*z));if(l>m){let a=p,b=z*(2*m+1)*p;for(let j=m+1;j<l;j++){const c=((2*j+1)*z*b-(j+m)*a)/(j-m+1);a=b;b=c;}p=b;}
    let ratio=1;for(let k=l-m+1;k<=l+m;k++)ratio/=k;return (2*l+1)/(4*Math.PI)*ratio*p*p;}
  function angular(twiceJ,index){if(!Number.isInteger(twiceJ)||twiceJ<0||twiceJ>6||!Number.isInteger(index)||index<0||index>6)throw new RangeError('Invalid angular labels.');const j=twiceJ/2,k=Math.min(index,twiceJ),m=-j+k,dimension=twiceJ+1;
    const plus=Array.from({length:dimension},()=>Array.from({length:dimension},()=>[0,0]));for(let c=0;c<dimension-1;c++){const mc=-j+c;plus[c+1][c]=[Math.sqrt((j-mc)*(j+mc+1)),0];}
    const minus=A.adj(plus),Jx=plus.map((r,i)=>r.map((v,k)=>C.scale(C.add(v,minus[i][k]),.5))),Jy=plus.map((r,i)=>r.map((v,k)=>C.mul(C.sub(v,minus[i][k]),[0,-.5]))),Jz=plus.map((r,i)=>r.map((_,k)=>[i===k?-j+i:0,0]));
    const comm=A.mm(Jx,Jy).map((r,i)=>r.map((v,k)=>C.sub(C.sub(v,A.mm(Jy,Jx)[i][k]),C.mul([0,1],Jz[i][k]))));
    return {j,m,k,clamped:k!==index,dimension,up:Math.sqrt((j-m)*(j+m+1)),down:Math.sqrt((j+m)*(j-m+1)),j2:j*(j+1),variance:(j*(j+1)-m*m)/2,plus,Jx,Jy,Jz,commResidual:Math.max(...comm.flat().map(z=>Math.hypot(...z))),orbital:twiceJ%2===0};}
  function spin(theta,phi,beta,eta,outcome){Q.finite(theta,phi,beta,eta);if(![0,1].includes(outcome))throw new RangeError('Invalid outcome.');const r=direction(theta,phi),n=direction(beta,eta),alignment=Math.max(-1,Math.min(1,dot(r,n))),p=(1+alignment)/2,probability=outcome===0?p:1-p;
    return {r,n,plus:p,minus:1-p,probability,conditional:probability===0?null:n.map(v=>v*(outcome===0?1:-1)),repeat:probability===0?null:1,back:probability===0?null:(1+(outcome===0?1:-1)*alignment)/2};}
  function rotation(theta,phi,axisTheta,axisPhi,angle,reference){Q.finite(angle,reference);const v=Q.state(theta/2,phi),n=direction(axisTheta,axisPhi),S=sigma(n),c=Math.cos(angle/2),s=Math.sin(angle/2),U=S.map((row,i)=>row.map((z,j)=>C.add([i===j?c:0,0],C.mul([0,-s],z)))),evolved=A.mv(U,v),overlap=A.inner(v,evolved),unitary=A.mm(A.adj(U),U),r=[sigma([1,0,0]),sigma([0,1,0]),sigma([0,0,1])].map(op=>A.inner(evolved,A.mv(op,evolved))[0]);
    // Balanced coherent path branches: (|ref>+e^(i chi)U|rot>)/sqrt(2).
    return {v,U,evolved,r,overlap,unitary,plusZ:(1+r[2])/2,port:(1+C.mul(C.exp(reference),overlap)[0])/2};}
  function coupling(kind,alpha,beta){if(![0,1,2,3].includes(kind))throw new RangeError('Invalid coupled state.');Q.finite(alpha,beta);const h=1/Math.SQRT2,states=[[[0,0],[h,0],[-h,0],[0,0]],[[1,0],[0,0],[0,0],[0,0]],[[0,0],[h,0],[h,0],[0,0]],[[0,0],[0,0],[0,0],[1,0]]],v=states[kind],U=states[0].map((_,i)=>states.map(s=>s[i])),left=sigma(direction(alpha,0)),right=sigma(direction(beta,0)),tensor=left.flatMap(row=>right.map(r=>row.flatMap(z=>r.map(w=>C.mul(z,w))))),correlation=A.inner(v,A.mv(tensor,v))[0];
    const marginal=(op,first)=>{const I=[[[1,0],[0,0]],[[0,0],[1,0]]],a=first?op:I,b=first?I:op,t=a.flatMap(row=>b.map(r=>row.flatMap(z=>r.map(w=>C.mul(z,w)))));return A.inner(v,A.mv(t,v))[0];};
    const a=marginal(left,true),b=marginal(right,false),joint=[1,-1].flatMap(sa=>[1,-1].map(sb=>(1+sa*a+sb*b+sa*sb*correlation)/4));
    const J2=[[[2,0],[0,0],[0,0],[0,0]],[[0,0],[1,0],[1,0],[0,0]],[[0,0],[1,0],[1,0],[0,0]],[[0,0],[0,0],[0,0],[2,0]]];
    return {v,U,j2:A.inner(v,A.mv(J2,v))[0],J2,exchange:kind===0?-1:1,correlation,joint,unitary:A.mm(A.adj(U),U)};}
  return {direction,dot,sigma,spherical,angular,spin,rotation,coupling};
});
