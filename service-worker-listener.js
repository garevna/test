/* eslint-disable */

function serviceWorkerListener (callback) {
  navigator.serviceWorker.getRegistration()
    .then(reg => {
      console.log('SW registration object:\n', reg)

      function awaitStateChange () {
        reg.installing.addEventListener('statechange', function () {
          alert('INSTALLING SW STATE CHANGED!', reg.installing.state)
          console.log('INSTALLING SW STATE CHANGED! THIS:\n', this)
          if (this.state === 'installed') callback(reg)
        })
      }

      if (reg) {
        if (reg.waiting) {
          alert('WAITING!')
          callback(reg)
        }
        else {
          if (reg.installing) awaitStateChange()
          reg.addEventListener('updatefound', awaitStateChange)
        }
      }
    })
}
