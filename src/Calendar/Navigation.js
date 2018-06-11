// @flow
import React, { Fragment } from 'react';

import { SelectedDates } from '../context/SelectedDates';

import { Navigation, NavigationIcon } from './styles';

import NavigationLeftImg from '../img/left.svg';
import NavigationRightImg from '../img/right.svg';

const Nav = () => (
  <SelectedDates.Consumer>
    {({ prevMonth, nextMonth }) => (
      <Fragment>
        <Navigation onClick={prevMonth} left>
          <NavigationIcon src={NavigationLeftImg} />
        </Navigation>
        <Navigation onClick={nextMonth}>
          <NavigationIcon src={NavigationRightImg} />
        </Navigation>
      </Fragment>
      )}
  </SelectedDates.Consumer>
);

export default Nav;
