/* eslint-disable */

import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';

import { CatalogoAtmBbva } from '../components/CatalogoAtmBbva';

const filebase64 = 'data:text/plain;base64,77u/QVRNLFNpdGlvLEVzdGFkbyxDaXVkYWQsQ1AsQ29sb25pYQoxNDU1LEhFUk1PU0lMTE8gT0ZJQ0lOQSBNQVRSSVosU09OT1JBLENVTElBQ8OBTiw4MzE5MCxTQU4gQkVOSVRPCjQyMzgsQ0VOVFJPIENPTUVSQ0lBTCBTQU4gSkVST05JTU8sRElTVFJJVE8gRkVERVJBTCxDSVVEQUQgREUgTUVYSUNPLDE5MDAsSkFSRElORVMgREVMIFBFRFJFR0FMCjQ0MDUsUExBWkEgUklPLEJBSkEgQ0FMSUZPUk5JQSxUSUpVQU5BLDIyMDEwLFpPTkEgVVJCQU5BIFJJTyBUSUpVQU5BCjQ0MDYsUExBWkEgUklPLEJBSkEgQ0FMSUZPUk5JQSxUSUpVQU5BLDIyMDEwLFpPTkEgVVJCQU5BIFJJTyBUSUpVQU5BCjQ1ODAsU0FMVElMTE8gUEVSSUZFUklDTyxDT0FIVUlMQSxTQUxUSUwgICAgTE8sMjUyODAsUkVQVUJMSUNBCjQ4NzAsTU9OVEVSUkVZIFZJU1RBIEhFUk1PU0EsTlVFVk8gTEVPTixNT05URVJSRVksNjQ2MjAsVklTVEEgSEVSTU9TQQo1NDQ0LE1BWkFUTEFOIE9GSUNJTkEgUFJJTkNJUEFMLFNJTkFMT0EsTUFaQVRMQU4sODIwMTAsUEFMT1MgUFJJRVRPUwo4MDcxLExPTUFTIENBTVBFU1RSRVMsQ0hJSFVBSFVBLENISUhVQUhVQSwzMTIxNCxMT01BUwo4MjA3LFZBTExFIFNFTkEsTlVFVk8gTEVPTixTQU4gUEVEUk8gR0FSWkEgR0FSQ0lBLDY2MjIwLEpBUkRJTkVTIERFTCBWQUxMRQo5NDU5LEhFUk1PU0lMTE8gT0ZJQ0lOQSBNQVRSSVosU09OT1JBLEhFUk1PU0lMTE8sODMxOTAsU0FOIEJFTklUTwo5NTU3LFBMQVpBIFJJTyxCQUpBIENBTElGT1JOSUEsVElKVUFOQSwyMjAxMCxaT05BIFVSQkFOQSBSSU8gVElKVUFOQQo=;'

const wrapper = shallow(
    <CatalogoAtmBbva
      filecsv={filebase64}
      waiting={false}
      charginFile={false}
      actionSendFile={() => {}}
      actionSetFileCsv={() => {}}
      actionSetWaiting={() => {}}
      actionSetCharginFile={() => {}}
      location={{ state: { ver: false, edicion: false } }}
    />
);

describe('CatalogoAtmBbva', () => {

    test('El componente <CatalogoAtmBbva /> existe en el proyecto', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('debe existir un label y un inputFile', () => {
      expect(wrapper.find('input[type="file"]').exists()).toBe(true);
      expect(wrapper.find('label').exists()).toBe(true);
    });

    test('simular onChange en inputFile', () => {
      wrapper.find('input[type="file"]').simulate('change', {
        target: {
           files: [
             'dummyValue.something'
           ]
        }
      });
    });

    test('no debe existir deleteFile', () => {
      expect(wrapper.find('#deleteFile').exists()).toBe(false);
    });

    test('State debe ser vacio', () => {
      expect(wrapper.state('file')).toEqual('');
      expect(wrapper.state('filecsv')).toEqual('');
      expect(wrapper.state('countData')).toEqual(0);
    });

});
