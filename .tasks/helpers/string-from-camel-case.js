
/**
 * Converts a string from camelCase (separator configurable)
 *
 * @param {String} str - The string to be transformed
 * @return {String} The transformed string
 */

module.exports = (str, separator = '-') => (
  str
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase()
);
