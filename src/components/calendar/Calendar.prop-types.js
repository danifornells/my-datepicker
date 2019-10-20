import PropTypes from 'prop-types';
import { isValidDateString } from '../../helpers/dates';
import * as calendarLocales from './Calendar.locales';

const { string, oneOf, func } = PropTypes;


/**
 * Custom PropType validation for DateString
 * - Check if it's a string
 * - Check if can be converted to a date, and it's valid
 */
const OPTIONAL_DATESTRING = (props, propName, componentName) => {
  const date = props[propName];
  if (date === '' || date === null || typeof date === 'undefined') return null;
  return (typeof date !== 'string' || !isValidDateString(date))
    ? new Error(
      `Given '${date}' seems to be an invalid prop ${propName} supplied to ${componentName}. `,
      'A valid dateString (YYYY-MM-DD) is expected.',
    )
    : null;
};


const CalendarPropTypes = {
  min: OPTIONAL_DATESTRING,
  max: OPTIONAL_DATESTRING,
  value: OPTIONAL_DATESTRING,
  className: string,
  language: oneOf(Object.keys(calendarLocales)),
  onDateChange: func,
};

export default CalendarPropTypes;
