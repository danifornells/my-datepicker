const keywords = require('./keywords').KEYWORDS;
const keywordOutput = require('./keywords').OUTPUT;

module.exports = (brand) => ({
  source: [
    'src/foundations/**/!(*.*).json',
    `src/foundations/**/*.${brand}.json`,
    'src/components/**/!(*.tokens.*).json',
    `src/components/**/*.tokens.${brand}.json`,
    'src/assets/**/*.json',
  ],
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: `build/tokens/${brand}/`,
      files: [
        ...keywordOutput(keywords, 'json', 'json'),
        {
          format: 'json',
          destination: 'tokens.json',
        },
        ...keywordOutput(keywords, 'json/nested', 'nested.json'),
        {
          format: 'json/nested',
          destination: 'tokens.nested.json',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: `build/tokens/${brand}/`,
      files: [
        ...keywordOutput(keywords, 'javascript/es6', 'js'),
        {
          format: 'javascript/es6',
          destination: 'tokens.js',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: `build/tokens/${brand}/`,
      files: [
        ...keywordOutput(keywords, 'scss/map-deep', 'scss', true),
        {
          destination: 'tokens.scss',
          format: 'scss/map-deep',
          filter: 'isNotFont',
        },
        {
          destination: 'fonts.scss',
          format: 'scss/font',
          filter: 'isFont',
        },
      ],
    },
    android: {
      transformGroup: 'android',
      buildPath: `build/tokens/${brand}/android/`,
      files: [
        {
          destination: 'font_dimens.xml',
          format: 'android/fontDimens',
        },
        {
          destination: 'colors.xml',
          format: 'android/colors',
        },
      ],
    },
    ios: {
      transformGroup: 'ios',
      buildPath: `build/tokens/${brand}/ios/`,
      files: [
        {
          destination: 'StyleDictionaryColor.h',
          format: 'ios/colors.h',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionaryColor.m',
          format: 'ios/colors.m',
          className: 'StyleDictionaryColor',
          type: 'StyleDictionaryColorName',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.h',
          format: 'ios/static.h',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.m',
          format: 'ios/static.m',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
      ],
    },
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: `build/tokens/${brand}/ios-swift/`,
      files: [
        {
          destination: 'StyleDictionary.swift',
          format: 'ios-swift/class.swift',
          className: 'StyleDictionary',
          filter: {
          },
        },
      ],
    },
    'ios-swift-separate-enums': {
      transformGroup: 'ios-swift-separate',
      buildPath: `build/tokens/${brand}/ios-swift/`,
      files: [
        {
          destination: 'StyleDictionaryColor.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionaryColor',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'StyleDictionarySize.swift',
          format: 'ios-swift/enum.swift',
          className: 'StyleDictionarySize',
          type: 'float',
          filter: {
            attributes: {
              category: 'size',
            },
          },
        },
      ],
    },
    sketch: {
      transforms: ['name/cti/camel', 'attribute/cti', 'color/sketch'],
      buildPath: `build/tokens/${brand}/sketch/`,
      files: [
        {
          destination: 'colors.sketchpalette',
          format: 'sketch/palette/v2',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
      ],
    },
  },
});
