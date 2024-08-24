const FAST_HTML_URLS = [
    '/index.html',
    '../views/home.html',
    '../views/movie-details.html',
    '../views/seat-selection.html',
    '../views/userInfo.html',
    '../views/filtro.html'
];

const CACHE_NAME = 'fast-cache-v1';

// Precarga los recursos durante la instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Precargando recursos');
            return cache.addAll(FAST_HTML_URLS);
        })
    );
});

// Estrategia de caché: Stale-While-Revalidate
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    if (FAST_HTML_URLS.includes(url.pathname) || event.request.method === 'GET') {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });

                    return cachedResponse || fetchPromise;
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});

// Limpieza de caché
self.addEventListener('message', event => {
    if (event.data.action === 'clearCache') {
        event.waitUntil(
            caches.delete(CACHE_NAME).then(() => {
                console.log('Cache limpiada');
                event.ports[0].postMessage({ result: 'Cache limpiada exitosamente' });
            })
        );
    }
});

// Actualización de caché
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