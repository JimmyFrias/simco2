import * as types from './actionstypes';
import { axiosRequestHeaders } from '../api/axiosRequest';
import { Notificaciones } from 'utils-accouting';

export const setFileCsv = (file) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_FILE_CSV,
      payload: file
    });
  };
};

export const setWaiting = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_WAITING,
      payload: true
    });
  };
};

export const setCharginFile = (status) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_CHARGING_FILE,
      payload: status
    });
  };
};

export const sendFile = (file) => {
  let formData  =  new FormData();
  formData.append( 'file', file );
  return async (dispatch) => {
    await axiosRequestHeaders('tesoreria/mtesoreria-cargarcatalogoatmbbva', 'POST', formData, '', 'json', { 'content-type': 'multipart/form-data;', 'Content-Encoding':'gzip'})
    .then(response => {
      if(response.data.length > 0){
        Notificaciones.successMessage('Se cargó el archivo correctamente.');
      }
      dispatch({
        type: types.SET_WAITING,
        payload: false
      });
    })
    .catch(error => {
        Notificaciones.errorMessage(error);
    });
  };
};
