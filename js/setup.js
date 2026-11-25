function openSetup(){renderSetup();if(!$('dSetup').open)$('dSetup').showModal()}
function renderSetup(){const i=S.step,l=STEPS.length;
 $('setupBody').innerHTML=`<div class="steps">${L(`Step ${i+1} of ${l}`,`ขั้นตอนที่ ${i+1} จาก ${l}`)}</div><h3 style="margin-top:.2rem">${STEPS[i][0]()}</h3>${STEPS[i][1]()}<div class="nav"><button id="sBack" ${i?'':'disabled'}>${L('Back','กลับ')}</button><button id="sNext" class="${i===l-1?'go':''}">${i===l-1?L('Start playing','เริ่มเล่น'):L('Next','ถัดไป')}</button></div>`;
 $('sBack').onclick=()=>{S.step--;save();renderSetup()};
 $('sNext').onclick=()=>{if(i===l-1){S.done=true;S.step=0;save();$('dSetup').close();reshuffle();}else{S.step++;save();renderSetup()}};
 document.querySelectorAll('[data-lv]').forEach(s=>s.onchange=()=>{const k=+s.dataset.lv;S.lv[k]=+s.value;S.lvDrawn[k]=[];S.lvDeck[k]=shuf([0,1,2,3,4,5,6]);save();renderSetup()});
 document.querySelectorAll('[data-dl]').forEach(b=>b.onclick=()=>{const k=+b.dataset.dl;S.lvDrawn[k].push(S.lvDeck[k][S.lvDrawn[k].length]);save();renderSetup()});
}
$('bSetup').onclick=openSetup;$('xSetup').onclick=()=>{$('dSetup').close()};
