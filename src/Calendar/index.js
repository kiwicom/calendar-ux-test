// @flow
import React from 'react';
import Picker from './Picker';

import SelectedDates from '../context/SelectedDates';
import { RETURN } from '../constants';

import { CalendarWraper } from './styles';

const Calendar = () => (
  <SelectedDates.Consumer>
    {(selectedDates) => {
        const {
          currentMonth, selectedType, departureDate, returnDate,
        } = selectedDates;
        const nextMonth = currentMonth.clone().add(1, 'month');
        let activeDates = departureDate;
        if (selectedType === RETURN) {
          activeDates = returnDate;
        }
        return (
          <CalendarWraper>
            <Picker
              date={currentMonth}
              activeDates={activeDates}
            />
            <Picker
              date={nextMonth}
              activeDates={activeDates}
            />
          </CalendarWraper>);
      }}

  </SelectedDates.Consumer>
);

export default Calendar;
