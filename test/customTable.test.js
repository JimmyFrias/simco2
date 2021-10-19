/* eslint-disable */
import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';
import { CustomTable } from '../components/CustomTable';

const columnsTable = [
    { name: 'numeroRastreo', data: '# Rastreo' },
    { name: 'fechaCanje', data: 'Fecha canje' },
    { name: 'horaCanje', data: 'Hora' }
];

let dataTable = [];
dataTable.items = [{
  'numeroRastreo': '000123',
  'fechaCanje': '12-01-2021',
  'horaCanje': '13:02 Hrs.',
  'key': '1',
}];

const wrapper = shallow(
  <CustomTable
      columns={columnsTable}
      data={dataTable}
      selected={true}
      evSelected={() => {}}
      rowsSelects={[]}
      permits={['CADUCO', 'RECHAZADO','ACTIVO']}
  />
);

describe('Tabla personalizada', () => {
  test('El componente <CustomTable /> existe en el proyecto', () => {
    expect(wrapper.exists()).toBe(true);
    wrapper.setProps({ topCheck: true });
    wrapper.setProps({ menuOpen: true });
    wrapper.setProps({ selectedRows: [{key: '1', status: true}] });
  });

  test('simular handleSelectedAll()', () => {
    wrapper.instance().handleSelectedAll();
  });

  test('simular handleSelectedIndex(0)', () => {
    wrapper.instance().handleSelectedIndex(0);
  });

});
