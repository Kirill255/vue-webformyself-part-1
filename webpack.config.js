var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // используется или file-loader для обычной загрузки файлов как есть, ИЛИ (тоесть не сразу оба, хотя можно и сразу оба, но для разных форматов) его БОЛЕЕ ПРОДВИНУТАЯ ВЕРСИЯ url-loader, который позволяет вставлять файлы как base-64 ссылки если они меньше указанного размера, а если не меньше, то просто вставляет как обычно КАК file-loader, это касается только одинаковых паттернов, тоесть нельзя писать например png и в file-loader и в url-loader одновременно, или туда или туда, если какие-то файлы вам намеренно не нужно трансформировать в base-64, независимо от размера, то для них можно использовать file-loader
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]',
      //     // outputPath: 'assets/'
      //   }
      // },
      // короткая запись как я понял
      // {
      //   test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
      //   loader: 'url-loader?limit=10000'
      // },
      // расширенная
      {
        test: /\.(png|jpe?g|gif|woff2?|eot|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              // limit: 300,
              name: '[name].[ext]?[hash]', // это конечный путь, незабываем про publicPath /dist/logo.png?hash
              // name: 'assets/images/[name].[ext]?[hash]', // /dist/assets/images/logo.png?hash
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
