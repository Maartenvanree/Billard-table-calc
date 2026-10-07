const assert=require('node:assert/strict');
const {tables,evaluate}=require('./calculator.js');
assert.equal(tables.length,18);
for(const t of tables){
 const exact=evaluate(t,t.idealLength,t.idealWidth);assert.equal(exact.status,'ideal');
 const rotated=evaluate(t,t.idealWidth,t.idealLength);assert.equal(rotated.status,'ideal');assert.equal(rotated.rotated,true);
 const short=evaluate(t,t.idealLength-2*(t.cue-120),t.idealWidth-2*(t.cue-120),120,true);assert.equal(short.status,'short');assert.equal(short.maxCue,120);
 assert.equal(evaluate(t,t.idealLength-2*(t.cue-120)-1,t.idealWidth-2*(t.cue-120),120,true).fits,false);
 assert.equal(evaluate(t,t.idealLength-2*(t.cue-120),t.idealWidth-2*(t.cue-120),120,false).fits,false);
}
assert.throws(()=>evaluate(tables[0],NaN,400));
assert.equal(evaluate(tables[0],200,100,90).fits,false);
console.log('Geslaagd: 18 formaten, exacte grenzen, 90° rotatie, korte keuen en ongeldige invoer.');
