const assert = require('node:assert/strict');
const P = require('../assets/js/physics/physics.js');
function near(a,b,tol=1e-9){assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);}
const m=P.pendulum(1,9.8,10);
assert.ok(m.tExact>m.tSmall);
assert.ok(P.pendulum(1,9.8,90).tExact>m.tExact);
near(P.pendulum(4,9.8,10).tSmall/m.tSmall,2);
near(P.gauss(2,1).field/P.gauss(2,2).field,4);
near(P.gauss(2,1).flux,P.gauss(2,2).flux);
near(P.gauss(-2,1).field,-P.gauss(2,1).field);
assert.ok(P.twoLevel(.2).pExcited>P.twoLevel(5).pExcited);
near(P.twoLevel(0).pExcited,.5);
near(P.twoLevel(0).entropyInKB,Math.log(2));
near(P.well(2,1,.5).probabilityScaled,0,1e-28);
near(P.well(2,2,.5).energyEv/P.well(2,1,.5).energyEv,.25);
near(P.well(3,1,.5).energyEv/P.well(1,1,.5).energyEv,9);
console.log('PASS: 12 analytical model checks');
