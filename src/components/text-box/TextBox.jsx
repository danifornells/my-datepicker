import React from 'react';
import PropTypes from 'prop-types';
import useInputValue from './hooks/use-input-value';

import STYLES from './TextBox.scss';

const {
  string, bool, func, oneOf,
} = PropTypes;
const c = (className) => STYLES[className] || 'UNKNOWN';

const INPUT_TYPES = [
  'date',
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
];


const TextBox = (props) => {
  const {
    label, className, onBlur, onChange, onFocus, onClick, value, ...inputAttributes
  } = props;
  const classNames = [
    c('TextBox'),
    inputAttributes.disabled ? c('is-disabled') : '',
    className,
  ].join(' ');
  const { currentValue, onChangeHandler } = useInputValue(value, onChange);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className={classNames}>
      {label ? <label htmlFor={inputAttributes.id} className={c('TextBox-label')}>{label}</label> : ''}
      <input {...inputAttributes} className={c('TextBox-input')} value={currentValue} onBlur={onBlur} onChange={onChangeHandler} onFocus={onFocus} onClick={onClick} />
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};


TextBox.propTypes = {
  /** Autocomplete attribute */
  autoComplete: string,
  /** Disabled attribute */
  disabled: bool,
  /** The input ID */
  id: string.isRequired,
  /** Inputmode attribute */
  inputMode: string,
  /** Text Label */
  label: string,
  /** Name attribute */
  name: string.isRequired,
  /** Placeholder attribute */
  placeholder: string,
  /** Readonly attribute */
  readOnly: bool,
  /** Required attribute */
  required: bool,
  /** Type attribute */
  type: oneOf(INPUT_TYPES),
  /** Value attribute */
  value: string,
  /** ClassName/s to be appended */
  className: string,
  /** Invoked when blur (lose focus) */
  onBlur: func,
  /** Invoked when focus on input */
  onFocus: func,
  /** Invoked when change on input */
  onChange: func,
  /** Invoked when click on input */
  onClick: func,
};

TextBox.defaultProps = {
  autoComplete: 'false',
  disabled: false,
  inputMode: 'text',
  label: '',
  placeholder: '',
  readOnly: false,
  required: false,
  type: 'text',
  value: '',
  className: '',
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
  onClick: () => {},
};

export default TextBox;
export {
  INPUT_TYPES,
};
