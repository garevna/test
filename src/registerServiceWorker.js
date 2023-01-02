/* eslint-disable no-console */

import { register } from 'register-service-worker'

import { /* serviceWorkerConfig, */ notification } from './helpers'

// function showWorkers (title, registration) {
//   console.group(title)
//   const { active, waiting } = registration
//   if (title === 'REGISTERED') console.log('REGISTRATION OBJECT:\n', registration)
//   console.table([
//     { name: active.name, state: active.state },
//     { name: waiting ? waiting.name : null, state: waiting ? waiting.state : null }
//   ])
//   // console.log('ACTIVE SERVICE WORKER:\n', registration.active)
//   // console.log('WAITING SERVICE WORKER:\n', registration.waiting)
//   console.groupEnd(title)
// }

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
