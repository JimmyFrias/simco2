/* eslint-disable */

import {
    formatAccountingCountNumber,
    capitalizeFirstLetterEachWorld, isNumber, isString
} from '../utils/formatString';

describe('Clase formatsitring', () => {
    test('formatAccountingCountNumber', () => {
        formatAccountingCountNumber('java');
    });

    test('capitalizeFirstLetterEachWorld', () => {
        capitalizeFirstLetterEachWorld('java');
    });

    test('isNumber', () => {
        isNumber(12);
    });

    test('isString', () => {
        isString('12');
    });
});
