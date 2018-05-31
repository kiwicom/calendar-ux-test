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

import anyTimeImg from '../img/anytime.svg';

const Footer = () =>
  (
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
            {'Showing prices for Vienna -> Paris'}
          </Typography>
        </Desc>
        <Button title="Done" onClick={() => {}} />
      </Search>
    </Container>
  );


export default Footer;
