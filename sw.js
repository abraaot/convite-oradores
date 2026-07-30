const APP_VERSION = "1.4";
const CACHE_PREFIX = "convite-oradores-";
const CACHE_NAME = `${CACHE_PREFIX}v${APP_VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./manifest.webmanifest",
  "./assets/icons/icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      // A versão 1.3 ativava o cache antigo imediatamente. Esta chamada garante
      // a migração automática para o novo mecanismo de atualização.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();

    // Reabre os clientes controlados para que a primeira migração (1.3 → 1.4)
    // não dependa de limpeza manual de cache.
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    await Promise.all(clients.map(client => {
      if (client.url.startsWith(self.registration.scope) && "navigate" in client) {
        return client.navigate(client.url);
      }
    }));
  })());
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // VERSION.txt nunca é servido do cache: ele é a fonte única da versão publicada.
  if (url.pathname.endsWith("/VERSION.txt")) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }

  // Documentos HTML usam network-first para impedir que uma tela antiga fique presa.
  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        cache.put("./index.html", response.clone());
        return response;
      } catch {
        return (await caches.match(event.request)) || (await caches.match("./index.html"));
      }
    })());
    return;
  }

  // Arquivos estáticos são entregues rapidamente e atualizados em segundo plano.
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    const network = fetch(event.request, { cache: "no-cache" })
      .then(async response => {
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        return response;
      })
      .catch(() => null);
    return cached || (await network) || Response.error();
  })());
});
