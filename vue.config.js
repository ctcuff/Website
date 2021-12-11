const path = require('path')

// Needed to get scrollmagic debug imports to work
// https://stackoverflow.com/a/66722401/9124220
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        ScrollMagic: path.resolve(
          'node_modules',
          'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
        ),
        'debug.addIndicators': path.resolve(
          'node_modules',
          'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
        )
      }
    }
  }
}
