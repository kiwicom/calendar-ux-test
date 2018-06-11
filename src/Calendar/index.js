// @flow
import React from 'react';
import Picker from './Picker';

import { SelectedDates } from '../context/SelectedDates';
import { RETURN } from '../constants';

import { CalendarWraper } from './styles';

const Calendar = () => (
  <SelectedDates.Consumer>
    {(selectedDates) => {
        const {
          currentMonth,
          selectedType,
          departureDate,
          returnDate,
          changeDate,
        } = selectedDates;
        const nextMonth = currentMonth.clone().add(1, 'month');
        let activeDates = departureDate;
        if (selectedType === RETURN) {
          activeDates = returnDate;
        }
        return (
          <CalendarWraper>
            <Picker
              changeDate={changeDate}
              date={currentMonth}
              activeDates={activeDates}
            />
            <Picker
              changeDate={changeDate}
              date={nextMonth}
              activeDates={activeDates}
            />
          </CalendarWraper>);
      }}

  </SelectedDates.Consumer>
);

export default Calendar;
