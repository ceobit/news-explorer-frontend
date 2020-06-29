const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminJpegtran = require('imagemin-jpegtran');
const ImageminOptipng = require('imagemin-optipng');
const ImageminSvgo = require('imagemin-svgo');

module.exports = {
  entry: {
    main: ['@babel/polyfill', './src/bundles/index.js'],
    account: ['@babel/polyfill', './src/bundles/account.js'],
  },
  output: {
    filename: '[name]/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: './src/pages/index.html',
      filename: './index.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: true //Минимифицируем index.html
      }
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: './src/pages/account/account.html',
      filename: './account.html',
      chunks: ['account'],
      minify: {
        collapseWhitespace: true //Минимифицируем account.html
      }
    }),
    //Чистим папку dist после изменений
    new CleanWebpackPlugin(),
    //Чтобы css формировался в отдельном файле
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash].css',
    }),
    //Оптимизация css
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    //Оптимизация изображений
    new ImageminPlugin({
      bail: false,
      imageminOptions: {
        plugins: [
          ImageminJpegtran({
            progressive: true
          }),
          ImageminOptipng({
            optimizationLevel: 5
          }),
          ImageminSvgo({
            removeViewBox: true
          })
        ]
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader', 'postcss-loader'
        ]
      },
      {// Сжимаем картинки
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
          {
            loader: 'image-webpack-loader',
            options: {
              esModule: false
            },
          },
        ]
      },
      {// Учим Webpack понимать шрифты
        test: /\.(ttf|woff2|woff)$/,
        use: ['file-loader?name=./fonts/[name].[ext]'] // указали папку, куда складывать шрифты
      },
      //babel для поддержки старых браузеров
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  // Автообновление в браузере
  devServer: {
    port: 5490
  }
};