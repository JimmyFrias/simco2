import { Divider, List, MenuItem, MuiThemeProvider, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import TesoreriaContext from '../../../context/TesoreriaContext';
import Form2 from '../forms/Form2';
import FormReclams from '../forms/FormReclams';

const ModalReclaims = () => {

    const {theme, catalogues, changeModal} = useContext(TesoreriaContext);

    const [tiporeclamacion, setTipoReclamacion] = useState(0);

    const  showForm = (idForm) => {
        switch (idForm) {
          case 1:
            return <FormReclams idReclamo={idForm} />;
      
            case 2:
              return <Form2  />;
      
          default:
            return '';
        }
      };


    return (
            <form className='reclamacionDrawer' role='presentation'>
              <List style={{ width: '100%' }}>
                <div className='reclamacionDrawerHeader'>
                  <a
                    className='reclamacionDrawerHeaderx'
                    onClick={changeModal}
                  >
                    X
                  </a>
                  <p>Solicitud de reclamación</p>
                </div>
                <Divider style={{ marginBottom: '50px' }} />
              </List>
      
              <div className='reclamacionDrawerContainer'>   
                      <MuiThemeProvider  theme={theme}>
                      <TextField
                        style={{ width: '100%' }}
                        name='tiporeclamacion'
                        id='tiporeclamacion'
                        label='Tipo de reclamación'
                        variant='outlined'
                        select
                        value={tiporeclamacion}
                        onChange={(e) => setTipoReclamacion(e.target.value) }
                      >
                        {catalogues?.tiposaclaracion?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                             {item.descripciontipo}
                          </MenuItem>
                        ))}
                        </TextField>
                    </MuiThemeProvider>
                <div>
      
                {showForm(tiporeclamacion)}
      
                </div>
              </div>
            </form>
    );
};

export default ModalReclaims;