const defaultBrand = Object.keys(require('./../../.brands.json'))[0];

/**
 * Custom SASS importer to replace default brand imports by provided brand
 */
const sassBrandImporter = (brand) => (url, prev, done) => {
  done({ file: url.replace(defaultBrand, brand) });
};

module.exports = sassBrandImporter;
