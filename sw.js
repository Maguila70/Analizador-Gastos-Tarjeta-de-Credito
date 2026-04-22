// Service Worker — Analizador de Gastos TC
const VERSION = 'v1.0.0';
const APP_CACHE = 'gastos-tc-app-' + VERSION;
const CDN_CACHE = 'gastos-tc-cdn-' + VERSION;

const APP_SHELL = [
  './',
  './gastos-tarjeta.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-maskable.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== APP_CACHE && k !== CDN_CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // App shell: cache-first, fallback to network, then update cache
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(resp => {
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(APP_CACHE).then(c => c.put(req, copy));
        }
        return resp;
      }))
    );
  } else {
    // CDN (pdf.js, Chart.js, fonts): network-first with cache fallback
    event.respondWith(
      fetch(req).then(resp => {
        if (resp.ok) {
          const copy = resp.clone();
          caches.open(CDN_CACHE).then(c => c.put(req, copy));
        }
        return resp;
      }).catch(() => caches.match(req))
    );
  }
});
