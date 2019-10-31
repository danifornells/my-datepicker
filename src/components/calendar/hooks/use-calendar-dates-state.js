import { useState } from 'react';
import {
  areDatesInSameDay,
  areDatesInSameMonth,
  getCalendarPageDates,
  isAfter,
  isBefore,
} from '../../../helpers/dates'
import * as DATE_LOCALES from '../../../locales/date';


const useCalendarDatesState = ({currentMonth, currentValue, minDate, maxDate, language}) => {
  const { firstDay } = DATE_LOCALES[language];

  const getCalendarDateState = (date, currentMonth, currentValue) => {
    const isFromAnotherMonth = !areDatesInSameMonth(date, currentMonth);
    const isSelected = (currentValue && areDatesInSameDay(date, currentValue));
    const isDisabled = !!((
      isFromAnotherMonth
    ) || (
      minDate
      && areDatesInSameMonth(minDate, currentMonth)
      && isBefore(date, minDate)
    ) || (
      maxDate
      && areDatesInSameMonth(maxDate, currentMonth)
      && isAfter(date, maxDate)
    ));
    return {
      date,
      dateNumber: date.getDate(),
      dateTime: date.getTime(),
      isFromAnotherMonth,
      isSelected,
      isDisabled,
    }
  };

  const getCalendarDatesState = (currentMonth, currentValue) => {
    return getCalendarPageDates(currentMonth, firstDay)
      .map(date => getCalendarDateState(date, currentMonth, currentValue))
  };

  const [currentCalendarDates, setCalendarDates] = useState(getCalendarDatesState(currentMonth, currentValue));

  return {
    currentCalendarDates,
    setCalendarDates: (newMonth, newValue) => {
      setCalendarDates(getCalendarDatesState(newMonth, newValue));
    }
  };
}

export default useCalendarDatesState;