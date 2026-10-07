/* Alle afmetingen zijn in cm, tenzij anders vermeld. */
(function(root){
'use strict';
const rows=[
['CARAMBOLE',200,100,'antiek formaat',490,390,140,'61,5','1-DELIG'],
['CARAMBOLE',210,105,'klein biljart in Vlaanderen',500,395,140,'61,5','1- OF 3-DELIG'],
['CARAMBOLE',230,115,'klein biljart in NL en Wallonië',520,405,140,'61,5','3-DELIG'],
['CARAMBOLE',255,127,'halve match (voornl. FR)',545,417,140,'61,5','3-DELIG'],
['CARAMBOLE',284,142,'matchtafel / wedstrijdformaat / grote tafel',574,432,140,'61,5','3-DELIG'],
['AMERICAN POOL',180,90,'6ft',480,390,145,'57,2','1-DELIG'],
['AMERICAN POOL',200,100,'7ft',500,400,145,'57,2','1- OF 3-DELIG'],
['AMERICAN POOL',224,112,'8ft',524,412,145,'57,2','3-DELIG'],
['AMERICAN POOL',254,127,'9ft',554,427,145,'57,2','3-DELIG'],
['SNOOKER',183,91,'6ft',483,391,145,'48','1-DELIG'],
['SNOOKER',211,105,'7ft',511,405,145,'50,8','1- OF 3-DELIG'],
['SNOOKER',234,116,'8ft = minisnooker',534,416,145,'52,4','3-DELIG'],
['SNOOKER',264,130,'9ft',564,430,145,'52,4','5-DELIG'],
['SNOOKER',295,146,'10ft',595,446,145,'52,4','5-DELIG'],
['SNOOKER',356,178,'12ft = matchtafel',656,478,145,'52,4','5-DELIG'],
['GOLFBILJART',180,90,'tapbiljart / stoppenbiljart / toepenbiljart / amerikaans biljart',470,380,140,'61,5','1-DELIG'],
['ENGLISH POOL',160,83,'6ft pool anglais / blackball',450,373,140,'50,8','1-DELIG'],
['ENGLISH POOL',183,91,'7ft pool anglais / blackball',473,381,140,'50,8','1-DELIG']
];
const tables=rows.map((r,id)=>({id,type:r[0],length:r[1],width:r[2],name:r[3],idealLength:r[4],idealWidth:r[5],cue:r[6],balls:r[7],slate:r[8]}));
function evaluate(t,roomLength,roomWidth,minCue=120,allowShort=true){
 if(![roomLength,roomWidth,minCue].every(Number.isFinite)||roomLength<=0||roomWidth<=0||minCue<=0)throw new Error('Ongeldige afmetingen');
 const orientations=[false,true].map(rotated=>{
 const l=rotated?t.idealWidth:t.idealLength,w=rotated?t.idealLength:t.idealWidth;
 const capacity=Math.min(t.cue,t.cue+(roomLength-l)/2,t.cue+(roomWidth-w)/2);
 return {rotated,capacity};
 }).sort((a,b)=>b.capacity-a.capacity);
 const best=orientations[0],maxCue=Math.floor(best.capacity+1e-7);
 const standard=best.capacity>=t.cue-1e-7;
 const fits=standard||(allowShort&&best.capacity>=minCue-1e-7);
 const cue=standard?t.cue:fits?maxCue:t.cue;
 const reduction=2*(t.cue-cue);
 return {...t,rotated:best.rotated,maxCue,cue,standard,fits,status:standard?'ideal':fits?'short':'no',neededLength:t.idealLength-reduction,neededWidth:t.idealWidth-reduction};
}
const api={tables,evaluate}; if(typeof module!=='undefined'&&module.exports)module.exports=api; else root.BilliardCalculator=api;
})(globalThis);
