// @flow
import * as React from 'react';
import { Typography, Button, Icons } from '@kiwicom/orbit-components';

import App from './App';

import {
  Title,
  Container,
  Inputs,
  RightContent,
  Spacer,
} from './page.styles';
import './App.css';

const { Search } = Icons;

type State = {
    calendarVisible: bool
}

class Page extends React.Component<null, State> {
    state={
      calendarVisible: false,
    }
    showCalendar = () => {
      this.setState({
        calendarVisible: true,
      });
    }
    render() {
      const { calendarVisible } = this.state;
      return (
        <Container>
          {!calendarVisible ? <Title>Travelanywhere</Title> : <Title>Set a departure date</Title>}
          {!calendarVisible ?
            <React.Fragment>
              <Inputs onClick={this.showCalendar}>
                <Typography size="large" type="secondary">Try Sightseeing Europe</Typography>
                <RightContent>
                  <Typography>Round trip</Typography>
                  <Spacer />
                  <span style={{ marginRight: '10px' }}>
                    <Typography>Departure - Return</Typography>
                  </span>
                  <Button Icon={Search} onlyIcon onClick={() => {}} />
                </RightContent>
              </Inputs>
              <p style={{ marginTop: '15px' }}>
                <Typography size="large">Search Flights, trains & buses from Brno, Prague and Vienna</Typography>
              </p>
            </React.Fragment>
          :
            <App />
          }
        </Container>
      );
    }
}

export default Page;
