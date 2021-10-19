/* eslint-disable */

import React from 'react';

import './config/enzyme.config';

import { ConciliacionMercadoPago } from '../storeReducers.js';
import * as types from '../conciliacionMercadoPago/actionstypes.js';

describe('Reducer ConciliacionMercadoPago', () => {
    it('Funcionamiento correcto del metodo GET_CONCILIACION_MERCADOPAGO y GET_CONCILIACION_MERCADOPAGO_EXCEL', () => {
        expect(
            ConciliacionMercadoPago({
                conciliacion: [],
            }, {
                type: types.GET_CONCILIACION_MERCADOPAGO,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                conciliacion: [{'test':'pass'}]
            }
        )
        expect(
            ConciliacionMercadoPago({
                conciliacionExcel: [],
            }, {
                type: types.GET_CONCILIACION_MERCADOPAGO_EXCEL,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                conciliacionExcel: [{'test':'pass'}]
            }
        )
        expect(
            ConciliacionMercadoPago({}, {
                type: 'NO_EXISTE'
            })
        ).toEqual(
            {}
        )
    })
})
