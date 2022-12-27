const fs = require('fs')
const webpack = require('webpack')

const packageJson = fs.readFileSync('./package.json')
const { version, tag, remote } = JSON.parse(packageJson)

console.log(remote)

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  css: { sourceMap: false },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          GIT_TAG: `"${tag}"`,
          DEVELOPMENT_RELEASE_VERSION: `"${version}"`,
          PRODUCTION_RELEASE_VERSION: `"${tag}"`
        }
      })
    ],
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '.'
      }
    }
  },
  pwa: {
    themeColor: '#20731C',
    msTileColor: '#FAFAFA'
  },
  runtimeCompiler: true,
  publicPath: remote === 'gh-pages' ? '/test/' : '/'
}
