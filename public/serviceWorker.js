const appCache = 'FishingBoat_v02';
const assets = [
  '/',
  '/index.html',
  '/404.html',
  '/style.css',
  '/main.min.js',
  '/main.min.js.map',
  '/icons/exit.svg',
  '/fonts/Alexandria-VariableFont_wght.ttf',
  '/fonts/Nunito-VariableFont_wght.ttf',
];

function renewCache() {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      if (cacheName !== appCache) {
        caches.delete(cacheName);
      }
    });
  });
}

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(appCache).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('activate', event => {
  renewCache();
});
