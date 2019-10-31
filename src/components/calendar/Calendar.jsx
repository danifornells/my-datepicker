import React from 'react';
import PropTypes from 'prop-types';
import CalendarDate from './CalendarDate';
import IconChevronLeft from '../icons/IconChevronLeft';
import IconChevronRight from '../icons/IconChevronRight';
import * as DATE_LOCALES from '../../locales/date';
import optionalDateString from '../../prop-types/optional-date-string';
import STYLES from './Calendar.scss';
import useCalendarState from './hooks/use-calendar-state';

const { string, oneOf, func } = PropTypes;
const c = (className) => STYLES[className] || 'UNKNOWN';

/**
 * [𝗖] Calendar component
 */
const Calendar = (props) => {
  const {
    value, min, max, language, onDateChange, className,
  } = props;
  const {
    currentMonthName,
    prevMonthDisabled,
    nextMonthDisabled,
    currentCalendarDates,
    currentWeekDays,
    setValue,
    offsetByMonth,
  } = useCalendarState({
    value, min, max, language, onDateChange,
  });
  const classNames = [c('Calendar'), className].join(' ');

  const renderHeading = () => (
    <div className={c('Calendar-heading')}>
      <button
        type="button"
        className={c('Calendar-navButton')}
        disabled={prevMonthDisabled}
        onClick={() => offsetByMonth(-1)}
      >
        <IconChevronLeft />
      </button>
      <h1 className={c('Calendar-currentMonth')}>{currentMonthName}</h1>
      <button
        type="button"
        className={c('Calendar-navButton')}
        disabled={nextMonthDisabled}
        onClick={() => offsetByMonth(1)}
      >
        <IconChevronRight />
      </button>
    </div>
  );

  const renderWeekDays = () => currentWeekDays.map((day) => {
    const { weekDayName, isOnWeekend } = day;
    const weekDayClassNames = [
      c('Calendar-weekDay'),
      isOnWeekend ? c('is-weekend') : '',
    ].join(' ');
    return (
      <span key={weekDayName} className={weekDayClassNames} aria-hidden="true">
        {weekDayName}
      </span>
    );
  });

  const renderDates = () => currentCalendarDates.map((date) => {
    const {
      isFromAnotherMonth, isSelected, isDisabled, dateNumber, dateTime,
    } = date;
    return (
      <CalendarDate
        key={dateTime}
        dateNumber={dateNumber}
        isFromAnotherMonth={isFromAnotherMonth}
        isSelected={isSelected}
        isDisabled={isDisabled}
        onClick={() => setValue(date.date)}
      />
    );
  });

  return (
    <div className={classNames}>
      {renderHeading()}
      <div className={c('Calendar-page')}>
        {renderWeekDays()}
        {renderDates()}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  /** Min date as DateString */
  min: optionalDateString,
  /** Max date as DateString */
  max: optionalDateString,
  /** Current date as DateString */
  value: optionalDateString,
  /** ClassName/s to be appended */
  className: string,
  /** Language will set locale settings */
  language: oneOf(Object.keys(DATE_LOCALES)),
  /** Invoked when a new date is selected */
  onDateChange: func,
};

Calendar.defaultProps = {
  min: '',
  max: '',
  value: '',
  language: 'en',
  className: '',
  onDateChange: () => {},
};

export default Calendar;
