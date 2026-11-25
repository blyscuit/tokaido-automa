// Setup wizard step definitions
const STEPS=[
 [()=>L('Base setup','เตรียมเกมพื้นฐาน'),()=>L(`<p>Set up the board as for a <b>3-player game</b> using the game’s rulebook. Then set up each Automa in the next step.</p>`,`<p>ตั้งกระดานตามกติกา <b>เกม 3 ผู้เล่น</b> ในคู่มือเกม จากนั้นเตรียมออโตมาแต่ละตัวในขั้นตอนถัดไป</p>`)],

 [()=>L('Each Automa','ออโตมาแต่ละตัว'),()=>L(`<p>Do this for <b>Automa A</b> and <b>Automa B</b>:</p><ul><li>Choose a color. Take the Traveler piece and colored marker as usual.</li><li>Leave room for coins and cards, as in the Rules diagram.</li><li>Place her color token and <b>1 coin</b> in her play area. She scores <b>1 point</b> for it.</li><li>She gets no Traveler tile.</li></ul>`,`<p>ทำดังนี้กับ <b>ออโตมา A</b> และ <b>ออโตมา B</b>:</p><ul><li>เลือกสี หยิบตัวนักเดินทางและมาร์กเกอร์สีตามปกติ</li><li>เว้นที่สำหรับเหรียญและการ์ดตามแผนภาพในกฎ</li><li>วางโทเคนสีและ <b>เหรียญ 1 เหรียญ</b> ในพื้นที่ของเธอ เธอได้ <b>1 แต้ม</b> จากเหรียญนั้น</li><li>เธอไม่ได้รับแผ่นนักเดินทาง</li></ul>`)+`<img class="ref" src="img/ref.webp" alt="">`],

 [()=>L('Crossroads & Multiplayer','Crossroads และการเล่นหลายคน'),()=>L(`
 <p>Only if you play with the Crossroads expansion:</p>
 <ul>
 <li>Choose your Traveler.</li>
 <li>Use only <b>3 cards</b> of each added type. Pick Amulets, Legendary Objects and Calligraphy at random. You may look at them.</li>
 <li>Each Automa scores an extra <b>5 points</b>.</li>
 </ul>
 <p>Skip this step for the base game.</p>
 <h3>Variations</h3>
  <h3>Good luck</h3>
  <p>Applies only to human players.</p>
 <p>At the start of the game, each player (in the starting order) can give the bank a coin in order to receive an Amulet card at random, with which they will start the game.</p>
 `,`
 <p>เฉพาะเมื่อเล่นกับภาคเสริม Crossroads:</p>
 <ul>
 <li>เลือกนักเดินทางของคุณ</li>
 <li>ออโตมาแต่ละตัวได้ <b>5 แต้ม</b> เพิ่ม</li>
 </ul>
 <p>ข้ามขั้นตอนนี้หากเล่นเกมพื้นฐาน</p>
 <h3>รูปแบบการเล่น</h3>
 <h3>โชคดี</h3>
 <p>ใช้ได้เฉพาะกับผู้เล่นที่เป็นมนุษย์เท่านั้น</p>
 <p>เมื่อเริ่มเกม ผู้เล่นแต่ละคนตามลำดับเริ่มต้น สามารถจ่ายเหรียญ 1 เหรียญให้ธนาคารเพื่อรับการ์ด Amulet แบบสุ่ม 1 ใบ ซึ่งจะใช้เริ่มเกมไปพร้อมกับผู้เล่น</p>
 `)],

 [()=>L('Difficulty','ระดับความยาก'),()=>{const lv=(i,o,need)=>`<div class="lv"><div class="row"><b>${whoN(i)}</b><label>${L('Level','ระดับ')} <select data-lv="${i}">${o.map(x=>`<option ${S.lv[i]===x?'selected':''} value="${x}">${x===4?L('4 (default)','4 (ค่าเริ่มต้น)'):x}</option>`).join('')}</select></label>
 <span>${need[S.lv[i]]?L(`draw ${need[S.lv[i]]} difficulty card${need[S.lv[i]]>1?'s':''}`,`จั่วการ์ดความยาก ${need[S.lv[i]]} ใบ`):L('no cards to draw','ไม่ต้องจั่วการ์ด')}</span></div>${need[S.lv[i]]?`<div class="row"><button data-dl="${i}" ${S.lvDrawn[i].length>=need[S.lv[i]]?'disabled':''}>${L('Draw difficulty card','จั่วการ์ดความยาก')}</button></div>`:''}
 <div class="thumbs">${S.lvDrawn[i].slice(0,need[S.lv[i]]).map(k=>`<figure><img src="img/l${k}.webp" alt="${spN(k)}">${spN(k)}</figure>`).join('')}</div></div>`;
 return L(`<p>Set a level for you and for each Automa. Resolve each drawn card as if the player had stopped on that space, <b>without moving the Traveler</b>. Automas gain 1 item and score per item they now have of that type.</p><h3>Can we include Automa in multiplayer?</h3>
 <p>It requires that you implement the small rule changes from the Automa rulebook, such as not purchasing meals until everybody has arrived at the Inn.</p>
 <p>We suggest that you use difficulty levels <b>4+ (normal and up)</b> and that you use the <b>full card set</b> for the Crossroads expansion (i.e., skip step 2 of the Automa setup for Crossroads).</p>
 `,`<p>ตั้งระดับให้ตัวคุณและออโตมาแต่ละตัว จั่วการ์ดแล้วทำเหมือนผู้เล่นหยุดที่ช่องนั้น <b>โดยไม่ขยับนักเดินทาง</b> ออโตมารับไอเท็ม 1 ชิ้นและได้แต้มตามจำนวนไอเท็มประเภทนั้นที่เธอมี</p><h3>สามารถเล่น Automa ในเกมหลายคนได้หรือไม่?</h3>
 <p>คุณต้องใช้การปรับเปลี่ยนกฎเล็กน้อยตามคู่มือ Automa เช่น ห้ามซื้ออาหารจนกว่าผู้เล่นทุกคนจะมาถึงโรงเตี๊ยม</p>
 <p>เราแนะนำให้ใช้ระดับความยาก <b>4 ขึ้นไป (ระดับปกติขึ้นไป)</b> และใช้ <b>การ์ด Crossroads ทั้งชุด</b> (กล่าวคือ ข้ามขั้นตอนที่ 2 ของการเตรียม Automa สำหรับ Crossroads)</p>
 `)+lv(0,[4,1,2,3],NEED_YOU)+lv(1,[4,5,6,7],NEED_A)+lv(2,[4,5,6,7],NEED_A)}],

 [()=>L('Start','เริ่มเกม'),()=>L(`<p>Shuffle the 16 Automa cards into a face-down deck. The app has already done this. Take turns in the normal order. On an Automa’s turn, pick her color above and draw.</p>`,`<p>สับการ์ดออโตมาทั้ง 16 ใบเป็นสำรับคว่ำหน้า แอปทำให้แล้ว เล่นตามลำดับปกติ ในตาของออโตมา ให้เลือกสีของเธอด้านบนแล้วจั่วการ์ด</p>`)]
];
async function animateStartShuffle(){
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;

 const dr=$('deck').getBoundingClientRect();
 const P='perspective(1200px) ';
 const flies=[];

 const mk=()=>{
  const f=document.createElement('div');
  f.className='fly';
  Object.assign(f.style,{
   left:dr.left+'px',
   top:dr.top+'px',
   width:dr.width+'px',
   height:dr.height+'px'
  });
  f.innerHTML='<img src="img/aback.webp" alt="">';
  document.body.appendChild(f);
  flies.push(f);
  return f;
 };

 const animations=[];

 // Split the deck into two halves.
 for(let n=0;n<8;n++){
  const f=mk();
  const side=n%2?1:-1;
  animations.push(f.animate([
   {transform:P+'translateX(0) rotate(0deg)'},
   {transform:`${P}translateX(${side*dr.width*.55}px) translateY(-12px) rotate(${side*-5}deg)`}
  ],{
   duration:350,
   delay:n*35,
   easing:'ease-in-out',
   fill:'forwards'
  }).finished);
 }

 await Promise.all(animations);

 // Riffle the two halves back together.
 const riffle=[];

 for(let n=0;n<12;n++){
  const f=mk();
  const side=n%2?1:-1;

  riffle.push(f.animate([
   {transform:`${P}translateX(${side*dr.width*.55}px) translateY(-12px) rotate(${side*-5}deg)`},
   {transform:P+'translateX(0) translateY(0) rotate(0deg)'}
  ],{
   duration:400,
   delay:n*35,
   easing:'ease-in-out',
   fill:'forwards'
  }).finished);
 }

 await Promise.all(riffle);

 flies.forEach(f=>f.remove());
}
