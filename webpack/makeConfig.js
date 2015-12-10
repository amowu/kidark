import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ip from 'ip'
import path from 'path'
import webpack from 'webpack'

import constants from './constants'

const devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map'

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
        loader: loader
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
        path.join(constants.SRC_DIR, 'browser/main.js')
      ] : [
        'bootstrap-sass!' + path.join(constants.SRC_DIR, 'browser/theme/bootstrap.config.prod.js'),
        path.join(constants.SRC_DIR, 'browser/main.js')
      ]
    },
    module: {
      loaders: [
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
        { test: /\.(gif|jpg|png)$/, loader: 'url?limit=100000' },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            stage: 0,
            env: {
              development: {
                // react-transform belongs to webpack config only, not to .babelrc
                plugins: ['react-transform'],
                extra: {
                  'react-transform': {
                    transforms: [{
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module']
                    }, {
                      transform: 'react-transform-catch-errors',
                      imports: ['react', 'redbox-react']
                    }]
                  }
                }
              }
            }
          }
        }
      ].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
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
          new webpack.NoErrorsPlugin()
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
            }
          })
        )
      }
      return plugins
    })(),
    resolve: {
      extensions: ['', '.js', '.json', '.jsx', '.scss'],
      modulesDirectories: ['src', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  }

  return config
}
