/* eslint-disable */

function serviceWorkerListener (callback) {
  navigator.serviceWorker.getRegistration()
    .then(reg => {
      function awaitStateChange () {
        reg.installing.addEventListener('statechange', function (event) {
          alert(`INSTALLING SW STATE CHANGED! ${this.state} (${event.target.state})`)
          sessionStorage.setItem(event.target.state, getTime())
          console.log('INSTALLING SW STATE CHANGED! THIS:\n', this.state, event.target.state)
          if (this.state === 'installed') callback(reg)
        })
      }

      if (reg) {
        if (reg.waiting) {
          alert('WAITING!')
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
