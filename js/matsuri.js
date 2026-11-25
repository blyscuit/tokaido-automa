let mMode=1;
function mat(){const q=$('mq').value.toLowerCase();
 $('tN').setAttribute('aria-pressed',mMode===0);$('tA').setAttribute('aria-pressed',mMode===1);
 $('mNote').textContent=mMode?L('Items an Automa receives from a Matsuri card are resolved as normal. When an Automa picks a Matsuri, put the top Matsuri card into play.','ของที่ออโตมาได้จากการ์ดมัตสึริจัดการตามปกติ เมื่อออโตมาเลือกมัตสึริ ให้นำการ์ดมัตสึริใบบนสุดมาใช้'):L('Normal play effects. Switch to “With Automas” to see how each card changes for the Automas.','ผลสำหรับการเล่นปกติ สลับเป็น “เมื่อมีออโตมา” เพื่อดูว่าแต่ละใบเปลี่ยนไปอย่างไรสำหรับออโตมา');
 const img=n=>`<img class="m" src="img/m${String(MIMG[n]).padStart(2,'0')}.webp" alt="${n}" loading="lazy" width="200" height="300">`;
 const all=MAT.map((x,i)=>({n:x[0],o:L(x[1],MATT[i][0]),a:L(x[2],MATT[i][1])||L('Works without modification.','ทำงานโดยไม่ต้องดัดแปลง')}));
 const sel=mSel.map(n=>all.find(x=>x.n===n)).filter(Boolean);
 $('mSelBox').hidden=!sel.length;$('mSelH').textContent=L('Selected – tap a card to remove it','เลือกไว้ – แตะการ์ดเพื่อนำออก');
 $('mSel').innerHTML=sel.map(x=>`<div class="tile mt pick" role="button" tabindex="0" data-k="${x.n}" title="${L('Remove','นำออก')}">${img(x.n)}<div class="tx"><h4>${x.n}</h4>${x.o}</div>${mMode?`<div class="tx au"><h4>${L('Automa','ออโตมา')}</h4>${x.a}</div>`:''}</div>`).join('');
 $('mList').innerHTML=all.filter(x=>[x.n,x.o.replace(/<[^>]+>/g,' '),mMode?x.a:''].some(t=>t.toLowerCase().includes(q)))
 .map(x=>`<button class="tile mt pick${mSel.includes(x.n)?' on':''}" data-k="${x.n}" aria-pressed="${mSel.includes(x.n)}" aria-label="${x.n}">${img(x.n)}</button>`).join('')||`<p>${L('No Matsuri card matches.','ไม่พบการ์ดมัตสึริที่ตรงกัน')}</p>`}
let mSel=[];
$('mList').onclick=e=>{const b=e.target.closest('[data-k]');if(!b)return;if(!mSel.includes(b.dataset.k))mSel.push(b.dataset.k);mat()};
const mRm=e=>{const b=e.target.closest('[data-k]');if(!b||(e.type==='keydown'&&e.key!=='Enter'&&e.key!==' '))return;e.preventDefault();mSel=mSel.filter(n=>n!==b.dataset.k);mat()};
$('mSel').onclick=mRm;$('mSel').onkeydown=mRm;
$('mq').oninput=mat;
$('tN').onclick=()=>{mMode=0;mat()};$('tA').onclick=()=>{mMode=1;mat()};
