import { useState } from 'react';
import { getCalendarPageDates, isWeekend, } from '../../../helpers/dates'
import * as DATE_LOCALES from '../../../locales/date';


const useWeekDaysState = ({currentValue, language}) => {
  const { firstDay, weekdaysShort } = DATE_LOCALES[language];

  const getWeekDayState = (date) => ({
    weekDayName: weekdaysShort[date.getDay()],
    isOnWeekend: isWeekend(date),
  });

  const getWeekDaysState = (currentValue) => {
    return getCalendarPageDates(currentValue, firstDay)
      .slice(0,7).map(date => getWeekDayState(date))
  };

  const [currentWeekDays, setWeekDays] = useState(getWeekDaysState(currentValue));

  return {
    currentWeekDays,
    setWeekDays: (newValue) => {
      setWeekDays(getWeekDaysState(newValue));
    }
  };
}

export default useWeekDaysState;