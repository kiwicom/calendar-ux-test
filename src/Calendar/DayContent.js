// @flow
import * as React from 'react';
import { Typography } from '@kiwicom/orbit-components';

import { DateTypography } from './styles';

type Props = {
    active: bool,
    past: bool,
    item: {
      day: any,
      price: number
    }
}

const DayContent = ({ item, active, past }: Props) => {
  const {
    day,
    price,
  } = item;
  let type = 'active';
  if (price > 400 && price < 700) {
    type = 'secondary';
  } else if (price > 700) {
    type = 'error';
  }

  let content = (
    <React.Fragment>
      <Typography size="large">{day}</Typography><br />
      <Typography size="small" type={type}>{`$${price}`}</Typography>
    </React.Fragment>
  );
  if (active) {
    content = (
      <React.Fragment>
        <DateTypography>{day}</DateTypography><br />
        <DateTypography fontSize="12px">{`$${price}`}</DateTypography>
      </React.Fragment>
    );
  }
  if (past) {
    content = (
      <React.Fragment>
        <DateTypography color="#bac7d5">{day}</DateTypography><br />
      </React.Fragment>
    );
  }

  return content;
};

export default DayContent;
