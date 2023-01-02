/* eslint-disable no-console */

import { register } from 'register-service-worker'

import { /* serviceWorkerConfig, showWorkers, */ notification } from './helpers'

register(`${process.env.BASE_URL}service-worker.js`, {
  ready (registration) {
    console.log('Service worker has been activated.')
    Object.assign(registration.active, { name: 'Active service worker', [`${registration.active.state}`]: new Date().toLocaleString() })
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached () {
    console.log('Content has been cached for offline use.')
  },

  updatefound () {
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('New content is available.')

    notification()

    // Object.assign(registration.active, { name: 'Active service worker', [`${registration.active.state}`]: new Date().toLocaleString() })
    // Object.assign(registration.waiting, { name: 'Waiting service worker', [`${registration.waiting.state}`]: new Date().toLocaleString() })

    // showWorkers('UPDATED', registration)

    // serviceWorkerConfig()
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
