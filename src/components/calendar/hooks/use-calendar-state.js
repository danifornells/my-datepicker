import { useState } from 'react';
import useMonthState from './use-month-state'
import useCalendarDatesState from './use-calendar-dates-state'
import useWeekDaysState from './use-week-days-state'
import {
  dateStringToDate, dateToDateString,
  isValidDateString,
  offsetBy,
} from '../../../helpers/dates'


const useCalendarState = ({value, min, max, language, onDateChange}) => {
  const valueDate = value && isValidDateString(value) ? dateStringToDate(value) : null;
  const minDate = min && isValidDateString(min) ? dateStringToDate(min) : null;
  const maxDate = max && isValidDateString(max) ? dateStringToDate(max) : null;

  const [currentValue, setValue] = useState(valueDate);
  const {
    currentMonth,
    currentMonthName,
    prevMonthDisabled,
    nextMonthDisabled,
    setMonth,
  } = useMonthState({currentValue, minDate, maxDate, language});
  const {
    currentCalendarDates,
    setCalendarDates,
  } = useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language});
  const {
    currentWeekDays,
    setWeekDays,
  } = useWeekDaysState({currentValue, language});

  return {
    currentValue,
    currentMonthName,
    prevMonthDisabled,
    nextMonthDisabled,
    currentCalendarDates,
    currentWeekDays,
    setValue: (newValue) => {
      setValue(newValue);
      setMonth(newValue);
      setCalendarDates(newValue, newValue);
      setWeekDays(newValue);
      onDateChange(dateToDateString(newValue));
    },
    offsetByMonth: (months) => {
      const newMonth = offsetBy(currentMonth, { months });
      setMonth(newMonth);
      setCalendarDates(newMonth, currentValue);
      setWeekDays(newMonth);
    }
  };
}

export default useCalendarState;