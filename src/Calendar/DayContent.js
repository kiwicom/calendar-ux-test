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
  if (price > 600) {
    type = 'secondary';
  }

  let content = (
    <div>
      <Typography size="large">{day}</Typography><br />
      <Typography size="small" type={type}>{`$${price}`}</Typography>
    </div>
  );
  if (active) {
    content = (
      <div>
        <DateTypography>{day}</DateTypography><br />
        <DateTypography fontSize="12px">{`$${price}`}</DateTypography>
      </div>
    );
  }
  if (past) {
    content = (
      <div>
        <DateTypography color="#bac7d5">{day}</DateTypography><br />
      </div>
    );
  }

  return content;
};

export default DayContent;
