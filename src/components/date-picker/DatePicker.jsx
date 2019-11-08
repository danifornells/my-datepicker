import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';

import TextBox from '../text-box/TextBox';
import PopoverWrapper from '../popover/PopoverWrapper';
import PopoverBox from '../popover/PopoverBox';
import Calendar from '../calendar/Calendar';
import optionalDateString from '../../prop-types/optional-date-string';
import useDateState from './hooks/use-date-state';
import useOpenState from './hooks/use-open-state';
import useEnsureTextBoxVisibility from './hooks/use-ensure-text-box-visibility'
import * as DATE_LOCALES from '../../locales/date';

const {
  string, bool, func, oneOf,
} = PropTypes;

const DATE_FORMATS = [
  'dateString',
  'humanized',
];

const DatePicker = (props) => {
  const {
    id, disabled, label, name, placeholder,
    required, min, max, value, language,
    dateFormat, onOpen, onClose,
    onChange,
  } = props;
  const [isOpened, setOpen] = useOpenState(false, onOpen, onClose);
  const [popoverBoxRef, setPopoverBoxRef] = useState(null);
  const rootElementRef = useRef(null);
  useEnsureTextBoxVisibility(isOpened, rootElementRef, popoverBoxRef);
  const {
    currentDate,
    currentDateToShow,
    setDate,
  } = useDateState(
    value,
    dateFormat,
    language,
    onChange,
    setOpen,
  );

  return (
    <div ref={rootElementRef}>
      <PopoverWrapper>
        <TextBox
          id={id}
          disabled={disabled}
          label={label}
          name={name}
          placeholder={placeholder}
          required={required}
          readOnly
          value={currentDateToShow}
          key={`${id}-${currentDate}`}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
        />
        <PopoverBox
          open={isOpened}
          contentCentered
          onCloseRequest={() => setOpen(false)}
          onRefResolved={setPopoverBoxRef}
        >
          <Calendar
            min={min}
            max={max}
            value={currentDate}
            language={language}
            onDateChange={(date) => setDate(date)}
          />
        </PopoverBox>
      </PopoverWrapper>
    </div>
  );
};


DatePicker.propTypes = {
  /** TextBox input ID */
  id: string.isRequired,
  /** TextBox disabled prop */
  disabled: bool,
  /** TextBox label prop */
  label: string,
  /** TextBox input name attribute */
  name: string.isRequired,
  /** TextBox placeholder prop */
  placeholder: string,
  /** TextBox required prop */
  required: bool,
  /** Min date as DateString */
  min: optionalDateString,
  /** Max date as DateString */
  max: optionalDateString,
  /** Current date as DateString */
  value: optionalDateString,
  /** Language will set locale settings */
  language: oneOf(Object.keys(DATE_LOCALES)),
  /** Displayed date format */
  dateFormat: oneOf(DATE_FORMATS),
  /** Invoked when open */
  onOpen: func,
  /** Invoked when close */
  onClose: func,
  /** Invoked when change */
  onChange: func,
};

DatePicker.defaultProps = {
  disabled: false,
  label: '',
  placeholder: '',
  required: false,
  min: '',
  max: '',
  value: '',
  language: 'en',
  dateFormat: 'humanized',
  onOpen: () => {},
  onClose: () => {},
  onChange: () => {},
};

export default DatePicker;
export { DATE_FORMATS };
