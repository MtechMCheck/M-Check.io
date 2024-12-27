const CACHE_NAME = "mcheck-cache-v1";
const urlsToCache = [
  "/cccc1/index.html",
  "/cccc1/page1.html",
  "/cccc1/page2.html",
  "/cccc1/document_5591641.png",
  "/cccc1/service-worker.js",
  "/cccc1/manifest.json",
 
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("mcheck-cache-v1").then(cache => {
      return cache.addAll(urlsToCache).catch(error => {
        console.error("Failed to cache files:", error);
      });
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});


