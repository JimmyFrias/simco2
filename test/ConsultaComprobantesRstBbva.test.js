/* eslint-disable */
import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';
import { ConsultaComprobantesRstBbva } from '../components/ConsultaComprobantesRstBbva';

const wrapper = shallow(
    <ConsultaComprobantesRstBbva
        comprobante={{}}
        comprobante_error={{}}
        pdfRst_error={''}
        actionGetDetallesComprobante={()=>{}}
        actionGetImprimeRST={()=>{}}
    />
);

describe('Comprobante RST BBVA', () => {
    test('El componente <ConsultaComprobantesRstBbva /> existe en el proyecto.', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('El input #folioVale no muta su valor después de ser asignado.', () => {
        const valueInput = 'D000000000';
        wrapper.find('#folioVale').simulate('change', {
            target: { name: 'folioVale', value: valueInput }
        });
        expect(wrapper.find('#folioVale').props().value).toEqual(valueInput);
    });

    test('El input #folioVale no acepta más de 10 caracteres alfanuméricos.', () => {
        const valueInput = 'D0000000001';
        const valueExpected = 'D000000000';
        wrapper.find('#folioVale').simulate('change', {
            target: { name: 'folioVale', value: valueInput }
        });
        expect(wrapper.find('#folioVale').props().value).toEqual(valueExpected);
    });

    test('El input #folioVale no acepta caracteres no alfanuméricos.', () => {
        const valueInput = '-';
        const valueExpected = 'D000000000';
        wrapper.find('#folioVale').simulate('change', {
            target: { name: 'folioVale', value: valueInput }
        });
        expect(wrapper.find('#folioVale').props().value).toEqual(valueExpected);
    });

    test('El input #fecha no muta su valor después de ser asignado.', () => {
        const date = new Date().toISOString().split('T')[0];
        wrapper.find('#fecha').simulate('change', date);
        expect(wrapper.find('#fecha').props().value).toBe(date);
    });
});