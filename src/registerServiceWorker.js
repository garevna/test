/* eslint-disable no-console */

import { register } from 'register-service-worker'

const CACHE_NAME = `live.pineapple.net.au-${(new Date()).toISOString().slice(0, 10)}`

self.addEventListener('activate', function (event) {
  console.log(event)
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log(cacheName)
          if (CACHE_NAME !== cacheName && cacheName.startsWith('live.pineapple.net.au')) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

register(`${process.env.BASE_URL}service-worker.js`, {
  ready (arg) {
    console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB\n', arg)
  },
  registered (arg) {
    console.log('Service worker has been registered.\n', arg)
  },
  cached (arg) {
    console.log('Content has been cached for offline use.\n', arg)
  },
  updatefound (arg) {
    console.log('New content is downloading.\n', arg)
  },
  updated (arg) {
    console.log('New content is available; please refresh.\n', arg)
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})

// if (process.env.NODE_ENV === 'production') {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready () {
//       console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB')
//     },
//     registered () {
//       console.log(`Service worker has been registered. `)
//     },
//     cached () {
//       console.log('Content has been cached for offline use.')
//     },
//     updatefound () {
//       console.log('New content is downloading.')
//     },
//     updated () {
//       console.log('New content is available; please refresh.')
//     },
//     offline () {
//       console.log('No internet connection found. App is running in offline mode.')
//     },
//     error (error) {
//       console.error('Error during service worker registration:', error)
//     }
//   })
// }
