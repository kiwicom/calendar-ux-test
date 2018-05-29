import React, { Component } from 'react';
import moment from 'moment';

import Calendar from './Calendar';
import Inputs from './Inputs';
import Footer from './Footer';
import './App.css';

import {
  CalendarContainer,
  Navigation,
} from './styles';

import { DEPARTURE } from './constants';

class App extends Component {
  constructor(props) {
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
  nextMonth = (e) => {
    e.preventDefault();
    const { currentMonth } = this.state;
    const nextMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: nextMonth,
    });
  }
  prevMonth = (e) => {
    e.preventDefault();
    const { currentMonth } = this.state;
    const prevMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: prevMonth,
    });
  }
  changeSelectedType = (selectedType) => {
    this.setState({
      selectedType,
    });
  }
  render() {
    const {
      currentMonth, selectedType, departureDate, returnDate,
    } = this.state;
    const nextMonth = currentMonth.clone().add(1, 'month');
    return (
      <div className="App">
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
        <CalendarContainer>
          <Calendar date={currentMonth} />
          <Calendar date={nextMonth} />
        </CalendarContainer>
        <Footer />
      </div>
    );
  }
}

export default App;
