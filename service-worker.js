const CACHE_NAME = "firstpwa";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/liga-champion.html",
    "/pages/liga-indonesia.html",
    "/pages/liga-inggris.html",
    "/pages/liga-italia.html",
    "/pages/match.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/sw-register.js",
    "/js/api.js",
    "/manifest.json",
    "/icon.png",
    "/favicon.ico",
    "/image/liga-italia.jpg",
    "/image/liga-champion.jpg",
    "/image/liga-indonesia.jpg",
    "/image/liga-inggris.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});