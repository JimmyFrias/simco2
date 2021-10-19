import * as types from './actionstypes';

const initialState = {
    comprobante: {},
    comprobante_error: {},
    pdfRst: null,
    pdfRst_error: {},
};

export const ConsultaComprobantesRstBbva = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }
    if (action.type === types.MTESORERIA_COMPROBANTE_RST_DETALLES) {
        return Object.assign({}, state, {
            comprobante: action.payload,
        });
    }
    if (action.type === types.MTESORERIA_COMPROBANTE_RST_DETALLES_ERROR) {
        return Object.assign({}, state, {
            comprobante: {},
            comprobante_error: action.payload,
        });
    }
    if (action.type === types.MTESORERIA_COMPROBANTE_RST_IMPRIMERST) {
        return Object.assign({}, state, {
            pdfRst: action.payload,
        });
    }
    if (action.type === types.MTESORERIA_COMPROBANTE_RST_IMPRIMERST_ERROR) {
        return Object.assign({}, state, {
            pdfRst: null,
            pdfRst_error: action.payload,
        });
    }
    return state;
};