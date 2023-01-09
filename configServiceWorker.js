/* For testing purpose only */

const fs = require('fs')

function getPrecacheManifest () {
  return new Promise((resolve, reject) => {
    fs.readdir(`${process.cwd()}/dist`, function (err, files) {
      (err) ? reject(err) : resolve(files.find(fileName => fileName.indexOf('precache-manifest.') !== -1))
    })
  })
}

const resolve = fileName => {
  const response = fs.readFileSync(`${process.cwd()}/dist/service-worker.js`, { encoding: 'utf8' })
  const [oldLine, newLine] = [
    'workbox.core.setCacheNameDetails({prefix: "live.pineapple.net.au"});',
    'workbox.core.setCacheNameDetails({prefix: "garevna.github.io/test"});'
  ]

  response.replace(oldLine, newLine)
  // now fs.writeFileSync
}

getPrecacheManifest()
  .then(resolve, response => console.warn(response))
