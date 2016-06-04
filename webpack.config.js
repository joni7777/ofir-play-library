var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var webpack = require('webpack');

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
        loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react'],
        test: /\.jsx?$/,
        exclude: /node_modules/
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
          'image-webpack?bypassOnDebug=false&optimizationLevel=0&interlaced=false&speed=10'
        ]
      },
    ]
  },

  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ios 6', 'android 4'] }), precss];
  }
};
