const CACHE_NAME = "firstpwa-v1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/README.md",
    "/index.html",
    "/LICENSE",
    "/team.html",
    "/pages/home.html",
    "/pages/favorite.html",
    "/pages/liga-spanyol.html",
    "/pages/liga-indonesia.html",
    "/pages/liga-inggris.html",
    "/pages/liga-italia.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/reg-sw.js",
    "/js/api.js",
    // 3. typo 
    "/js/idb.js",
    "/js/database.js",

    "/manifest.json",
    "/icon.png",
    "/icon-192x192.png",
    "/icon-256x256.png",
    "/icon-384x384.png",
    "/icon-512x512.png",
    "/favicon.ico",
    "/image/liga-italia.jpg",
    "/image/liga-spanyol.jpg",
    "/image/liga-indonesia.jpg",
    "/image/liga-inggris.jpg",

    // cache material icon
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"

];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

//  Menyimpan cache dinamis 
self.addEventListener("fetch", function(event) {

    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
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