import * as types from './actionstypes';

const initialState = {
  reclamaciones: [],
  catalogo: [],
  distribuidora: [],
  grabardistribuidora: 0,
};

export const Reclamaciones = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if(action.type == types.GET_SOLICITUD_RECLAMACION){
    return Object.assign({}, state, {
      reclamaciones: action.payload
    });
  } else if(action.type == types.GET_OBTENER_CATALOGOS){
    return Object.assign({}, state, {
      catalogo: action.payload
    });
  } else if(action.type == types.GET_OBTENER_DISTRIBUIDORA){
    return Object.assign({}, state, {
      distribuidora: action.payload
    });
  } else if(action.type == types.GET_GRABAR_DISTRIBUIDORA){
    return Object.assign({}, state, {
      grabardistribuidora: action.payload
    });
  }  else {
    return state;
  }
};

