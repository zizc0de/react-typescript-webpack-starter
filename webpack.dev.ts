import * as path from 'path';
import * as dotenv from 'dotenv';

import { merge } from 'webpack-merge';

import commonWebpackConfiguration, { Configuration } from './webpack.common';

dotenv.config({ path: './.env-dev' });

const { HOST, PORT, PROXY_HOST, PROXY_PORT } = process.env;

const config: Configuration = merge(commonWebpackConfiguration, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: HOST,
    port: Number(<string>PORT),
    static: path.join(__dirname, 'dist', 'client'),
    compress: true,
    historyApiFallback: true,
    watchFiles: ['./src/client/*'],
    proxy: {
      '/api/**': {
        target: `http://${PROXY_HOST}:${PROXY_PORT}`,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});

export default config;
