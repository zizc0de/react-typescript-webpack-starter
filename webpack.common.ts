import * as path from 'path';
import dotenv from 'dotenv';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import {
  Configuration as WebpackConfiguration,
  EnvironmentPlugin,
  ProvidePlugin,
} from 'webpack';

import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

let envKeys: string[] = [];

const env = dotenv.config({ path: './.env-client' }).parsed;

if (env) {
  const stringOfEnv = JSON.stringify(env);
  envKeys = JSON.parse(stringOfEnv);
}

const config: Configuration = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/chunk-[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: process.env.STATIC_URI || '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/client',
      },
    }),
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new EnvironmentPlugin(Object.keys(envKeys)),
  ],
};

export type { Configuration };

export default config;
