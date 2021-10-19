/* eslint-disable */

import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';

import { ConsultaComprobantesSPEI } from '../components/ConsultaComprobantesSPEI';

const wrapper = shallow(
    <ConsultaComprobantesSPEI
        comprobante={[]}
        permisos={[]}
        ConsultaComprobantesSPEI={() => {}}
        location={{ state: { ver: false, edicion: false } }}
    />
);

describe('Consulta de comprobates SPEI', () => {

    test('El componente <ConsultaComprobantesSPEI /> existe en el proyecto', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('El input #folio no muta su valor después de ser asignado', () => {
        const valueInput = 'D5430915';
        wrapper.find('#folio').simulate('change', {
            target: { name: 'folio', value: valueInput }
        });
        expect(wrapper.find('#folio').props().value).toEqual(valueInput);
    });

    test('El input #folio no acepta mas de 10 caracteres', () => {
        const valueInput = 'ABCDF123456';
        const valueExpected = 'D5430915';
        wrapper.find('#folio').simulate('change', {
            target: { name: 'folio', value: valueInput }
        });
        expect(wrapper.find('#folio').props().value).toEqual(valueExpected);
    });

    test('El input #fecha no muta su valor después de ser asignado y mantiene el formato esperado', () => {
        let date = new Date();
        date = date.toISOString().split('T')[0];
        wrapper.find('#fecha').simulate('change',  date );
        expect(wrapper.find('#fecha').props().value).toEqual(date);
    });

    test('simular onclick para busqueda', () => {
        wrapper.find('#buttonSearch').simulate('click');
    });

});
