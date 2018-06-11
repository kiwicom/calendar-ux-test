/* @flow */
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';
import type Moment from 'moment';

import { SelectedDates } from '../context/SelectedDates';

import { Container, InputContainer, AnyTimeIcon } from './styles';

import anyTimeIcon from '../img/anytime.svg';

import { DEPARTURE, RETURN } from '../constants';

function getDateString(date: Moment) {
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

class Inputs extends Component<{}> {
    departureDate = {};
    returnDate = {};
    selectedType = '';
    changeDate = (type: string) => {}; // eslint-disable-line no-unused-vars
    changeSelectedType = (type: string) => {}; // eslint-disable-line no-unused-vars
    checkifActive = (type: string) => type === this.selectedType
    selectAnytime = () => {
      this.changeDate('anytime');
    }
    renderInputs = (selectedType: string) => {
      const { start } = selectedType === DEPARTURE ? this.departureDate : this.returnDate;

      const departureActive = this.checkifActive(DEPARTURE);
      const returnActive = this.checkifActive(RETURN);
      return (
        <Container>
          <InputContainer
            onClick={() => this.changeSelectedType(DEPARTURE)}
            active={departureActive}
          >
            <Typography size="small">Departure</Typography><br />
            <Typography size="large">{getDateString(this.departureDate)}</Typography>
            {departureActive && start ?
              <AnyTimeIcon
                onClick={this.selectAnytime}
                src={anyTimeIcon}
              />
            : null}
          </InputContainer>
          <InputContainer
            onClick={() => this.changeSelectedType(RETURN)}
            active={returnActive}
          >
            <Typography size="small">Return</Typography><br />
            <Typography size="large">{getDateString(this.returnDate)}</Typography>
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
    render() {
      return (
        <SelectedDates.Consumer>
          {({
            selectedType,
            changeDate,
            departureDate,
            returnDate,
            changeSelectedType,
          }) => {
            this.changeDate = changeDate;
            this.changeSelectedType = changeSelectedType;
            this.selectedType = selectedType;
            this.departureDate = departureDate;
            this.returnDate = returnDate;

            return this.renderInputs(selectedType);
          }}
        </SelectedDates.Consumer>
      );
    }
}

export default Inputs;
