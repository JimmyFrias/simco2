import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const showLoading = (condition) => {
    return condition ?
        <div className="overlay"><CircularProgress disableShrink className="c00ac68" size={100} thickness={4} /></div>
        :
        <div />;
};