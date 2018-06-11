// @flow
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';
import { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';
import './slider.css';
import { Title, Container, Content, RangeContainer } from './styles';

class RangeComponent extends Component {
    changeRange = (change) => {
      console.log(change);
    }
    render() {
      return (
        <Container>
          <Title>
            <Typography size="header">Stay 4 - 6 nights</Typography>
          </Title>
          <Content>
            <Typography size="large">1</Typography>
            <RangeContainer>
              <Range
                min={1}
                max={31}
                defaultValue={[3, 5]}
                onChange={this.changeRange}
              />
            </RangeContainer>
            <Typography size="large">31</Typography>
          </Content>
        </Container>
      );
    }
}

export default RangeComponent;

