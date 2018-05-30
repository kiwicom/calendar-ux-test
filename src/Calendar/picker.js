/* @flow */
import * as React from 'react';
import moment from 'moment';
import { Typography } from '@kiwicom/orbit-components';

import {
  Container,
  DaysContainer,
  CalendarContainer,
  Day,
  MonthButton,
  MonthContainer,
  DateTypography,
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
    const daysInMonth = date.daysInMonth();
    const dayInTheWeek = date.startOf('month').isoWeekday();
    return {
      dayInTheWeek,
      daysInMonth,
    };
  }
  generateDay = (item: number) => {
    const { dayInTheWeek } = this.state;
    const { departureDate } = this.props;
    // This is because selected date should be also highlighted
    const start = (departureDate.start.clone().subtract(1, 'day'));

    const day = moment().date(item).month(this.props.date.month());
    const price = Math.floor(Math.random() * 1000);
    let type = 'active';
    if (price > 400 && price < 700) {
      type = 'secondary';
    } else if (price > 700) {
      type = 'error';
    }

    const active = day.isBetween(start, departureDate.end);

    const Content = active ? (
      <React.Fragment>
        <DateTypography>{item + 1}</DateTypography><br />
        <DateTypography>${price}</DateTypography>
      </React.Fragment>
    ) :
      (
        <React.Fragment>
          <Typography size="large">{item + 1}</Typography><br />
          <Typography size="small" type={type}>${price}</Typography>
        </React.Fragment>
      );

    if (item === 0) {
      return (
        <Day key={item} startAt={dayInTheWeek}>
          {Content}
        </Day>);
    }
    return (
      <Day key={item} active={active}>
        {Content}
      </Day>);
  };
  renderDays = () => {
    const { daysInMonth } = this.state;
    return Array.from(Array(daysInMonth).keys())
      .map(item => this.generateDay(item));
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
