/* eslint-disable no-console */

import { register } from 'register-service-worker'

// console.log(process.env.BASE_URL)

register(`${process.env.BASE_URL}service-worker.js`, {
  ready () {
    console.log('App is being served from cache by a service worker.')
  },
  registered () {
    console.log('Service worker has been registered.')
  },
  cached () {
    console.log('Content has been cached for offline use.')
  },
  updatefound () {
    console.log('New content is downloading.')
  },
  updated (event) {
    // console.log('New content is available.')
    const serviceWorker = event.waiting

    console.log('UPDATED - WAITING SERVICE WORKER:\n', serviceWorker)

    serviceWorker.onstatechange = function (event) {
      console.log('WAITING SERVICE WORKER STATUS CHANGED:\n', event)
      console.log(this)
      this.skipWaiting()
    }

    console.warn('Wait 10 sec and make the worker active...')

    setTimeout(() => serviceWorker.skipWaiting(), 10000)

    // console.groupEnd('Service worker registration event UPDATED')
    // setTimeout(() => location.reload(), 10000)
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
