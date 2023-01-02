let waitWindowLoad

if (typeof window !== 'undefined') {
  if (typeof Promise !== 'undefined') {
    waitWindowLoad = new Promise(resolve => window.addEventListener('load', resolve))
  } else {
    waitWindowLoad = { then: (cb) => window.addEventListener('load', cb) }
  }
}

function register (swUrl, hooks = {}) {
  const { registrationOptions = {} } = hooks
  delete hooks.registrationOptions

  const emit = (hook, ...args) => {
    if (hooks && hooks[hook]) {
      hooks[hook](...args)
    }
  }

  if ('serviceWorker' in navigator) {
    waitWindowLoad.then(() => {
      registerValidSW(swUrl, emit, registrationOptions)
      navigator.serviceWorker.ready
        .then(registration => emit('ready', registration))
        .catch(error => handleError(emit, error))
    })
  }
}

function handleError (emit, error) {
  if (!navigator.onLine) {
    emit('offline')
  }
  emit('error', error)
}

function registerValidSW (swUrl, emit, registrationOptions) {
  navigator.serviceWorker
    .register(swUrl, registrationOptions)
    .then(registration => {
      emit('registered', registration)
      if (registration.waiting) {
        emit('updated', registration)
        return
      }
      registration.onupdatefound = () => {
        emit('updatefound', registration)
        const installingWorker = registration.installing
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              emit('updated', registration)
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              emit('cached', registration)
            }
          }
        }
      }
    })
    .catch(error => handleError(emit, error))
}

// function checkValidServiceWorker (swUrl, emit, registrationOptions) {
//   // Check if the service worker can be found.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       if (response.status === 404) {
//         // No service worker found.
//         emit('error', new Error(`Service worker not found at ${swUrl}`))
//         unregister()
//       } else if (response.headers.get('content-type').indexOf('javascript') === -1) {
//         emit('error', new Error(
//           `Expected ${swUrl} to have javascript content-type, ` +
//           `but received ${response.headers.get('content-type')}`))
//         unregister()
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl, emit, registrationOptions)
//       }
//     })
//     .catch(error => handleError(emit, error))
// }

// function unregister () {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister()
//     }).catch(error => handleError(emit, error))
//   }
// }

export {
  register
}
