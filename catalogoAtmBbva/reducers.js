import * as types from './actionstypes';

const initialState = {
  filecsv: '',
  waiting: false,
  charginFile: false,
};

export const CatalogoAtmBbva = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  if (action.type === types.SET_FILE_CSV) {
    return Object.assign({}, state, {
      filecsv: action.payload
    });
  }

  if (action.type === types.SET_WAITING) {
    return Object.assign({}, state, {
      waiting: action.payload
    });
  }

  if (action.type === types.SET_CHARGING_FILE) {
    return Object.assign({}, state, {
      charginFile: action.payload
    });
  }

  return state;
};
