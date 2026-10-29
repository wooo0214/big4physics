/* Integrity checks for a learning dependency graph, without browser packages. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
// Page URLs resolve from the repository root, regardless of the test directory.
const PROJECT_ROOT = path.resolve(__dirname, '..');
const data = require('../assets/js/data/electrodynamics-curriculum.js');
const modules = new Map(data.modules.map(m=>[m.id,m]));
const lessons = new Map(data.modules.flatMap(m=>m.lessons).map(l=>[l.id,l]));
assert.equal(modules.size,8);
assert.equal(lessons.size,32);
function validateGraph(nodes, edges) {
  const visiting=new Set(), visited=new Set();
  function visit(id) {
    assert.ok(nodes.has(id), `Missing prerequisite ${id}`);
    assert.ok(!visiting.has(id), `Dependency cycle through ${id}`);
    if(visited.has(id)) return;
    visiting.add(id); edges(nodes.get(id)).forEach(visit);
    visiting.delete(id); visited.add(id);
  }
  nodes.forEach((_,id)=>visit(id));
}
validateGraph(modules,m=>m.requires.map(r=>r.id));
validateGraph(modules,m=>[...m.requires,...m.recommended].map(r=>r.id));
validateGraph(lessons,l=>l.requires);
data.modules.forEach(m=>{
  assert.equal(m.lessons.length,4);
  for(const field of ['question','outcome','assumptions','misconception','mastery','transfer']) assert.ok(m[field],`${m.id}: missing ${field}`);
  m.tools.forEach(id=>assert.ok(data.bridges.some(b=>b.id===id),`Missing math bridge ${id}`));
  [...m.requires,...m.recommended].forEach(r=>assert.ok(r.reason));
  m.lessons.forEach(l=>{
    ['question','experiment','derivation','acceptance'].forEach(field=>assert.ok(l[field],`${l.id}: missing ${field}`));
    assert.ok(['planned','available'].includes(l.status));
  });
});
const route = new Set();
data.route.forEach(id=>{
  assert.ok(modules.has(id));
  assert.ok(!route.has(id));
  modules.get(id).requires.forEach(r=>assert.ok(route.has(r.id),`Route violates ${r.id} -> ${id}`));
  route.add(id);
});
assert.equal(route.size,modules.size);
function ancestors(id, found=new Set()) {
  modules.get(id).requires.forEach(r=>{if(!found.has(r.id)){found.add(r.id);ancestors(r.id,found);}});
  return found;
}
assert.ok(!ancestors('ED2').has('ED3') && !ancestors('ED3').has('ED2'),'Static branches should be independently accessible');
assert.ok(!ancestors('ED8').has('ED7') && !ancestors('ED8').has('ED6'),'Relativity must not require radiation or energy module');
const available=[...lessons.values()].filter(l=>l.status==='available');
assert.equal(available.length,32);
assert.deepEqual(available.map(l=>l.id),['ED1.1','ED1.2','ED1.3','ED1.4','ED2.1','ED2.2','ED2.3','ED2.4','ED3.1','ED3.2','ED3.3','ED3.4','ED4.1','ED4.2','ED4.3','ED4.4','ED5.1','ED5.2','ED5.3','ED5.4','ED6.1','ED6.2','ED6.3','ED6.4','ED7.1','ED7.2','ED7.3','ED7.4','ED8.1','ED8.2','ED8.3','ED8.4']);
assert.equal(available.find(l=>l.id==='ED1.2').legacyLessonId,'electro');
const implementations=[...require('../assets/js/lessons/ed1-lessons.js'),...require('../assets/js/lessons/ed2-lessons.js'),...require('../assets/js/lessons/ed3-lessons.js'),...require('../assets/js/lessons/ed4-lessons.js'),...require('../assets/js/lessons/ed5-lessons.js'),...require('../assets/js/lessons/ed6-lessons.js'),...require('../assets/js/lessons/ed7-lessons.js'),...require('../assets/js/lessons/ed8-lessons.js')];
available.forEach(l=>assert.ok(l.implementationId==='electro'||implementations.some(d=>d.id===l.implementationId),`Missing implementation ${l.id}`));
const html=fs.readFileSync(path.join(PROJECT_ROOT,'index.html'),'utf8');
const crypto=require('node:crypto');
const assets=[...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))(?:\?v=([0-9a-f]+))?"/g)];
assert.equal(assets.length,111);
assert.ok(html.indexOf("localStorage.getItem('physics-quest-theme-v1')")<html.indexOf('<link rel="stylesheet"'),'Theme preference must restore before stylesheet paint');
assert.ok(html.includes('id="themeToggle"') && html.includes('role="switch"'));
assert.ok(html.includes('class="day-scene" aria-hidden="true"'));
assert.ok(html.includes('role="tablist"')&&html.includes('role="tabpanel"'));
assert.ok(!html.includes('electroLessonButtons')&&!html.includes('data-demo='),'No duplicated lesson list outside the map');
for(const match of assets){
  assert.ok(fs.existsSync(path.join(PROJECT_ROOT,match[1])),`Missing page asset ${match[1]}`);
  const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(PROJECT_ROOT,match[1]))).digest('hex').slice(0,12);
  assert.equal(match[2],hash,`Stale resource version: ${match[1]}`);
}
assert.deepEqual([...html.matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]),["assets/js/physics/physics.js", "assets/js/data/electrodynamics-curriculum.js", "assets/js/data/electrodynamics-glossary.js", "assets/js/data/quantum-curriculum.js", "assets/js/data/quantum-glossary.js", "assets/js/data/mechanics-curriculum.js", "assets/js/data/mechanics-glossary.js", "assets/js/data/thermal-curriculum.js", "assets/js/data/thermal-glossary.js", "assets/js/lessons/ed1-lessons.js", "assets/js/renderers/ed1-renderer.js", "assets/js/physics/ed2-physics.js", "assets/js/lessons/ed2-lessons.js", "assets/js/renderers/ed2-renderer.js", "assets/js/physics/ed3-physics.js", "assets/js/lessons/ed3-lessons.js", "assets/js/renderers/ed3-renderer.js", "assets/js/physics/ed4-physics.js", "assets/js/lessons/ed4-lessons.js", "assets/js/renderers/ed4-renderer.js", "assets/js/physics/ed5-physics.js", "assets/js/lessons/ed5-lessons.js", "assets/js/renderers/ed5-renderer.js", "assets/js/physics/ed6-physics.js", "assets/js/lessons/ed6-lessons.js", "assets/js/renderers/ed6-renderer.js", "assets/js/physics/ed7-physics.js", "assets/js/lessons/ed7-lessons.js", "assets/js/renderers/ed7-renderer.js", "assets/js/physics/ed8-physics.js", "assets/js/lessons/ed8-lessons.js", "assets/js/renderers/ed8-renderer.js", "assets/js/physics/qm1-physics.js", "assets/js/lessons/qm1-lessons.js", "assets/js/renderers/qm1-renderer.js", "assets/js/physics/qm2-physics.js", "assets/js/lessons/qm2-lessons.js", "assets/js/renderers/qm2-renderer.js", "assets/js/physics/qm3-physics.js", "assets/js/lessons/qm3-lessons.js", "assets/js/renderers/qm3-renderer.js", "assets/js/physics/qm4-physics.js", "assets/js/lessons/qm4-lessons.js", "assets/js/renderers/qm4-renderer.js", "assets/js/physics/qm5-physics.js", "assets/js/lessons/qm5-lessons.js", "assets/js/renderers/qm5-renderer.js", "assets/js/physics/qm6-physics.js", "assets/js/lessons/qm6-lessons.js", "assets/js/renderers/qm6-renderer.js", "assets/js/physics/qm7-physics.js", "assets/js/lessons/qm7-lessons.js", "assets/js/renderers/qm7-renderer.js", "assets/js/physics/qm8-physics.js", "assets/js/lessons/qm8-lessons.js", "assets/js/renderers/qm8-renderer.js", "assets/js/physics/cm1-physics.js", "assets/js/lessons/cm1-lessons.js", "assets/js/renderers/cm1-renderer.js", "assets/js/physics/cm2-physics.js", "assets/js/lessons/cm2-lessons.js", "assets/js/renderers/cm2-renderer.js", "assets/js/physics/cm3-physics.js", "assets/js/lessons/cm3-lessons.js", "assets/js/renderers/cm3-renderer.js", "assets/js/physics/cm4-physics.js", "assets/js/lessons/cm4-lessons.js", "assets/js/renderers/cm4-renderer.js", "assets/js/physics/cm5-physics.js", "assets/js/lessons/cm5-lessons.js", "assets/js/renderers/cm5-renderer.js", "assets/js/physics/cm6-physics.js", "assets/js/lessons/cm6-lessons.js", "assets/js/renderers/cm6-renderer.js", "assets/js/physics/cm7-physics.js", "assets/js/lessons/cm7-lessons.js", "assets/js/renderers/cm7-renderer.js", "assets/js/physics/cm8-physics.js", "assets/js/lessons/cm8-lessons.js", "assets/js/renderers/cm8-renderer.js", "assets/js/physics/ts1-physics.js", "assets/js/lessons/ts1-lessons.js", "assets/js/renderers/ts1-renderer.js", "assets/js/physics/ts2-physics.js", "assets/js/lessons/ts2-lessons.js", "assets/js/renderers/ts2-renderer.js", "assets/js/physics/ts3-physics.js", "assets/js/lessons/ts3-lessons.js", "assets/js/renderers/ts3-renderer.js", "assets/js/physics/ts4-physics.js", "assets/js/lessons/ts4-lessons.js", "assets/js/renderers/ts4-renderer.js", "assets/js/physics/ts5-physics.js", "assets/js/lessons/ts5-lessons.js", "assets/js/renderers/ts5-renderer.js", "assets/js/physics/ts6-physics.js", "assets/js/lessons/ts6-lessons.js", "assets/js/renderers/ts6-renderer.js", "assets/js/physics/ts7-physics.js", "assets/js/lessons/ts7-lessons.js", "assets/js/renderers/ts7-renderer.js", "assets/js/physics/ts8-physics.js", "assets/js/lessons/ts8-lessons.js", "assets/js/renderers/ts8-renderer.js", "assets/js/course-map.js", "assets/js/quantum-course-map.js", "assets/js/mechanics-course-map.js", "assets/js/thermal-course-map.js", "assets/js/app.js"]);
console.log('PASS: 8 modules, 32 lessons, required/recommended DAGs, route, independent branches, legacy binding and local page assets');
