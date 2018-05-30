/* @flow */
import * as React from 'react';
import { Typography } from '@kiwicom/orbit-components';

import Day from './Day';

import {
  Container,
  DaysContainer,
  CalendarContainer,
  DayContainer,
  MonthButton,
  MonthContainer,
} from './styles';

type State = {
  dayInTheWeek: number,
  daysInMonth: number
}
type Props = {
  date: any,
  departureDate: any
}

class Calendar extends React.Component<Props, State> {
  state = {
    dayInTheWeek: 0,
    daysInMonth: 0,
  }
  static getDerivedStateFromProps(props: Props) {
    const { date } = props;
    const month = date.clone();
    const daysInMonth = month.daysInMonth();
    const dayInTheWeek = month.startOf('month').isoWeekday();
    return {
      dayInTheWeek,
      daysInMonth,
    };
  }
  renderDays = () => {
    const { daysInMonth } = this.state;
    const month = this.props.date.month();
    return Array.from(Array(daysInMonth).keys())
      .map(item => item + 1)
      .map(item => (
        <Day
          key={`${item}-${month}`}
          item={item}
          dayInTheWeek={this.state.dayInTheWeek}
          activeDates={this.props.departureDate}
          month={month}
        />));
  }
  render() {
    const title = this.props.date.format('MMMM YYYY');
    return (
      <Container>
        <MonthContainer>
          <MonthButton>
            <Typography size="large">{title}</Typography>
          </MonthButton>
        </MonthContainer>
        <DaysContainer>
          <DayContainer><Typography size="small" type="secondary">M</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">T</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">W</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">T</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">F</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">S</Typography></DayContainer>
          <DayContainer><Typography size="small" type="secondary">S</Typography></DayContainer>
        </DaysContainer>
        <CalendarContainer>
          {this.renderDays()}
        </CalendarContainer>
      </Container>
    );
  }
}

export default Calendar;
