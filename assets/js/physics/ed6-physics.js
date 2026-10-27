/* Vacuum microscopic energy/momentum only. SI; no material-momentum convention.
 * Steady wire is an ideal local long-cylinder model, not a complete circuit solver.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED6Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),K=2*Math.PI,L=.375;
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');}
  function wire(current,ez){
    finite(current,ez);const radius=.01,length=1,bPhi=MU0*current/(2*Math.PI*radius),sRadial=-ez*bPhi/MU0;
    const j=current/(Math.PI*radius**2),workDensity=j*ez,joule=workDensity*Math.PI*radius**2*length;
    const outward=sRadial*2*Math.PI*radius*length;
    return {radius,length,bPhi,sRadial,j,workDensity,joule,outward,inward:-outward,residual:outward+joule};
  }
  function standing(amplitude,ratio,phaseDeg,timeDeg,z){
    finite(amplitude,ratio,phaseDeg,timeDeg,z);if(amplitude<0||ratio<0||ratio>1)throw new RangeError('A>=0, 0<=backward/forward<=1 required.');
    const t=timeDeg*Math.PI/180,d=phaseDeg*Math.PI/180;
    const forward=amplitude*Math.cos(K*z-t),backward=amplitude*ratio*Math.cos(K*z+t+d);
    const ex=forward+backward,by=(forward-backward)/C;
    // Cross terms cancel between electric and magnetic stored energy.
    const energy=EPS0*(forward*forward+backward*backward),s=EPS0*C*(forward*forward-backward*backward);
    const integralPlus=L/2+(Math.sin(2*K*L-2*t)-Math.sin(-2*t))/(4*K);
    const integralMinus=L/2+(Math.sin(2*K*L+2*t+2*d)-Math.sin(2*t+2*d))/(4*K);
    const stored=EPS0*amplitude**2*(integralPlus+ratio**2*integralMinus);
    // Independent time derivative of the analytic volume integral, omega=c k.
    const storedRate=EPS0*C*amplitude**2/2*(Math.cos(2*t)-Math.cos(2*K*L-2*t)
      +ratio**2*(Math.cos(2*K*L+2*t+2*d)-Math.cos(2*t+2*d)));
    const flux=x=>EPS0*C*amplitude**2*(Math.cos(K*x-t)**2-ratio**2*Math.cos(K*x+t+d)**2);
    const left=flux(0),right=flux(L),outward=right-left;
    return {forward,backward,ex,by,energy,s,meanS:EPS0*C*amplitude**2*(1-ratio**2)/2,
      meanEnergy:EPS0*amplitude**2*(1+ratio**2)/2,stored,storedRate,left,right,outward,residual:storedRate+outward,length:L,k:K};
  }
  function pressure(intensity,mode){
    finite(intensity,mode);if(intensity<0||![0,1].includes(mode))throw new RangeError('I>=0; absorber(0)/mirror(1) required.');
    const r=mode===1?1:0;
    // Cycle-averaged Tzz in vacuum is negative (compressive) for normal beams.
    return {pressure:(1+r)*intensity/C,gIncident:intensity/(C*C),uIncident:intensity/C,
      tzz:-(1+r)*intensity/C,absorbed:(1-r)*intensity,reflected:r*intensity};
  }
  function budget(intensity,area,r,absorptionOfRemainder,direction){
    finite(intensity,area,r,absorptionOfRemainder,direction);
    if(intensity<0||area<=0||r<0||r>1||absorptionOfRemainder<0||absorptionOfRemainder>1||![-1,1].includes(direction))throw new RangeError('Invalid passive vacuum beam budget.');
    // Independent passive power fractions: R plus remaining fraction split into A,T.
    // Vacuum on BOTH sides, normal incidence, steady target; no delayed storage.
    const a=(1-r)*absorptionOfRemainder,t=(1-r)*(1-absorptionOfRemainder),input=intensity*area;
    const reflected=r*input,absorbed=a*input,transmitted=t*input;
    const leftOut=direction===1?-input+reflected:transmitted;
    const rightOut=direction===1?transmitted:-input+reflected;
    const outward=leftOut+rightOut;
    const incomingMomentum=direction*input/C,outgoingMomentum=direction*(transmitted-reflected)/C;
    const force=incomingMomentum-outgoingMomentum;
    return {r,a,t,input,reflected,absorbed,transmitted,leftOut,rightOut,outward,
      residual:outward+absorbed,incomingMomentum,outgoingMomentum,force,
      stressLeft:-(direction===1?input+reflected:transmitted)/(area*C),
      stressRight:-(direction===1?transmitted:input+reflected)/(area*C)};
  }
  return {EPS0,C,MU0,K,L,wire,standing,pressure,budget};
});
