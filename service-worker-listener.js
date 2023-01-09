/* eslint-disable */

function serviceWorkerListener (callback) {
  navigator.serviceWorker.getRegistration()
    .then(reg => {
      function awaitStateChange () {
        reg.installing.addEventListener('statechange', function (event) {
          sessionStorage.setItem(event.target.state, getTime())
          if (this.state === 'installed') callback(reg)
        })
      }

      if (reg) {
        if (reg.waiting) {
          sessionStorage.setItem('waiting', getTime())
          callback(reg)
        }
        else {
          if (reg.installing) awaitStateChange()
          reg.addEventListener('updatefound', awaitStateChange)
        }
      }
    })
}
