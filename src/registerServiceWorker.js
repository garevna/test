/* eslint-disable no-console */

import { register } from 'register-service-worker'

import { /* showNotification, */ getTime } from './helpers'

const previous = window.sessionStorage.getItem('previous')
if (previous) window.sessionStorage.setItem('old', previous)

window.sessionStorage.setItem('previous', JSON.stringify({}))

;['ready', 'waiting', 'registered', 'cached', 'updatefound', 'updated', 'installed', 'activating', 'activated', 'reload', 'page_reloaded', 'state_changed', 'controller_changed']
  .forEach(key => {
    if (!window.sessionStorage.getItem(key)) return
    const prev = Object.assign(JSON.parse(window.sessionStorage.getItem('previous')), { [key]: window.sessionStorage.getItem(key) })
    window.sessionStorage.setItem('previous', JSON.stringify(prev))
    window.sessionStorage.removeItem(key)
  })

register(`${process.env.BASE_URL}service-worker.js`, {
  ready (registration) {
    console.log('Service worker has been activated')
    // Object.assign(registration.active, { name: 'Active service worker', [`${registration.active.state}`]: new Date().toLocaleString() })
    window.sessionStorage.setItem('ready', getTime())
  },

  registered (registration) {
    console.log('Service worker has been registered.')
    window.sessionStorage.setItem('registered', getTime())
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
    window.sessionStorage.setItem('cached', getTime())
  },

  updatefound (registration) {
    window.sessionStorage.setItem('updatefound', getTime())
    console.log('New content is downloading.')
  },

  updated (registration) {
    window.sessionStorage.setItem('updated', getTime())
    console.log('New content is available.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
