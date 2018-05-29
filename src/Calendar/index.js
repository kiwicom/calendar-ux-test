import React, { Component } from 'react';
import {
  Container,
  DaysContainer,
  CalendarContainer,
  Day,
  Title,
} from './styles';

// type State = {
//   dayInTheWeek: number,
//   daysInMonth: number
// }

// type Props = {
//     date: Object
// }

class Calendar extends Component {
  state = {
    dayInTheWeek: 0,
    daysInMonth: 0,
  }
  static getDerivedStateFromProps(props) {
    const { date } = props;
    const daysInMonth = date.daysInMonth();
    const dayInTheWeek = date.startOf('month').isoWeekday();
    return {
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
    const title = this.props.date.format('MMMM YYYY');
    return (
      <Container>
        <Title>{title}</Title>
        <DaysContainer>
          <Day>M</Day>
          <Day>T</Day>
          <Day>W</Day>
          <Day>T</Day>
          <Day>F</Day>
          <Day>S</Day>
          <Day>S</Day>
        </DaysContainer>
        <CalendarContainer>
          {this.renderDays()}
        </CalendarContainer>
      </Container>
    );
  }
}

export default Calendar;
