const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: { main: './src/scripts/pages/index.ts'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: '/node_modules/',
    },
    // {
    //   test: /\.js$/,
    //   use: 'babel-loader',
    //   exclude: '/node_modules/'
    // },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      type: 'asset/resource',
      generator: {
        filename: 'images/[name].[hash][ext]'
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name].[hash][ext]'
      }
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {importLoaders: 1}
      }, 'postcss-loader']
    },
  ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin(),
  ],
}
