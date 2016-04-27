var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: [
      'classnames',
      'firebase',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-logger',
      'redux-promise'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './static')
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /p2\.js/,
        loader: 'expose?p2'
      },
      {
        test: /phaser-split\.js/,
        loader: 'expose?Phaser'
      },
      {
        test: /pixi\.js/,
        loader: 'expose?PIXI'
      }
    ]
  },
  resolve: {
    alias: {
      'p2': path.join(__dirname, '/node_modules/phaser/build/custom/p2.js'),
      'phaser': path.join(__dirname, '/node_modules/phaser/build/custom/phaser-split.js'),
      'pixi.js': path.join(__dirname, '/node_modules/phaser/build/custom/pixi.js')
    },
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './client',
    hot: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ]
}
