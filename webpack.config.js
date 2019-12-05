const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

let _plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebPackPlugin({
    template: path.join(__dirname, 'public/index.html'),
    favicon: path.join(__dirname, 'public/favicon.ico')
  })
]

let _optimization = {}

if (process.env.NODE_ENV === 'production') {
  _plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    ..._plugins
  ]
  _optimization ={
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: _plugins,
  optimization: _optimization,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: 'localhost',
    port: 8080,
    hot: true,
    open: 'Firefox'
  }
}