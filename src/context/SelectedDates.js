// @flow
import React from 'react';
import moment from 'moment';
import type Moment from 'moment';

const initialState = {
  selectedType: '',
  currentMonth: moment(),
  departureDate: {},
  returnDate: {},
  changeDate: (type: string, date: Moment) => {}, // eslint-disable-line no-unused-vars
  changeSelectedType: {},
};

export default React.createContext({
  ...initialState,
});
