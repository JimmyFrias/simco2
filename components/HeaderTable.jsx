import React, {useContext, useState} from 'react';
import TesoreriaContext from '../context/TesoreriaContext';
import {  MenuItem, MuiThemeProvider, TextField } from '@material-ui/core';
import {validateEntry} from '../helpers/validate';
import { ApoloButton } from 'dsmapolo-react';

const HeaderTable = () => {
    const {theme, searchReclaimsInvoice} = useContext(TesoreriaContext);

    const [folio,setFolio] = useState('');


    const [buscar, setBuscar] = useState(false);

    const handleChangeFolio = (e) => {
      const value = e.target.value;
      const re =  /^[a-zA-Z0-9]*$/;
      if (value === '' || re.test(value)) {
        setFolio( e.target.value.substr(0, 19));
        setBuscar(true);
        return;
      }
      setBuscar(false);
    };

    const  handlerCopyCobranza = (event) => {
        event.preventDefault();
      };

      const [stateReclaims, setStateReclaims] = useState('');

     const  handleChangeStatus = (e) => {
        setStateReclaims( e.target.value);
      };

      const getReclaims =() => {
          if(buscar){
            searchReclaimsInvoice(folio,stateReclaims);
          }
      };
    return (
        <div className='reclamaciones_bottomArea'>
            <MuiThemeProvider theme={theme}>
              <div className='reclamaciones_textfieldarea2'>
                <TextField
                  style={{ width: '100%' }}
                  label='Buscar por folio'
                  variant='outlined'
                  autoComplete='off'
                  inputProps={{ maxLength: '20' }}
                  onKeyPress={validateEntry}
                  value={folio}
                  onChange={handleChangeFolio}
                  onPaste={handlerCopyCobranza}
                />
              </div>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <div className='reclamaciones_textfieldarea'>
                <TextField
                  style={{ width: '100%' }}
                  label='Estatus'
                  variant='outlined'
                  select
                  value={stateReclaims}
                  onChange={handleChangeStatus}
                >
                  <MenuItem value=''>Todas</MenuItem>
                  <MenuItem value='CONCLUIDA'>Concluida</MenuItem>
                  <MenuItem value='PENDIENTE'>Pendiente</MenuItem>
                </TextField>
              </div>
            </MuiThemeProvider>

            <div className='buscarReclamacionContainer'>
              <ApoloButton
                contained
                id='buttonSearch'
                text={'Buscar'}
                onClick={getReclaims}
                full
              />
            </div>
          </div>
    );
};

export default HeaderTable;