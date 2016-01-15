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

const serverConfig = require('./config')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const webpackIsomorphicAssets = require('../../webpack/assets')
const rootDir = require('path').resolve(__dirname, '..', '..')

if (!process.env.NODE_ENV) {
  throw new Error('Environment variable NODE_ENV must be set to development or production.')
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

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicAssets)
  .development(!serverConfig.isProduction)
  .server(rootDir, () => {
    require('./main')
  })
