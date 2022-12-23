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

/* eslint-disable */

const CACHE_NAME = `live.pineapple.net.au-${(new Date()).toISOString().slice(0, 10)}`

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

importScripts('/test/precache-manifest.1e2b0f8a234aaae20f8bc02cf1ab1be6.js')

workbox.core.setCacheNameDetails({ prefix: 'live.pineapple.net.au' })

self.addEventListener('message', (event) => {
  console.log('SERVICE WORKER MESSAGE EVENT:\n', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', function (event) {
  console.log('ACTIVATE\n', event)
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log('CASH NAME: ', cacheName)
          if (CACHE_NAME !== cacheName && cacheName.startsWith('live.pineapple.net.au')) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
