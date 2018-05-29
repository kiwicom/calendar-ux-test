/* @flow */
import React, { Component } from 'react';
import { Container, CalendarContainer, Day, Title } from './styles';

type State = {
  dayInTheWeek: number,
  daysInMonth: number
}

type Props = {
    date: Object
}

class Calendar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { date } = this.props;
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
    const title = this.props.date.format('MMMM YYYY');
    return (
      <Container>
        <Title>{title}</Title>
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
      </Container>
    );
  }
}

export default Calendar;
