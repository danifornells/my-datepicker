
/**
 * Converts a string to component name (camelCase, but first char uppercase)
 *
 * @param {String} str - The string to be transformed
 * @return {String} The transformed string
 */

module.exports = (str) => str
    && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
