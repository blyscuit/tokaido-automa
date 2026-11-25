let rk='a';
function ref(){const a=rk==='a',l=a?AMU:CAL,th=a?AMUT:CALT,im=a?IMGA:IMGC,fb=a?'health':'contemplation';
 $('rList').innerHTML=l.map((x,i)=>`<div class="skill"><img src="img/k-${x[0].toLowerCase()}.webp" alt="" loading="lazy"><div><b>${x[0]}</b><br>${L(x[1],th[i])}</div></div>`).join('')}
function leg(){$('lList').innerHTML=LEG.map(x=>`<div class="skill"><img src="img/g-${x[0].toLowerCase()}.webp" alt="" loading="lazy"><div><b>${x[0]}</b><br><span class="tag">${L(x[1]+' coin'+(x[1]===1?'':'s'),x[1]+' เหรียญ')}</span><br>${L(x[2],x[3])}</div></div>`).join('')}
// unified reference dialog with tabs
let rt='char';
const RT={char:'rp-char',mat:'rp-mat',amu:'rp-skill',cal:'rp-skill',leg:'rp-leg',aid:'rp-aid'};
function renderRef(){
 document.querySelectorAll('.rtabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.t===rt));
 ['rp-char','rp-mat','rp-skill','rp-leg','rp-aid'].forEach(id=>$(id).hidden=id!==RT[rt]);
 if(rt==='char')chars();else if(rt==='mat')mat();else if(rt==='leg')leg();else if(rt==='amu'||rt==='cal'){rk=rt==='amu'?'a':'c';ref()}}
function openRef(t){rt=t||rt;renderRef();if(!$('dRef').open)$('dRef').showModal();$('dRef').scrollTop=0}
document.querySelectorAll('.rtabs button').forEach(b=>b.onclick=()=>{rt=b.dataset.t;renderRef();$('dRef').scrollTop=0});
$('bChar').onclick=()=>openRef('char');$('bMat').onclick=()=>openRef('mat');$('bAmu').onclick=()=>openRef('amu');$('bCal').onclick=()=>openRef('cal');$('bLeg').onclick=()=>openRef('leg');$('bAid').onclick=()=>openRef('aid');
$('xRef').onclick=()=>$('dRef').close();
