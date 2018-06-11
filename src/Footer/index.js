// @flow
import React from 'react';
import {
  Button,
  Typography,
} from '@kiwicom/orbit-components';

import { SelectedDates } from '../context/SelectedDates';

import {
  Container,
  Search,
  Desc,
  DateIcon,
  DescContainer,
} from './styles';

import { DEPARTURE } from '../constants';

import anyTimeImg from '../img/anytime.svg';

const Footer = () => (
  <Container>
    <DescContainer>
      <DateIcon src={anyTimeImg} />
      <Typography size="small" type="secondary">
        Click for reset to Anytime
      </Typography>
    </DescContainer>
    <Search>
      <Desc>
        <Typography size="small" type="secondary">
          <SelectedDates.Consumer>
            {({ selectedType }) => (selectedType === DEPARTURE ?
                          'Showing prices for Vienna -> Paris'
                          :
                          'Showing prices for Paris -> Vienna')}
          </SelectedDates.Consumer>
        </Typography>
      </Desc>
      <Button title="Done" onClick={() => {}} />
    </Search>
  </Container>
);


export default Footer;
