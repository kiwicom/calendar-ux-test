// @flow
import React from 'react';
import {
  Button,
  Typography,
} from '@kiwicom/orbit-components';

import {
  Container,
  Search,
  Desc,
  DateIcon,
  DescContainer,
} from './styles';

import { DEPARTURE } from '../constants';

import anyTimeImg from '../img/anytime.svg';

type Props = {
  selectedType: string
}

const Footer = ({ selectedType }: Props) => (
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

          {selectedType === DEPARTURE ?
            'Showing prices for Vienna -> Paris'
            :
            'Showing prices for Paris -> Vienna'
          }
        </Typography>
      </Desc>
      <Button title="Done" onClick={() => {}} />
    </Search>
  </Container>
);


export default Footer;
