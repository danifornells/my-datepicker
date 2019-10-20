import React from 'react';
import STYLES from './Calendar.scss';
import CalendarDatePropTypes from './CalendarDate.prop-types';

const c = (className) => STYLES[className] || 'UNKNOWN';

const CalendarDate = ({
  dateNumber, isFromAnotherMonth, isSelected, isDisabled, onClick,
}) => {
  const classNames = [
    c('Calendar-date'),
    isFromAnotherMonth ? c('is-from-another-month') : '',
    isSelected ? c('is-selected') : '',
  ].join(' ');
  return (
    <button
      className={classNames}
      type="button"
      disabled={isDisabled}
      onClick={onClick}
    >
      {dateNumber}
    </button>
  );
};

CalendarDate.propTypes = CalendarDatePropTypes;

CalendarDate.defaultProps = {
  isFromAnotherMonth: false,
  isSelected: false,
  isDisabled: false,
};

export default CalendarDate;
