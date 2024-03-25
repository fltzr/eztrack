const { join } = require('path');
const { NxWebpackPlugin } = require('@nx/webpack');
//@ts-check
/** @type {import('webpack-cli').ConfigOptions} */
module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'swc',
      main: './src/server.ts',
      tsConfig: './tsconfig.app.json',
      optimization: process.env.NODE_ENV === 'production',
      outputHashing: 'none',
    }),
  ],
};
