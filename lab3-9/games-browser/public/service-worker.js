const APP_SHELL_CACHE = 'app-shell-v2';
const API_CACHE = 'api-cache-v1';

const APP_SHELL_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    '/assets/index-BXTBTJmc.js',
    '/assets/index-DegPlHF3.css'
];

self.addEventListener('install', (event) => {
    console.log('[SW] Install');

    event.waitUntil(
        caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL_ASSETS)),
    );

    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activate');

    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (![APP_SHELL_CACHE, API_CACHE].includes(key)) {
                        return caches.delete(key);
                    }
                    return null;
                }),
            ),
        ),
    );

    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match('/index.html').then((cached) => {
                if (cached) {
                    return cached;
                }
                return fetch('/index.html');
            }),
        );
        return;
    }

    if (url.origin === 'https://www.freetogame.com') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clone = response.clone();
                    caches.open(API_CACHE).then((cache) => cache.put(request, clone));
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    if (cached) {
                        return cached;
                    }
                    return new Response(
                        JSON.stringify({
                            error: 'offline',
                            message: 'You are offline and this data is not cached yet.',
                        }),
                        {
                            status: 503,
                            headers: { 'Content-Type': 'application/json' },
                        },
                    );
                }),
        );
        return;
    }

    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) {
                    return cached;
                }

                return fetch(request)
                    .then((response) => {
                        const clone = response.clone();
                        caches.open(APP_SHELL_CACHE).then((cache) =>
                            cache.put(request, clone),
                        );
                        return response;
                    })
                    .catch(() => {
                        return new Response('Offline and no cache', { status: 503 });
                    });
            }),
        );
        return;
    }

    event.respondWith(
        fetch(request).catch(() => caches.match(request)),
    );
});
