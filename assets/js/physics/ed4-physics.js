/* Macroscopic static SI models: prescribed P/M or lossless isotropic media.
 * No microscopic simulation, edge-field solver, smoothing or random sampling.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED4Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),AREA=.02,GAP=.005;
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');}
  function orientation(value,angleDeg){
    finite(value,angleDeg);if(angleDeg<0||angleDeg>180)throw new RangeError('Angle outside [0,180].');
    return {x:value*(angleDeg===0||angleDeg===180?0:Math.sin(angleDeg*Math.PI/180)),z:value*(angleDeg===90?0:Math.cos(angleDeg*Math.PI/180))};
  }
  function polarization(pMicro,angleDeg){
    const p=orientation(pMicro*1e-6,angleDeg);
    // Uniform prescribed P inside a 1 m cube, zero outside; rho_b=0 only in its interior.
    const faces=[['+x',p.x],['−x',-p.x],['+y',0],['−y',0],['+z',p.z],['−z',-p.z]];
    return {px:p.x,pz:p.z,rho:0,faces,totalCharge:faces.reduce((sum,row)=>sum+row[1],0)};
  }
  function capacitor(epsilonR,mode,voltage){
    finite(epsilonR,mode,voltage);
    if(epsilonR<1||![0,1].includes(mode))throw new RangeError('epsilon_r>=1 and mode 0(Q) or 1(V) required.');
    const c0=EPS0*AREA/GAP,capacitance=epsilonR*c0,q0=c0*voltage;
    const v=mode===0?voltage/epsilonR:voltage,q=mode===0?q0:capacitance*voltage;
    const field=v/GAP,d=q/AREA,p=d-EPS0*field,u=.5*q*v,u0=.5*c0*voltage*voltage;
    // Reversible insertion from vacuum at V0: battery work is integral V dQ.
    // Mechanical output = battery input - change of stored field energy.
    const sourceWork=mode===0?0:voltage*(q-q0),deltaEnergy=u-u0,mechanicalWork=sourceWork-deltaEnergy;
    return {c0,capacitance,voltage:v,charge:q,field,displacement:d,polarization:p,energy:u,
      vacuumEnergy:u0,deltaEnergy,sourceWork,mechanicalWork,balance:deltaEnergy+mechanicalWork-sourceWork};
  }
  function magnetization(magnitude,angleDeg,h0){
    finite(h0);const m=orientation(magnitude,angleDeg);
    // Infinite slab -d/2<z<d/2: H_demag=-M_z zhat, B_self=mu0 M_x xhat.
    // H0 is the uniform externally applied field along +z; this includes demagnetization.
    return {mx:m.x,mz:m.z,jb:0,topKy:-m.x,bottomKy:m.x,hx:0,hz:h0-m.z,
      bx:MU0*m.x,bz:MU0*h0,outsideHz:h0,outsideBz:MU0*h0};
  }
  function boundary(epsilon1,epsilon2,mu1,mu2,sigmaNano,kx){
    finite(epsilon1,epsilon2,mu1,mu2,sigmaNano,kx);
    if(Math.min(epsilon1,epsilon2,mu1,mu2)<=0)throw new RangeError('Positive relative constitutive parameters required.');
    const sigma=sigmaNano*1e-9;
    // n=+z, K_free=Kx xhat: n x Delta H = K implies Delta H_y=-Kx.
    const one={ex:100,ez:100,hy:.2,bz:1e-6};
    one.dx=EPS0*epsilon1*one.ex;one.dz=EPS0*epsilon1*one.ez;
    one.by=MU0*mu1*one.hy;one.hz=one.bz/(MU0*mu1);
    const two={ex:one.ex,dz:one.dz+sigma,hy:one.hy-kx,bz:one.bz};
    two.ez=two.dz/(EPS0*epsilon2);two.dx=EPS0*epsilon2*two.ex;
    two.by=MU0*mu2*two.hy;two.hz=two.bz/(MU0*mu2);
    return {one,two,sigma,kx,dJump:two.dz-one.dz,hJump:two.hy-one.hy,
      dResidual:two.dz-one.dz-sigma,hResidual:-(two.hy-one.hy)-kx,
      eResidual:two.ex-one.ex,bResidual:two.bz-one.bz};
  }
  return {EPS0,MU0,AREA,GAP,polarization,capacitor,magnetization,boundary};
});
