const path = require('path');
const extractWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  devtool: 'cheap-eval-source-map',
 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: './'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],

      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: './'
          }
        }
      },
    ]
  },

  plugins: [
    new extractWebpackPlugin('style.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};

module.exports = config;