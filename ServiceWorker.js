const cacheName = "testCompany-Telegram test-1.1";
const contentToCache = [
    "Build/0e0b3863e33328518df116de8521a9dc.loader.js",
    "Build/195c5905a7da48f4347533a05f43b296.framework.js",
    "Build/6e8989ef26af4aa25238a2ee91b3b439.data",
    "Build/d6d8992519c889f7a5c7e711ebf77e87.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
