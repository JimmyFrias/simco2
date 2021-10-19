/* eslint-disable */

import toastr from '../utils/Notificacion.js';
import { recibirObjeto } from '../utils/notFail.js';

describe('Clase Notificacion', () => {
    test('toastr', () => {
        recibirObjeto(toastr);
    });
});