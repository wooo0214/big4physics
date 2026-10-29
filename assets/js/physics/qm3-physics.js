/* Closed-system evolution. exp(-iHt/hbar); angular frequencies in rad/s.
 * A 1D normalized current is s^-1, never a velocity or 3D flux density.
 */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./qm1-physics.js'):root.QM1Physics,typeof module==='object'&&module.exports?require('./qm2-physics.js'):root.QM2Physics);if(typeof module==='object'&&module.exports)module.exports=api;root.QM3Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(Q,M){
  'use strict';const {C,HBAR,MASS,NM}=Q;
  function stationary(theta,delta,tau,L,shift){Q.positive(L);Q.finite(theta,delta,tau,shift);const f=Q.superposition(theta,delta,-(1/3+shift)*tau,tau),e1=Q.well(1,L).energyEv,gap=3*e1;
    return {...f,period:2*Math.PI*HBAR/(gap*Q.EV),time:tau*HBAR/(gap*Q.EV),meanEnergy:e1*(f.p1+4*f.p2)+shift*gap};}
  function oscillation(omega,time,detuning=0){Q.finite(omega,time,detuning);const w=omega*1e12,d=detuning*1e12,t=time*1e-12,r=Math.hypot(w,d),s=r===0?t/2:Math.sin(r*t/2)/r,c=Math.cos(r*t/2);
    const U=[[[c,-d*s],[0,-w*s]],[[0,-w*s],[c,d*s]]],v=M.mv(U,[[1,0],[0,0]]),unitary=M.mm(M.adj(U),U);
    return {U,v,unitary,p0:C.abs2(v[0]),p1:C.abs2(v[1]),maximum:r===0?0:w*w/(r*r),frequency:r};}
  function current(kind,sigma,x0,k0,time,a,b){Q.positive(sigma);Q.finite(kind,x0,k0,time,a,b);if(![0,1,2].includes(kind))throw new RangeError('Unknown boundary model.');const lo=Math.min(a,b),hi=Math.max(a,b),t=time*1e-15,s0=sigma*NM,k=k0/NM,v=HBAR*k/MASS;
    let density,flow,densityRate,domain;
    if(kind===0){const tau=HBAR*t/(2*MASS*s0*s0),width=s0*Math.sqrt(1+tau*tau),center=x0*NM+v*t,widthRate=s0*HBAR/(2*MASS*s0*s0)*tau/Math.sqrt(1+tau*tau);
      density=x=>Math.exp(-.5*((x*NM-center)/width)**2)/(Math.sqrt(2*Math.PI)*width)*NM;
      flow=x=>density(x)/NM*(v+(x*NM-center)*widthRate/width);
      densityRate=x=>{const dx=x*NM-center;return density(x)*(-widthRate/width+dx*v/width**2+dx*dx*widthRate/width**3);};domain='实数轴自由高斯';
    }else if(kind===1){const w=Q.well(1,8);density=x=>w.density((x+4)/8)/8;flow=()=>0;densityRate=()=>0;domain='硬壁 x=±4 nm，n=1';}
    else{const length=8*NM,winding=Math.round(k0),kr=2*Math.PI*winding/length;density=()=>1/8;flow=()=>HBAR*kr/(MASS*length);densityRate=()=>0;domain='周长8 nm的环，整数绕数 '+winding;}
    const probability=Q.integrate(density,lo,hi),rate=Q.integrate(densityRate,lo,hi),left=flow(lo),right=flow(hi);
    return {density,flow,densityRate,probability,rate,left,right,residual:rate-left+right,lo,hi,domain};}
  function pictures(theta,phase,omega,time,observable){Q.finite(theta,phase,omega,time,observable);if(![0,1,2].includes(observable))throw new RangeError('Unknown observable.');const v=Q.state(theta,phase),angle=omega*time,U=[[C.exp(-angle/2),[0,0]],[[0,0],C.exp(angle/2)]],A=observable===0?M.axis(0):observable===1?M.axis(Math.PI/2):[[[Math.cos(angle),0],C.scale(C.exp(-angle),Math.sin(angle))],[C.scale(C.exp(angle),Math.sin(angle)),[-Math.cos(angle),0]]];
    const evolved=M.mv(U,v),AH=M.mm(M.mm(M.adj(U),A),U),s=M.inner(evolved,M.mv(A,evolved))[0],h=M.inner(v,M.mv(AH,v))[0];
    return {v,evolved,U,A,AH,schrodinger:s,heisenberg:h,commutes:observable===0,explicit:observable===2};}
  return {stationary,oscillation,current,pictures};
});
