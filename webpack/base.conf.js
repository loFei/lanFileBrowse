/**
 * webpack基础配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (options) => {
  const PUBLIC_PATH = options.publicPath || '/assets/';
  const ROOT_PATH = options.ROOT_PATH;
  const entry = ['./index.js'];

  return {
    name: 'browser',
    context: path.resolve(ROOT_PATH, 'src/'),
    entry: {
      app: options._DEV_ ? entry.concat(`webpack-hot-middleware/client?path=${ PUBLIC_PATH }__webpack_hmr`) : entry
    },
    output: {
      publicPath: PUBLIC_PATH,
      filename: 'scripts/[name].js',
      path: path.resolve(ROOT_PATH, 'dist/'),
      chunkFilename: '[name].js'
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            'cacheDirectory': true
          }
        },
        {
          // 单独处理antd样式
          test: /\.css$/,
          loader: ['style-loader', 'css-loader'],
          include: /node_modules/
        },
        {
          test: /\.s?[ac]ss$/,
          use: options.loaders.styles,
          exclude: /node_modules/
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: options.loaders.imageAssets
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules/'
      ],
      alias: {
        'entryHtml$': path.resolve(ROOT_PATH, 'src/index.html'),
        api: path.resolve(ROOT_PATH, 'src/api/'),
        components: path.resolve(ROOT_PATH, 'src/components/'),
        config: path.resolve(ROOT_PATH, 'src/config/'),
        constants: path.resolve(ROOT_PATH, 'src/constants/'),
        containers: path.resolve(ROOT_PATH, 'src/containers/'),
        helper: path.resolve(ROOT_PATH, 'src/helper/'),
        middlewares: path.resolve(ROOT_PATH, 'src/middlewares/'),
        routes: path.resolve(ROOT_PATH, 'src/routes/'),
        services: path.resolve(ROOT_PATH, 'src/services/'),
        store: path.resolve(ROOT_PATH, 'src/store/'),
        styles: path.resolve(ROOT_PATH, 'src/styles/')
      },
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: (options.beforePlugins || []).concat([
      new webpack.DefinePlugin(options.globals),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: path.resolve(ROOT_PATH, 'src/index.html'),
        hash: false,
        favicon: path.resolve(ROOT_PATH, 'public/favicon.ico'),
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true,
        },
      }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]),
    externals: [
      {
        'highlight': 'hljs'
      },
      // NodeExternals()
    ]
  }
};