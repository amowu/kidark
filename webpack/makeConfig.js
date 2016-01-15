import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ip from 'ip'
import path from 'path'
import webpack from 'webpack'
import webpackIsomorphicAssets from './assets'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

import constants from './constants'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets)

// cheap-module-eval-source-map, because we want original source, but we don't
// care about columns, which makes this devtool faster than eval-source-map.
// http://webpack.github.io/docs/configuration.html#devtool
const devtools = 'cheap-module-eval-source-map'

const loaders = {
  'css': '',
  'less': '!less',
  'scss': '!sass?outputStyle=expanded&sourceMap',
  'sass': '!sass?indentedSyntax',
  'styl': '!stylus'
}

const serverIp = ip.address()

export default function makeConfig (isDevelopment) {
  function stylesLoaders () {
    return Object.keys(loaders).map(ext => {
      const prefix = 'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!cssnext'
      const extLoaders = prefix + loaders[ext]
      const loader = isDevelopment
        ? `style!${extLoaders}`
        : ExtractTextPlugin.extract('style', extLoaders)
      return {
        test: new RegExp(`\\.(${ext})$`),
        loader
      }
    })
  }

  const config = {
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        'bootstrap-sass!' + path.join(constants.SRC_DIR, 'browser/theme/bootstrap.config.js'),
        'font-awesome-webpack!' + path.join(constants.SRC_DIR, 'browser/theme/font-awesome.config.js'),
        path.join(constants.SRC_DIR, 'browser/main.jsx')
      ] : [
        'bootstrap-sass!' + path.join(constants.SRC_DIR, 'browser/theme/bootstrap.config.prod.js'),
        'font-awesome-webpack!' + path.join(constants.SRC_DIR, 'browser/theme/font-awesome.config.prod.js'),
        path.join(constants.SRC_DIR, 'browser/main.jsx')
      ]
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/_assets/'
    },
    module: {
      loaders: [
        { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.(gif|jpg|png)$/, loader: 'url?limit=100000' },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            plugins: ['transform-runtime', 'add-module-exports'],
            presets: ['es2015', 'react', 'stage-1'],
            env: {
              development: {
                presets: ['react-hmre']
              }
            }
          }
        }
      ].concat(stylesLoaders())
    },
    resolve: {
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        }),
        new webpack.ProvidePlugin({
          PIXI: 'phaser-shim/dist/pixi.js',
          Phaser: 'phaser-shim/dist/phaser.js'
        })
      ]
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin(),
          webpackIsomorphicToolsPlugin.development()
        )
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('app-[hash].css', {
            allChunks: true
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true,
              warnings: false // Because uglify reports irrelevant warnings.
            },
            output: { comments: false }
          }),
          webpackIsomorphicToolsPlugin
        )
      }
      return plugins
    })()
  }

  return config
}
