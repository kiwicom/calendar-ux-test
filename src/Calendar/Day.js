// @flow
import React, { Component } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

import { DayContainer, DayDrag } from './styles';

// TODO: invastigate why you cannot change component while Draging..
// HACK
let dragType = 'end';

type Props = {
    item: number,
    dayInTheWeek: number,
    activeDates: any,
    month: string
}

type State = {
    day: any,
    past: bool,
    id: string
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
    };
  }
  selectDate = (changeDate: (type: string, date: any) => void) => {
    const { item, month } = this.props;
    const newDate = moment().month(month).date(item).startOf('day');
    changeDate('clean', newDate);
  }
  dragEnter = (e, changeDate) => {
    const id = e.target.attributes.getNamedItem('data-id');
    const past = e.target.attributes.getNamedItem('data-ispast');
    if (past && id && id !== this.state.id) {
      if (past.value === 'true') {
        return;
      }
      this.setState({ id });
      const date = id.value.split('-');
      const newDate = moment().date(date[0]).month(date[1]).startOf('day');
      changeDate(dragType, newDate);
    }
  }
  dragStart = (e) => {
    const isFirst = e.target.attributes.getNamedItem('data-isfirst').value;

    dragType = isFirst === 'true' ? 'start' : 'end';
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
            draggable
            data-id={`${item}-${month}`}
            data-isfirst={isFirst}
            data-ispast={past}
            onClick={() => this.selectDate(changeDate)}
            onDragStart={e => this.dragStart(e)}
            onDragEnter={e => this.dragEnter(e, changeDate)}
            active={active}
            startAt={item === 1 && dayInTheWeek}
          >
            {isFirst ? (
              <DayDrag >{'<'}</DayDrag>
            ) : null}
            {Content}
            {isLast ? (
              <DayDrag last>{'>'}</DayDrag>
            ) : null}
          </DayContainer>);
      }}

      </SelectedDates.Consumer>

    );
  }
}

export default Day;
