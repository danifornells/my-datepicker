import { renderHook, act } from '@testing-library/react-hooks'
import useMonthState from './use-month-state'
import { areDatesInSameMonth, isDate } from '../../../helpers/dates'

describe('useMonthState', () => {
  test('given expected arguments, the return matches expected props', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));
    expect(isDate(result.current.currentMonth)).toBe(true);
    expect(typeof result.current.currentMonthName).toBe('string');
    expect(typeof result.current.prevMonthDisabled).toBe('boolean');
    expect(typeof result.current.nextMonthDisabled).toBe('boolean');
    expect(typeof result.current.setMonth).toBe('function');
  });

  test('props contains the expected values', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    expect(areDatesInSameMonth(
      result.current.currentMonth,
      '2017-10-01',
      )).toBe(true);
    expect(result.current.currentMonthName).toBe('October 2017');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(false);
  });

  test('minDate after value & before today, returns today\'s month', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = new Date('2018-10-01');
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    const today = new Date()
    expect(areDatesInSameMonth(
      result.current.currentMonth,
      today,
    )).toBe(true);
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(false);
  });

  test('minDate after value & today, returns minDate\'s month', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = new Date('2099-10-01');
    const maxDate = undefined;
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    expect(areDatesInSameMonth(
      result.current.currentMonth,
      minDate,
    )).toBe(true);
    expect(result.current.currentMonthName).toBe('October 2099');
    expect(result.current.prevMonthDisabled).toBe(true);
    expect(result.current.nextMonthDisabled).toBe(false);
  });

  test('maxDate before value, returns maxDate\'s month', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = new Date('2016-10-01');
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    expect(areDatesInSameMonth(
      result.current.currentMonth,
      maxDate,
    )).toBe(true);
    expect(result.current.currentMonthName).toBe('October 2016');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(true);
  });

  test('language affects output as expected', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = undefined;
    const language = 'es';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    expect(result.current.currentMonthName).toBe('Octubre 2017');
  });

  test('setMonth updates output as expected', () => {
    const currentValue = new Date('2017-10-01');
    const minDate = undefined;
    const maxDate = new Date('2017-11-01');
    const language = 'en';
    const {result} = renderHook(() => useMonthState({currentValue, minDate, maxDate, language}));

    expect(result.current.currentMonthName).toBe('October 2017');
    expect(result.current.nextMonthDisabled).toBe(false);

    act(() => {
      result.current.setMonth(
        new Date('2017-11-01')
      )
    })

    expect(areDatesInSameMonth(
      result.current.currentMonth,
      '2017-11-01',
    )).toBe(true);
    expect(result.current.currentMonthName).toBe('November 2017');
    expect(result.current.prevMonthDisabled).toBe(false);
    expect(result.current.nextMonthDisabled).toBe(true);

  });

});
