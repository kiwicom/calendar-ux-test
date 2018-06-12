// @flow
import React, { Fragment } from 'react';

import Title from './Calendar/Title';
import Calendar from './Calendar';
import Range from './Range';
import Inputs from './Inputs';
import Footer from './Footer';
import CalendarNavigation from './Calendar/Navigation';

import { SelectedDates } from './context/SelectedDates';
import { RANGE } from './constants';

const App = () => (
  <SelectedDates.Consumer>
    {({ selectedType }) => (
      <Fragment>
        <Title selectedType={selectedType} />
        <div className="App">
          <Inputs />
          {selectedType === RANGE ?
            <Range />
            :
            <Fragment>
              <Calendar />
              <CalendarNavigation />
            </Fragment>
          }
          <Footer />
        </div>
      </Fragment>
    )}

  </SelectedDates.Consumer>

);

export default App;
