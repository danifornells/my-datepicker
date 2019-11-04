import { renderHook, act } from '@testing-library/react-hooks'
import useCalendarDatesState from './use-calendar-dates-state'
import { isDate } from '../../../helpers/dates'

describe('useCalendarDatesState', () => {
  test('given expected arguments, the return matches expected props', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));
    expect(Array.isArray(result.current.currentCalendarDates)).toBe(true);
    expect(typeof result.current.setCalendarDates).toBe('function');
  });

  test('currentCalendarDates contains the expected values', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));
    expect(result.current.currentCalendarDates.length).toBe(35);

    const firstDate = result.current.currentCalendarDates[0];
    expect(isDate(firstDate.date)).toBe(true);
    expect(firstDate.dateNumber).toBe(1);
    expect(typeof firstDate.dateTime).toBe('number');
    expect(firstDate.isFromAnotherMonth).toBe(false);
    expect(firstDate.isSelected).toBe(true);
    expect(firstDate.isDisabled).toBe(false);

    const lastMonthDate = result.current.currentCalendarDates[30];
    expect(isDate(lastMonthDate.date)).toBe(true);
    expect(lastMonthDate.dateNumber).toBe(31);
    expect(typeof lastMonthDate.dateTime).toBe('number');
    expect(lastMonthDate.isFromAnotherMonth).toBe(false);
    expect(lastMonthDate.isSelected).toBe(false);
    expect(lastMonthDate.isDisabled).toBe(false);

    const lastDate = result.current.currentCalendarDates[34];
    expect(isDate(lastDate.date)).toBe(true);
    expect(lastDate.dateNumber).toBe(4);
    expect(typeof lastDate.dateTime).toBe('number');
    expect(lastDate.isFromAnotherMonth).toBe(true);
    expect(lastDate.isSelected).toBe(false);
    expect(lastDate.isDisabled).toBe(true);
  });

  test('minDate and maxDate affects output as expected', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-15');
    const minDate = new Date('2017-10-10');
    const maxDate = new Date('2017-10-20');
    const language = 'en';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));

    const firstDate = result.current.currentCalendarDates[0];
    expect(firstDate.dateNumber).toBe(1);
    expect(firstDate.isSelected).toBe(false);
    expect(firstDate.isDisabled).toBe(true);

    const firstAvailableDate = result.current.currentCalendarDates[9];
    expect(firstAvailableDate.dateNumber).toBe(10);
    expect(firstAvailableDate.isSelected).toBe(false);
    expect(firstAvailableDate.isDisabled).toBe(false);

    const selectedDate = result.current.currentCalendarDates[14];
    expect(selectedDate.dateNumber).toBe(15);
    expect(selectedDate.isSelected).toBe(true);
    expect(selectedDate.isDisabled).toBe(false);

    const lastAvailableDate = result.current.currentCalendarDates[19];
    expect(lastAvailableDate.dateNumber).toBe(20);
    expect(lastAvailableDate.isSelected).toBe(false);
    expect(lastAvailableDate.isDisabled).toBe(false);

    const firstUnavailableDate = result.current.currentCalendarDates[20];
    expect(firstUnavailableDate.dateNumber).toBe(21);
    expect(firstUnavailableDate.isSelected).toBe(false);
    expect(firstUnavailableDate.isDisabled).toBe(true);
  });

  test('language affects output as expected', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'es';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));
    expect(result.current.currentCalendarDates.length).toBe(42);

    const firstDate = result.current.currentCalendarDates[0];
    expect(firstDate.dateNumber).toBe(25);
    expect(firstDate.isFromAnotherMonth).toBe(true);
    expect(firstDate.isSelected).toBe(false);
    expect(firstDate.isDisabled).toBe(true);

    const firstMonthDate = result.current.currentCalendarDates[6];
    expect(firstMonthDate.dateNumber).toBe(1);
    expect(firstMonthDate.isFromAnotherMonth).toBe(false);
    expect(firstMonthDate.isSelected).toBe(true);
    expect(firstMonthDate.isDisabled).toBe(false);

    const lastMonthDate = result.current.currentCalendarDates[36];
    expect(lastMonthDate.dateNumber).toBe(31);
    expect(lastMonthDate.isFromAnotherMonth).toBe(false);
    expect(lastMonthDate.isSelected).toBe(false);
    expect(lastMonthDate.isDisabled).toBe(false);

    const firstNextMonthDate = result.current.currentCalendarDates[37];
    expect(firstNextMonthDate.dateNumber).toBe(1);
    expect(firstNextMonthDate.isFromAnotherMonth).toBe(true);
    expect(firstNextMonthDate.isSelected).toBe(false);
    expect(firstNextMonthDate.isDisabled).toBe(true);
  });

  test('setCalendarDates updates currentCalendarDates as expected', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));

    expect(result.current.currentCalendarDates.length).toBe(35);

    const firstDate = result.current.currentCalendarDates[0];
    expect(firstDate.dateNumber).toBe(1);
    expect(firstDate.isFromAnotherMonth).toBe(false);

    act(() => {
      result.current.setCalendarDates(
        new Date('2017-12-01'),
        currentValue
      )
    })

    expect(result.current.currentCalendarDates.length).toBe(42);

    const firstDateUpdated = result.current.currentCalendarDates[0];
    expect(firstDateUpdated.dateNumber).toBe(26);
    expect(firstDateUpdated.isFromAnotherMonth).toBe(true);

    const lastDateUpdated = result.current.currentCalendarDates[41];
    expect(lastDateUpdated.dateNumber).toBe(6);
    expect(lastDateUpdated.isFromAnotherMonth).toBe(true);

  });

  test('setCalendarDates updates selectedDate as expected', () => {
    const currentMonth = new Date('2017-10-01');
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useCalendarDatesState({currentMonth, currentValue, minDate, maxDate, language}));

    const selectedDate = result.current.currentCalendarDates[0];
    expect(selectedDate.dateNumber).toBe(1);
    expect(selectedDate.isSelected).toBe(true);

    act(() => {
      result.current.setCalendarDates(
        currentMonth,
        new Date('2017-10-15')
      )
    })

    const previousSelectedDate = result.current.currentCalendarDates[0];
    expect(previousSelectedDate.dateNumber).toBe(1);
    expect(previousSelectedDate.isSelected).toBe(false);

    const selectedDateUpdated = result.current.currentCalendarDates[14];
    expect(selectedDateUpdated.dateNumber).toBe(15);
    expect(selectedDateUpdated.isSelected).toBe(true);

  });

});
