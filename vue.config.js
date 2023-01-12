const fs = require('fs')
const webpack = require('webpack')

const { version, tag, remote } = JSON.parse(fs.readFileSync('./package.json'))

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
          VUE_APP_GIT_TAG: `"${tag}"`,
          VUE_APP_DEVELOPMENT_RELEASE_VERSION: `"${version}"`,
          VUE_APP_PRODUCTION_RELEASE_VERSION: `"${tag}"`,
          VUE_APP_TEST_SW: `"${remote}"`
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
  publicPath: remote === 'test' ? '/test/' : '/'
}
