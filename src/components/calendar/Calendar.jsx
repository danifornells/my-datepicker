import React, { Component } from 'react';
import CalendarDate from './CalendarDate';
import IconChevronLeft from '../icons/IconChevronLeft';
import IconChevronRight from '../icons/IconChevronRight';
import CalendarPropTypes from './Calendar.prop-types';
import * as calendarLocales from './Calendar.locales';
import {
  areDatesInSameDay,
  areDatesInSameMonth,
  dateStringToDate,
  dateToDateString,
  getCalendarPageDates,
  isAfter, isBefore,
  isValidDateString,
  isWeekend,
  offsetBy,
  suggestMonthToBeShown,
} from '../../helpers/dates';

import '../../styles/base.scss';
import STYLES from './Calendar.scss';

const c = (className) => STYLES[className] || 'UNKNOWN';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const {
      language, value, min, max,
    } = props;
    this.locales = calendarLocales[language];
    this.minDate = min && isValidDateString(min) ? dateStringToDate(min) : null;
    this.maxDate = max && isValidDateString(max) ? dateStringToDate(max) : null;
    const valueDate = value && isValidDateString(value) ? dateStringToDate(value) : null;
    this.state = {
      currentMonth: suggestMonthToBeShown(valueDate, this.minDate, this.maxDate),
      currentValue: valueDate || null,
    };
  }

  handleDayClick(newDate) {
    const { onDateChange } = this.props;
    this.setState({ currentValue: newDate });
    onDateChange(dateToDateString(newDate));
  }

  offsetByMonth(months) {
    const { currentMonth } = this.state;
    const newCurrentMonth = offsetBy(currentMonth, { months });
    this.setState({ currentMonth: newCurrentMonth });
  }

  renderHeading() {
    const { currentMonth } = this.state;
    const prevMonthDisabled = (
      this.minDate
      && areDatesInSameMonth(currentMonth, this.minDate)
    );
    const nextMonthDisabled = (
      this.maxDate
      && areDatesInSameMonth(currentMonth, this.maxDate)
    );
    const headingText = [
      this.locales.months[currentMonth.getMonth()],
      currentMonth.getFullYear(),
    ].join(' ');
    return (
      <div className={c('Calendar-heading')}>
        <button
          type="button"
          className={c('Calendar-navButton')}
          disabled={prevMonthDisabled}
          onClick={() => this.offsetByMonth(-1)}
        >
          <IconChevronLeft />
        </button>
        <h1 className={c('Calendar-currentMonth')}>{headingText}</h1>
        <button
          type="button"
          className={c('Calendar-navButton')}
          disabled={nextMonthDisabled}
          onClick={() => this.offsetByMonth(1)}
        >
          <IconChevronRight />
        </button>
      </div>
    );
  }

  renderWeekDays(calendarDates) {
    const { weekdaysShort } = this.locales;
    return Array(7).fill(null).map((d, i) => {
      const sampleDate = calendarDates[i];
      const weekDayName = weekdaysShort[sampleDate.getDay()];
      const isOnWeekend = isWeekend(sampleDate);
      const classNames = [
        c('Calendar-weekDay'),
        isOnWeekend ? c('is-weekend') : '',
      ].join(' ');
      const key = sampleDate.getTime();
      return (
        <span key={key} className={classNames} aria-hidden="true">
          {weekDayName}
        </span>
      );
    });
  }

  renderDates(calendarDates) {
    const { currentMonth, currentValue } = this.state;
    return calendarDates.map((date) => {
      const key = date.getTime();
      const isFromAnotherMonth = !areDatesInSameMonth(date, currentMonth);
      const isSelected = (currentValue && areDatesInSameDay(date, currentValue));
      const isDisabled = !!((
        isFromAnotherMonth
      ) || (
        this.minDate
        && areDatesInSameMonth(this.minDate, currentMonth)
        && isBefore(date, this.minDate)
      ) || (
        this.maxDate
        && areDatesInSameMonth(this.maxDate, currentMonth)
        && isAfter(date, this.maxDate)
      ));
      const dateNumber = date.getDate();
      return (
        <CalendarDate
          key={key}
          dateNumber={dateNumber}
          isFromAnotherMonth={isFromAnotherMonth}
          isSelected={isSelected}
          isDisabled={isDisabled}
          onClick={() => this.handleDayClick(date)}
        />
      );
    });
  }

  render() {
    const { className } = this.props;
    const { currentMonth } = this.state;
    const { firstDay } = this.locales;
    const classNames = [c('Calendar'), className].join(' ');
    const calendarDates = getCalendarPageDates(currentMonth, firstDay);
    return (
      <div className={classNames}>
        {this.renderHeading()}
        <div className={c('Calendar-page')}>
          {this.renderWeekDays(calendarDates)}
          {this.renderDates(calendarDates)}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = CalendarPropTypes;

Calendar.defaultProps = {
  language: 'en',
  className: '',
};

export default Calendar;
