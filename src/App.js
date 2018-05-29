import React, { Component } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import Inputs from "./Inputs";
import Footer from "./Footer"
import './App.css';

import {
  CalendarContainer
} from "./styles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(),
    };
  }
  render() {
    const { currentDate } = this.state;
    const nextMonth = currentDate.clone().add(1, 'month');
    return (
      <div className="App">
        <Inputs />
        <CalendarContainer>
          <Calendar date={currentDate} />
          <Calendar date={nextMonth} />
        </CalendarContainer>
        <Footer/>
      </div>
    );
  }
}

export default App;
