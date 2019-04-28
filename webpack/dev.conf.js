/**
 * 开发环境配置
 */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const PUBLIC_PATH = '/assets/';
const PORT = '10012';
const ENV = process.env.NODE_ENV || 'dev';

const options = {
  publicPath: PUBLIC_PATH,
  loaders: {
    styles: ['style-loader', 'css-loader?modules=true&camelCase=true', 'postcss-loader', 'sass-loader'],
    imageAssets: 'url-loader?limit=4096&name=[path][name].[ext]?[hash:8]',
    iconFonts: [{
      loader: 'url-loader',
      query: {
        limit: 10240,
        name: '[path][name].[ext]?[hash:8]'
      }
    }]
  },
  globals: {
    'process.env': {
      'NODE_ENV': JSON.stringify(ENV)
    },
    '__DEV__': ENV === 'dev',
    '__PROD__': ENV === 'production',
    '__TEST__': ENV === 'test'
  },
  beforePlugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
module.exports = (args) => {
  options.ROOT_PATH = args.ROOT_PATH;
  options.env = args.env;

  return webpackMerge(require('./base.conf')(options), {
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(args.ROOT_PATH, './src'),
      historyApiFallback: true,
      inline: true,
      hot: true,
      port: PORT,
      host: '0.0.0.0',
      proxy: {
        '/': {
          bypass: (req, res, proxyOptions) => {
            console.log('Skipping proxy for browser request.');
            return `${ PUBLIC_PATH }index.html`;
          }
        }
      }
    },
    plugins: []
  })
}