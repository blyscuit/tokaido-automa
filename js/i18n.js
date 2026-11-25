function saveLang(){document.cookie='tl='+LG+';max-age=31536000;path=/;SameSite=Lax';try{localStorage.setItem('tl',LG)}catch(e){}}
function applyLang(){document.documentElement.lang=LG;
 document.querySelectorAll('[data-th]').forEach(el=>{if(el.dataset.en===undefined)el.dataset.en=el.innerHTML;el.innerHTML=LG==='th'?el.dataset.th:el.dataset.en});
 $('bLang').textContent=$('bLang2').textContent='🌐 '+(LG==='th'?'EN':'ไทย');
 $('cq').placeholder=L('Filter by name or ability','ค้นหาตามชื่อหรือความสามารถ');$('mq').placeholder=L('Filter by name or effect','ค้นหาตามชื่อหรือผล');
 document.title=L('Tokaido Automa Deck','โทไกโด · สำรับออโตมา');
 render();if($('dRef').open)renderRef();if($('dSetup').open)renderSetup()}
$('bLang').onclick=$('bLang2').onclick=()=>{LG=LG==='th'?'en':'th';saveLang();applyLang()};
