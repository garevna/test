/* eslint-disable */

function serviceWorkerListener (callback) {
  navigator.serviceWorker.getRegistration()
    .then(reg => {
      function awaitStateChange () {
        reg.installing.addEventListener('statechange', function () {
          if (this.state === 'installed') callback(reg)
        })
      }

      if (reg) {
        if (reg.waiting) callback(reg)
        else {
          if (reg.installing) awaitStateChange()
          reg.addEventListener('updatefound', awaitStateChange)
        }
      }
    })
}
