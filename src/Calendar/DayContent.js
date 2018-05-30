// @flow
import * as React from 'react';
import { Typography } from '@kiwicom/orbit-components';

import { DateTypography } from './styles';

type Props = {
    active: bool,
    item: number
}

const DayContent = ({ item, active, past }: Props) => {
  const price = Math.floor(Math.random() * 1000);
  let type = 'active';
  if (price > 400 && price < 700) {
    type = 'secondary';
  } else if (price > 700) {
    type = 'error';
  }
  let content = (
    <React.Fragment>
      <Typography size="large">{item + 1}</Typography><br />
      <Typography size="small" type={type}>${price}</Typography>
    </React.Fragment>
  );
  if (active) {
    content = (
      <React.Fragment>
        <DateTypography>{item + 1}</DateTypography><br />
        <DateTypography fontSize="12px">{`$${price}`}</DateTypography>
      </React.Fragment>
    );
  }
  if (past) {
    content = (
      <React.Fragment>
        <DateTypography color="#bac7d5">{item + 1}</DateTypography><br />
      </React.Fragment>
    );
  }

  return content;
};

export default DayContent;
