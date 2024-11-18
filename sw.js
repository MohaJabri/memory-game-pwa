const CACHE_NAME = 'memory-game-v2';
const BASE_URL = 'https://mohajabri.github.io/memory-game-pwa';
const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/src/app.js`,
  `${BASE_URL}/assets/index.js`,
  `${BASE_URL}/assets/index.css`
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
  
  if (!path.includes('/memory-game-pwa')) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (path !== `${BASE_URL}/` && path !== `${BASE_URL}/game`) {
    event.respondWith(
      Response.redirect(`${BASE_URL}/`, 302)
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
            return caches.match(`${BASE_URL}/`);
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
