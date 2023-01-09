/* eslint-disable */

// const getTime = () => `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString().slice(0, -3)}`

const showNotification = function (counter) {
  window.navigator.serviceWorker.ready
    .then(registration => {
      if (registration.waiting) {
        console.log('UPDATES FOUND! Waiting\n', registration.waiting)
        window.sessionStorage.setItem('waiting', `${getTime()}`)

        document.body.appendChild(window[Symbol.for('SW.notification')])

        alert('UPDATES FOUND!')
      } else {
        if (!window.navigator.serviceWorker.controller && !registration.active) {
          window.sessionStorage.setItem('controller_does_not_exist', `${getTime()}`)
          window.requestAnimationFrame(showNotification)
        } else {
          console.group('There is no updates for SW')
          window.sessionStorage.setItem('updates_not_found', `${getTime()}`)
          console.log(new Date().toLocaleTimeString())
          console.log('Controller:\n', window.navigator.serviceWorker.controller)
          console.log('Active:\n', registration.active)
          console.groupEnd('There is no updates for SW')
        }
      }
    })
}
