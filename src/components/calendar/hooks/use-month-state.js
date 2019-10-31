import { useState } from 'react';
import {
  areDatesInSameMonth,
  suggestMonthToBeShown
} from '../../../helpers/dates'
import * as DATE_LOCALES from '../../../locales/date';


const useMonthState = ({currentValue, minDate, maxDate, language}) => {
  const { months } = DATE_LOCALES[language];

  const getMonthStateFromDate = (date) => {
    const currentMonth = suggestMonthToBeShown(date, minDate, maxDate);
    return {
      currentMonth,
      currentMonthName: `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
      prevMonthDisabled: minDate && areDatesInSameMonth(currentMonth, minDate),
      nextMonthDisabled: maxDate && areDatesInSameMonth(currentMonth, maxDate),
    }
  };

  const [
    {
      currentMonth,
      currentMonthName,
      prevMonthDisabled,
      nextMonthDisabled
    },
    setMonth
  ] = useState(getMonthStateFromDate(currentValue));

  return {
    currentMonth,
    currentMonthName,
    prevMonthDisabled,
    nextMonthDisabled,
    setMonth: (newValue) => {
      setMonth(getMonthStateFromDate(newValue));
    }
  };
}

export default useMonthState;