// Bootstrap (loaded last)
S=load();applyLang();if(!S.done)openSetup();
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js').catch(()=>{});
