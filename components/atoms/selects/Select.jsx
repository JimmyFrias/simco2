  import React from "react";
import { MenuItem, MuiThemeProvider, TextField } from "@material-ui/core";

// type TypeValues = {
//     value?: {}[];
//     values?: { id: number; descripciontipo: string }[];
//     keys?: {
//         value?: string;
//         text?: string;
//     }
// }
// type TypeSelect = {
//     theme?: {};
//     change: Function;
//     name?: string;
//     id?: string;
//     label?: string;
//     variant?: string;
//     style?: null | object;
//     values: TypeValues
// }


const Select = ({ theme, change, name, id, label, variant, style, values, autoComplete }) => {
return (
  <MuiThemeProvider theme={theme} >
  <TextField
      style={style || { width: "100%" }}
      name={name}
      id={id}
      label={label}
      variant={variant || 'outlined'}
      autoComplete={autoComplete || 'off'}
      select
      value={values.value}
      onChange={(e) => change(e)}          
  >
      {values.values.map((item) => (
          <MenuItem value={item[values.keys.value]}>{item[values.keys.text]}</MenuItem>
      ))}
  </TextField>
</MuiThemeProvider>
)
}


export default Select;