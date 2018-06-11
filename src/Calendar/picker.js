/* @flow */
import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import { Typography } from '@kiwicom/orbit-components';

import Day from './Day';

import {
  Container,
  DaysContainer,
  CalendarContainer,
  DayContentContainer,
  MonthButton,
  MonthContainer,
} from './styles';

type DayType = {
  day: number,
  date: any,
  price: number,
  month: number,
  isToday: bool
}

type State = {
  dayInTheWeek: number,
  month: number,
  days: Array<DayType>
}
type Props = {
  date: any,
  activeDates: any,
  changeDate: (type: string, date: any) => void
}

class Calendar extends React.Component<Props, State> {
  state = {
    dayInTheWeek: 0,
    month: 0,
    days: [],
  };
  static getDerivedStateFromProps(props: Props, state: State) {
    const { date } = props;
    const month = date.clone();
    const daysInMonth = month.daysInMonth();
    const dayInTheWeek = month.startOf('month').isoWeekday();
    const daysArray: number[] = Array.from(Array(daysInMonth).keys());

    // If month didnt change dont rerander
    if (month.month() === state.month) {
      return null;
    }

    const days: {
      day: number,
      date: Moment,
      price: number,
      isToday:bool
    }[] = daysArray
      .map((item) => {
        const day = item + 1;
        const dayDate = props.date.clone().date(day);
        const price = Math.floor(Math.random() * 1000);

        return {
          day,
          date: dayDate,
          price,
          isToday: dayDate.isSame(moment(), 'day'),
        };
      });

    return {
      month: month.month(),
      dayInTheWeek,
      days,
    };
  }
  selectWholeMonth= () => {
    this.props.changeDate('month', this.props.date);
  }
  renderDay = (item: DayType) => (
    <Day
      key={`${item.day}-${this.state.month}`}
      item={item}
      dayInTheWeek={this.state.dayInTheWeek}
      activeDates={this.props.activeDates}
      month={this.state.month}
    />
  )
  render() {
    const { days } = this.state;
    const title = this.props.date.format('MMMM YYYY');
    return (
      <Container>
        <MonthContainer>
          <MonthButton onClick={this.selectWholeMonth}>
            <Typography size="large">{title}</Typography>
          </MonthButton>
        </MonthContainer>
        <DaysContainer>
          <DayContentContainer><Typography size="small" type="secondary">M</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">T</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">W</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">T</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">F</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">S</Typography></DayContentContainer>
          <DayContentContainer><Typography size="small" type="secondary">S</Typography></DayContentContainer>
        </DaysContainer>
        <CalendarContainer>
          {days.map(this.renderDay)}
        </CalendarContainer>
      </Container>
    );
  }
}

export default Calendar;
