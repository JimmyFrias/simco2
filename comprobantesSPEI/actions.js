import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest } from '../api/axiosRequest';

export const getComprobanteSpei = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-consultacomprobante', 'GET', {}, query)
      .then(response => {
        dispatch({
          type: types.GET_COMPROBANTE_SPEI,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_COMPROBANTE_SPEI,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};
