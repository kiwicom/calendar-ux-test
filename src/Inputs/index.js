/* @flow */
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';

import { Container, InputContainer, AnyTimeIcon } from './styles';

import anyTimeIcon from '../img/anytime.svg';

import { DEPARTURE, RETURN } from '../constants';

type State = {
    departureString: string,
    returnString: string
}
type Props = {
    departureDate: any,
    returnDate: any,
    selectedType: string,
    changeSelectedType: (type: string) => void,
    changeDate: (type: string) => void
}

function getDateString(date) {
  let dateString = 'Set a date';
  if (date.start && date.end) {
    const returnStart = date.start.format('ddd DD MMM');
    const returnEnd = date.end.format('ddd DD MMM');

    if (date.start.isSame(date.end, 'day')) {
      dateString = `${returnStart}`;
    } else {
      dateString = `${returnStart} - ${returnEnd}`;
    }
  } else if (date.anytime) {
    dateString = 'Anytime';
  }
  return dateString;
}

class Inputs extends Component<Props, State> {
    state = {
      departureString: '',
      returnString: '',
    }
    static getDerivedStateFromProps(props: Props) {
      const { departureDate, returnDate } = props;
      const departureString = getDateString(departureDate);
      const returnString = getDateString(returnDate);

      return {
        departureString,
        returnString,
      };
    }
    checkifActive = (type: string) => type === this.props.selectedType
    selectAnytime = () => {
      this.props.changeDate('anytime');
    }
    render() {
      const { selectedType } = this.props;
      const { start } = this.props[selectedType];
      const departureActive = this.checkifActive(DEPARTURE);
      const returnActive = this.checkifActive(RETURN);

      return (
        <Container>
          <InputContainer
            onClick={() => this.props.changeSelectedType(DEPARTURE)}
            active={departureActive}
          >
            <Typography size="small">Departure</Typography><br />
            <Typography size="large">{this.state.departureString}</Typography>
            {departureActive && start ?
              <AnyTimeIcon
                onClick={this.selectAnytime}
                src={anyTimeIcon}
              />
            : null}
          </InputContainer>
          <InputContainer
            onClick={() => this.props.changeSelectedType(RETURN)}
            active={returnActive}
          >
            <Typography size="small">Return</Typography><br />
            <Typography size="large">{this.state.returnString}</Typography>
            {returnActive && start ?
              <AnyTimeIcon
                onClick={this.selectAnytime}
                src={anyTimeIcon}
              />
            : null}
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
