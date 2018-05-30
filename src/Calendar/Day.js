// @flow
import React, { Component } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import { DayContainer } from './styles';

type Props = {
    item: number,
    dayInTheWeek: number,
    activeDates: any,
    month: string
}

type State = {
    day: any,
    past: bool
}

class Day extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      item, month,
    } = this.props;
    const day = moment().date(item).month(month);
    this.state = {
      day,
      past: day.clone().isBefore(moment()),
    };
  }
  selectDate= (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(this.props.item);
    console.log(this.props.month);
    console.log(this.state.past);
  }
  render() {
    const {
      dayInTheWeek, activeDates, item,
    } = this.props;
    const {
      past,
      day,
    } = this.state;
    let active = false;

    if (activeDates) {
      const start = (activeDates.start.clone());
      active = day.clone().isBetween(start, activeDates.end.clone().add(1, 'day'));
    }

    const Content = <DayContent item={item} active={active} past={past} />;

    if (item === 1) {
      return (
        <DayContainer startAt={dayInTheWeek}>
          {Content}
        </DayContainer>);
    }
    return (
      <DayContainer onClick={this.selectDate} active={active}>
        {Content}
      </DayContainer>

    );
  }
}

export default Day;
