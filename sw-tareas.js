// Un Service Worker mínimo para habilitar la instalación nativa completa
self.addEventListener('install', (e) => {
  // Fuerza al SW a activarse inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

// Evento fetch básico (necesario para cumplir los requisitos de PWA de Chrome)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
