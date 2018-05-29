import React, { Component } from 'react';
import moment from 'moment';
import { CalendarContainer, Day } from './styles';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = moment();
    const daysInMonth = date.clone().daysInMonth();
    const dayInTheWeek = date.clone().startOf('month').day();
    this.state = {
      dayInTheWeek,
      daysInMonth,
    };
  }
  renderDays = () => {
    const { dayInTheWeek, daysInMonth } = this.state;
    return Array.from(Array(daysInMonth).keys())
      .map((item) => {
        if (item === 0) {
          return (<Day key={item} startAt={dayInTheWeek}>{item + 1}</Day>);
        }
        return <Day key={item}>{item + 1}</Day>;
      });
  }
  render() {
    return (
      <div>
        <CalendarContainer>
          <Day>M</Day>
          <Day>T</Day>
          <Day>W</Day>
          <Day>T</Day>
          <Day>F</Day>
          <Day>S</Day>
          <Day>S</Day>
        </CalendarContainer>
        <CalendarContainer>
          {this.renderDays()}
        </CalendarContainer>
      </div>
    );
  }
}

export default Calendar;
