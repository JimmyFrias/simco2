/* eslint-disable */

import { warningMessage, infoMessage, errorMessage, successMessage, clearMessage } from '../utils/libreriaMensajesToastr.js';

describe('Clase index', () => {
    test('infoMessage', () => {
        infoMessage("hola");
    });

    test('errorMessage', () => {
        errorMessage("hola");
    });

    test('successMessage', () => {
        successMessage("hola");
    });

    test('warningMessage', () => {
        warningMessage("hola");
    });

    test('clearMessage', () => {
        clearMessage("hola");
    });

    test('warningMessage', () => {
        warningMessage("hola");
    });
});