// @flow
import React from 'react';
import Picker from './picker';

import SelectedDates from '../context/SelectedDates';

import { CalendarWraper } from './styles';

const Calendar = () => (
  <SelectedDates.Consumer>
    {(selectedDates) => {
        const { currentMonth, departureDate } = selectedDates;
        const nextMonth = currentMonth.clone().add(1, 'month');
        return (
          <CalendarWraper>
            <Picker
              date={currentMonth}
              departureDate={departureDate}
            />
            <Picker
              date={nextMonth}
              departureDate={departureDate}
            />
          </CalendarWraper>);
      }}

  </SelectedDates.Consumer>
);

export default Calendar;
