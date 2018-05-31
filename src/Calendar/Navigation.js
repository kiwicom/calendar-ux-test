// @flow
import * as React from 'react';

import { Navigation, NavigationIcon } from './styles';

import NavigationLeftImg from '../img/left.svg';
import NavigationRightImg from '../img/right.svg';

type Props = {
    prevMonth: (e: SyntheticMouseEvent<HTMLElement>) => void,
    nextMonth: (e: SyntheticMouseEvent<HTMLElement>) => void,
}

const Nav = (props: Props) => (
  <React.Fragment>
    <Navigation onClick={props.prevMonth} left>
      <NavigationIcon src={NavigationLeftImg} />
    </Navigation>
    <Navigation onClick={props.nextMonth}>
      <NavigationIcon src={NavigationRightImg} />
    </Navigation>
  </React.Fragment>
);

export default Nav;
