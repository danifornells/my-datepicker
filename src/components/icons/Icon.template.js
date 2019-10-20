const templateHeading = require('./../../../.tasks/helpers/template-heading');

/**
 * Template to render Icon component
 *
 * @param {AvailableIcon} icon - The icon data
 * @return {String} The fulfilled template
 */

module.exports = (icon) => `
/*
${templateHeading}
*/

import React from 'react';
import IconPropTypes, { ICON_SIZES } from './Icon.prop-types';
import '../../styles/base.scss';
import STYLES from './Icon.scss';

const c = (className) => STYLES[className] || 'UNKNOWN';

const ${icon.componentName} = ({
  size,
  className,
}) => {
  const sizeValue = ICON_SIZES[size];
  const classNames = [
    c('Icon'),
    className,
  ].join(' ');
  /* eslint-disable */
  return (
    <svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" className={classNames} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      ${icon.svgData}
    </svg>
  );
  /* eslint-enable */
};

${icon.componentName}.propTypes = IconPropTypes;

${icon.componentName}.defaultProps = {
  size: 'medium',
  className: '',
};

export default ${icon.componentName};
`;
