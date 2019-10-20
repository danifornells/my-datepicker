import PropTypes from 'prop-types';

const { bool, func, number } = PropTypes;

const CalendarDatePropTypes = {
  dateNumber: number.isRequired,
  isFromAnotherMonth: bool,
  isSelected: bool,
  isDisabled: bool,
  onClick: func,
};

export default CalendarDatePropTypes;
