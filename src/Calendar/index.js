/* @flow */
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';
import {
  Container,
  DaysContainer,
  CalendarContainer,
  Day,
  MonthButton,
  MonthContainer,
} from './styles';

type State = {
  dayInTheWeek: number,
  daysInMonth: number
}
type Props = {
  date: any
}

class Calendar extends Component<Props, State> {
  state = {
    dayInTheWeek: 0,
    daysInMonth: 0,
  }
  static getDerivedStateFromProps(props: Props) {
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
        const price = Math.floor(Math.random() * 1000);
        let type = 'active';
        if (price > 400 && price < 700) {
          type = 'secondary';
        } else if (price > 700) {
          type = 'error';
        }
        if (item === 0) {
          return (
            <Day key={item} startAt={dayInTheWeek}>
              <Typography size="large">{item + 1}</Typography>
            </Day>);
        }
        return (
          <Day key={item}>
            <Typography size="large">{item + 1}</Typography><br />
            <Typography size="small" type={type}>${price}</Typography>
          </Day>);
      });
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
          <Day><Typography size="small" type="secondary">M</Typography></Day>
          <Day><Typography size="small" type="secondary">T</Typography></Day>
          <Day><Typography size="small" type="secondary">W</Typography></Day>
          <Day><Typography size="small" type="secondary">T</Typography></Day>
          <Day><Typography size="small" type="secondary">F</Typography></Day>
          <Day><Typography size="small" type="secondary">S</Typography></Day>
          <Day><Typography size="small" type="secondary">S</Typography></Day>
        </DaysContainer>
        <CalendarContainer>
          {this.renderDays()}
        </CalendarContainer>
      </Container>
    );
  }
}

export default Calendar;
