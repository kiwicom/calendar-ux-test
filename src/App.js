// @flow
import React, { Component } from 'react';
import moment from 'moment';

import SelectedDatesContext from './context/SelectedDates';

import Calendar from './Calendar';
import Inputs from './Inputs';
import Footer from './Footer';
import CalendarNavigation from './Calendar/Navigation';

import { DEPARTURE } from './constants';

type State = {
  selectedType: string,
  currentMonth: any,
  departureDate: {|
    anytime: bool,
    start: Object | null,
    end: Object| null
  |},
  returnDate: {|
    anytime: bool,
    start: Object | null,
    end: Object| null
  |},
}

type Props = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedType: DEPARTURE,
      departureDate: {
        anytime: false,
        start: moment(),
        end: moment().add(1, 'day'),
      },
      returnDate: {
        anytime: false,
        start: null,
        end: null,
      },
      currentMonth: moment(),
    };
  }
  nextMonth = (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { currentMonth } = this.state;
    const nextMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: nextMonth,
    });
  }
  prevMonth = (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { currentMonth } = this.state;
    const prevMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: prevMonth,
    });
  }
  changeSelectedType = (selectedType: string) => {
    this.setState({
      selectedType,
    });
  }
  changeDate = (type: string, date: any) => {
    // TODO: refactor this
    const { selectedType } = this.state;
    if (type === 'anytime') {
      this.setState({
        [selectedType]: {
          anytime: true,
          start: null,
          end: null,
        },
      });
    }
    if (type === 'month') {
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date.clone().startOf('month'),
          end: date.clone().endOf('month'),
        },
      });
    }
    if (type === 'subtract') {
      const { start, end } = this.state[selectedType];
      this.setState({
        [selectedType]: {
          anytime: false,
          start: start.clone().subtract(1, 'day'),
          end,
        },
      });
    }
    if (type === 'add') {
      const { start, end } = this.state[selectedType];
      this.setState({
        [selectedType]: {
          anytime: false,

          start,
          end: end.clone().add(1, 'day'),
        },
      });
    }
    if (type === 'clean') {
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date,
          end: date.clone(),
        },
      });
    }
    if (type === 'start') {
      let { end } = this.state[selectedType];
      if (end.isBefore(date)) {
        end = date.clone().add(1, 'day');
      }
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date,
          end,
        },
      });
    }
    if (type === 'end') {
      if (date.isBefore(this.state[selectedType].start)) {
        return;
      }
      this.setState({
        [selectedType]: {
          anytime: false,
          start: this.state[selectedType].start,
          end: date,
        },
      });
    }
  }
  render() {
    const {
      selectedType, departureDate, returnDate, currentMonth,
    } = this.state;
    return (
      <div className="App">
        <SelectedDatesContext.Provider
          value={{
            selectedType,
            currentMonth,
            departureDate,
            returnDate,
            changeSelectedType: this.changeSelectedType,
            changeDate: this.changeDate,
           }}
        >

          <Inputs
            selectedType={selectedType}
            departureDate={departureDate}
            returnDate={returnDate}
            changeSelectedType={this.changeSelectedType}
            changeDate={this.changeDate}
          />
          <Calendar />
          <CalendarNavigation
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
          <Footer />

        </SelectedDatesContext.Provider>
      </div>
    );
  }
}

export default App;
