// @flow
import React, { Component } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

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
      past: day.isBefore(moment()),
    };
  }
  selectDate= (changeDate: (date: any) => void) => {
    const { item, month } = this.props;
    const newDate = moment().month(month).date(item).startOf('day');
    changeDate(newDate);
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
      active = day.isBetween(start, activeDates.end.clone().add(1, 'day'));
    }

    const Content = <DayContent item={item} active={active} past={past} />;

    return (
      <SelectedDates.Consumer>
        {(selectedDates) => {
        const { changeDate } = selectedDates;
        return (
          <DayContainer
            draggable
            onClick={() => this.selectDate(changeDate)}
            active={active}
            startAt={item === 1 && dayInTheWeek}
          >
            {Content}
          </DayContainer>);
      }}

      </SelectedDates.Consumer>

    );
  }
}

export default Day;
