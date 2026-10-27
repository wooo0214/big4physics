/* Small, auditable analytical models; no general-purpose physics engine. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.PhysicsLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const EPS0 = 8.8541878128e-12;
  // SI constants; μ0 is derived consistently from the chosen ε0 and exact c.
  const MU0 = 1 / (EPS0 * 299792458 ** 2);
  function finiteInputs(values) {
    if (!values.every(Number.isFinite)) throw new RangeError('Model inputs must be finite numbers.');
  }
  function chargeSuperposition(q1NanoC, q2NanoC, separation, x, y) {
    finiteInputs([q1NanoC,q2NanoC,separation,x,y]);
    if (separation <= 0) throw new RangeError('Charge separation must be positive.');
    const sources=[{q:q1NanoC,x:-separation/2},{q:q2NanoC,x:separation/2}];
    // A drawing exclusion radius is not charge softening. Undefined/masked
    // fields remain null and must never be displayed as a zero field.
    if (sources.some(s=>Math.hypot(x-s.x,y)<0.12)) return {valid:false,parts:null,total:null};
    const parts=sources.map(s=>{
      const dx=x-s.x, distance=Math.hypot(dx,y);
      const factor=s.q*1e-9/(4*Math.PI*EPS0*distance**3);
      return {x:factor*dx,y:factor*y};
    });
    return {valid:true,parts,total:{x:parts[0].x+parts[1].x,y:parts[0].y+parts[1].y}};
  }
  function vectorField(kind, a, x, y, z=0) {
    finiteInputs([kind,a,x,y,z]);
    if (kind!==0 && kind!==1) throw new RangeError('Unknown vector field.');
    // F has velocity units m/s, a has s^-1. These are mathematical fields,
    // not an assertion that the rotational example is an electrostatic E.
    return kind===0 ? {x:a*x,y:a*y,z:a*z} : {x:-a*y,y:a*x,z:0};
  }
  function integralField(kind, a, radius) {
    finiteInputs([kind,a,radius]);
    if (radius<=0 || (kind!==0 && kind!==1)) throw new RangeError('Invalid field type or radius.');
    // Closed-sphere flux uses a 3D surface; circulation uses its equatorial
    // circle, oriented counterclockwise when viewed from +z (normal +z).
    return {divergence:kind===0?3*a:0,curlZ:kind===1?2*a:0,
      flux:kind===0?4*Math.PI*a*radius**3:0,
      circulation:kind===1?2*Math.PI*a*radius**2:0};
  }
  function vacuumInterface(sigmaNanoC, currentA, tangentialE, normalBMicroT) {
    finiteInputs([sigmaNanoC,currentA,tangentialE,normalBMicroT]);
    // Infinite uniform sheet z=0; n=+z points from region 1 to region 2.
    // K=Kx ex implies ΔBy=-μ0 Kx because ez × (-ey) = ex.
    // Uniform background Ey and Bz demonstrate the continuous components.
    const ez=sigmaNanoC*1e-9/(2*EPS0), by=MU0*currentA/2, bz=normalBMicroT*1e-6;
    return {e1:{x:0,y:tangentialE,z:-ez},e2:{x:0,y:tangentialE,z:ez},
      b1:{x:0,y:by,z:bz},b2:{x:0,y:-by,z:bz},
      jumpEn:2*ez,jumpBy:-2*by,jumpEt:0,jumpBn:0};
  }
  function agm(a, b) {
    for (let i = 0; i < 60 && Math.abs(a-b) > 1e-14 * Math.max(a,b); i++) {
      const nextA = (a + b) / 2;
      const nextB = Math.sqrt(a * b);
      a = nextA; b = nextB;
    }
    return (a + b) / 2;
  }
  function pendulum(length, g, thetaDeg) {
    const theta = thetaDeg * Math.PI / 180;
    const k = Math.sin(theta / 2);
    const tSmall = 2 * Math.PI * Math.sqrt(length / g);
    const tExact = tSmall / agm(1, Math.sqrt(1 - k*k));
    return {tSmall, tExact, relativeError: (tExact / tSmall - 1) * 100};
  }
  function gauss(qNanoC, radius) {
    const q = qNanoC * 1e-9;
    const field = q / (4 * Math.PI * EPS0 * radius * radius);
    return {field, flux: q / EPS0, enclosedChargeNanoC: qNanoC};
  }
  function twoLevel(x) {
    const p = 1 / (1 + Math.exp(x));
    const entropy = -p * Math.log(p) - (1-p) * Math.log(1-p);
    return {pExcited: p, pGround: 1-p, entropyInKB: entropy, meanEnergyInDelta: p};
  }
  function well(n, lengthNm, xFraction) {
    const hbar = 1.054571817e-34;
    const electronMass = 9.1093837139e-31;
    const length = lengthNm * 1e-9;
    const energyJ = n*n*Math.PI*Math.PI*hbar*hbar/(2*electronMass*length*length);
    const energyEv = energyJ / 1.602176634e-19;
    const xi = Math.min(1, Math.max(0, xFraction));
    return {energyEv, psiScaled: Math.sin(n*Math.PI*xi), probabilityScaled: 2*Math.sin(n*Math.PI*xi)**2, interiorNodes: n-1};
  }
  return {pendulum, gauss, twoLevel, well,chargeSuperposition,vectorField,integralField,vacuumInterface};
});
