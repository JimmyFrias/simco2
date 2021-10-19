/* eslint-disable */

import {
    tipoSolicitud
} from '../utils/tipoSolicitud.js';
import { recibirObjeto } from '../utils/notFail.js';

describe('Clase tipoSolicitud', () => {
    test('tipoSolicitud', () => {
        recibirObjeto(tipoSolicitud);
    });
});