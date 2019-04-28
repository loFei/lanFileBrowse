/**
 * 生产环境配置
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = process.env.NODE_ENV || 'production';

const options = {
  // publicPath: '//www.necatail.com/',
  publicPath: '//192.168.0.103/g/web_videos_app/',
  loaders: {
    styles: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader?modules=true&camelCase=true',
        'postcss-loader',
        'sass-loader',
      ]
    }),
    imageAssets: [
      'url-loader?limit=4096&name=[path][name]-[hash:8].[ext]',
      {
        loader: 'img-loader',
        options: {
          gifsicle: {
            interlaced: false // 替换使用渐进式渲染
          },
          mozjpeg: {
            progressive: true // 创建基准jpeg文件
          },
          optipng: {
            optimizationLevel: 4  // 优化级别(0-7, 值越大压缩越多)
          },
          pngquant: {
            quality: '75-90', // 压缩质量(0-100, 值越高质量越高)
            floyd: 0.5, // 图片抖动值(0-1, 值越高抖动越厉害)
            speed: 2 // 执行速度(0-10, 值越高质量受损)
          },
          svgo: {
            plugins: [
              { removeTitle: true }, //去除标题信息
              { convertPathData: false }  // 转换路径为更短的相对或绝对路径
            ]
          }
        }
      }
    ],
    iconFonts: [{
      loader: 'url-loader',
      query: {
        limit: 10240,
        name: '[path][name]-[hash:8].[ext]'
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
  }
};

module.exports = (args) => {
  options.ROOT_PATH = args.ROOT_PATH;
  options.env = args.env;

  return webpackMerge(require('./base.conf')(options), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      }),
      // 生成独立css文件
      new ExtractTextPlugin({
        filename: 'styles/[name].css'
      }),
    ]
  })
}