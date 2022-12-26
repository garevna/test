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

import { cacheNames } from 'workbox-core'

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

importScripts('/test/precache-manifest.970442ff271905a98550f6a06238deba.js')

console.log('CACHE NAMES BEFORE:\n', cacheNames)
console.log(cacheNames.precache)
console.log(cacheNames.runtime)
console.log(cacheNames.googleAnalytics)

// var CACHE_NAME = 'live-pineapple-cache'

workbox.core.setCacheNameDetails({
  prefix: 'live-pineapple',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga'
})

console.log('CACHE NAMES AFTER:\n', cacheNames)

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(CACHED_URLS)
//     })
//   )
// })

self.addEventListener('message', (event) => {
  console.log('SERVICE WORKER MESSAGE EVENT:\n', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
