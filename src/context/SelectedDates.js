// @flow
import React from 'react';

const initialState = {
  selectedType: '',
  currentMonth: {},
  departureDate: {},
  returnDate: {},
  changeDate: () => {},
  changeSelectedType: () => {},
};

export default React.createContext({
  ...initialState,
});
