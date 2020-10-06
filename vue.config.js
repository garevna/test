// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  css: {
    sourceMap: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '.'
      }
    },
    plugins: [
      // new VuetifyLoaderPlugin({
      //   match (originalTag, { kebabTag, camelTag, path, component }) {
      //     if (kebabTag.startsWith('core-')) {
      //       return [
      //         camelTag,
      //         `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
      //       ]
      //     }
      //   }
      // }),
      // new BundleAnalyzerPlugin()
    ]
  },
  pwa: {
    themeColor: '#20731C',
    msTileColor: '#FAFAFA'
  },
  runtimeCompiler: true
}
