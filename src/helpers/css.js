/* eslint-disable import/prefer-default-export */

/**
 * getStyle
 * Returns the style for specific element and property
 *
 * @param {HTMLElement} el
 * @param {String} prop - CSS property to check
 * @returns {String} propValue - CSS computed value for given property
 */
const getStyle = (el, prop) => (el.currentStyle
  ? el.currentStyle[prop]
  : document.defaultView.getComputedStyle(el, null).getPropertyValue(prop));

export {
  getStyle,
};
