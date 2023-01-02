/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

/* eslint-disable no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

importScripts('/test/precache-manifest.15675878bb7535652a393bbd328cc73a.js')

workbox.core.setCacheNameDetails({ prefix: 'live.pineapple.net.au' })

self.addEventListener('fetch', fetchEvent => {
  console.log('FETCH EVENT:\n', fetchEvent)
  console.log('fetching', fetchEvent.request)
  console.log('CACHES:\n', caches)
  fetchEvent.respondWith(caches.match(fetchEvent.request)
    .then(async cachedResponse => {
      console.log('CACHED RESPONSE:\n', cachedResponse)
      if (cachedResponse) return cachedResponse
      const response = await fetch(fetchEvent.request)
      caches.open('whatever')
        .then(cache => cache.put(fetchEvent.request, response))
      return response.clone()
    })
  )
})

self.addEventListener('message', (event) => {
  console.log('SERVICE WORKER MESSAGE EVENT:\n', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('push', () => event.waitUntil(fetch('/updates').then(() => self.registration.showNotification('New updates'))))

self.postMessage('SERVICE WORKER HERE!!!')

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
