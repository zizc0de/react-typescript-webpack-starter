import * as path from 'path';
import dotenv from 'dotenv';

import { Configuration as ServerConfiguration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

dotenv.config();

const isDevelopment: boolean = process.env.ENV === 'development';

const config = {
  name: 'server',
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    server: path.resolve(__dirname, 'src/server/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

export type { ServerConfiguration };

export default config;
