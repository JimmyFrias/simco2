import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
const ItemDetail = ({ label, text, xs, sm, md, lg }) => {
    return (
      <Grid className="item-data" item xs={xs} sm={sm} md={md} lg={lg}>
        <Typography
          className="mb-2 font-size-14"
          color="text.secondary"
          variant="subtitle2"
        >
          {label}
        </Typography>
        <Typography className="font-size-16" variant="subtitle1">
          {text}
        </Typography>
      </Grid>
    );
  };

  ItemDetail.propTypes = {
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      xs: PropTypes.number.isRequired,
      sm: PropTypes.number.isRequired,
      md: PropTypes.number.isRequired,
      lg: PropTypes.number.isRequired,
  };

  export default ItemDetail;