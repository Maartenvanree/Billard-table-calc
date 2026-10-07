'use strict';
const $=id=>document.getElementById(id), C=BilliardCalculator;
const typeKeys=['CARAMBOLE','AMERICAN POOL','SNOOKER','GOLFBILJART','ENGLISH POOL'];
let lang='nl',selected=null,computed=null,dirty=false;
const T=()=>TRANSLATIONS[lang];
const fmt=n=>new Intl.NumberFormat({nl:'nl-BE',en:'en-GB',fr:'fr-BE'}[lang],{maximumFractionDigits:2}).format(n);
const typeName=t=>T().types[typeKeys.indexOf(t.type)];
const name=t=>T().names[t.id];
function draw(t,L,W){
 if(!t){drawRoom(L,W);return;}
 const d=T(),needL=t.rotated?t.neededWidth:t.neededLength,needW=t.rotated?t.neededLength:t.neededWidth;
 const fieldL=t.rotated?t.width:t.length,fieldW=t.rotated?t.length:t.width;
 const scale=Math.min(620/Math.max(L,needL),340/Math.max(W,needW)),cx=405,cy=245;
 const rect=(l,w,fill,stroke,dash='')=>`<rect x="${cx-l*scale/2}" y="${cy-w*scale/2}" width="${l*scale}" height="${w*scale}" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 $('plan').innerHTML=rect(L,W,'#fff','#123024')+rect(needL,needW,'#f3e2e0',t.fits?'#ba9290':'#b83600','7 5')+rect(fieldL,fieldW,'#123024','#3d9e66')+`<text x="405" y="36" text-anchor="middle" fill="#123024" font-size="17">${d.roomLength}: ${fmt(L/100)} m</text><text transform="translate(28 245) rotate(-90)" text-anchor="middle" fill="#123024" font-size="17">${d.roomWidth}: ${fmt(W/100)} m</text><text x="405" y="242" text-anchor="middle" fill="white" font-size="17">${t.length} × ${t.width} cm</text><text x="405" y="265" text-anchor="middle" fill="white" font-size="12">${d.field}</text>`;
 $('plan').setAttribute('aria-label',d.plan);
 $('selection').textContent=`${d.current}: ${typeName(t)} · ${name(t)} · ${t.rotated?d.rotated:d.straight}`;
 $('detail').innerHTML=`<strong>${t.standard?d.fits:t.fits?d.fitsShort:d.noFit}</strong><p>${d.ideal}: ${t.idealLength} × ${t.idealWidth} cm (${d.cue} ${C.tables[t.id].cue} cm).<br>${t.fits?`${d.withCue} ${t.cue} cm: ${fmt(t.neededLength)} × ${fmt(t.neededWidth)} cm.<br>${d.extra}: ${fmt((L-needL)/2)} cm ${d.along}, ${fmt((W-needW)/2)} cm ${d.across}.`:`${d.maxCue}: ${Math.max(0,t.maxCue)} cm. ${d.check}`}<br>${d.balls}: ${t.balls} mm · ${d.slate}: ${d.slates[t.slate]}.</p>`;
}
function render(){
 if(!computed)return;
 const d=T(),{list,L,W}=computed,ideal=list.filter(t=>t.standard).length,short=list.filter(t=>t.status==='short').length;
 $('metrics').innerHTML=`<div class="metric"><strong>${fmt(L*W/10000)}</strong>${d.area}</div><div class="metric"><strong>${ideal}</strong>${d.standardCount}</div><div class="metric short">${short?`<strong>${short}</strong>${d.shortCount}`:ideal?d.noShort:d.noShortEmpty}</div>`;
 const visible=list.filter(t=>t.fits||computed.showall).sort((a,b)=>({ideal:0,short:1,no:2}[a.status]-{ideal:0,short:1,no:2}[b.status])||typeKeys.indexOf(a.type)-typeKeys.indexOf(b.type)||b.length-a.length);
 if(!visible.some(t=>t.id===selected))selected=visible[0]?.id??null;
 $('results').innerHTML=visible.length?visible.map(t=>`<button type="button" class="card ${t.id===selected?'selected':''}" data-id="${t.id}" aria-pressed="${t.id===selected}"><span class="eyebrow">${typeName(t)}</span><strong>${t.type==='GOLFBILJART'?'180 × 90 cm':name(t)}</strong><span class="badge ${t.status==='short'?'short':t.status==='no'?'no':''}">${t.standard?`${d.badgeFit} · ${d.cue} ${t.cue} cm`:t.fits?`${d.badgeShort} ${t.maxCue} cm`:d.badgeNo}</span><div class="details">${d.field} ${t.length} × ${t.width} cm<br>${d.ideal} ${t.idealLength} × ${t.idealWidth} cm</div></button>`).join(''):`<p class="empty">${d.empty}</p>`;
 $('visual').hidden=$('legend').hidden=false;
 if(selected!==null)draw(visible.find(t=>t.id===selected),L,W);else{drawRoom(L,W);$('selection').textContent=d.none;$('detail').textContent='';}
}
function parseDimension(value){
 const text=value.trim();
 return /^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(text)?Number(text.replace(',','.')):NaN;
}
function drawRoom(L,W){
 const d=T(),scale=Math.min(620/L,340/W);
 $('plan').innerHTML=`<rect x="${405-L*scale/2}" y="${245-W*scale/2}" width="${L*scale}" height="${W*scale}" rx="3" fill="#fff" stroke="#123024" stroke-width="2"/><text x="405" y="36" text-anchor="middle" fill="#123024" font-size="17">${d.roomLength}: ${fmt(L/100)} m</text><text transform="translate(28 245) rotate(-90)" text-anchor="middle" fill="#123024" font-size="17">${d.roomWidth}: ${fmt(W/100)} m</text>`;
 $('plan').setAttribute('aria-label',d.plan);
}
function calculate(){
 const l=parseDimension($('length').value),w=parseDimension($('width').value);
 const valid=$('length').value!==''&&$('width').value!==''&&Number.isFinite(l)&&Number.isFinite(w)&&l>=1&&w>=1&&l<=50&&w<=50;
 $('error').textContent=valid?'':T().error;
 if(!valid)return false;
 computed={L:l*100,W:w*100,showall:$('showall').checked,list:C.tables.filter(t=>$('type').value==='all'||t.type===$('type').value).map(t=>C.evaluate(t,l*100,w*100,Number($('mincue').value),$('short').checked))};
 dirty=false;$('pending').textContent='';render();return true;
}
function applyLanguage(){
 const d=T(),previous=$('type').value||'all';document.documentElement.lang=lang;document.title=d.title;
 document.querySelector('meta[name="description"]').setAttribute('content',d.intro);
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=d[el.dataset.i18n]);
 $('type').innerHTML=`<option value="all">${d.all}</option>`+typeKeys.map((key,i)=>`<option value="${key}">${d.types[i]}</option>`).join('');$('type').value=previous;
 $('pending').textContent=dirty?d.pending:'';if($('error').textContent)$('error').textContent=d.error;render();
}
$('language').addEventListener('change',()=>{lang=$('language').value;applyLanguage();});
$('calculate').addEventListener('click',calculate);
$('roomform').addEventListener('submit',event=>{event.preventDefault();calculate();});
['length','width','type','short','mincue','showall'].forEach(id=>$(id).addEventListener('input',()=>{dirty=true;$('pending').textContent=T().pending;$('mincue').disabled=!$('short').checked;}));
$('results').addEventListener('click',event=>{const card=event.target.closest('[data-id]');if(card){selected=Number(card.dataset.id);render();}});
$('print').addEventListener('click',()=>window.print());applyLanguage();calculate();
