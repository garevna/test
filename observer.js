const targetNode = document.getElementById('service-worker-notification')
const config = { attributes: true, childList: false, subtree: false }

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    console.log('MUTATION:\n', mutation)
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      console.log(`Style changed: ${targetNode.style.display}`)
    }
  }
}

const observer = new MutationObserver(callback)
observer.observe(targetNode, config)
