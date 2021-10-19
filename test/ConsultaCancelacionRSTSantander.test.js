/* eslint-disable */
import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';
import { ConsultaCancelacionRSTSantander } from '../components/ConsultaCancelacionRSTSantander';
const data = {
    'content': [
        {
            'numeroRastreo': '00000',
            'fechaCanje': '2020-01-01',
            'horaCanje': '10:30',
            'nombrePlaza': 'Culiacan',
            'claveColocadora': '0112',
            'folioVale': '123123',
            'nombreCliente': 'cliente ejemplo',
            'celularCliente': '6677889900',
            'companiaTelefonicaCliente': 'telcel',
            'importe': 10000,
            'statusRst': true,
            'motivoRechazoRst': '',
            'idPrestamo': 1
        }
    ],
    'totalPages': 1,
    'totalElements': 1,
    'numberOfElements': 1
};
const wrapper = shallow(
    <ConsultaCancelacionRSTSantander
        actionGetConsultaRSTSantander={() => {}}
        actionPostCancelacionRSTSantander={() => {}}
        actionResetListCancelacionesRTSSantander={() => {}}
        listRstSantander={data}
        location={{ state: { ver: false, edicion: false } }}
    />
);

describe('Consulta / Cancelación de RST Santander', () => {

    test('El componente <ConsultaCancelacionRSTSantander /> existe en el proyecto', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('el input #folio no muta su valor después de ser asignado', () => {
        const valueInput = 'ABCD1234';
        wrapper.find('#folio').simulate('change', {
            target: { name: 'folio', value: valueInput }
        });
        expect(wrapper.find('#folio').props().value).toEqual(valueInput);
    });

    test('el input #folio no acepta más de 10 caracteres', () => {
        const valueInput = 'ABCDE12345A';
        const valueExpected = 'ABCD1234';
        wrapper.find('#folio').simulate('change', {
            target: { name: 'folio', value: valueInput }
        });
        expect(wrapper.find('#folio').props().value).toEqual(valueExpected);
    });

    test('el input #nombre no muta su valor después de ser asignado', () => {
        const valueInput = 'jon doe';
        wrapper.find('#nombre').simulate('change', {
            target: { name: 'nombre', value: valueInput }
        });
        expect(wrapper.find('#nombre').props().value).toEqual(valueInput);
    });

    test('el input #nombre no acepta más de 50 caracteres', () => {
        const valueInput = 'Grumpy Wizards make toxic brew for The Evil Queen a';
        const valueExpected = 'jon doe';
        wrapper.find('#nombre').simulate('change', {
            target: { name: 'nombre', value: valueInput }
        });
        expect(wrapper.find('#nombre').props().value).toEqual(valueExpected);
    });

    test('el input #importe no muta su valor después de ser asignado', () => {
       const valueInput = '13000';
        wrapper.find('#importe').simulate('change', {
            target: { name: 'importe', value: valueInput }
        });
        expect(wrapper.find('#importe').props().value).toEqual(valueInput);
    });

    test('el input #importe no acepta más de 20 caracteres', () => {
        const valueInput = '123456789012345678901';
        const valueExpected = '13000';
        wrapper.find('#importe').simulate('change', {
            target: { name: 'importe', value: valueInput }
        });
        expect(wrapper.find('#importe').props().value).toEqual(valueExpected);
    });

    test('el input #importe acepta sólo caracteres numéricos', () => {
        const valueInput = '1234567890';
        let accumulator = [];
        [...valueInput].forEach(key => {
            wrapper.find('#importe').simulate('keyPress', {
                key, preventDefault: () => accumulator.push(false)
            });
        });
        expect(accumulator.length).toEqual(0);
    });

    test('el input #importe no acepta caracteres alfanuméricos', () => {
        const valueInput = '1234a';
        let accumulator = [];
        [...valueInput].forEach(key => {
            wrapper.find('#importe').simulate('keyPress', {
                key, preventDefault: () => accumulator.push(false)
            });
        });
        expect(accumulator.length).toEqual(1);
    });

    test('el input #fechaInicio no muta su valor después de ser asignado y mantiene el formato esperado', () => {
        let date = new Date();
        date = date.toISOString().split('T')[0];
        wrapper.find('#fechaInicio').simulate('change',  date );
        expect(wrapper.find('#fechaInicio').props().value).toEqual(date);
    });

    test('el input #fechaFin no muta su valor después de ser asignado y mantiene el formato esperado', () => {
        let date = new Date();
        date = date.toISOString().split('T')[0];
        wrapper.find('#fechaFin').simulate('change',  date );
        expect(wrapper.find('#fechaFin').props().value).toEqual(date);
    });

    test('simular onclick para búsqueda', () => {
        wrapper.find('#buttonSearch').simulate('click');
    });

    test('simular onclick para cancelación', () => {
        wrapper.find('#buttonCancel').simulate('click');
    });

    test('simular postCancelacionRSTSantander', () => {
        wrapper.instance().postCancelacionRSTSantander();
    });

    test('simular evSelected', () => {
        wrapper.instance().evSelected([{key: 1, status: true}]);
        wrapper.instance().evSelected([{key: 1, status: false}]);
    });

    test('simular formatMoneyCancelaciones, 1', () => {
        const resultValue = wrapper.instance().formatMoneyCancelaciones(1);
        expect(resultValue).toBe('1,00')
    });

    test('simular formatMoneyCancelaciones, 1.05', () => {
        const resultValue = wrapper.instance().formatMoneyCancelaciones(1.05, 2, '.', ',');
        expect(resultValue).toBe('1.05')
    });

    test('simular formatMoneyCancelaciones, 1,000.00', () => {
        const resultValue = wrapper.instance().formatMoneyCancelaciones(1000, 2, '.', ',');
        expect(resultValue).toBe('1,000.00')
    });

    test('simular formatMoneyCancelaciones, 1,000.25', () => {
        const resultValue = wrapper.instance().formatMoneyCancelaciones(1000.25, 2, '.', ',');
        expect(resultValue).toBe('1,000.25')
    });

    test('simular setPage(\'prev\')', () => {
        wrapper.instance().setPage('prev');
    });

    test('simular setPage(\'next\')', () => {
        wrapper.instance().setPage('next');
    });

    test('simular setPage(\'limit\', 20)', () => {
        wrapper.instance().setPage('limit', 20);
    });

});
