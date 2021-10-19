import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid } from '@material-ui/core';
const Subtitle = ({ text }) => {
    return (
        <Fragment>
            <Grid item xs={12} className="mb-3">
                <div className="mb-4 black bold">{text}</div>
            </Grid>
            <Divider className="mb-4" />
        </Fragment>
    );
};
Subtitle.propTypes = {
    text: PropTypes.string.isRequired
};
export default Subtitle;