const CACHE = "orah-v2";
const CORE = [
  "/",
  "/vietnam",
  "/kosher",
  "/shabbat",
  "/plan",
  "/emergency",
  "/saved",
  "/phrases",
  "/today",
  "/guides/before",
  "/guides/apps",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          if (
            res.ok &&
            (req.url.includes("/destinations/") ||
              req.url.includes("/offline/") ||
              req.mode === "navigate")
          ) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    }),
  );
});
