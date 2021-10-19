import React, {useState, useEffect} from 'react';
import { createMuiTheme, MenuItem, MuiThemeProvider, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
const theme = createMuiTheme({
  palette: {
      primary: { main: '#00AC68' },
  },
  overrides: {
      MuiFormControl: {
          root: {
              height: '80px',
          },
      },
      MuiInputBase: {
          root: {
              height: '49px',
          },
      },
  },
});


// ModalAuthorization.propTypes = {
//   options: PropTypes.arrayOf({
//     text: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//   }),
//   text: PropTypes.string.isRequired,
//   select: PropTypes.shape({
//     value: PropTypes.string.isRequired,
//     setValue: PropTypes.func.isRequired
//   })
// };

const ModalAuthorization = ({options, text, select}) => {
 
const onChangeValue = (e) => {
  select.setValue(e.target.value);
};

    return (
        <div className="">
            <p className="py-5">
                {text}
            </p>

          <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '100%' }}
            name="item"
            id="reclamacionesplaza"
            label="npm*"
            variant="outlined"
            select
            value={select?.value}
            onChange={onChangeValue}
          >
            {options?.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </TextField>
        </MuiThemeProvider>
        </div>
    );
};

export default ModalAuthorization;