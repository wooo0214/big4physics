/* Coupled-domain audit of the actual 64 lessons, without browser storage.
 * Sweep the complete Cartesian product of each slider's endpoints and all
 * selector options. This is not a sweep of the continuous parameter interiors.
 * Thirteen points per plotted curve check boundaries and intermediate samples;
 * chapter tests separately verify scientific formulae and convergence.
 */
const assert=require('node:assert/strict');
let lessonsChecked=0, combinations=0, curves=0;
function finiteTree(value,label){
  if(typeof value==='number')assert.ok(Number.isFinite(value),label+': nonfinite number');
  else if(typeof value==='string')assert.ok(!/NaN|Infinity|undefined/.test(value),label+': invalid display value');
  else if(Array.isArray(value))value.forEach((x,i)=>finiteTree(x,label+'['+i+']'));
  else if(value&&typeof value==='object')for(const [key,x] of Object.entries(value))finiteTree(x,label+'.'+key);
}
for(const prefix of ['cm','ts'])for(let chapter=1;chapter<=8;chapter++){
  const M=require(`../assets/js/physics/${prefix}${chapter}-physics.js`);
  const lessons=require(`../assets/js/lessons/${prefix}${chapter}-lessons.js`);
  assert.equal(lessons.length,4);
  for(const lesson of lessons){
    lessonsChecked++;
    function sweep(index,params){
      if(index<lesson.controls.length){
        const control=lesson.controls[index];
        const values=control.type==='select'?control.options.map(option=>option.value):[...new Set([control.min,control.max])];
        for(const value of values)sweep(index+1,{...params,[control.id]:value});
        return;
      }
      combinations++;
      const label=lesson.mapId+' '+JSON.stringify(params);
      const model=prefix==='cm'?M.evaluate(lesson.id,params):M.model(lesson.id,params);
      finiteTree(model,label);
      assert.equal(model.plots.length,2,label);
      for(const plot of model.plots){
        if(plot.kind==='scatter'){
          assert.ok(plot.points.length>0,label+': empty scatter');
          finiteTree(plot.points,label);finiteTree(plot.otherPoints,label);
          continue;
        }
        const lo=prefix==='cm'?plot.lo:plot.min,hi=prefix==='cm'?plot.hi:plot.max;
        assert.ok(Number.isFinite(lo)&&Number.isFinite(hi)&&hi>lo,label+': plot bounds');
        for(const series of plot.series){
          curves++;
          for(let k=0;k<=12;k++){
            const value=series.fn(lo+(hi-lo)*k/12);
            assert.ok(value===null||Number.isFinite(value),label+': '+series.label+' nonfinite curve');
          }
        }
      }
    }
    sweep(0,{});
  }
}
assert.equal(lessonsChecked,64);
console.log(`PASS coupled boundaries: ${lessonsChecked} lessons, ${combinations} endpoint/selector combinations, ${curves} curves sampled at 13 points; finite values or explicit null, no learner storage.`);
