import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest } from '../api/axiosRequest';
import decode from 'jwt-decode';

export const getConsultaRSTSantander = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-consultacancelacionrstsantander', 'GET', {}, query)
      .then(response => {
        dispatch({
          type: types.GET_CONSULTA_RST_SANTANDER,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_CONSULTA_RST_SANTANDER,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const postCancelacionRSTSantander = (query) => {
  if (sessionStorage.auth) {
    const { payload: { usuario : { noEmpleado: pkusuario } } } = decode(sessionStorage.auth);
    Object.assign(query, { pkusuario });
  }
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-consultacancelacionrstsantander/cancelacion', 'POST', query, {})
      .then(response => {
        dispatch({
          type: types.GET_CANCELACION_RST_SANTANDER,
          payload: response.data
        });
        Notificaciones.infoMessage('Se cancelaron con éxito los registros seleccionados.');
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_CANCELACION_RST_SANTANDER,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};

export const resetListCancelacionesRTSSantander = () => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_CONSULTA_RST_SANTANDER,
      payload: []
    });
  };
};
