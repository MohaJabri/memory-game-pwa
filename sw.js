const CACHE_NAME = 'memory-game-v2';
const BASE_URL = 'https://mohajabri.github.io/memory-game-pwa';
const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/game`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/src/app.js`,
  `${BASE_URL}/src/components/home-view.js`,
  `${BASE_URL}/src/components/game-board.js`,
  `${BASE_URL}/manifest.webmanifest`,
  `${BASE_URL}/icon.png`,
  'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if(!response || response.status === 404) {
              return Response.redirect('https://mohajabri.github.io/memory-game-pwa/', 302);
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return Response.redirect('https://mohajabri.github.io/memory-game-pwa/', 302);
            }
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
