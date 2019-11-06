import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Calendar from './Calendar';
import CalendarDate from './CalendarDate';


describe('Calendar', () => {
  test('should render without throwing an error, and selectable by class "Calendar"', () => {
    expect(shallow(<Calendar />).is('.Calendar')).toBe(true);
  });

  test('should mount in a full DOM', function() {
    expect(mount(<Calendar />).find('.Calendar').length).toBe(1);
  });

  test('should match shallow snapshot', function() {
    expect(shallow(<Calendar />)).toMatchSnapshot();
  });

  test('should match rendered snapshot', function() {
    expect(render(<Calendar />)).toMatchSnapshot();
  });

  test('should have the expected title', function() {
    const renderedCalendar = mount(<Calendar value="2017-10-01" />);
    const monthTitle = renderedCalendar.find('.Calendar-currentMonth');
    expect(monthTitle.text()).toBe('October 2017');
  });

  test('should have working month navigation arrows respecting limits', function() {
    const renderedCalendar = mount(<Calendar
      value="2017-10-01"
      min="2017-09-15"
      max="2017-11-15"
    />);
    const getCurrentElements = () => {
      const monthNavButtons = renderedCalendar.find('.Calendar-navButton');
      return {
        monthNavButtons,
        prevMonth: monthNavButtons.at(0),
        nextMonth: monthNavButtons.at(1),
        monthTitle: renderedCalendar.find('.Calendar-currentMonth')
      }
    };
    // Check current month
    let currentElements = getCurrentElements();
    expect(currentElements.monthNavButtons).toHaveLength(2);
    expect(currentElements.monthTitle.text()).toBe('October 2017');
    expect(currentElements.prevMonth.prop('disabled')).toBe(false);
    expect(currentElements.nextMonth.prop('disabled')).toBe(false);
    // Go to previous month
    currentElements.prevMonth.simulate('click');
    currentElements = getCurrentElements();
    expect(currentElements.monthTitle.text()).toBe('September 2017');
    expect(currentElements.prevMonth.prop('disabled')).toBe(true);
    expect(currentElements.nextMonth.prop('disabled')).toBe(false);
    // Go twice next month
    currentElements.nextMonth.simulate('click');
    currentElements.nextMonth.simulate('click');
    currentElements = getCurrentElements();
    expect(currentElements.monthTitle.text()).toBe('November 2017');
    expect(currentElements.prevMonth.prop('disabled')).toBe(false);
    expect(currentElements.nextMonth.prop('disabled')).toBe(true);
    // Try next month (should be impossible)
    currentElements.nextMonth.simulate('click');
    currentElements = getCurrentElements();
    expect(currentElements.monthTitle.text()).toBe('November 2017');
  });

  test('should have a single expected date selected', function() {
    const renderedCalendar = mount(<Calendar value="2017-10-01"/>);
    const selectedDate = renderedCalendar.find(CalendarDate).filter({ isSelected: true });
    expect(selectedDate).toHaveLength(1);
    expect(selectedDate.prop('dateNumber')).toBe(1);
  });

  test('should enable selecting new date and call onDateChange', function() {
    const onDateChange = jest.fn();
    const renderedCalendar = mount(<Calendar value="2017-10-01" onDateChange={onDateChange}/>);
    // Check dates
    const currentDate = renderedCalendar.find(CalendarDate).at(0);
    const newDate = renderedCalendar.find(CalendarDate).at(1);
    expect(currentDate.prop('isSelected')).toBe(true);
    expect(currentDate.prop('dateNumber')).toBe(1);
    expect(newDate.prop('isSelected')).toBe(false);
    expect(newDate.prop('dateNumber')).toBe(2);
    // Click newDate, and check dates
    newDate.simulate('click');
    const oldCurrentDate = renderedCalendar.find(CalendarDate).at(0);
    const newCurrentDate = renderedCalendar.find(CalendarDate).at(1);
    expect(oldCurrentDate.prop('isSelected')).toBe(false);
    expect(newCurrentDate.prop('isSelected')).toBe(true);
    expect(onDateChange).toHaveBeenCalled();
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange).toHaveBeenCalledWith('2017-10-02');
  });

});