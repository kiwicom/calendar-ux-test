// @flow
import React, { PureComponent } from 'react';
import moment from 'moment';
import type Moment from 'moment';

import DayContent from './DayContent';

import SelectedDates from '../context/SelectedDates';

import { DayContainer, DayContentContainer, DayDrag, DragIcon } from './styles';

import RightImg from '../img/right.svg';
import LeftImg from '../img/left.svg';

// TODO: invastigate why you cannot change component while Draging..
// HACK
let dragType = 'end';

type Props = {
    item: any,
    dayInTheWeek: number,
    activeDates: any,
    month: number,
    isToday: bool
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
  changeDate = (type: string, newDate: Moment) => {} // eslint-disable-line no-unused-vars
  selectDate = (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { item } = this.props;
    const past = e.currentTarget.attributes.getNamedItem('data-ispast');
    if (past.value === 'true') {
      return;
    }
    const newDate = item.date.clone().startOf('day');
    this.changeDate('clean', newDate);
  }
  dragEnter = (e: SyntheticMouseEvent<HTMLElement>) => {
    const id = e.currentTarget.attributes.getNamedItem('data-id');
    const past = e.currentTarget.attributes.getNamedItem('data-ispast');
    if (past && id && id !== this.state.id) {
      if (past.value === 'true') {
        return;
      }
      this.setState({ id: id.value });
      const date = id.value.split('-');
      const newDate = moment().date(date[0]).month(date[1]).startOf('day');
      this.changeDate(dragType, newDate);
    }
  }
  dragStart = (e: SyntheticMouseEvent<HTMLElement>) => {
    const isFirst = e.currentTarget.attributes.getNamedItem('data-isfirst').value;
    dragType = isFirst === 'true' ? 'start' : 'end';
  }
  addPreviousDay = (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.changeDate('subtract');
  }
  addNextDay = (e: SyntheticMouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.changeDate('add');
  }
  render() {
    const {
      dayInTheWeek,
      activeDates,
      isToday,
      item,
      month,
    } = this.props;
    const {
      past,
    } = this.state;
    let active = false;
    let isFirstDay = false;
    let isLast = false;
    if (activeDates.start && activeDates.end) {
      const start = activeDates.start.clone().startOf('day');
      const end = activeDates.end.clone().endOf('day');

      active = item.date.isBetween(start, end);
      isFirstDay = item.date.isSame(start, 'day');
      isLast = item.date.isSame(end, 'day');
    }
    return (
      <SelectedDates.Consumer>
        {(selectedDates) => {
        const { changeDate } = selectedDates;
        this.changeDate = changeDate;
        return (
          <DayContainer
            onDragEnter={this.dragEnter}
            data-id={`${item.day}-${month}`}
            data-ispast={past}
            startAt={item.day === 1 && dayInTheWeek}
          >
            <DayContentContainer
              draggable
              onClick={this.selectDate}
              data-ispast={past}
              data-isfirst={isFirstDay}
              onDragStart={this.dragStart}
              active={active}
            >
              <DayContent
                item={item}
                active={active}
                past={past}
              />
            </DayContentContainer>
            { !isToday && isFirstDay ? (
              <DayDrag onClick={this.addPreviousDay}>
                <DragIcon src={LeftImg} />
              </DayDrag>
            ) : null}
            {isLast ? (
              <DayDrag
                last
                onClick={this.addNextDay}
              >
                <DragIcon src={RightImg} />
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
