
/**
 * A date expressed as "YYYY-MM-DD" string
 * @global
 * @typedef {String} DateString
 */


/**
 * Checks if given date is a Date
 *
 * @param {Date} date
 *
 * @returns {Boolean}
 */
const isDate = (date) => (date && typeof date.getMonth === 'function');


/**
 * Checks if given date is a valid Date
 * - Invalid dates could be the ones created with unreal values, like: '2019-09-99'
 *
 * @param {Date} date
 *
 * @returns {Boolean}
 */
const isValidDate = (date) => (
  isDate(date) && !isNaN(date.getTime()) // eslint-disable-line no-restricted-globals
);

/**
 * Ensures DateString|Date is returned as a Date
 *
 * @param {Date|DateString} date
 *
 * @returns {Date}
 */
const dateStringToDate = (date) => {
  if (isDate(date)) return date;
  return new Date(date);
};

/**
 * Checks if given dateString gonna be a valid Date
 *
 * @param {DateString} date
 *
 * @returns {Boolean}
 */
const isValidDateString = (date) => (
  typeof date === 'string'
  && date.length === 10
  && isValidDate(dateStringToDate(date))
);

/**
 * Convert a Date to a DateString in ISO format (YYYY-MM-DD)
 *
 * @param {Date} date
 *
 * @returns {DateString} The date in ISO format (YYYY-MM-DD).
 */
const dateToDateString = (date) => {
  if (!isDate(date)) return '';
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return [date.getFullYear(),
    (mm > 9 ? mm : `0${mm}`),
    (dd > 9 ? dd : `0${dd}`),
  ].join('-');
};


/**
 * Returns first and last date in current month for a given date.
 *
 * @param {Date|DateString} date
 *
 * @returns {Date[]} A dates array with first and last dates in current month.
 */
const getMonthEdges = (date) => {
  const dateAsDate = dateStringToDate(date);
  return [
    new Date(dateAsDate.getFullYear(), dateAsDate.getMonth(), 1),
    new Date(dateAsDate.getFullYear(), dateAsDate.getMonth() + 1, 0),
  ];
};


/**
 * Check if both given dates are on same year
 *
 * @param {Date|DateString} date1
 * @param {Date|DateString} date2
 *
 * @returns {Boolean}
 */
const areDatesInSameYear = (date1, date2) => {
  const datesAsDates = [
    dateStringToDate(date1),
    dateStringToDate(date2),
  ];
  return datesAsDates[0].getFullYear() === datesAsDates[1].getFullYear();
};

/**
 * Check if both given dates are on same month, and year
 *
 * @param {Date|DateString} date1
 * @param {Date|DateString} date2
 *
 * @returns {Boolean}
 */
const areDatesInSameMonth = (date1, date2) => {
  const datesAsDates = [
    dateStringToDate(date1),
    dateStringToDate(date2),
  ];
  return areDatesInSameYear(...datesAsDates)
    && datesAsDates[0].getMonth() === datesAsDates[1].getMonth();
};


/**
 * Check if both given dates are on same day, month, and year
 *
 * @param {Date|DateString} date1
 * @param {Date|DateString} date2
 *
 * @returns {Boolean}
 */
const areDatesInSameDay = (date1, date2) => {
  const datesAsDates = [
    dateStringToDate(date1),
    dateStringToDate(date2),
  ];
  return areDatesInSameYear(...datesAsDates)
    && areDatesInSameMonth(...datesAsDates)
    && datesAsDates[0].getDate() === datesAsDates[1].getDate();
};

/**
 * Returns a consecutive dates array in between given two dates.
 *
 * @param {Date|DateString} initialDate
 * @param {Date|DateString} finalDate
 *
 * @returns {Date[]} A dates array filled with missing days gaps.
 */
const getConsecutivePeriod = (initialDate, finalDate) => {
  const initialAsDate = dateStringToDate(initialDate);
  const finalAsDate = dateStringToDate(finalDate);
  const days = [];
  const newDay = new Date(initialAsDate);
  while (newDay.getTime() <= finalAsDate.getTime()) {
    days.push(new Date(newDay));
    newDay.setDate(newDay.getDate() + 1);
  }
  return days;
};

/**
 * Returns the dates to be displayed into a calendar page, from a given date
 * - Includes same week but different month days to fill the gaps
 *
 * @param {Date|DateString} date
 * @param {Number} firstDay - First day of the week, 0:sunday, 1:monday, ...
 *
 * @returns {Date[]} A dates array to fill a month page.
 */
const getCalendarPageDates = (date, firstDay = 0) => {
  const calendarEdges = getMonthEdges(date);
  const lastDay = (firstDay + 6) % 7;
  // Set first date to match firstDay
  while (calendarEdges[0].getDay() !== firstDay) {
    calendarEdges[0].setDate(calendarEdges[0].getDate() - 1);
  }
  // Set last date to match lastDay
  while (calendarEdges[1].getDay() !== lastDay) {
    calendarEdges[1].setDate(calendarEdges[1].getDate() + 1);
  }
  return getConsecutivePeriod(...calendarEdges);
};

/**
 * Returns a date, adding or subtracting N days to a given date
 *
 * @param {Date|DateString} date,
 * @param {Object<String, Number>} offsetValues - Whatever needs to be added, like:
 * {
 *   years: 1,
 *   days: -10
 * }
 *
 * @returns {Date} New resulting date
 */
const OFFSET_OPTIONS = {
  years: 'FullYear',
  months: 'Month',
  days: 'Date',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
};
const offsetBy = (date, offsetValues) => {
  const newDate = new Date(dateStringToDate(date).getTime());
  Object.entries(OFFSET_OPTIONS).forEach(([unit, func]) => {
    if (offsetValues[unit] !== undefined && typeof offsetValues[unit] === 'number') {
      newDate[`set${func}`](newDate[`get${func}`]() + offsetValues[unit]);
    }
  });
  return newDate;
};

/**
 * Returns true if given date is weekend (Sat/Sun).
 *
 * @param {Date|DateString} date
 *
 * @returns {Boolean}
 */
const isWeekend = (date) => {
  const dateAsDate = dateStringToDate(date);
  const weekDay = dateAsDate.getDay();
  return (weekDay === 0 || weekDay === 6);
};

/**
 * Returns true if first given date is before second one.
 * Time is not considered
 *
 * @param {Date|DateString} checkDate
 * @param {Date|DateString} referenceDate
 *
 * @returns {Boolean}
 */
const isBefore = (checkDate, referenceDate) => {
  const checkAsDate = dateStringToDate(checkDate);
  const referenceAsDate = dateStringToDate(referenceDate);
  return !areDatesInSameDay(checkAsDate, referenceAsDate) && checkAsDate < referenceAsDate;
};

/**
 * Returns true if first given date is after second one.
 * Time is not considered
 *
 * @param {Date|DateString} checkDate
 * @param {Date|DateString} referenceDate
 *
 * @returns {Boolean}
 */
const isAfter = (checkDate, referenceDate) => {
  const checkAsDate = dateStringToDate(checkDate);
  const referenceAsDate = dateStringToDate(referenceDate);
  return !areDatesInSameDay(checkAsDate, referenceAsDate) && checkAsDate > referenceAsDate;
};

/**
 * Given a scenario where we may know a value, minDate and maxDate (all optional),
 * returns the first date of month fits better, to be shown into a calendar.
 *
 * - Given value will fit in case it's provided, and:
 *   - It's after or same day as min
 *   - It's before or same day as max
 *
 * - MinDate will fit in case it's provided, and:
 *   - It's after or same day as today
 *
 * - MaxDate will fit in case it's provided, and:
 *   - It's before or same day as today
 *   - No MinDate has been provided
 *
 * - All other cases will be resolved by returning today
 *
 * @param {Date|DateString|null} [value] - The date supposed to be shown
 * @param {Date|DateString|null} [min] - The minimum date supported
 * @param {Date|DateString|null} [max] - The maximum date supported
 *
 * @returns {Date} - The first day of the month fits better to be shown.
 */
const suggestMonthToBeShown = (value, min, max) => {
  const valueDate = value ? dateStringToDate(value) : null;
  const minDate = min ? dateStringToDate(min) : null;
  const maxDate = max ? dateStringToDate(max) : null;
  const today = new Date();
  const result = (() => {
    if (valueDate
      && (!minDate || isAfter(valueDate, minDate) || areDatesInSameDay(valueDate, minDate))
      && (!maxDate || isBefore(valueDate, maxDate) || areDatesInSameDay(valueDate, maxDate))
    ) return value;
    if (minDate && isAfter(minDate, today)) return minDate;
    if (maxDate && isBefore(maxDate, today)) return minDate || maxDate;
    return today;
  })();
  return getMonthEdges(result)[0];
};

/**
 * Returns humanized string for given date using given locales.
 *
 * @param {Date|DateString} date
 * @param {String} [locales]
 *
 * @returns {String}
 */
const getHumanizedDate = (date, locales = 'en') => {
  const dateAsDate = dateStringToDate(date);
  const humanizedConfig = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateAsDate.toLocaleDateString(locales, humanizedConfig);
};

export {
  isDate,
  isValidDate,
  isValidDateString,
  dateStringToDate,
  dateToDateString,
  getMonthEdges,
  areDatesInSameYear,
  areDatesInSameMonth,
  areDatesInSameDay,
  getConsecutivePeriod,
  getCalendarPageDates,
  offsetBy,
  isWeekend,
  isBefore,
  isAfter,
  suggestMonthToBeShown,
  getHumanizedDate,
};
