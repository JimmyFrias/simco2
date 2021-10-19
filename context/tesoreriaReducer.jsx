const tesoreriaReducer = (state, action) => {
  switch (action.type) {
    case 'get_reclamaciones':
      return {
        ...state,
        listReclamaciones: action.payload,
        showReclamaciones: action.payload
      };
    case 'change_showReclamaciones':
      return {
        ...state,
        showReclamaciones: {
          ...state.showReclamaciones,
          content: action.payload
        }
      };
    case 'change_modal':
      return {
        ...state,
        isOpenModal: !state.isOpenModal
      };

    case 'get_catalogues':
      return {
        ...state,
        catalogues: action.payload
      };

    default:
      return state;
  }
};

export default tesoreriaReducer;