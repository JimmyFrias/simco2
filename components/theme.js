import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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