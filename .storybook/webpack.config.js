/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const brand = require('./../.tasks/brand-resolver');
const sassBrandImporter = require('../.tasks/helpers/sass-brand-importer');

// Configure css-loader to disable CSS modules transformations
const customCssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      localIdentName: '[local]',
    },
  },
};

// Configure sass-loader to resolve current brand imports
const customSassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      importer: sassBrandImporter(brand),
    },
  },
};

// Extend Storybook webpack configuration
module.exports = async ({ config }) => {
  // Enable styles processing (mainly SASS, POSTCSS)
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', customCssLoader, 'postcss-loader', customSassLoader],
    include: path.resolve(__dirname, '../'),
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      WEBPACK_BRAND: JSON.stringify(brand),
    }),
  );

  return config;
};
