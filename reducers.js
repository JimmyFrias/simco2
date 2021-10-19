import * as types from './actionstypes';

const initialState = {
  cobranzaList: [],
  plazasList: []
};

export const Cobranza = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case types.GET_LIST_COBRANZA:
      return Object.assign({}, state, {
        cobranzaList: action.payload
      });
    case types.GET_LIST_PLAZAS:
      return Object.assign({}, state, {
        plazasList: action.payload
      });
    default:
      return state;
  }
};
