require('css-modules-require-hook')({
  // This path should match the css-loader localIdentName in your webpack config.
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})
require('babel/register')({optional: ['es7']})

if (!process.env.NODE_ENV) {
  throw new Error('Environment variable NODE_ENV isn\'t set. Remember it\'s up your production enviroment to set NODE_ENV and maybe other variables.')
}

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
