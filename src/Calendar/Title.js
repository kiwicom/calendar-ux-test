// @flow
import React, { Fragment } from 'react';

import { DEPARTURE, RETURN, RANGE } from '../constants';
import { Title } from '../page.styles';


const CalendarTitle = ({ selectedType }: {selectedType:string}) => (
  <Fragment>
    {selectedType === DEPARTURE ? <Title>Set a departure date</Title> : null}
    {selectedType === RETURN ? <Title>Set a return date</Title> : null}
    {selectedType === RANGE ? <Title>Set a length of your trip</Title> : null}
  </Fragment>
);

export default CalendarTitle;
