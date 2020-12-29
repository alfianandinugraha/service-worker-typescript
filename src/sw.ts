let sw: ServiceWorkerGlobalScope = self as any

// cache controll
const cacheVersion = "v1"
const cacheAssets: string[] = ['index.html', 'dist/app.js']

// installing service worker
function eventInstall(event: ExtendableEvent) {
  console.log("Service Worker : installed !")
  event.waitUntil(
    caches
      .open(cacheVersion)
      .then(cache => {
        console.log('Service Worker : cache files')
        cache.addAll(cacheAssets)
      })
      .then(() => {
        sw.skipWaiting()
      })
  )
}

// trigger when service worker active
function eventActive(event: ExtendableEvent) {
  console.log("Service Worker : activated !")
  event.waitUntil(
    caches
      .keys()
      .then(cacheVersions => {
        return Promise.all(
          cacheVersions.map(cache => {
            if (cache !== cacheVersion) return caches.delete(cache)
          })
        )
      })
  )
}

// trigger when browser make request / fetching
function eventFetch(event: FetchEvent) {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response as Response || fetch(event.request).then((fetchRes) => {
          return caches
            .open(cacheVersion)
            .then(cache => cache.put(event.request, fetchRes.clone()))
        })
      })
  )
}

sw.addEventListener("install", eventInstall)
sw.addEventListener("activate", eventActive)
sw.addEventListener('fetch', eventFetch)