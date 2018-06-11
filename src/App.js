// @flow
import React from 'react';

import Calendar from './Calendar';
// import Range from './Range';
import Inputs from './Inputs';
import Footer from './Footer';
import CalendarNavigation from './Calendar/Navigation';

const App = () => (
  <div className="App">
    <Inputs />
    <Calendar />
    <CalendarNavigation />
    <Footer />
    {/* <Range /> */}
  </div>
);

export default App;
