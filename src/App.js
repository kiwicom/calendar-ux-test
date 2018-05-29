import React, { Component } from 'react';
import moment from 'moment';

import Calendar from './Calendar';
import Inputs from './Inputs';
import Footer from './Footer';
import './App.css';

import { CalendarContainer } from './styles';

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
    const { currentDate } = this.state;
    const nextMonth = currentDate.clone().add(1, 'month');
    this.setState({
      currentDate: nextMonth,
    });
  }
  prevMonth = (e) => {
    e.preventDefault();
    const { currentDate } = this.state;
    const prevMonth = currentDate.clone().subtract(1, 'month');
    this.setState({
      currentDate: prevMonth,
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
