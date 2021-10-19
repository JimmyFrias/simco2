/* eslint-disable */

import {
    validateDate,
    dateDiffInText,
    formatYYYMMDD
} from '../utils/validateDate.js';

describe('Clase validateDate', () => {
    test('validateDate success', () => {
        validateDate("2020-02-01");
    });

    test('validateDate fail', () => {
        validateDate("2020-12-32");
    });

    test('validateDate fail', () => {
        validateDate("2020-13-01");
    });

    test('validateDate fail ', () => {
        validateDate("not date");
    });

    test('dateDiffInText success ', () => {
        let tomorrow = new Date();
        dateDiffInText(new Date());
        dateDiffInText(new Date(1995, 11, 17));
        dateDiffInText(new Date(tomorrow.getDate-1))
        dateDiffInText(new Date(tomorrow.getDate-2))
        dateDiffInText(new Date(tomorrow.getDate-3))
    });

    test('formatYYYMMDD success ', () => {
        formatYYYMMDD(new Date());
    });
});
