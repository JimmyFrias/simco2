/* eslint-disable */

import {
    isNotNull, isNotEmpty, isNotUndefined, isNotNullOrEmpty, isNotEmptyOrNullOrUnidefined, isNotNullWithFocus,
    isNotEmptyWithFocus, isNotUndefinedWithFocus, isNotNullOrEmptyWithFocus, isNotEmptyOrNullOrUnidefinedWithFocus,
    isNotNullReturn, isNotEmptyReturn, isNotUndefinedReturn, isNotNullOrEmptyReturn, isNotEmptyOrNullOrUnidefinedReturn
} from '../utils/asserts';

describe('Clase asserts', () => {
    test('Devuelve si es undefined', () => {
        expect(isNotNullOrEmptyReturn("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyOrNullOrUnidefinedReturn("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyReturn("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotUndefinedReturn("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyOrNullOrUnidefinedWithFocus("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullReturn("paul")).toBe(true);
    });


    test('Devuelve si es undefined', () => {
        expect(isNotUndefinedWithFocus("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullOrEmptyWithFocus("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyWithFocus("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullWithFocus("paul")).toBe(true);
    });

    test('Devuelve si es nullo', () => {
        expect(isNotNull("paul")).toBe(true);
    });

    test('Devuelve si es vacio', () => {
        expect(isNotEmpty("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotUndefined("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullOrEmpty("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyOrNullOrUnidefined("paul")).toBe(true);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullOrEmptyReturn("")).toBe(false);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyOrNullOrUnidefinedReturn("")).toBe(false);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotEmptyReturn("")).toBe(false);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotUndefinedReturn(undefined)).toBe(false);
    });

    test('Devuelve si es undefined', () => {
        expect(isNotNullReturn(null)).toBe(false);
    });

});