import * as types from './actionstypes';

const initialState = {
  conciliacion: [],
  conciliacionExcel: [],
};

export const ConciliacionMercadoPago = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if(action.type == types.GET_CONCILIACION_MERCADOPAGO){
    return Object.assign({}, state, {
      conciliacion: action.payload
    });
  } else if(action.type == types.GET_CONCILIACION_MERCADOPAGO_EXCEL){
    return Object.assign({}, state, {
      conciliacionExcel: action.payload
    });
  }  else {
    return state;
  }
};
