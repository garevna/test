/* eslint-disable */

const notification = Object.assign(document.createElement('figure'), {
  style: `
    position: fixed;
    top: 0;
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

function showNotification () {
  navigator.serviceWorker.ready
    .then(registration => {
      if (registration.waiting) {
        console.log('Waiting!!!!')
        window.document.body.appendChild(notification)
      } else {
        console.log('requestAnimationFrame!')
        window.requestAnimationFrame(showNotification)
      }
    })
}
