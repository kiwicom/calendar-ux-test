// @flow
import React, { Fragment } from 'react';
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

import { DEPARTURE, RANGE } from '../constants';

import anyTimeImg from '../img/anytime.svg';

const Footer = () => (
  <Container>
    <SelectedDates.Consumer>
      {({ selectedType }) => (
        <Fragment>
          <DescContainer>
            {selectedType !== RANGE ? (
              <Fragment>
                <DateIcon src={anyTimeImg} />
                <Typography size="small" type="secondary">
                  Click for reset to Anytime
                </Typography>
              </Fragment>)
              : null
            }
          </DescContainer>
          <Search>
            <Desc>
              <Typography size="small" type="secondary">
                {selectedType === DEPARTURE ?
                'Showing prices for Vienna -> Paris'
                :
                'Showing prices for Paris -> Vienna'
              }
              </Typography>
            </Desc>
            <Button title="Done" onClick={() => {}} />
          </Search>
        </Fragment>
        )}
    </SelectedDates.Consumer>
  </Container>
);


export default Footer;
