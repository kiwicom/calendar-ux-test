// @flow
import React, { Component } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

import { DayContainer, DayDrag } from './styles';

type Props = {
    item: number,
    dayInTheWeek: number,
    activeDates: any,
    month: string
}

type State = {
    day: any,
    past: bool,
    id: string,
    dragType: string
}

class Day extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      item, month,
    } = this.props;
    const day = moment().date(item).month(month);
    this.state = {
      id: '',
      day,
      past: day.isBefore(moment()),
      dragType: 'end',
    };
  }
  selectDate = (changeDate: (date: any) => void) => {
    const { item, month } = this.props;
    const newDate = moment().month(month).date(item).startOf('day');
    changeDate('start', newDate);
  }
  dragOver = (e, changeDate) => {
    const id = e.target.attributes.getNamedItem('data-id');
    if (id && id !== this.state.id) {
      this.setState({ id });
      const date = id.value.split('-');
      const newDate = moment().date(date[0]).month(date[1]).startOf('day');
      changeDate(this.state.dragType, newDate);
    }
  }
  render() {
    const {
      dayInTheWeek, activeDates, item, month,
    } = this.props;
    const {
      past,
      day,
    } = this.state;
    let active = false;
    let isFirst = false;
    let isLast = false;

    if (activeDates) {
      const start = activeDates.start.clone();
      active = day.isBetween(start, activeDates.end.clone().add(1, 'day'));
      isFirst = day.isSame(start, 'day');
      isLast = day.isSame(activeDates.end, 'day');
    }

    const Content = <DayContent item={item} active={active} past={past} />;

    return (
      <SelectedDates.Consumer>
        {(selectedDates) => {
        const { changeDate } = selectedDates;
        return (
          <DayContainer
            data-id={`${item}-${month}`}
            onClick={() => this.selectDate(changeDate)}
            onDragOver={e => this.dragOver(e, changeDate)}
            active={active}
            startAt={item === 1 && dayInTheWeek}
          >
            {isFirst ? (
              <DayDrag
                draggable
              >{'<'}
              </DayDrag>
            ) : null}
            {Content}
            {isLast ? (
              <DayDrag
                draggable
                last
              >{'>'}
              </DayDrag>
            ) : null}
          </DayContainer>);
      }}

      </SelectedDates.Consumer>

    );
  }
}

export default Day;
