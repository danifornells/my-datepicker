import { useState } from 'react';
import { dateStringToDate, getHumanizedDate, isValidDateString } from '../../../helpers/dates'

/**
 * Expect to close datePicker on given time.
 * Because popover hides with transition, we calc differences to match expected delay.
 */
/* eslint-disable import/no-dynamic-require, no-undef */
const CLOSE_EXPECTED_DELAY = 500;
const POPOVER_TOKENS = require(`../../../../build/tokens/${WEBPACK_BRAND}/tokens.popover.json`);
const POPOVER_TRANSITION_TIME = POPOVER_TOKENS.time.transition.popover.box.original.value;
const CLOSE_DELAY = POPOVER_TRANSITION_TIME > CLOSE_EXPECTED_DELAY
  ? 0
  : CLOSE_EXPECTED_DELAY - POPOVER_TRANSITION_TIME;
/* eslint-enable import/no-dynamic-require, no-undef */

/**
 * Manages state for chosen date.
 * Exposes a setDate who:
 * - Updates state
 * - Invokes onChange
 * - Closes popover with expected delay (could be skipped)
 *
 * @param(DateString) initialValue
 * @param(String) dateFormat
 * @param(String) language
 * @param(Function) onChange
 * @param(Function) setIsOpened
 */
const useDateState = (initialValue, dateFormat, language, onChange, setOpen) => {
  const getDateToShow = (date) => {
    if (dateFormat === 'humanized') {
      return isValidDateString(date)
        ? getHumanizedDate(date, language)
        : ''
    }
    return date;
  }
  const [{currentDate, currentDateToShow}, setDate] = useState({
    currentDate: initialValue,
    currentDateToShow: getDateToShow(initialValue, dateFormat, language)
  });

  return {
    currentDate,
    currentDateToShow,
    setDate: (date, options = {skipDelay:false}) => {
      setDate({
        currentDate: date,
        currentDateToShow: getDateToShow(date, dateFormat, language)
      });
      onChange({
        value: date,
        date: dateStringToDate(date),
      });
      options.skipDelay
        ? window.setTimeout(() => setOpen(false), CLOSE_DELAY)
        : setOpen(false)
    }
  };
}

export default useDateState;