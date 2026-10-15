const CACHE='pichlwanger-zuchtbuch-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./pichlwanger_icon_192.png','./pichlwanger_icon_512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith('pichlwanger-zuchtbuch-')&&name!==CACHE).map(name=>caches.delete(name)))));self.clients.claim();});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
const req=event.request;
if(req.mode==='navigate')event.respondWith(fetch(req).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy)).catch(()=>{});return response}).catch(()=>caches.match('./index.html')));
else event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{})}return response}).catch(()=>caches.match(req)));
});
