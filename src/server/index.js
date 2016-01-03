// Universal CSS Modules
require('css-modules-require-hook')({
  // This path should match the css-loader localIdentName in your webpack config.
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  // This configuration is used for react-toolbox sass modules.
  extensions: ['.scss'],
  preprocessCss: (css, filename) =>
    require('node-sass').renderSync({
      file: filename
    }).css
})
require('babel-register')

// http://formatjs.io/guides/runtime-environments/#polyfill-node
if (global.Intl) {
  // We don't have to check whether Node runtime supports specific language,
  // because without special build it does support only english anyway.
  require('intl')
  global.Intl.NumberFormat = global.IntlPolyfill.NumberFormat
  global.Intl.DateTimeFormat = global.IntlPolyfill.DateTimeFormat
} else {
  global.Intl = require('intl')
}

require('./main')
