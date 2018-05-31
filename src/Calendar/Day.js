// @flow
import React, { PureComponent } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

import { DayContainer, DayDrag } from './styles';

// TODO: invastigate why you cannot change component while Draging..
// HACK
let dragType = 'end';

type Props = {
    item: any,
    dayInTheWeek: number,
    activeDates: any,
    month: number
}

type State = {
    past: bool,
    id: string
}

class Day extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      item,
    } = this.props;
    const day = item.date;
    this.state = {
      id: '',
      past: day.isBefore(moment().startOf('day')),
    };
  }
  selectDate = (e, changeDate: (type: string, date: any) => void) => {
    e.preventDefault();
    const { item } = this.props;
    const past = e.currentTarget.attributes.getNamedItem('data-ispast');
    if (past.value === 'true') {
      return;
    }
    const newDate = item.date.clone().startOf('day');
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
    const isFirst = e.currentTarget.attributes.getNamedItem('data-isfirst').value;
    dragType = isFirst === 'true' ? 'start' : 'end';
  }
  render() {
    const {
      dayInTheWeek, activeDates, item, month,
    } = this.props;
    const {
      past,
    } = this.state;
    let active = false;
    let isFirst = false;
    let isLast = false;
    if (activeDates) {
      const start = activeDates.start.clone().startOf('day');
      const end = activeDates.end.clone().endOf('day');

      active = item.date.isBetween(start, end);
      isFirst = item.date.isSame(start, 'day');
      isLast = item.date.isSame(end, 'day');
    }

    const Content = <DayContent item={item} active={active} past={past} />;

    return (
      <SelectedDates.Consumer>
        {(selectedDates) => {
        const { changeDate } = selectedDates;
        return (
          <DayContainer
            draggable
            data-id={`${item.day}-${month}`}
            data-isfirst={isFirst}
            data-ispast={past}
            onClick={e => this.selectDate(e, changeDate)}
            onDragStart={e => this.dragStart(e)}
            onDragEnter={e => this.dragEnter(e, changeDate)}
            active={active}
            startAt={item.day === 1 && dayInTheWeek}
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
