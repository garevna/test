let efforts = 0

export async function serviceWorkerConfig () {
  const { active, waiting, installing } = await window.navigator.serviceWorker.ready

  console.table([
    { title: 'Active service worker', name: active.name, state: active.state },
    { title: 'Waiting service worker', name: waiting ? waiting.name : null, state: waiting ? waiting.state : null },
    { title: 'Installing service worker', name: installing ? installing.name : null, state: installing ? installing.state : null }
  ])

  if (installing) {
    window.sessionStorage.setItem(`SW ${new Date().toLocaleString()}`, installing.state)
  }

  if (waiting) {
    console.log('New instance of service worker installed:\n', waiting)
    console.log('New instance of service worker will be activated after 20 sec')
    window.sessionStorage.setItem(`SW ${new Date().toLocaleString()}`, waiting.state)
    window.setTimeout(() => {
      console.log(waiting)
      waiting.postMessage('SKIP_WAITING')
    }, 20000)
  } else ++efforts < 3 && setTimeout(serviceWorkerConfig, 30000)
}
