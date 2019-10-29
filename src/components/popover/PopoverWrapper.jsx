import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './Popover.scss';

const { string, node } = PropTypes;
const c = (className) => STYLES[className] || 'UNKNOWN';

const PopoverWrapper = (props) => {
  const { children, className } = props;
  const classNames = [c('PopoverWrapper'), className].join(' ');
  return (
    <div className={classNames}>
      {children}
    </div>
  );
};


PopoverWrapper.propTypes = {
  /** Children */
  children: node,
  /** ClassName/s to be appended */
  className: string,
};

PopoverWrapper.defaultProps = {
  children: null,
  className: '',
};

export default PopoverWrapper;
