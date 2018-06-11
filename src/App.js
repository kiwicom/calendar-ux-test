// @flow
import React, { Fragment } from 'react';

import Calendar from './Calendar';
// import Range from './Range';
import Inputs from './Inputs';
import Footer from './Footer';
import CalendarNavigation from './Calendar/Navigation';

import { SelectedDates } from './context/SelectedDates';
import { DEPARTURE } from './constants';

import { Title } from './page.styles';

const App = () => (
  <SelectedDates.Consumer>
    {({ selectedType }) => (
      <Fragment>
        {selectedType === DEPARTURE ?
          <Title>Set a departure date</Title>
                  :
          <Title>Set a return date</Title>
        }
        <div className="App">
          <Inputs />
          <Calendar />
          <CalendarNavigation />
          <Footer />
        </div>
      </Fragment>
    )}

  </SelectedDates.Consumer>

);

export default App;
