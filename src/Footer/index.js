import React from 'react';
import {
  Button,
  Typography,
} from '@kiwicom/orbit-components';

import { Container, Search, Desc } from './styles';

const Footer = () =>
  (
    <Container>
      <Typography size="small" type="secondary">
          Pick a date of your return
      </Typography>
      <Search>
        <Desc>
          <Typography size="small" type="secondary">
            Showing prices for Vienna -> Paris
          </Typography>
        </Desc>
        <Button title="Search" onClick={() => {}} />
      </Search>
    </Container>
  );


export default Footer;
