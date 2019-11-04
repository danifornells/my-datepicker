import { renderHook, act } from '@testing-library/react-hooks'
import useCalendarState from './use-calendar-state'
import { areDatesInSameDay, areDatesInSameMonth, isDate } from '../../../helpers/dates'

describe('useCalendarState', () => {
  test('given expected arguments, the return matches expected props', () => {
    const value = '2017-10-01';
    const min = '';
    const max = '';
    const language = 'en';
    const onDateChange = () => {};
    const {result} = renderHook(() => useCalendarState({value, min, max, language, onDateChange}));

    expect(isDate(result.current.currentValue)).toBe(true);
    expect(typeof result.current.currentMonthName).toBe('string');
    expect(typeof result.current.prevMonthDisabled).toBe('boolean');
    expect(typeof result.current.nextMonthDisabled).toBe('boolean');
    expect(Array.isArray(result.current.currentCalendarDates)).toBe(true);
    expect(Array.isArray(result.current.currentWeekDays)).toBe(true);
    expect(typeof result.current.setValue).toBe('function');
    expect(typeof result.current.offsetByMonth).toBe('function');
  });

  test('props contains the expected values', () => {
    const value = '2017-10-01';
    const min = '';
    const max = '';
    const language = 'en';
    const onDateChange = () => {};
    const {result} = renderHook(() => useCalendarState({value, min, max, language, onDateChange}));

    expect(areDatesInSameDay(
      result.current.currentValue,
      value
      )).toBe(true);
    expect(result.current.currentMonthName).toBe('October 2017');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(false);
    expect(result.current.currentCalendarDates.length).toBe(35);

    const firstDate = result.current.currentCalendarDates[0];
    expect(firstDate.dateNumber).toBe(1);
    expect(firstDate.isFromAnotherMonth).toBe(false);
    expect(firstDate.isSelected).toBe(true);
    expect(firstDate.isDisabled).toBe(false);

    expect(result.current.currentWeekDays.length).toBe(7);
    expect(result.current.currentWeekDays[0].weekDayName).toBe('Sun');
    expect(result.current.currentWeekDays[0].isOnWeekend).toBe(true);

  });

  test('setMonth updates output as expected and invokes onDateChange', () => {
    const value = '2017-10-01';
    const min = '';
    const max = '';
    const language = 'en';
    const onDateChange = jest.fn();
    const {result} = renderHook(() => useCalendarState({value, min, max, language, onDateChange}));

    act(() => {
      result.current.setValue(
        new Date('2017-12-15')
      )
    })

    expect(areDatesInSameDay(
      result.current.currentValue,
      '2017-12-15'
    )).toBe(true);
    expect(result.current.currentMonthName).toBe('December 2017');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(false);
    expect(result.current.currentCalendarDates.length).toBe(42);

    const firstDate = result.current.currentCalendarDates[0];
    expect(firstDate.dateNumber).toBe(26);
    expect(firstDate.isFromAnotherMonth).toBe(true);
    expect(firstDate.isSelected).toBe(false);
    expect(firstDate.isDisabled).toBe(true);

    const selectedDate = result.current.currentCalendarDates[19];
    expect(selectedDate.dateNumber).toBe(15);
    expect(selectedDate.isFromAnotherMonth).toBe(false);
    expect(selectedDate.isSelected).toBe(true);
    expect(selectedDate.isDisabled).toBe(false);

    expect(result.current.currentWeekDays[0].weekDayName).toBe('Sun');
    expect(result.current.currentWeekDays[0].isOnWeekend).toBe(true);

    expect(onDateChange).toHaveBeenCalled();
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange).toHaveBeenCalledWith('2017-12-15');

  });

  test('offsetByMonth updates output as expected and does not invoke onDateChange', () => {
    const value = '2017-10-01';
    const min = '';
    const max = '';
    const language = 'en';
    const onDateChange = jest.fn();
    const {result} = renderHook(() => useCalendarState({value, min, max, language, onDateChange}));

    act(() => {
      result.current.offsetByMonth(2)
    })

    expect(areDatesInSameDay(
      result.current.currentValue,
      value
    )).toBe(true);
    expect(areDatesInSameMonth(
      result.current.currentValue,
      '2017-12-01'
    )).toBe(false);
    expect(result.current.currentMonthName).toBe('December 2017');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(false);
    expect(result.current.currentCalendarDates.length).toBe(42);

    result.current.currentCalendarDates.forEach(date => {
      expect(date.isSelected).toBe(false);
    })

    expect(onDateChange).toHaveBeenCalledTimes(0);

  });

});
