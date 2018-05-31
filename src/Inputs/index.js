/* @flow */
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';

import { Container, InputContainer } from './styles';

import { DEPARTURE, RETURN } from '../constants';

type State = {
    departureString: string,
    returnString: string
}
type Props = {
    departureDate: {|
      start: any,
      end: any
    |},
    returnDate: any,
    selectedType: string,
    changeSelectedType: (type: string) => void
}

class Inputs extends Component<Props, State> {
    state = {
      departureString: '',
      returnString: '',
    }
    static getDerivedStateFromProps(props: Props) {
      const { departureDate, returnDate } = props;
      let returnString = 'Set a date';
      let departureString = 'Set a date';

      const departureStart = departureDate.start.format('ddd DD MMM');
      const departureEnd = departureDate.end.format('ddd DD MMM');
      if (departureDate.start.isSame(departureDate.end, 'day')) {
        departureString = `${departureStart}`;
      } else {
        departureString = `${departureStart} - ${departureEnd}`;
      }

      if (returnDate.start && returnDate.end) {
        const returnStart = returnDate.start.format('ddd DD MMM');
        const returnEnd = returnDate.end.format('ddd DD MMM');
        if (returnDate.start.isSame(returnDate.end, 'day')) {
          returnString = `${returnStart}`;
        } else {
          returnString = `${returnStart} - ${returnEnd}`;
        }
      }

      return {
        departureString,
        returnString,
      };
    }
    checkifActive = (type: string) => type === this.props.selectedType
    render() {
      return (
        <Container>
          <InputContainer
            onClick={() => this.props.changeSelectedType(DEPARTURE)}
            active={this.checkifActive(DEPARTURE)}
          >
            <Typography size="small">Departure</Typography><br />
            <Typography size="large">{this.state.departureString}</Typography>
          </InputContainer>
          <InputContainer
            onClick={() => this.props.changeSelectedType(RETURN)}
            active={this.checkifActive(RETURN)}
          >
            <Typography size="small">Return</Typography><br />
            <Typography size="large">{this.state.returnString}</Typography>
          </InputContainer>
          <InputContainer>
            <Typography size="small">Length of your stay</Typography><br />
            <Typography size="large">4-6 nights</Typography>
          </InputContainer>
        </Container>
      );
    }
}

export default Inputs;
