/* eslint-disable */

const getTime = () => `${('' + new Date().getHours()).padStart(2, '0')}:${('' + new Date().getMinutes()).padStart(2, '0')}:${('' + new Date().getSeconds()).padStart(2, '0')}`

const showNotification = function (counter) {
  window.navigator.serviceWorker.ready
    .then(registration => {
      if (registration.waiting) {
        console.log('UPDATES FOUND! Waiting\n', registration.waiting)
        document.cookie = `waiting=${getTime}`
        window.sessionStorage.setItem('waiting', `${getTime()}`)

        document.getElementById('service-worker-notification').style.display = 'block'
      } else {
        if (!window.navigator.serviceWorker.controller && !registration.active) {
          document.cookie = `controller_does_not_exist=${getTime()}`
          window.sessionStorage.setItem('controller_does_not_exist', `${getTime()}`, 'Controller and active SW not exist')
          window.requestAnimationFrame(showNotification.bind(null, counter))
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
}.bind(null, 0)
