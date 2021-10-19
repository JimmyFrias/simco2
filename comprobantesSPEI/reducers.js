import * as types from './actionstypes';

const initialState = {
  comprobante: [],
};

export const ComprobatesSPEI = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  if(action.type == types.GET_COMPROBANTE_SPEI){
    return Object.assign({}, state, {
      comprobante: action.payload
    });
  } else {
    return state;
  }
};
