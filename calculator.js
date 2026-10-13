/* Alle afmetingen zijn in cm, tenzij anders vermeld. */
(function(root){
'use strict';
const rows=[
['CARAMBOLE',200,100,'antiek formaat',490,390,140]
['CARAMBOLE',210,105,'klein biljart in Vlaanderen',500,395,140],
['CARAMBOLE',230,115,'klein biljart in NL en Wallonië',520,405,140],
['CARAMBOLE',255,127,'halve match (voornl. FR)',545,417,140],
['CARAMBOLE',284,142,'matchtafel / wedstrijdformaat / grote tafel',574,432,140],
['AMERICAN POOL',180,90,'6ft',480,390,145],
['AMERICAN POOL',200,100,'7ft',500,400,145],
['AMERICAN POOL',224,112,'8ft',524,412,145],
['AMERICAN POOL',254,127,'9ft',554,427,145],
['SNOOKER',183,91,'6ft',483,391,145],
['SNOOKER',211,105,'7ft',511,405,145],
['SNOOKER',234,116,'8ft = minisnooker',534,416,145],
['SNOOKER',264,130,'9ft',564,430,145],
['SNOOKER',295,146,'10ft',595,446,145],
['SNOOKER',356,178,'12ft = matchtafel',656,478,145],
['GOLFBILJART',180,90,'tapbiljart / stoppenbiljart / toppenbiljart ',470,380,140],
['ENGLISH POOL',160,83,'6ft pool anglais',450,373,140],
['ENGLISH POOL',183,91,'7ft pool anglais',473,381,140]
];
const tables=rows.map((r,id)=>({id,type:r[0],length:r[1],width:r[2],name:r[3],idealLength:r[4],idealWidth:r[5],cue:r[6]}));
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
