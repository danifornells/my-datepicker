/* eslint-disable no-undef */
import {
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
} from './dates';

describe('isDate', () => {
  test('given a Date instance, returns true', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('2017-10-01'))).toBe(true);
  });

  test('given a number, returns false', () => {
    expect(isDate(5)).toBe(false);
  });

  test('given a string, returns false', () => {
    expect(isDate('2017-10-01')).toBe(false);
  });
});

describe('isValidDate', () => {
  test('given a valid Date instance, returns true', () => {
    expect(isValidDate(new Date('2017-10-01'))).toBe(true);
  });

  test('given an invalid Date instance, returns false', () => {
    expect(isValidDate(new Date('2017-10-55'))).toBe(false);
  });
});

describe('isValidDateString', () => {
  test('given a valid DateString, returns true', () => {
    expect(isValidDateString('2017-10-01')).toBe(true);
  });

  test('given an invalid DateString, returns false', () => {
    expect(isValidDateString('2017-10-55')).toBe(false);
  });

  test('given an unrelated string, returns false', () => {
    expect(isValidDateString('Nothing')).toBe(false);
  });

  test('given a Date instance, returns false', () => {
    expect(isValidDateString(new Date())).toBe(false);
  });
});

describe('dateStringToDate', () => {
  test('given a valid DateString, returns the expected date', () => {
    const generatedDate = dateStringToDate('2017-10-01');
    expect(isDate(generatedDate)).toBe(true);
    expect(generatedDate.getDate()).toBe(1);
    expect(generatedDate.getMonth()).toBe(9);
    expect(generatedDate.getFullYear()).toBe(2017);
  });

  test('given Date instance, same is returned', () => {
    const givenDate = new Date();
    expect(dateStringToDate(givenDate)).toEqual(givenDate);
    expect(dateStringToDate(givenDate)).toBe(givenDate);
  });
});

describe('dateToDateString', () => {
  test('given a valid Date, returns the expected dateString', () => {
    const testDateString = '2017-10-01';
    const testDate = new Date(testDateString);
    expect(dateToDateString(testDate)).toEqual(testDateString);
  });
});

describe('getMonthEdges', () => {
  test('given a valid Date, returns the first and last days of same month', () => {
    const testDate = new Date('2017-10-10');
    const expectedResult = ['2017-10-01', '2017-10-31'];
    const result = getMonthEdges(testDate);
    const resultStrings = result.map((d) => dateToDateString(d));
    expect(result.length).toEqual(2);
    expect(resultStrings[0]).toEqual(expectedResult[0]);
    expect(resultStrings[1]).toEqual(expectedResult[1]);
  });

  test('given a valid DateString, returns the first and last days of same month', () => {
    const testDate = '2017-10-10';
    const expectedResult = ['2017-10-01', '2017-10-31'];
    const result = getMonthEdges(testDate);
    const resultStrings = result.map((d) => dateToDateString(d));
    expect(result.length).toEqual(2);
    expect(resultStrings[0]).toEqual(expectedResult[0]);
    expect(resultStrings[1]).toEqual(expectedResult[1]);
  });
});

describe('areDatesInSameYear', () => {
  test('given valid Dates|DateStrings within same year, returns true', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-10-03',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameYear(...testDates)).toBe(true);
    expect(areDatesInSameYear(...testDateStrings)).toBe(true);
  });

  test('given valid Dates|DateStrings within different years, returns false', () => {
    const testDateStrings = [
      '2017-10-01',
      '2018-10-01',
    ];
    const testDates = testDateStrings.map((d) => new Date(d));
    expect(areDatesInSameYear(...testDates)).toBe(false);
    expect(areDatesInSameYear(...testDateStrings)).toBe(false);
  });
});

describe('areDatesInSameMonth', () => {
  test('given valid Dates|DateStrings within same month and year, returns true', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-10-03',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameMonth(...testDates)).toBe(true);
    expect(areDatesInSameMonth(...testDateStrings)).toBe(true);
  });

  test('given valid Dates|DateStrings within same month and different year, returns false', () => {
    const testDateStrings = [
      '2017-10-01',
      '2019-10-03',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameMonth(...testDates)).toBe(false);
    expect(areDatesInSameMonth(...testDateStrings)).toBe(false);
  });

  test('given valid Dates|DateStrings within different months, returns false', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-11-01',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameMonth(...testDates)).toBe(false);
    expect(areDatesInSameMonth(...testDateStrings)).toBe(false);
  });
});

describe('areDatesInSameDay', () => {
  test('given valid Dates|DateStrings within same day, month and year, returns true', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-10-01',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameDay(...testDates)).toBe(true);
    expect(areDatesInSameDay(...testDateStrings)).toBe(true);
  });

  test('given valid Dates|DateStrings within same day and different month, returns false', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-11-01',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    expect(areDatesInSameDay(...testDates)).toBe(false);
    expect(areDatesInSameDay(...testDateStrings)).toBe(false);
  });

  test('given valid Dates within same day, different time, returns true', () => {
    const testDateStrings = [
      '2017-10-01',
      '2017-10-01',
    ];
    const testDates = [
      new Date(testDateStrings[0]),
      new Date(testDateStrings[1]),
    ];
    testDates[0].setHours(12);
    expect(areDatesInSameDay(...testDates)).toBe(true);
  });
});

describe('getConsecutivePeriod', () => {
  test('given valid Dates|DateStrings, returns an array of consecutive Dates', () => {
    const testDateStrings = [
      '2017-09-28',
      '2017-10-04',
    ];
    const testDates = testDateStrings.map((d) => new Date(d));
    const expectedDateStrings = [
      '2017-09-28',
      '2017-09-29',
      '2017-09-30',
      '2017-10-01',
      '2017-10-02',
      '2017-10-03',
      '2017-10-04',
    ];
    const expectedDates = expectedDateStrings.map((d) => new Date(d));
    const period = getConsecutivePeriod(...testDates);
    const periodFromStrings = getConsecutivePeriod(...testDateStrings);
    expect(period.length).toEqual(expectedDateStrings.length);
    expect(periodFromStrings.length).toEqual(expectedDateStrings.length);
    period.forEach((d, i) => {
      expect(d).toEqual(expectedDates[i]);
      expect(dateToDateString(d)).toEqual(expectedDateStrings[i]);
    });
    periodFromStrings.forEach((d, i) => {
      expect(d).toEqual(expectedDates[i]);
      expect(dateToDateString(d)).toEqual(expectedDateStrings[i]);
    });
  });
});

describe('getCalendarPageDates', () => {
  test('given valid Dates|DateStrings, returns an array of Dates to hydrate a calendarPage', () => {
    const testDate = '2017-10-01';
    const expectedCalendarEdges = [
      '2017-10-01',
      '2017-11-04',
    ];
    const calendarDates = getCalendarPageDates(testDate);
    const firstDate = dateToDateString(calendarDates[0]);
    const lastDate = dateToDateString(calendarDates[calendarDates.length - 1]);
    expect(calendarDates.length).toEqual(5 * 7);
    expect(firstDate).toEqual(expectedCalendarEdges[0]);
    expect(lastDate).toEqual(expectedCalendarEdges[1]);
  });

  test('given valid Dates|DateStrings, and different firstDay, returns an array of Dates to hydrate a calendarPage', () => {
    const testDate = '2017-10-01';
    const expectedCalendarEdges = [
      '2017-09-25',
      '2017-11-05',
    ];
    const calendarDates = getCalendarPageDates(testDate, 1);
    const firstDate = dateToDateString(calendarDates[0]);
    const lastDate = dateToDateString(calendarDates[calendarDates.length - 1]);
    expect(calendarDates.length).toEqual(6 * 7);
    expect(firstDate).toEqual(expectedCalendarEdges[0]);
    expect(lastDate).toEqual(expectedCalendarEdges[1]);
  });
});

describe('offsetBy', () => {
  test('given valid Date|DateString and offsetObject, returns the expected date', () => {
    const testDate = '2017-10-01';
    expect(dateToDateString(
      offsetBy(testDate, {
        years: 1,
      }),
    )).toEqual('2018-10-01');
    expect(dateToDateString(
      offsetBy(testDate, {
        months: -1,
        days: 5,
      }),
    )).toEqual('2017-09-06');
  });

  test('given valid Date, is not modified after an offset', () => {
    const testDateString = '2017-10-01';
    const testDate = dateStringToDate(testDateString);
    const offsetResult = offsetBy(testDate, { years: 1 });
    expect(dateToDateString(offsetResult)).toEqual('2018-10-01');
    expect(dateToDateString(testDate)).toEqual('2017-10-01');
  });
});

describe('isWeekend', () => {
  test('given valid Date|DateString, returns true if matches weekend (Sat/Sun)', () => {
    const testDates = [
      '2017-09-30', // Saturday
      '2017-10-01', // Sunday
      '2017-10-02', // Monday
    ];
    expect(isWeekend(testDates[0])).toBe(true);
    expect(isWeekend(testDates[1])).toBe(true);
    expect(isWeekend(testDates[2])).toBe(false);
  });
});

describe('isBefore', () => {
  test('given two valid Date|DateString, returns true if first is before second', () => {
    const checkDate = '2017-09-26';
    const referenceDate = '2017-10-01';
    expect(isBefore(checkDate, referenceDate)).toBe(true);
  });
  test('given two valid Date|DateString, returns false if first is after second', () => {
    const checkDate = '2017-12-25';
    const referenceDate = '2017-10-01';
    expect(isBefore(checkDate, referenceDate)).toBe(false);
  });
  test('given two valid Date|DateString, returns false if both are same day', () => {
    const checkDate = '2017-10-01';
    const referenceDate = '2017-10-01';
    const checkAsDate = dateStringToDate(checkDate);
    const referenceAsDate = dateStringToDate(referenceDate);
    referenceAsDate.setHours(12);
    expect(isBefore(checkDate, referenceDate)).toBe(false);
    expect(isBefore(checkAsDate, referenceAsDate)).toBe(false);
  });
});

describe('isAfter', () => {
  test('given two valid Date|DateString, returns true if first is after second', () => {
    const checkDate = '2017-12-25';
    const referenceDate = '2017-10-01';
    expect(isAfter(checkDate, referenceDate)).toBe(true);
  });
  test('given two valid Date|DateString, returns false if first is before second', () => {
    const checkDate = '2017-09-26';
    const referenceDate = '2017-10-01';
    expect(isAfter(checkDate, referenceDate)).toBe(false);
  });
  test('given two valid Date|DateString, returns false if both are same day', () => {
    const checkDate = '2017-10-01';
    const referenceDate = '2017-10-01';
    const checkAsDate = dateStringToDate(checkDate);
    const referenceAsDate = dateStringToDate(referenceDate);
    referenceAsDate.setHours(12);
    expect(isAfter(checkDate, referenceDate)).toBe(false);
    expect(isAfter(checkAsDate, referenceAsDate)).toBe(false);
  });
});

describe('suggestMonthToBeShown', () => {
  test('given nothing, returns today\'s month', () => {
    const value = new Date();
    const expectedResult = getMonthEdges(value)[0];
    const result = suggestMonthToBeShown(value);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('given only a value, returns this value\'s month', () => {
    const value = '2017-10-15';
    const expectedResult = '2017-10-01';
    const result = suggestMonthToBeShown(value);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('given no value, and limits including today, returns today\'s month', () => {
    const today = new Date();
    const min = offsetBy(today, { months: -3 });
    const max = offsetBy(today, { months: 3 });
    const expectedResult = getMonthEdges(today)[0];
    const result = suggestMonthToBeShown(undefined, min, max);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('given no value, and future limits excluding today, returns minDate\'s month', () => {
    const today = new Date();
    const min = offsetBy(today, { months: 3 });
    const max = offsetBy(today, { months: 9 });
    const expectedResult = getMonthEdges(min)[0];
    const result = suggestMonthToBeShown(undefined, min, max);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('given no value, and past limits excluding today, returns minDate\'s month', () => {
    const today = new Date();
    const min = offsetBy(today, { months: -9 });
    const max = offsetBy(today, { months: -3 });
    const expectedResult = getMonthEdges(min)[0];
    const result = suggestMonthToBeShown(undefined, min, max);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('given value, and past minDate, returns values\'s month', () => {
    const value = '2017-10-15';
    const min = offsetBy(value, { months: -3 });
    const expectedResult = getMonthEdges(value)[0];
    const result = suggestMonthToBeShown(value, min);
    expect(areDatesInSameDay(result, expectedResult)).toBe(true);
  });
  test('...more tests could be done here', () => {
    expect(true).toBe(true);
  });
});
