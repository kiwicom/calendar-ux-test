// @flow
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { SelectedDates } from '../context/SelectedDates';

import './slider.css';
import { Title, Container, Content, RangeContainer } from './styles';

class RangeComponent extends Component<{}> {
    changeRange = () => {};
    selectedRange = [];
    renderRange = () => {
      const range = this.selectedRange;
      if (range.length !== 2) {
        return null;
      }
      return (
        <Container>
          <Title>
            <Typography size="header">Stay {range[0]} - {range[1]} nights</Typography>
          </Title>
          <Content>
            <Typography size="large">1</Typography>
            <RangeContainer>
              <Range
                min={1}
                max={31}
                defaultValue={[range[0], range[1]]}
                onChange={this.changeRange}
              />
            </RangeContainer>
            <Typography size="large">31</Typography>
          </Content>
        </Container>
      );
    }
    render() {
      return (
        <SelectedDates.Consumer>
          { ({ changeRange, selectedRange }) => {
            this.changeRange = changeRange;
            this.selectedRange = selectedRange;
            return this.renderRange();
          }
        }
        </SelectedDates.Consumer>
      );
    }
}

export default RangeComponent;

