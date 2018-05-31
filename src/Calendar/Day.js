// @flow
import React, { PureComponent } from 'react';
import moment from 'moment';
import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

import { DayContainer, DayContentContainer, DayDrag } from './styles';

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
  changeDate = () => {}
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
  selectDate = (e) => {
    e.preventDefault();
    const { item } = this.props;
    const past = e.currentTarget.attributes.getNamedItem('data-ispast');
    if (past.value === 'true') {
      return;
    }
    const newDate = item.date.clone().startOf('day');
    this.changeDate('clean', newDate);
  }
  dragEnter = (e) => {
    const id = e.target.attributes.getNamedItem('data-id');
    const past = e.target.attributes.getNamedItem('data-ispast');
    if (past && id && id !== this.state.id) {
      if (past.value === 'true') {
        return;
      }
      this.setState({ id });
      const date = id.value.split('-');
      const newDate = moment().date(date[0]).month(date[1]).startOf('day');
      this.changeDate(dragType, newDate);
    }
  }
  dragStart = (e) => {
    const isFirst = e.currentTarget.attributes.getNamedItem('data-isfirst').value;
    dragType = isFirst === 'true' ? 'start' : 'end';
  }
  addPreviousDay = (e) => {
    e.preventDefault();
    this.changeDate('subtract');
  }
  addNextDay = (e) => {
    e.preventDefault();
    this.changeDate('add');
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
    return (
      <SelectedDates.Consumer>
        {(selectedDates) => {
        const { changeDate } = selectedDates;
        this.changeDate = changeDate;
        return (
          <DayContainer>
            <DayContentContainer
              draggable
              onClick={this.selectDate}
              data-id={`${item.day}-${month}`}
              data-ispast={past}
              data-isfirst={isFirst}
              onDragStart={this.dragStart}
              onDragEnter={this.dragEnter}
              active={active}
              startAt={item.day === 1 && dayInTheWeek}
            >
              <DayContent
                item={item}
                active={active}
                past={past}
              />
            </DayContentContainer>
            {isFirst ? (
              <DayDrag onClick={this.addPreviousDay}>{'<'}</DayDrag>
            ) : null}
            {isLast ? (
              <DayDrag
                last
                onClick={this.addNextDay}
              >{'>'}
              </DayDrag>
            ) : null}
          </DayContainer>
        );
      }}

      </SelectedDates.Consumer>

    );
  }
}

export default Day;
