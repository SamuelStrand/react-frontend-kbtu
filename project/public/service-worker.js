const APP_SHELL_CACHE = 'app-shell-v1'
const DATA_CACHE = 'data-cache-v1'

const APP_SHELL = ['/', '/index.html', '/manifest.json', '/icon-192x192.png', '/icon-512x512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![APP_SHELL_CACHE, DATA_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // network-first для данных FreeToGame
  if (url.pathname.startsWith('/ftg')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone()
          caches.open(DATA_CACHE).then((cache) => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  if (APP_SHELL.some((path) => url.pathname === path)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request)
      })
    )
  }
})
