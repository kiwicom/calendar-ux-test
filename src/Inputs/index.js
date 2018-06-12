/* @flow */
import React, { Component } from 'react';
import { Typography, Heading } from '@kiwicom/orbit-components';
import type Moment from 'moment';

import { SelectedDates } from '../context/SelectedDates';

import {
  Container,
  Content,
  InputContainer,
  LengthContainer,
  AnyTimeIcon,
} from './styles';

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
          <Content>
            <Heading size="small">Departure</Heading>
            <InputContainer
              onClick={() => this.changeSelectedType(DEPARTURE)}
              active={departureActive}
            >
              <Typography size="large">{getDateString(this.departureDate)}</Typography>
              {departureActive && start ?
                <AnyTimeIcon
                  onClick={this.selectAnytime}
                  src={anyTimeIcon}
                />
            : null}
            </InputContainer>
          </Content>
          <Content>
            <Heading size="small">Return</Heading>
            <InputContainer
              onClick={() => this.changeSelectedType(RETURN)}
              active={returnActive}
            >
              <Typography size="large">{getDateString(this.returnDate)}</Typography>
              {returnActive && start ?
                <AnyTimeIcon
                  onClick={this.selectAnytime}
                  src={anyTimeIcon}
                />
            : null}
            </InputContainer>
          </Content>
          <Content>
            <Heading size="small">Trip length</Heading>
            <LengthContainer
              onClick={() => this.changeSelectedType(RANGE)}
              active={rangeActive}
            >
              <Typography size="large">{range[0]} - {range[1]} nights</Typography>
            </LengthContainer>
          </Content>
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
