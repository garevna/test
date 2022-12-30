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

importScripts('/test/precache-manifest.9cd8c1930b90e2ebc2940d7dc7b8b87d.js')

workbox.core.setCacheNameDetails({ prefix: 'live.pineapple.net.au' })

self.addEventListener('message', (event) => {
  console.log('SERVICE WORKER MESSAGE EVENT:\n', event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('push', () => event.waitUntil(fetch('/updates').then(() => self.registration.showNotification('New updates'))))

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
