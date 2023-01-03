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

const button = Object.assign(notification.appendChild(document.createElement('p')), {
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

let prev = { controller: null, active: null, waiting: null, installing: null }

async function showNotification () {
  const { controller, active, waiting, installing } = await window.navigator.serviceWorker.ready

  if ((controller && !prev.controller) || (active && !prev.active) || (waiting && !prev.active) || (installing && !prev.installing)) {
    Object.assign({ controller, active, waiting, installing })
    console.table([
      { title: 'Controller', name: controller.name, state: controller.state },
      { title: 'Active SW', name: active.name, state: active.state },
      { title: 'Waiting SW', name: waiting ? waiting.name : null, state: waiting ? waiting.state : null },
      { title: 'Installing SW', name: installing ? installing.name : null, state: installing ? installing.state : null }
    ])
  }

  if (waiting) return document.body.appendChild(notification)

  if (!controller) return window.requestAnimationFrame(showNotification)
}
