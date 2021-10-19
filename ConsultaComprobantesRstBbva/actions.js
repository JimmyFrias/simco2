import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest } from '../api/axiosRequest';

export const getDetallesComprobante = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-comprobanterst/detalles', 'GET', {}, query)
      .then(response => {
        dispatch({
          type: types.MTESORERIA_COMPROBANTE_RST_DETALLES,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response.data) {
          dispatch({
            type: types.MTESORERIA_COMPROBANTE_RST_DETALLES_ERROR,
            payload: error.response.data,
          });
          Notificaciones.warningMessage(error.response.data.message);
        } else {
            Notificaciones.errorMessage(error);
        }
      });
  };
};

export const getImprimeRST = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-comprobanterst/imprimeRST', 'GET', {}, query, 'arraybuffer')
      .then(response => {
        dispatch({
          type: types.MTESORERIA_COMPROBANTE_RST_IMPRIMERST,
          payload: response.data
        });
      })
      .catch(() => {});
  };
};
