// @flow
import React from 'react';

const initialState = {
  selectedType: '',
  currentMonth: {},
  departureDate: {},
  returnDate: {},
};

export default React.createContext({
  ...initialState,
});
