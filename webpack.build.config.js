var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {

  entry: {
    'index-js': path.resolve(__dirname, 'index.js'),
    'index-html': path.resolve(__dirname, 'src/index.html'),

    'index-bo-js': path.resolve(__dirname, 'index-bo.js'),
    'index-bo-html': path.resolve(__dirname, 'src/index-bo.html')
  },

  output: {
    filename: '[name]-app.js',
    path: path.resolve(__dirname, '/dist')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [node_modules_dir],
        loader: 'babel-loader?presets[]=es2015,presets[]=react'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.s?[a|c]ss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },

  plugins: [
    new Clean(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.jsx?$/,
      exclude: [node_modules_dir]
    }),
    new webpack.optimize.DedupePlugin()
  ],


  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), precss];
  }
};
