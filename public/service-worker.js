self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('api-cache').then(cache => {
            console.log('Cache abierta');
        })
    );
});

self.addEventListener('fetch', event => {
    // Only cache GET requests
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    console.log('Respuesta obtenida de la caché');
                    return cachedResponse;
                }

                return fetch(event.request).then(networkResponse => {
                    return caches.open('api-cache').then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});
