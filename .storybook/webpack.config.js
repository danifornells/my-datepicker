const path = require('path');

// Extend Storybook webpack configuration
module.exports = async ({ config }) => {
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

  // Enable styles processing (mainly SASS, POSTCSS)
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', customCssLoader, 'postcss-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  return config;
};
