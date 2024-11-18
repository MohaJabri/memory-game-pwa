const CACHE_NAME = 'memory-game-v2';
const BASE_PATH = '/memory-game-pwa'; 
const urlsToCache = [
  '/',
  '/index.html',
  '/src/app.js',
  '/assets/index.js',
  '/assets/index.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  if (!path.startsWith(BASE_PATH)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (path !== `${BASE_PATH}/` && path !== `${BASE_PATH}/game`) {
    event.respondWith(
      Response.redirect(`${BASE_PATH}/`, 302)
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; 
        }
        
        return fetch(event.request)
          .catch(() => {
            return caches.match(`${BASE_PATH}/`);
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
