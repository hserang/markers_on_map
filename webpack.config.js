'use strict'

const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }]
  }
}

module.exports = config
