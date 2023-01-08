/* eslint-disable */

const notification = Object.assign(document.createElement('figure'), {
  style: `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 320px;
    height: 120px;
    border: solid 1px #ddd;
    border-radius: 4px;
    background: #fbfbfb;
    color: #090;
    padding: 4px 48px;
    font-family: Gilroy, Arial;
    z-index: 99999;
    box-shadow: -3px 3px 8px #0005;
  `
})

Object.assign(notification.appendChild(document.createElement('h5')), {
  innerText: 'Updates found',
  style: `
    text-align: center;
    color: #090;
    margin: 16px auto;
  `
})

Object.assign(notification.appendChild(document.createElement('p')), {
  innerHTML: '<small>index.html</small>',
  style: `
    text-align: center;
    color: #aaa;
    margin: 0 auto;
  `
})

Object.assign(notification.appendChild(document.createElement('p')), {
  innerText: 'Please refresh the page',
  style: `
    margin: 16px auto;
    padding: 12px auto;
    text-align: center;
    color: #999;
    border-radius: 16px;
    border: solid 1px #090;
    background: #090;
    color: #efe;
    cursor: pointer;
  `,
  onclick: function (event) {
    window.location.reload()
  }
})

const showNotification = function (counter) {
  window.navigator.serviceWorker.ready
    .then(registration => {
      if (registration.waiting) {
        console.log('Waiting\n', registration.waiting)
        document.cookie = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}=waiting`
        window.sessionStorage.setItem(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, 'waiting')
        window.document.body.appendChild(notification)
      } else {
        if (!window.navigator.serviceWorker.controller && !registration.active) {
          document.cookie = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}=not_controller_&_not_active`
          window.sessionStorage.setItem(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, 'Controller and active SW not exist')
          window.requestAnimationFrame(showNotification.bind(null, counter))
        } else {
          console.group('There is no updates for SW')
          window.sessionStorage.setItem(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, 'There is no updates for SW')
          console.log(new Date().toLocaleTimeString())
          console.log('Controller:\n', window.navigator.serviceWorker.controller)
          console.log('Active:\n', registration.active)
          console.groupEnd('There is no updates for SW')
        }
      }
    })
}.bind(null, 0)