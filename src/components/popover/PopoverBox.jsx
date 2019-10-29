import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import useCloseRequest from './hooks/use-close-request';
import STYLES from './Popover.scss';

/* eslint-disable import/no-dynamic-require, no-undef */
const TOKENS = require(`../../../build/tokens/${WEBPACK_BRAND}/tokens.popover.json`);
const TRANSITION_TIME = TOKENS.time.transition.popover.box.original.value;
const FLOATS_FROM_BREAKPOINTS = TOKENS.config.floatsFrom.popover.box.value;
/* eslint-enable import/no-dynamic-require, no-undef */

const {
  string, node, bool, func, oneOf,
} = PropTypes;
const c = (className) => STYLES[className] || 'UNKNOWN';
const TRANSITION_CLASSNAMES = {
  appear: 'is-going-to-appear',
  appearActive: 'is-appearing',
  appearDone: 'had-appeared',
  enter: 'is-going-to-enter',
  enterActive: 'is-entering',
  enterDone: 'had-entered',
  exit: 'is-going-to-exit',
  exitActive: 'is-exiting',
  exitDone: 'had-exited',
};


const PopoverBox = (props) => {
  const {
    open, floatsFrom, children, className, onCloseRequest,
  } = props;
  const innerRef = useRef(null);
  useCloseRequest(onCloseRequest, innerRef, open);
  const classNames = [
    c('PopoverBox'),
    c(`floats-from-${floatsFrom}`),
    className,
  ].join(' ');
  return (
    <CSSTransition
      in={open}
      timeout={TRANSITION_TIME}
      mountOnEnter
      unmountOnExit
      appear={open}
      classNames={TRANSITION_CLASSNAMES}
    >
      <div className={classNames} ref={innerRef}>
        {children}
      </div>
    </CSSTransition>
  );
};


PopoverBox.propTypes = {
  /** Will render as opened if true */
  open: bool,
  /** Will float from given breakpoint */
  floatsFrom: oneOf(FLOATS_FROM_BREAKPOINTS),
  /** Children */
  children: node,
  /** ClassName/s to be appended */
  className: string,
  /** Invoked when close is requested by ESC key or outer click */
  onCloseRequest: func,
};

PopoverBox.defaultProps = {
  open: false,
  floatsFrom: 'xs',
  children: null,
  className: '',
  onCloseRequest: () => {},
};

export default PopoverBox;
