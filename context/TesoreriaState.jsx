import React, { useEffect, useReducer } from 'react';
import { getObtenerCatalogos2, getReclamaciones2 } from '../reclamaciones/actions';
import TesoreriaContext from './TesoreriaContext';
import tesoreriaReducer from './tesoreriaReducer';
import { createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

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

const initialState = {
    usuario: null,
    listReclamaciones: {content: []},
    showReclamaciones: {content: []},
    catalogues: {},
    theme: theme,
    isOpenModal: false
};
const TesoreriaState = ({ children }) => {

    const [state, dispatch] = useReducer(tesoreriaReducer, initialState);
    
    const getReclaims = () => {
        let query = {};
        query.folioreclamacion = '';
        query.estatusreclamacion = '';
        query.pageNo = 0;
        query.pageSize = 10000000;

        getReclamaciones2(query).then(response => {

            const newArray = response.content.map(item => {
            return {
                ...item,
                fechareclamacion: moment(item.fechareclamacion).format('DD/MM/YYYY'),
                importe: '$' + item.importe.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            };
        });

        dispatch({
            type: 'get_reclamaciones',
            payload: {...response, content: newArray}
        });
        } 
        );
    };

    useEffect(()=>{
       
        getReclaims();

        getObtenerCatalogos2().then(response => {
            dispatch({
                type:'get_catalogues',
                payload: response
            });
        });

    },[]);

    const changeModal  = () => {
        
        dispatch({
            type:'change_modal'
        });

    };


    // useEffect(()=>{

    // },[reclaims]);

    const searchReclaimsInvoice = (word, stateReclaims) => {
        const resultSearch = state.listReclamaciones.content.filter(item => {
            if(stateReclaims === ''){
                if(item.folioreclamacion.includes(word)){
                  return item;
                }
            }

            if(stateReclaims !== ''){
                if(item.folioreclamacion.includes(word) && item.estatusreclamacion == stateReclaims){
                    return item;
                  }
            }
        });
        
        dispatch({
            type: 'change_showReclamaciones',
            payload: resultSearch
        });
    };

    return (
        <TesoreriaContext.Provider value={
            {
              user: state.user,
              listReclamaciones: state.listReclamaciones,
              showReclamaciones: state.showReclamaciones,
              theme: state.theme,
              isOpenModal: state.isOpenModal,
              catalogues: state.catalogues,
              searchReclaimsInvoice,
              changeModal,
              getReclaims
            }
        }>
            {children}
        </TesoreriaContext.Provider>
    );
};

TesoreriaState.propTypes = {
    children: PropTypes.node.isRequired
};

export default TesoreriaState;