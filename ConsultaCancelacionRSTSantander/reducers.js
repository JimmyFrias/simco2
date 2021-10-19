import * as types from './actionstypes';

const initialState = {
  listRstSantander: [],
};

export const ConsultaCancelacionRSTSantander = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case types.GET_CONSULTA_RST_SANTANDER:
      return Object.assign({}, state, {
        listRstSantander: action.payload
      });
    case types.GET_CANCELACION_RST_SANTANDER:
      return Object.assign({}, state, {
        cancelacionRstSantander: action.payload
      });
    default:
      return state;
  }
};
