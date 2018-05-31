// @flow
import React, { Component } from 'react';
import moment from 'moment';

import SelectedDatesContext from './context/SelectedDates';

import Calendar from './Calendar';
import Inputs from './Inputs';
import Footer from './Footer';
import './App.css';

import { Navigation } from './styles';

import { DEPARTURE } from './constants';

type State = {
  selectedType: string,
  currentMonth: any,
  departureDate: {|
    start: Object | null,
    end: Object| null
  |},
  returnDate: {|
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
        start: moment(),
        end: moment().add(1, 'day'),
      },
      returnDate: {
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
    if (type === 'subtract') {
      const { start, end } = this.state.departureDate;
      this.setState({
        departureDate: {
          start: start.clone().subtract(1, 'day'),
          end,
        },
      });
    }
    if (type === 'add') {
      const { start, end } = this.state.departureDate;
      this.setState({
        departureDate: {
          start,
          end: end.clone().add(1, 'day'),
        },
      });
    }
    if (type === 'clean') {
      this.setState({
        departureDate: {
          start: date,
          end: date.clone(),
        },
      });
    }
    if (type === 'start') {
      let { end } = this.state.departureDate;
      if (end.isBefore(date)) {
        end = date.clone().add(1, 'day');
      }
      this.setState({
        departureDate: {
          start: date,
          end,
        },
      });
    }
    if (type === 'end') {
      this.setState({
        departureDate: {
          start: this.state.departureDate.start,
          end: date,
        },
      });
    }
  }
  render() {
    const {
      selectedType, departureDate, returnDate,
    } = this.state;
    return (
      <div className="App">
        <SelectedDatesContext.Provider
          value={{
            selectedType: this.state.selectedType,
            currentMonth: this.state.currentMonth,
            departureDate: this.state.departureDate,
            returnDate: this.state.returnDate,
            changeSelectedType: this.changeSelectedType,
            changeDate: this.changeDate,
           }}
        >
          <Navigation onClick={this.prevMonth} left>
            {'<'}
          </Navigation>
          <Navigation onClick={this.nextMonth}>
            {'>'}
          </Navigation>
          <Inputs
            selectedType={selectedType}
            departureDate={departureDate}
            returnDate={returnDate}
            changeSelectedType={this.changeSelectedType}
          />
          <Calendar />
          <Footer />
        </SelectedDatesContext.Provider>
      </div>
    );
  }
}

export default App;
