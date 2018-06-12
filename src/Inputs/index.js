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

type State = {
  returnClicked: bool,
  rangeClicked: bool
}

class Inputs extends Component<{}, State> {
    state = {
      returnClicked: false,
      rangeClicked: false,
    };
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
    typeChanged = (type: string) => {
      if (type === RETURN) {
        this.setState({ returnClicked: true, rangeClicked: false });
      }
      if (type === RANGE) {
        this.setState({ rangeClicked: true, returnClicked: false });
      }
      this.changeSelectedType(type);
    }
    renderInputs = () => {
      let { returnClicked, rangeClicked } = this.state;
      const departureActive = this.checkifActive(DEPARTURE);
      const returnActive = this.checkifActive(RETURN);
      const rangeActive = this.checkifActive(RANGE);
      const range = this.selectedRange;

      const { start } = departureActive ?
        this.departureDate
        :
        this.returnDate;

      if (returnActive) {
        rangeClicked = false;
      }
      if (rangeActive) {
        returnClicked = false;
      }
      return (
        <Container>
          <Content>
            <Heading size="small">Departure</Heading>
            <InputContainer
              onClick={() => this.typeChanged(DEPARTURE)}
              active={departureActive}
            >
              <Typography size="large">
                {getDateString(this.departureDate)}
              </Typography>
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
              onClick={() => this.typeChanged(RETURN)}
              active={returnActive}
            >
              <Typography size="large" type={!returnClicked ? 'secondary' : 'attention'}>
                {getDateString(this.returnDate)}
              </Typography>
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
              onClick={() => this.typeChanged(RANGE)}
              active={rangeActive}
            >
              <Typography size="large" type={!rangeClicked ? 'secondary' : 'attention'}>
                {range[0]} - {range[1]} nights
              </Typography>
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
