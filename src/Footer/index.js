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
                <Typography size="normal" type="secondary">
                  Click for reset to Anytime
                </Typography>
              </Fragment>)
              : null
            }
          </DescContainer>
          <Search>
            <Desc>
              {selectedType === RANGE ?
                (
                  <Fragment>
                    <Typography size="normal">{'Search trips Paris -> Vienna from '}</Typography>
                    <Typography size="normal" type="active">$341</Typography>
                  </Fragment>)
              :
              (
                <Typography size="normal" type="secondary">
                  {selectedType === DEPARTURE ?
                    'Showing prices in $USD for Vienna -> Paris '
                :
                'Showing prices in $USD for Paris -> Vienna '
                }
                </Typography>)}
            </Desc>
            <Button title="Done" onClick={() => {}} />
          </Search>
        </Fragment>
        )}
    </SelectedDates.Consumer>
  </Container>
);


export default Footer;
