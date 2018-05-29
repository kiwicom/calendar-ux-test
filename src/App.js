import React, { Component } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import Inputs from "./Inputs";

import './App.css';

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
        <Calendar date={currentDate} />
        <Calendar date={nextMonth} />
      </div>
    );
  }
}

export default App;
