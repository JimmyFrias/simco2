/* eslint-disable */

import { isNumber, isTextAndBlankSpaces } from '../utils/RegularExp.js';

describe('Clase RegularExp', () => {
    test('isNumber', () => {
        isNumber("hola");
    });

    test('isTextAndBlankSpaces', () => {
        isTextAndBlankSpaces("hola");
    });
});