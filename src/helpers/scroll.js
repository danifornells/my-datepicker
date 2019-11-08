import { getStyle } from './css';

const DOCUMENT_SCROLLING_ELEMENT = document.scrollingElement || document.documentElement;

/**
 * disableScroll
 *
 * Forces/cancels overflow hidden for an element, which disables scrolling
 *
 * @param {HTMLElement}  el - The Element where to disable scroll, 'document' by default
 * @param {Boolean}      [cancel=false] - If true, will cancels the overflow hidden rule
 */
const disableScroll = (
  el = DOCUMENT_SCROLLING_ELEMENT,
  cancel = false,
) => {
  /* eslint-disable no-param-reassign */
  el.style.overflow = cancel ? null : 'hidden';
  /* eslint-enable no-param-reassign */
};

/**
 * smoothScroll
 *
 * Scroll smoothly to a coordinate target
 *
 * @param {Object}       options
 * @param {HTMLElement}  [options.el]            - The Element where to perform scroll, 'document'
 *                                                 by default
 * @param {Number}       [options.x]             - X coordinate target, if null will respect
 *                                                 current value
 * @param {number}       [options.y]             - Y coordinate target, if null will respect
 *                                                 current value
 * @param {number}       [options.duration=200]  - Scroll duration in ms (only applies if
 *                                                 'scroll-behavior:smooth' is not supported or
 *                                                 disabled)
 */
const SMOOTH_SCROLL_DEFAULTS = {
  el: DOCUMENT_SCROLLING_ELEMENT,
  duration: 200,
};
const smoothScroll = (options = {}) => {
  // Merge defaults and respect current coordinates if are not provided
  const config = {
    ...SMOOTH_SCROLL_DEFAULTS,
    ...options,
  };
  config.x = typeof config.x === 'number' ? config.x : config.el.scrollLeft;
  config.y = typeof config.y === 'number' ? config.y : config.el.scrollTop;
  const {
    el, x, y, duration,
  } = config;

  // Use native smooth scroll if available and enabled (break if happens)
  const hasSmoothScrollEnabled = getStyle(el, 'scroll-behavior') === 'smooth';
  if (hasSmoothScrollEnabled && el.scrollTo) {
    el.scrollTo(x, y);
    return;
  } if (hasSmoothScrollEnabled) {
    el.scrollLeft = x;
    el.scrollTop = y;
    return;
  }

  // Perform manual scroll scheduling frames
  const currentCoordinates = [
    el.scrollLeft,
    el.scrollTop,
  ];
  const distances = [
    x - currentCoordinates[0],
    y - currentCoordinates[1],
  ];
  let start;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percentage = Math.min(time / duration, 1);
    const stepCoordinates = [
      currentCoordinates[0] + (distances[0] * percentage),
      currentCoordinates[1] + (distances[1] * percentage),
    ];
    if (el.scrollTo) {
      el.scrollTo(...stepCoordinates);
    } else {
      [el.scrollLeft, el.scrollTop] = stepCoordinates;
    }
    if (time < duration) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};


export {
  DOCUMENT_SCROLLING_ELEMENT,
  smoothScroll,
  disableScroll,
};
