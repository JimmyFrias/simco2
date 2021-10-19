/* eslint-disable */

import React from 'react';

import './config/enzyme.config';

import { ComprobatesSPEI } from '../storeReducers.js';
import * as types from '../comprobantesSPEI/actionstypes.js';

describe('Reducer ComprobatesSPEI', () => {
    it('Retorna el estado inicial', () => {
        expect(ComprobatesSPEI(undefined, {})).toEqual({
            comprobante: [],
        })
    })

    it('Funcionamiento correcto del metodo GET_COMPROBANTE_SPEI', () => {
        expect(
            ComprobatesSPEI({
                comprobante: [],
            }, {
                type: types.GET_COMPROBANTE_SPEI,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                comprobante: [{'test':'pass'}]
            }
        )

        expect(
            ComprobatesSPEI({}, {
                type: 'NO_EXISTE'
            })
        ).toEqual(
            {}
        )
    })
})
