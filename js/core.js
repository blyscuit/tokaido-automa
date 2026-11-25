// State, persistence, helpers and the Automa draw/play area
const $=id=>document.getElementById(id),CK='tokaido_automa',N=16;
const COL=['#3a9d99','#c4432b'],NAME=['Automa A','Automa B'];
const PT=[['shop','Shop','ร้านค้า','#34404c'],['farm','Farm','ฟาร์ม','#a9743c'],['paddy','Paddy','นาข้าว','#7fb82a'],['sea','Sea','ทะเล','#3f94cf'],['mountain','Mountain','ภูเขา','#7f8ca0'],['enc','Encounter','การพบปะ','#d27fb0'],['hot','Hot Spring','บ่อน้ำพุร้อน','#3fa8a0']],PK=PT.map(t=>t[0]),emptyPA=()=>PK.map(()=>0);
const SPACE=['Encounter','Rice Paddy','Shop','Farm','Sea','Hot Spring','Mountain'];
const NEED_YOU={1:5,2:3,3:1,4:0},NEED_A={4:0,5:1,6:3,7:5};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const fresh=()=>({v:1,done:false,step:0,turn:0,lv:[4,4,4],lvDeck:[0,1,2].map(()=>shuf([0,1,2,3,4,5,6])),lvDrawn:[[],[],[]],deck:shuf([...Array(N).keys()]),disc:[],prev:null,pa:[emptyPA(),emptyPA()],show:'a'});
let LG=(document.cookie.match(/(?:^|; )tl=(en|th)/)||[])[1];try{LG=LG||localStorage.getItem('tl')}catch(e){}LG=LG||((navigator.language||'').startsWith('th')?'th':'en');
const L=(e,t)=>LG==='th'?t:e,nm=i=>L(['Automa A','Automa B'][i],['ออโตมา A','ออโตมา B'][i]),whoN=i=>i?nm(i-1):L('You','คุณ');
const spN=k=>L(SPACE[k],['การพบปะ','นาข้าว','ร้านค้า','ฟาร์ม','ทะเล','บ่อน้ำพุร้อน','ภูเขา'][k]);
let S;
function save(){const s=encodeURIComponent(JSON.stringify(S));document.cookie=CK+'='+s+';max-age=31536000;path=/;SameSite=Lax';try{localStorage.setItem(CK,s)}catch(e){}}
function load(){let m=document.cookie.split('; ').find(x=>x.startsWith(CK+'='));let s=m?m.slice(CK.length+1):null;if(!s)try{s=localStorage.getItem(CK)}catch(e){}
 try{const o=JSON.parse(decodeURIComponent(s));if(o&&o.v===1){o.pa=Array.isArray(o.pa)&&o.pa.length===2?o.pa:[emptyPA(),emptyPA()];o.pa=o.pa.map(a=>{if(a&&a.length===8)a=a.filter((x,j)=>j!==6);return PK.map((k,j)=>(a&&a[j])|0)});o.show=['a','b','ab'].includes(o.show)?o.show:'a';return o}}catch(e){}return fresh()}
// index 0=You,1=Automa A,2=Automa B

function playArea(i){
 const pa=S.pa[i],tn=j=>L(PT[j][1],PT[j][2]);
 const items=PT.map((t,j)=>[j,pa[j]]).filter(([j,n])=>n>0);
 const vals=[...new Set(items.map(x=>x[1]))].sort((a,b)=>b-a);
 const grp=v=>v==null?[]:items.filter(x=>x[1]===v).map(x=>x[0]);
 const g1=grp(vals[0]),g2=grp(vals[1]),sm=(g,v,c,lb)=>`<span class="${c}">${lb}: ${g.length?g.map(j=>`<img class="si sm" src="img/s-${PK[j]}.webp" alt="">${tn(j)}`).join(', ')+' ('+v+')':'—'}</span>`;
 const ord=PT.map((t,j)=>j).sort((a,b)=>((pa[a]>0?0:1)-(pa[b]>0?0:1))||((PT[a][0]==='farm'?0:1)-(PT[b][0]==='farm'?0:1))||a-b);
 const cols=ord.map(j=>{const t=PT[j],n=pa[j],coin=t[0]==='farm',off=n>8?8:12,ch=coin?34:54,ic=`<img class="pi" src="img/s-${t[0]}.webp" alt="">`;
  let cards='';for(let c=0;c<n;c++)cards+=coin?`<span class="pcoin" style="top:${c*off}px"></span>`:`<span class="pcard" style="top:${c*off}px;background:${t[3]}">${c===n-1?ic:''}</span>`;
  const h=n?ch+(n-1)*off:0,hi=n>0?(n===vals[0]?' hi1':n===vals[1]?' hi2':''):'';
  return `<div class="pcol${hi}"><button class="padd" data-add="${i},${j}" style="background:${t[3]};border-color:${t[3]}"><img class="si" src="img/s-${t[0]}.webp" alt="">${tn(j)}</button><div class="pstack${n?'':' empty'}" style="${n?`height:${h}px`:''}">${cards}</div><div class="prk">${L('Rank ','อันดับ ')+n}</div><button class="pm" data-sub="${i},${j}" aria-label="${L('Remove one','เอาออก 1')}" ${n?'':'disabled'}>−</button></div>`}).join('');
 return `<div class="pa"><h3><span class="dot" style="background:${COL[i]}"></span>${nm(i)}</h3><div class="psum">${sm(g1,vals[0],'s1',L('Highest','อันดับสูงสุด'))}${sm(g2,vals[1],'s2',L('2nd','อันดับสอง'))}</div><div class="prow">${cols}</div></div>`}
function playRender(){
 const sh=S.show||'a';
 $('pHead').textContent=L('Play areas','พื้นที่เล่น');
 $('pTabs').innerHTML=[['a','Show A','แสดง A'],['b','Show B','แสดง B'],['ab','Show both','แสดงทั้งคู่']].map(([k,e,t])=>`<button data-sh="${k}" aria-pressed="${sh===k}">${L(e,t)}</button>`).join('');
 $('play').classList.toggle('both',sh==='ab');$('pAreas').innerHTML=(sh==='b'?[1]:sh==='ab'?[0,1]:[0]).map(playArea).join('')}
$('play').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
 if(b.dataset.sh)S.show=b.dataset.sh;
 else if(b.dataset.add||b.dataset.sub){const a=(b.dataset.add||b.dataset.sub).split(',').map(Number),d=1;S.pa[a[0]][a[1]]=Math.max(0,S.pa[a[0]][a[1]]+(b.dataset.add?d:-d))}
 else return;
 save();playRender()};
function render(){
 $('deck').innerHTML=S.deck.length?`<div class="stack"></div><img class="c" src="img/aback.webp" alt="Automa deck">`:'';
 $('deckCap').textContent=S.deck.length?L(`Deck: ${S.deck.length} card${S.deck.length>1?'s':''}`,`สำรับ: ${S.deck.length} ใบ`):L('Deck empty','สำรับหมดแล้ว');
 const top=S.disc[S.disc.length-1];
 $('pile').innerHTML=top?`<img class="c" src="img/a${String(top.c).padStart(2,'0')}.webp" alt="Last drawn Automa card">`:'';
 $('pileCap').textContent=top?L(`Drawn: ${S.disc.length} · ${nm(top.w)}`,`จั่วแล้ว: ${S.disc.length} · ${nm(top.w)}`):L('No cards drawn yet','ยังไม่ได้จั่วการ์ด');
 $('hist').innerHTML=S.disc.slice(-5,-1).reverse().map(d=>`<span><img src="img/a${String(d.c).padStart(2,'0')}.webp" alt=""><i style="background:${COL[d.w]}"></i></span>`).join('');
 $('drawRow').innerHTML=[0,1].map(i=>`<button class="go" data-d="${i}" style="background:${COL[i]};border-color:${COL[i]}" ${S.deck.length&&!busy?'':'disabled'}>${L('Draw for ','จั่วให้ ')}${nm(i)}</button>`).join('');$('bUndo').disabled=busy||!(S.disc.length||S.prev);playRender();
}
let busy=false;
function draw(i){
 if(!S.deck.length||busy)return;
 const c=S.deck[0],w=i,dr=$('deck').getBoundingClientRect(),pr=$('pile').getBoundingClientRect();
 const finish=()=>{S.deck.shift();S.disc.push({c,w});S.prev=null;if(S.show!=='ab')S.show=w?'b':'a';save();busy=false;fly&&fly.remove();render()};
 let fly;busy=true;document.querySelectorAll('#drawRow button').forEach(b=>b.disabled=true);
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){finish();return}
 fly=document.createElement('div');fly.className='fly';
 Object.assign(fly.style,{left:dr.left+'px',top:dr.top+'px',width:dr.width+'px',height:dr.height+'px'});
 fly.innerHTML=`<img src="img/aback.webp" alt=""><img class="fr" src="img/a${String(c).padStart(2,'0')}.webp" alt="">`;
 document.body.appendChild(fly);
 const dx=pr.left-dr.left,dy=pr.top-dr.top,P='perspective(1200px) ';
 fly.animate([{transform:P+'translate(0,0) rotateY(0deg) scale(1)'},{transform:P+`translate(${dx*.5}px,${dy*.5-30}px) rotateY(90deg) scale(1.08)`,offset:.5},{transform:P+`translate(${dx}px,${dy}px) rotateY(180deg) scale(1)`}],{duration:800,easing:'ease-in-out',fill:'forwards'}).onfinish=finish;
}
function undo(){
 if(busy)return;
 if(!S.disc.length){if(S.prev){S.deck=S.prev.deck;S.disc=S.prev.disc;S.prev=null;save();render()}return}
 const d=S.disc[S.disc.length-1],pr=$('pile').getBoundingClientRect(),dr=$('deck').getBoundingClientRect();
 const finish=()=>{S.deck.unshift(d.c);save();busy=false;fly&&fly.remove();render()};
 let fly;busy=true;S.disc.pop();render();$('bUndo').disabled=true;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){finish();return}
 fly=document.createElement('div');fly.className='fly';
 Object.assign(fly.style,{left:pr.left+'px',top:pr.top+'px',width:pr.width+'px',height:pr.height+'px'});
 fly.innerHTML=`<img src="img/aback.webp" alt=""><img class="fr" src="img/a${String(d.c).padStart(2,'0')}.webp" alt="">`;
 document.body.appendChild(fly);
 const dx=dr.left-pr.left,dy=dr.top-pr.top,P='perspective(1200px) ';
 fly.animate([{transform:P+'translate(0,0) rotateY(180deg) scale(1)'},{transform:P+`translate(${dx*.5}px,${dy*.5-30}px) rotateY(90deg) scale(1.08)`,offset:.5},{transform:P+`translate(${dx}px,${dy}px) rotateY(0deg) scale(1)`}],{duration:700,easing:'ease-in-out',fill:'forwards'}).onfinish=finish;
}
function reshuffle(){
 if(busy)return;
 if(S.disc.length&&!confirm(L('Shuffle all 16 Automa cards into a new deck? You can undo this.','สับการ์ดออโตมาทั้ง 16 ใบเป็นสำรับใหม่? ย้อนกลับได้')))return;
 const ns=shuf([...Array(N).keys()]);
 const apply=()=>{S.prev={deck:S.deck,disc:S.disc};S.deck=ns;S.disc=[];save();busy=false;$('bInn').disabled=false;$('pile').style.visibility=$('hist').style.visibility='';render()};
 if(matchMedia('(prefers-reduced-motion:reduce)').matches){apply();return}
 busy=true;document.querySelectorAll('#drawRow button,#bInn,#bUndo').forEach(b=>b.disabled=true);
 const dr=$('deck').getBoundingClientRect(),pr=$('pile').getBoundingClientRect(),P='perspective(1200px) ',flies=[];
 const mk=(r,face)=>{const f=document.createElement('div');f.className='fly';Object.assign(f.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});f.innerHTML='<img src="img/aback.webp" alt="">'+(face!=null?`<img class="fr" src="img/a${String(face).padStart(2,'0')}.webp" alt="">`:'');document.body.appendChild(f);flies.push(f);return f};
 const done=a=>a.finished.catch(()=>{});
 // 1) drawn cards fly back onto the deck, turning face-down
 const k=Math.min(S.disc.length,6),dx=dr.left-pr.left,dy=dr.top-pr.top,back=[];
 if(k){$('pile').style.visibility=$('hist').style.visibility='hidden';
  for(let n=0;n<k;n++){const f=mk(pr,S.disc[S.disc.length-1-n].c);
   back.push(done(f.animate([{transform:P+'translate(0,0) rotateY(180deg) scale(1)'},{transform:P+`translate(${dx*.5}px,${dy*.5-30}px) rotateY(90deg) scale(1.06)`,offset:.5},{transform:P+`translate(${dx}px,${dy}px) rotateY(0deg) scale(1)`}],{duration:600,delay:n*90,easing:'ease-in-out',fill:'both'})))}}
 Promise.all(back).then(()=>{
  flies.splice(0).forEach(f=>f.remove());
  // 2) riffle shuffle: the stack splits in two and the halves interleave
  const sh=[];
  for(let n=0;n<10;n++){const f=mk(dr),sd=n%2?1:-1,w=dr.width;
   sh.push(done(f.animate([{transform:'translateX(0) rotate(0deg)'},{transform:`translateX(${sd*w*.6}px) translateY(-8px) rotate(${sd*-6}deg)`,offset:.35},{transform:`translateX(${sd*w*.6}px) translateY(-8px) rotate(${sd*-6}deg)`,offset:.5},{transform:'translateX(0) translateY(0) rotate(0deg)'}],{duration:700,delay:n*55,easing:'ease-in-out',fill:'both'})))}
  return Promise.all(sh)}).then(()=>{flies.splice(0).forEach(f=>f.remove());apply()})}
$('drawRow').onclick=e=>{const b=e.target.closest('button');if(b&&!b.disabled)draw(+b.dataset.d)};$('bUndo').onclick=undo;$('bInn').onclick=reshuffle;
$('bRules').onclick=()=>$('dRules').showModal();$('xRules').onclick=()=>$('dRules').close();
$('bTwo').onclick=()=>$('dTwo').showModal();$('xTwo').onclick=()=>$('dTwo').close();$('bVar').onclick=()=>$('dVar').showModal();$('xVar').onclick=()=>$('dVar').close();
$('bNew').onclick=()=>{if(confirm(L('Start a new game? The saved game will be erased.','เริ่มเกมใหม่? เกมที่บันทึกไว้จะถูกลบ'))){S=fresh();save();render();openSetup()}};
