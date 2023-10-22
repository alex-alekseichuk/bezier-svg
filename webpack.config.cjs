const path = require('path');
// import path from 'node:path';

module.exports = {
  entry: './src/browser/bezier-back.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
