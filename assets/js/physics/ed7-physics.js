/* SI, ideal conserved electric-dipole sources in vacuum. Phasors exp(-i omega t).
 * No smoothing, random sampling, material antenna solver or pulsar emission model.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ED7Physics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const EPS0=8.8541878128e-12,C=299792458,MU0=1/(EPS0*C*C),Z0=MU0*C,K=1/(4*Math.PI*EPS0);
  function finite(...v){if(!v.every(Number.isFinite))throw new RangeError('Finite inputs required.');}
  function pulse(timeNs,widthNs){
    finite(timeNs,widthNs);if(widthNs<=0)throw new RangeError('Positive pulse duration required.');
    if(timeNs<=0||timeNs>=widthNs)return {value:0,derivative:0};
    const a=Math.PI/(widthNs*1e-9),s=Math.sin(Math.PI*timeNs/widthNs),c=Math.cos(Math.PI*timeNs/widthNs);
    return {value:s**4,derivative:4*a*s**3*c};
  }
  function retarded(radius,timeNs,widthNs,thetaDeg=60){
    finite(radius,timeNs,widthNs,thetaDeg);if(radius<=0||thetaDeg<0||thetaDeg>180)throw new RangeError('R>0 and 0<=theta<=180 required.');
    const delay=radius/C*1e9,retardedTime=timeNs-delay,now=pulse(timeNs,widthNs),past=pulse(retardedTime,widthNs),p0=1e-12;
    // rho=-p(t).grad(delta), J=p_dot(t)delta obey continuity. These are the
    // retarded Lorenz-gauge potentials of that conserved ideal point dipole.
    const phi=K*Math.cos(thetaDeg*Math.PI/180)*p0*(past.value/radius**2+past.derivative/(C*radius));
    const az=MU0*p0*past.derivative/(4*Math.PI*radius);
    return {radius,delay,retardedTime,source:now.value,delayed:past.value,phi,az,p0};
  }
  function zones(logRadius){
    finite(logRadius);if(logRadius<-3||logRadius>3)throw new RangeError('log10(r/lambda) outside teaching range.');
    const frequency=1e8,omega=2*Math.PI*frequency,wavelength=C/frequency,k=omega/C,radius=wavelength*10**logRadius,p0=1e-12;
    const near=K*p0/radius**3,induction=K*p0*k/radius**2,radiation=K*p0*k*k/radius;
    // Equatorial spherical components, common exp(i kr) omitted (unit modulus).
    const et={re:near-radiation,im:-induction},cb={re:-radiation,im:-induction};
    const meanS=(et.re*cb.re+et.im*cb.im)/(2*MU0*C);
    const radiationS=radiation**2/(2*MU0*C),power=8*Math.PI/3*radius**2*meanS;
    return {frequency,omega,wavelength,k,radius,p0,near,induction,radiation,et,cb,meanS,radiationS,power,
      expectedPower:p0*p0*omega**4/(12*Math.PI*EPS0*C**3),nearRatio:near/radiation,inductionRatio:induction/radiation};
  }
  function dipole(pPico,frequencyMHz,thetaDeg){
    finite(pPico,frequencyMHz,thetaDeg);if(pPico<0||frequencyMHz<=0||thetaDeg<0||thetaDeg>180)throw new RangeError('p>=0, f>0, 0<=theta<=180 required.');
    const p0=pPico*1e-12,frequency=frequencyMHz*1e6,omega=2*Math.PI*frequency,wavelength=C/frequency,radius=10*wavelength;
    const sin=thetaDeg===0||thetaDeg===180?0:Math.sin(thetaDeg*Math.PI/180);
    const peakDP=p0*p0*omega**4/(32*Math.PI**2*EPS0*C**3),dPower=peakDP*sin*sin;
    const power=p0*p0*omega**4/(12*Math.PI*EPS0*C**3),charge=1e-9,acceleration=omega**2*p0/charge;
    return {p0,omega,frequency,wavelength,radius,peakDP,dPower,power,intensity:dPower/radius**2,
      acceleration,larmorPeak:charge**2*acceleration**2/(6*Math.PI*EPS0*C**3),speedRatio:omega*p0/(charge*C)};
  }
  function antenna(lengthRatio,tiltDeg,observerDeg){
    finite(lengthRatio,tiltDeg,observerDeg);if(lengthRatio<=0||lengthRatio>.5)throw new RangeError('0<ell/lambda<=0.5 required.');
    const frequency=1e8,wavelength=C/frequency,length=lengthRatio*wavelength,omega=2*Math.PI*frequency;
    const delta=observerDeg-tiltDeg,angle=delta*Math.PI/180,s=delta%180===0?0:Math.sin(angle),q=Math.PI*lengthRatio*Math.cos(angle),sinc=Math.abs(q)<1e-8?1-q*q/6:Math.sin(q)/q;
    const shortValid=lengthRatio<=.05,formalResistance=2*Math.PI*Z0/3*lengthRatio**2;
    return {wavelength,length,p0:length/omega,fieldPattern:Math.abs(s),powerPattern:s*s,
      finitePattern:s*s*sinc*sinc,shortValid,resistance:shortValid?formalResistance:null,
      power:shortValid?.5*formalResistance:null,formalResistance}; // prescribed uniform peak current I0=1 A
  }
  return {EPS0,C,MU0,Z0,K,pulse,retarded,zones,dipole,antenna};
});
