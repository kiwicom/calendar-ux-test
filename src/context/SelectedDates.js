// @flow
import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import { DEPARTURE } from '../constants';

type DateType = {
  anytime: bool,
  start: Moment | null,
  end: Moment | null
}

export type changeDateTypes = 'anytime' | 'month' | 'subtract' | 'add' | "clean" | "start" | "end";

const initialState = {
  selectedType: DEPARTURE,
  currentMonth: moment(),
  departureDate: {
    anytime: false,
    start: moment(),
    end: moment().add(1, 'day'),
  },
  returnDate: {
    anytime: false,
    start: null,
    end: null,
  },
  changeDate: (type: string, date: Moment) => {}, // eslint-disable-line no-unused-vars
  changeSelectedType: (type: string) => {}, // eslint-disable-line no-unused-vars
  range: [],
};

type Props = {
  children: React.Node,
};

export type State = {
  selectedType: string,
  currentMonth: Moment,
  departureDate: DateType,
  returnDate: DateType,
  changeDate: (type: string, date: Moment) => void, // eslint-disable-line no-unused-vars
  changeSelectedType: (type: string) => void,
  range: [],
};

export const SelectedDates = React.createContext({
  ...initialState,
  nextMonth: () => {},
  prevMonth: () => {},
});

class SelectedDatesProvider extends React.Component<Props, State> {
  state = initialState;

  changeDate = (type: changeDateTypes, date: any) => {
  // TODO: refactor this
    const { selectedType } = this.state;
    const { start, end }:{start: Moment, end: Moment} = selectedType === DEPARTURE ?
      this.state.departureDate : this.state.returnDate;

    if (type === 'anytime') {
      this.setState({
        [selectedType]: {
          anytime: true,
          start: null,
          end: null,
        },
      });
    }
    if (type === 'month') {
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date.clone().startOf('month'),
          end: date.clone().endOf('month'),
        },
      });
    }
    if (type === 'subtract') {
      this.setState({
        [selectedType]: {
          anytime: false,
          start: start.clone().subtract(1, 'day'),
          end,
        },
      });
    }
    if (type === 'add') {
      this.setState({
        [selectedType]: {
          anytime: false,

          start,
          end: end.clone().add(1, 'day'),
        },
      });
    }
    if (type === 'clean') {
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date,
          end: date.clone(),
        },
      });
    }
    if (type === 'start') {
      let newEnd = end;
      if (end.isBefore(date)) {
        newEnd = date.clone().add(1, 'day');
      }
      this.setState({
        [selectedType]: {
          anytime: false,
          start: date,
          end: newEnd,
        },
      });
    }
    if (type === 'end') {
      if (date.isBefore(start)) {
        return;
      }
      this.setState({
        [selectedType]: {
          anytime: false,
          start,
          end: date,
        },
      });
    }
  }

  changeSelectedType = (selectedType: string) => {
    this.setState({
      selectedType,
    });
  }

  nextMonth = () => {
    const { currentMonth } = this.state;
    const nextMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: nextMonth,
    });
  }

  prevMonth = () => {
    const { currentMonth } = this.state;
    const prevMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: prevMonth,
    });
  }
  render() {
    const {
      selectedType, currentMonth, departureDate, returnDate,
    } = this.state;

    return (
      <SelectedDates.Provider
        value={{
          selectedType,
          currentMonth,
          departureDate,
          returnDate,
          nextMonth: this.nextMonth,
          prevMonth: this.prevMonth,
          changeSelectedType: this.changeSelectedType,
          changeDate: this.changeDate,
       }}
      >
        {this.props.children}
      </SelectedDates.Provider>
    );
  }
}

export default SelectedDatesProvider;

