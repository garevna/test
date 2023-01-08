const getTime = () => `${('' + new Date().getHours()).padStart(2, '0')}:${('' + new Date().getMinutes()).padStart(2, '0')}:${('' + new Date().getSeconds()).padStart(2, '0')}`

const targetNode = document.getElementById('service-worker-notification')
const config = { attributes: true, childList: false, subtree: false }

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    console.log('MUTATION:\n', mutation)
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      console.log(`Style changed: ${targetNode.style.display}`)
      document.cookie = `${getTime()}=${targetNode.style.display}`
      window.sessionStorage.setItem(getTime(), targetNode.style.display)
    }
  }
}

const observer = new MutationObserver(callback)
observer.observe(targetNode, config)
