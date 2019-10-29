const { isNotFont } = require('./filters');

const KEYWORDS = ['foundation', 'calendar', 'popover'];

const getFiltersFromKeywords = (keywords) => (
  /* eslint-disable no-param-reassign */
  keywords.reduce((obj, keyword) => {
    obj[`keyword/${keyword}`] = (prop) => prop.path.includes(keyword);
    obj[`keyword/${keyword}-no-fonts`] = (prop) => prop.path.includes(keyword) && isNotFont(prop);
    return obj;
  }, {})
  /* eslint-enable no-param-reassign */
);

const getOutputFromKeywords = (keywords, format, extension, excludeFonts = false) => (
  keywords.map((keyword) => ({
    format,
    destination: `tokens.${keyword}.${extension}`,
    filter: excludeFonts
      ? `keyword/${keyword}-no-fonts`
      : `keyword/${keyword}`,
  }))
);

module.exports = {
  FILTERS: getFiltersFromKeywords,
  OUTPUT: getOutputFromKeywords,
  KEYWORDS,
};
