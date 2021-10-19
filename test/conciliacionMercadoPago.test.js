/* eslint-disable */
import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';
import { ConsultaConciliacionMercadoPago } from '../components/ConsultaConciliacionMercadoPago';

describe('Consulta / Conciliacion Mercado Pago', () => {

    test('El componente <ConsultaConciliacionMercadoPago /> existe en el proyecto', () => {
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
                actionGetConciliacionMercadoPago={() => {}}
                actionGetConciliacionMercadoPagoExcel={() => {}}
            />
        );

        expect(wrapper.exists()).toBe(true);
    });

    test('el input #conciliacion-mercadopago-clavederastreo no muta su valor después de ser asignado', () => {
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
                actionGetConciliacionMercadoPago={() => {}}
                actionGetConciliacionMercadoPagoExcel={() => {}}
            />
        );

        const valueInput = 'ABCD1234';
        wrapper.find('#conciliacion-mercadopago-clavederastreo').simulate('change', {
            target: { name: 'conciliacion-mercadopago-clavederastreo', value: valueInput }
        });

        expect(wrapper.find('#conciliacion-mercadopago-clavederastreo').props().value).toEqual(valueInput);
    });

    test('el input #conciliacion-mercadopago-ndereferencia no muta su valor después de ser asignado', () => {
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
            actionGetConciliacionMercadoPago={() => {}}
            actionGetConciliacionMercadoPagoExcel={() => {}}
        />
        );

        const valueInput = 'jon doe';
        wrapper.find('#conciliacion-mercadopago-ndereferencia').simulate('change', {
            target: { name: 'conciliacion-mercadopago-ndereferencia', value: valueInput }
        });

        expect(wrapper.find('#conciliacion-mercadopago-ndereferencia').props().value).toEqual(valueInput);
    });

    test('el input #conciliacion-mercadopago-estatus no muta su valor después de ser asignado', () => {
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
            actionGetConciliacionMercadoPago={() => {}}
            actionGetConciliacionMercadoPagoExcel={() => {}}
        />
        );

        const valueInput = 'TODOS';
        wrapper.find('#conciliacion-mercadopago-estatus').simulate('change', {
            target: { name: 'conciliacion-mercadopago-estatus', value: valueInput }
        });

        expect(wrapper.find('#conciliacion-mercadopago-estatus').props().value).toEqual(valueInput);
    });

    test('el input #fechaInicio no muta su valor después de ser asignado y mantiene el formato esperado', () => {
        let date = new Date();
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
            actionGetConciliacionMercadoPago={() => {}}
            actionGetConciliacionMercadoPagoExcel={() => {}}
        />
        );

        date = date.toISOString().split('T')[0];
        wrapper.find('#fechaInicio').simulate('change',  date );

        expect(wrapper.find('#fechaInicio').props().value).toEqual(date);
    });

    test('el input #fechaFin no muta su valor después de ser asignado y mantiene el formato esperado', () => {
        let date = new Date();
        const wrapper = shallow(
            <ConsultaConciliacionMercadoPago
            actionGetConciliacionMercadoPago={() => {}}
            actionGetConciliacionMercadoPagoExcel={() => {}}
        />
        );

        date = date.toISOString().split('T')[0];
        wrapper.find('#fechaFin').simulate('change',  date );

        expect(wrapper.find('#fechaFin').props().value).toEqual(date);
    });
});
