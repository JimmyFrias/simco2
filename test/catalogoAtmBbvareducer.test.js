/* eslint-disable */

import React from 'react';

import './config/enzyme.config';

import { CatalogoAtmBbva } from '../storeReducers.js';
import * as types from '../catalogoAtmBbva/actionstypes.js';

describe('Reducer CatalogoAtmBbva', () => {
    it('Retorna el estado inicial', () => {
        expect(CatalogoAtmBbva(undefined, {})).toEqual({
          filecsv: '',
          waiting: false,
          charginFile: false,
        })
    })

    it('Funcionamiento correcto del metodo SET_FILE_CSV, SET_WAITING, SET_CHARGING_FILE', () => {
        expect(
            CatalogoAtmBbva({
                filecsv: '',
            }, {
                type: types.SET_FILE_CSV,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                filecsv: [{'test':'pass'}]
            }
        )

        expect(
            CatalogoAtmBbva({
                waiting: [],
            }, {
                type: types.SET_WAITING,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                waiting: [{'test':'pass'}]
            }
        )

        expect(
            CatalogoAtmBbva({
                charginFile: [],
            }, {
                type: types.SET_CHARGING_FILE,
                payload: [{'test':'pass'}]
            })
        ).toEqual(
            {
                charginFile: [{'test':'pass'}]
            }
        )

        expect(
            CatalogoAtmBbva({}, {
                type: 'NO_EXISTE'
            })
        ).toEqual(
            {}
        )
    })
})
