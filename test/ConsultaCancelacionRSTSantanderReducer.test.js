/* eslint-disable */

import React from 'react';

import './config/enzyme.config';

import { ConsultaCancelacionRSTSantander } from '../storeReducers.js';
import * as types from '../ConsultaCancelacionRSTSantander/actionstypes.js';

describe('Reducer ComprobatesSPEI', () => {
    it('Retorna el estado inicial', () => {
        expect(ConsultaCancelacionRSTSantander(undefined, {})).toEqual({
            listRstSantander: [],
        })
    })

    it('Funcionamiento correcto del metodo GET_CONSULTA_RST_SANTANDER y GET_CANCELACION_RST_SANTANDER', () => {
        expect(
            ConsultaCancelacionRSTSantander({
                listRstSantander: [],
            }, {
                type: types.GET_CONSULTA_RST_SANTANDER,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                listRstSantander: [{'test':'pass'}]
            }
        )

        expect(
            ConsultaCancelacionRSTSantander({
                cancelacionRstSantander: [],
            }, {
                type: types.GET_CANCELACION_RST_SANTANDER,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                cancelacionRstSantander: [{'test':'pass'}]
            }
        )

        expect(
            ConsultaCancelacionRSTSantander({}, {
                type: 'NO_EXISTE'
            })
        ).toEqual(
            {}
        )
    })



})
