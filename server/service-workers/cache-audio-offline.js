const VERSION = 1

const CACHE_VERSION = 1
const CACHES = {
  audioTracks: `ear-tickler|audio-tracks|v${CACHE_VERSION}`
}

const validCacheNames = Object.keys(CACHES).map(key => CACHES[key])
const deleteStaleCaches = caches.keys()
  .then(cacheNames => cacheNames.filter(name => !validCacheNames.includes(name)))
  .then(staleCaches => staleCaches.map((name) => {
    console.info(`ear-tickler: deleting stale cache ${name}`)
    return caches.delete(name)
  }))
  .then((all) => Promise.all(all))
  .then(() => {
    console.log('Finished clearing stale caches.')
    return Promise.resolve()
  })

const populateCurrentCaches = fetch('/api/tracks')
  .then(response => response.json())
  .then(tracks => tracks.map(track => track.url))
  .then(urls => urls.map(url => new Request(url, { mode: 'no-cors' })))
  .then(requests => Promise.all([
    caches.open(CACHES.audioTracks),
    Promise.resolve(requests)
  ]))
  .then(([cache, requests]) =>
    requests.map((request) =>
      cache.match(request).then((cached) => {
        if (cached) return Promise.resolve();
        return fetch(request)
          .then((response) => {
            console.log(`Fetched and cached ${request.url}`)
            return cache.put(request, response)
          })
          .catch((error) => {
            console.info(error)
            return Promise.resolve()
          })
      })
    )
  )
  .then((all) => Promise.all(all))
  .then(() => {
    console.log('Finished pre-fetching audio tracks.')
    return Promise.resolve()
  })

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([deleteStaleCaches, populateCurrentCaches])
           .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (url.pathname.match(/(mp3|mp4|wav)$/i)) {
    const request = new Request(event.request.url)
    const getCache = caches.open(CACHES.audioTracks)

    event.respondWith(
      caches.open(CACHES.audioTracks)
            .then(cache => cache.match(request).then((cached) => {
              if (cached) {
                console.log(`Loaded ${url.href} from cache`)
                return cached
              }

              return fetch(request).then((response) => {
                console.log(`Fetched and cached ${url.href}`)
                cache.put(request, response)
                return response.clone()
              })
            }))
    )
  } else {
    // console.log('should NOT intercept', url.href)
  }
})
