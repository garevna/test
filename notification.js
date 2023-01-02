export function notification () {
  const notification = Object.assign(document.body.appendChild(document.createElement('figure')), {
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

  return new Promise(resolve => {
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
        // window.location.reload()
        resolve()
      }
    })
  })
}
