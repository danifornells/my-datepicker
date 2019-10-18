import PropTypes from 'prop-types';

const { oneOf, string } = PropTypes;

const ICON_SIZES = {
  small: 12,
  medium: 24,
  large: 48,
};

const IconPropTypes = {
  size: oneOf(Object.keys(ICON_SIZES)),
  className: string,
};

export default IconPropTypes;
export { ICON_SIZES };
