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
  innerText: 'Updates found',
  style: `
    text-align: center;
    color: #090;
    margin: 16px auto;
  `
})

const sw_button = Object.assign(sw_notification.appendChild(document.createElement('p')), {
  innerText: 'Click here to update',
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
})

function showNotification (registrationObject) {
  document.body.appendChild(sw_notification)
  sw_button.onclick = function (registrationObject, e) {
    console.log('skipWaiting')
    registrationObject.waiting.postMessage({ type: 'SKIP_WAITING' })
  }.bind(null, registrationObject)
}
