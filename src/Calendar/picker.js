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

type DayType = {
  day: number,
  date: any,
  price: number,
  month: number
}

type State = {
  dayInTheWeek: number,
  month: number,
  days: [?DayType],
}
type Props = {
  date: any,
  departureDate: any
}

class Calendar extends React.Component<Props, State> {
  state = {
    dayInTheWeek: 0,
    month: 0,
    days: [{
      day: 1, date: {}, price: 1, month: 1,
    }],
  };
  static getDerivedStateFromProps(props: Props, state: State) {
    const { date } = props;
    const month = date.clone();
    const daysInMonth = month.daysInMonth();
    const dayInTheWeek = month.startOf('month').isoWeekday();
    if (month.month() === state.month) {
      return null;
    }
    return {
      month: month.month(),
      dayInTheWeek,
      days: Array.from(Array(daysInMonth).keys())
        .map((item) => {
          const day = item + 1;
          const dayDate = props.date.clone().date(day);
          const price = Math.floor(Math.random() * 1000);
          return {
            day,
            date: dayDate,
            price,
          };
        }),
    };
  }
  renderDay = (item: DayType) => (
    <Day
      key={`${item.day}-${this.state.month}`}
      item={item}
      dayInTheWeek={this.state.dayInTheWeek}
      activeDates={this.props.departureDate}
      month={this.state.month}
    />
  )
  render() {
    const { days } = this.state;
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
          {days.map(this.renderDay)}
        </CalendarContainer>
      </Container>
    );
  }
}

export default Calendar;
