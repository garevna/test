/* eslint-disable no-console */

import { register } from 'register-service-worker'

console.log(process.env.BASE_URL)

register(`${process.env.BASE_URL}service-worker.js`, {
  ready (event) {
    // console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB\n', arg)
    console.log('READY SERVICE WORKER:\n', event.active)
  },
  registered (event) {
    // console.log('Service worker has been registered.')
    console.log('REGISTERED SERVICE WORKER STATE:\n', event.active.state)
    event.active.onstatechange = function (ev) {
      console.log(this.status)
      console.log(this)
      console.log(ev)
    }
  },
  cached (event) {
    console.log('Content has been cached for offline use.')
    console.log('event\n', event)
  },
  updatefound (event) {
    console.log('New content is downloading.')
    console.log('event\n', event)
  },
  updated (event) {
    console.log('New content is available; please refresh.')
    console.log('event\n', event)
    console.log('this\n', this)
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
