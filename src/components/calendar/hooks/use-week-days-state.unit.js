import { renderHook } from '@testing-library/react-hooks'
import useWeekDaysState from './use-week-days-state'

describe('useWeekDaysState', () => {
  test('given expected arguments, the return matches expected props', () => {
    const currentValue = new Date('2017-10-01');
    const language = 'en';
    const {result} = renderHook(() => useWeekDaysState({currentValue, language}));
    expect(Array.isArray(result.current.currentWeekDays)).toBe(true);
    expect(typeof result.current.setWeekDays).toBe('function');
  });

  test('currentWeekDays contains the expected values', () => {
    const currentValue = new Date('2017-10-01');
    const language = 'en';
    const {result} = renderHook(() => useWeekDaysState({currentValue, language}));
    expect(result.current.currentWeekDays.length).toBe(7);
    expect(result.current.currentWeekDays[0].weekDayName).toBe('Sun');
    expect(result.current.currentWeekDays[0].isOnWeekend).toBe(true);
    expect(result.current.currentWeekDays[1].weekDayName).toBe('Mon');
    expect(result.current.currentWeekDays[1].isOnWeekend).toBe(false);
    expect(result.current.currentWeekDays[6].weekDayName).toBe('Sat');
    expect(result.current.currentWeekDays[6].isOnWeekend).toBe(true);
  });

  test('currentWeekDays contains the expected values when using other language', () => {
    const currentValue = new Date('2017-10-01');
    const language = 'es';
    const {result} = renderHook(() => useWeekDaysState({currentValue, language}));
    expect(result.current.currentWeekDays[0].weekDayName).toBe('Lun');
    expect(result.current.currentWeekDays[0].isOnWeekend).toBe(false);
    expect(result.current.currentWeekDays[6].weekDayName).toBe('Dom');
    expect(result.current.currentWeekDays[6].isOnWeekend).toBe(true);
  });

});
