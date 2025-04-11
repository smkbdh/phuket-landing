const CACHE_NAME = 'phuket-landing-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/hero-optimized.jpg',
    '/images/whatsapp-icon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch Event Strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch new
                return response || fetch(event.request)
                    .then(fetchResponse => {
                        // Cache new responses for next time
                        if (fetchResponse.ok && event.request.method === 'GET') {
                            const responseClone = fetchResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseClone));
                        }
                        return fetchResponse;
                    });
            })
            .catch(() => {
                // Return offline fallback
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            })
    );
}); 