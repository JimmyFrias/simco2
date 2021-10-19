import * as types from './actionstypes';
import { Notificaciones } from 'utils-accouting';
import { axiosRequest, axiosRequestHeaders } from '../api/axiosRequest';


export const getConciliacionMercadoPago = (query) => {
  return async (dispatch) => {
    await axiosRequest('tesoreria/mtesoreria-consultaconciliacionmercadopago/movimientos', 'GET', {},query)
      .then(response => {
        dispatch({
          type: types.GET_CONCILIACION_MERCADOPAGO,
          payload: response.data
        });
      })
      .catch(error => {
        if(error.response.status === 404){
          dispatch({
            type: types.GET_CONCILIACION_MERCADOPAGO,
            payload: error.response.data
          });
        } else {
          Notificaciones.errorMessage(error);
        }
      });
  };
};


export const getConciliacionMercadoPagoExcel = (query) => {
  return async () => {
    let responseTypeConciliacion = 'blob';
    let headersConciliacion = { 'content-type': 'application/vnd.ms-excel;charset=UTF-8', 'Accept': 'application/xlsx' };
    await axiosRequestHeaders('tesoreria/mtesoreria-consultaconciliacionmercadopago/movimientos-mercado-pago', 'GET', {}, query, responseTypeConciliacion, headersConciliacion)
      .then(response => {
        let blob = new Blob(
          [response.data],
          {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
        );
        let objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        let dateFechaInicio = query.fechaInicio;
        let dateFechaFinal = query.fechaFinal;
        let removedText1 = dateFechaInicio.replace(/\D+/g, '');
        let removedText2 = dateFechaFinal.replace(/\D+/g, '');        
        link.setAttribute('download', `InformeDeMovimientosMercadoPago${removedText1}${removedText2}.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => Notificaciones.errorMessage(error));
  };
};