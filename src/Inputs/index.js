/* @flow */
import React, { Component } from 'react';
import { Typography } from '@kiwicom/orbit-components';
import type Moment from 'moment';

import { SelectedDates } from '../context/SelectedDates';

import { Container, InputContainer, AnyTimeIcon } from './styles';

import anyTimeIcon from '../img/anytime.svg';

import { DEPARTURE, RETURN, RANGE } from '../constants';

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
    selectedRange = [];
    changeDate = (type: string) => {}; // eslint-disable-line no-unused-vars
    changeSelectedType = (type: string) => {}; // eslint-disable-line no-unused-vars
    checkifActive = (type: string) => type === this.selectedType
    selectAnytime = () => {
      this.changeDate('anytime');
    }
    renderInputs = () => {
      const { start } = this.selectedType === DEPARTURE ? this.departureDate : this.returnDate;
      const range = this.selectedRange;
      const departureActive = this.checkifActive(DEPARTURE);
      const returnActive = this.checkifActive(RETURN);
      const rangeActive = this.checkifActive(RANGE);
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
          <InputContainer
            onClick={() => this.changeSelectedType(RANGE)}
            active={rangeActive}
          >
            <Typography size="small">Length of your stay</Typography><br />
            <Typography size="large">{range[0]} - {range[1]} nights</Typography>
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
            selectedRange,
          }) => {
            this.changeDate = changeDate;
            this.changeSelectedType = changeSelectedType;
            this.selectedType = selectedType;
            this.departureDate = departureDate;
            this.returnDate = returnDate;
            this.selectedRange = selectedRange;

            return this.renderInputs();
          }}
        </SelectedDates.Consumer>
      );
    }
}

export default Inputs;
