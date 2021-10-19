/* eslint-disable */

import {
    isMajor,
    validateBetweenTwoDates
} from '../utils/compareDates';

describe('Clase compareDates', () => {
    test('formatAccountingCountNumber', () => {
        isMajor('2020-12-01','2020-12-02');
    });

    test('formatAccountingCountNumber', () => {
        isMajor('2020-12-02','2020-12-01');
    });

    test('capitalizeFirstLetterEachWorld', () => {
        validateBetweenTwoDates('2020-12-01','2020-12-02','2020-12-01'
        );
    });

    test('capitalizeFirstLetterEachWorld', () => {
        validateBetweenTwoDates('2020-12-01','2020-12-02','2020-11-01'
        );
    });
});