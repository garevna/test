const targetNode = document.getElementById('service-worker-notification')
const config = { attributes: true, childList: true, subtree: true }

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    console.log('MUTATION:\n', mutation)
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`)
    }
  }
}

const observer = new MutationObserver(callback)
observer.observe(targetNode, config)
