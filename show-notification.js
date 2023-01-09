/* eslint-disable */

// const getTime = () => `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString().slice(0, -3)}`

const sw_notification = Object.assign(document.createElement('service-worker-notification'), {
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

Object.assign(sw_notification.appendChild(document.createElement('h5')), {
  innerText: `Updates found: ${process.env.VUE_APP_PRODUCTION_RELEASE_VERSION}`,
  style: `
    text-align: center;
    color: #090;
    margin: 16px auto;
  `
})

const sw_button = Object.assign(sw_notification.appendChild(document.createElement('p')), {
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
  `
  // onclick: function (event) {
  //   window.location.reload()
  // }
})

function showNotification (registrationObject) {
  document.body.appendChild(sw_notification)
  sw_button.onclick = function (e) {
    alert('skipWaiting')
    registrationObject.waiting.postMessage({ type: 'SKIP_WAITING' })
    alert('see new SW')
  }.bind(null, registrationObject)
}

// const showNotification = function (counter) {
//   window.navigator.serviceWorker.ready
//     .then(registration => {
//       if (registration.waiting) {
//         console.log('UPDATES FOUND! Waiting\n', registration.waiting)
//         window.sessionStorage.setItem('waiting', `${getTime()}`)
//
//         document.body.appendChild(window[Symbol.for('SW.notification')])
//
//         alert('UPDATES FOUND!')
//       } else {
//         if (!window.navigator.serviceWorker.controller && !registration.active) {
//           window.sessionStorage.setItem('controller_does_not_exist', `${getTime()}`)
//           window.requestAnimationFrame(showNotification)
//         } else {
//           console.group('There is no updates for SW')
//           window.sessionStorage.setItem('updates_not_found', `${getTime()}`)
//           console.log(new Date().toLocaleTimeString())
//           console.log('Controller:\n', window.navigator.serviceWorker.controller)
//           console.log('Active:\n', registration.active)
//           console.groupEnd('There is no updates for SW')
//         }
//       }
//     })
// }
