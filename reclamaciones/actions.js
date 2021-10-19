import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest,  axiosPost } from '../api/axiosRequest';


export const getReclamaciones = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-aclaraciones', 'GET', {},query)
      .then(response => {
        dispatch({
          type: types.GET_SOLICITUD_RECLAMACION,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_SOLICITUD_RECLAMACION,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const getReclamaciones2 = async (query) => {
  return await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-aclaraciones', 'GET', {},query)
  .then(response => response.data);
};

export const getObtenerCatalogos2 = async (query) => {
  return await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-catalogos', 'GET', {},query).then(response => response.data);
};

export const getDetailReclaim = async (id) => {
  return await axiosRequest(`tesoreria/mtesoreria-reclamaciones/obtener-detalle-reclamacion/${id}`, 'GET', {}).then(response => response.data);
};

export const getObtenerDistribuidora2 = async (query) => {
  return await axiosRequest(`tesoreria/mtesoreria-reclamaciones/obtener-distribuidora/${query.idPlaza}/${query.clave}`, 
  'GET', {},query)
  .then(response => response.data)
  .catch(error => {
    if(error.response.status === 404){
      Notificaciones.warningMessage('La empresaria no pertenece a la plaza seleccionada.');
      return error.response.data;    
    }
  });
};

export const getObtenerCatalogos = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-reclamaciones/obtener-catalogos', 'GET', {},query)
      .then(response => {
        dispatch({
          type: types.GET_OBTENER_CATALOGOS,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_OBTENER_CATALOGOS,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const getObtenerDistribuidora = (query) => {
  return async (dispatch) => {
    await axiosRequest(`tesoreria/mtesoreria-reclamaciones/obtener-distribuidora/${query.idPlaza}/${query.clave}`, 'GET', {}, {})
      .then(response => {
        dispatch({
          type: types.GET_OBTENER_DISTRIBUIDORA,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_OBTENER_DISTRIBUIDORA,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const getGrabarDistribuidora = (query) => {
  return async (dispatch) => {
    await axiosPost('tesoreria/mtesoreria-reclamaciones/solicitud-reclamacion',  query, {})
      .then(response => {
        dispatch({
          type: types.GET_GRABAR_DISTRIBUIDORA,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_GRABAR_DISTRIBUIDORA,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};