"use strict";
var sw = self;
// cache controll
var cacheVersion = "v1";
var cacheAssets = ['index.html', 'dist/app.js'];
// installing service worker
function eventInstall(event) {
    console.log("Service Worker : installed !");
    event.waitUntil(caches
        .open(cacheVersion)
        .then(function (cache) {
        console.log('Service Worker : cache files');
        cache.addAll(cacheAssets);
    })
        .then(function () {
        sw.skipWaiting();
    }));
}
// trigger when service worker active
function eventActive(event) {
    console.log("Service Worker : activated !");
    event.waitUntil(caches
        .keys()
        .then(function (cacheVersions) {
        return Promise.all(cacheVersions.map(function (cache) {
            if (cache !== cacheVersion)
                return caches["delete"](cache);
        }));
    }));
}
// trigger when browser make request / fetching
function eventFetch(event) {
    event.respondWith(caches
        .match(event.request)
        .then(function (response) {
        return response || fetch(event.request).then(function (fetchRes) {
            return caches
                .open(cacheVersion)
                .then(function (cache) { return cache.put(event.request, fetchRes.clone()); });
        });
    }));
}
sw.addEventListener("install", eventInstall);
sw.addEventListener("activate", eventActive);
sw.addEventListener('fetch', eventFetch);
