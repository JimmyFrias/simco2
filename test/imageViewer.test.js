/* eslint-disable */

import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';

import { ImageViewer } from '../utils/ImageViewer';

describe('ImageViewer', () => {

    const wrapper = shallow(
        <ImageViewer
          src={''}
          folioVale={''}
          imageName={''}
          docType={''}
          scaleIncrement={1}
          rotationIncrement={1}
          pageNumber={1}
          showControls={false}
          onDocumentLoadSuccess={() => {}}
          location={{ state: { ver: false, edicion: false } }}
        />
    );

    test('El componente <ImageViewer /> existe en el proyecto', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('simular componentDidUpdate()', () => {
        wrapper.instance().componentDidUpdate({});
    });

    test('simular resetValues()', () => {
        wrapper.instance().resetValues();
    });

    test('simular scaleUp()', () => {
        wrapper.instance().scaleUp();
    });

    test('simular scaleDown()', () => {
        wrapper.instance().scaleDown();
    });

    test('simular rotate()', () => {
        wrapper.instance().rotate();
    });

    test('simular fullscreen(), scaleUp()', () => {
        wrapper.instance().fullscreen();
        wrapper.instance().scaleUp();
    });

    test('simular fullscreen(), scaleDown()', () => {
        wrapper.instance().fullscreen();
        wrapper.instance().scaleDown();
    });

    test('simular fullscreen(), rotate()', () => {
        wrapper.instance().fullscreen();
        wrapper.instance().rotate();
    });

    test('simular download()', () => {
        wrapper.instance().download();
    });

    test('simular control()', () => {
        wrapper.instance().control();
    });

    test('simular control(\'zoomInwhite\')', () => {
        wrapper.instance().control('zoomInwhite');
    });

    test('simular control(\'zoom_in\')', () => {
        wrapper.instance().control('zoom_in');
    });

    test('simular control(\'zoomOutwhite\')', () => {
        wrapper.instance().control('zoomOutwhite');
    });

    test('simular control(\'zoom_out\')', () => {
        wrapper.instance().control('zoom_out');
    });

    test('simular control(\'rotatewhite\')', () => {
        wrapper.instance().control('rotatewhite');
    });

    test('simular control(\'rotate\')', () => {
        wrapper.instance().control('rotate');
    });

    test('simular control(\'download\')', () => {
        wrapper.instance().control('download');
    });

    test('simular control(\'fullscreen\')', () => {
        wrapper.instance().control('fullscreen');
    });

    test('simular fullscreenOverlay()', () => {
        wrapper.instance().fullscreenOverlay();
    });
});
