import React from 'react';
import PropTypes from 'prop-types';
import STYLES from './Calendar.scss';

const { bool, func, number } = PropTypes;
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

CalendarDate.propTypes = {
  dateNumber: number.isRequired,
  isFromAnotherMonth: bool,
  isSelected: bool,
  isDisabled: bool,
  onClick: func,
};

CalendarDate.defaultProps = {
  isFromAnotherMonth: false,
  isSelected: false,
  isDisabled: false,
  onClick: () => {},
};

export default CalendarDate;
