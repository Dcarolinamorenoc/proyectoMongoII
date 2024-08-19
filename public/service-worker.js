self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('api-cache').then(cache => {
            console.log('Cache abierta');
        })
    );
});


// Intercepta las peticiones y almacena en caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Si hay una respuesta en caché, la devuelve
            if (cachedResponse) {
                console.log('Respuesta obtenida de la caché');
                return cachedResponse;
            }

            // Si no hay en caché, realiza la petición y la almacena
            return fetch(event.request).then(networkResponse => {
                return caches.open('api-cache').then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});