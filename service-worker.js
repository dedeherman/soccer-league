<<<<<<< HEAD
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
=======
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
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
<<<<<<< HEAD
    "/js/reg-sw.js",
    "/js/api.js",
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

    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"

=======
    "/js/sw-register.js",
    "/js/api.js",
    "/manifest.json",
    "/icon.png",
    "/favicon.ico",
    "/image/liga-italia.jpg",
    "/image/liga-champion.jpg",
    "/image/liga-indonesia.jpg",
    "/image/liga-inggris.jpg"
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
<<<<<<< HEAD

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
=======
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
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
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
<<<<<<< HEAD
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message Dari payload';
    }
    var options = {
        body: body,
        // icon: 'icon-128x128.png',
        icon: 'icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
=======
>>>>>>> 313667fc13b545cd31a40d4d5dcb9aa106bd311f
});