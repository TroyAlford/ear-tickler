const WORKERS = [
  'cache-audio-offline',
]

export default function registerServiceWorkers() {
  if (!('serviceWorker' in navigator)) return undefined

  function waitUntilInstalled(registration) {
    return new Promise((resolve, reject) => {
      if (!registration.installing) return resolve()

      if (registration.installing) {
        registration.installing.addEventListener('statechange', (e) => {
          if (e.target.state === 'installed') {
            return resolve()
          } else if (e.target.state === 'redundant') {
            return reject()
          }
        })
      }
    })
  }

  WORKERS.forEach(sw => {
    const url = `/${sw}.js`
    navigator.serviceWorker
      .register(url, { scope: '/' })
      .then(waitUntilInstalled)
      .catch(error => console.error(`ServiceWorker Installation Error: ${sw}: ${error}`))
  })
}
