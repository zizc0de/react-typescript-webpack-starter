import { merge } from 'webpack-merge';
import common from './webpack.common';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 20,
      minSize: {
        javascript: 10000, // 10KB
        'css/mini-extra': 10000,
      },
      maxSize: 30000, // 30KB
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({}), // minify the css
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // It will drop all the console.log statements from the final production build
          },
          compress: {
            drop_console: true, // It will stop showing any console.log statement in dev tools. Make it false if you want to see consoles in production mode.
          },
        },
        extractComments: false,
        exclude: [], // If you want to exclude any files so that it doesn't get minified.
      }),
    ],
  },
});

export default config;
