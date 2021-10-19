/* eslint-disable */
import React from 'react';

import './config/enzyme.config';
import { shallow } from 'enzyme';
import { PaginationTable } from '../components/PaginationTable';


const columnsTable = [
    { id: 'plaza', label: 'Plaza' },
    { id: 'importeCobrado', label: 'Importe Cobrado' },
    { id: 'fechadeCobro', label: 'Fecha de Cobro' },
    { id: 'fechadeIntegracion', label: 'Fecha de Integración' },
    { id: 'numdeReferencia', label: 'Num. de Referencia' },
    { id: 'clavedeRastreo', label: 'Clave de Rastreo' },
    { id: 'estatus', label: 'Estatus' }
  ];


let apiResponse = 
{
    "page": {
        "content": [
            {
                "fechaMovimiento": "07/05/2021",
                "referencia": "1234",
                "claveRastreo": "123456789012345678901234567890",
                "importe": 150.0,
                "status": "CONCILIADO",
                "plaza": "CULIACAN CENTRO",
                "fechaIntegracion": null
            },
            {
                "fechaMovimiento": "08/05/2021",
                "referencia": "1234",
                "claveRastreo": "2",
                "importe": 200.0,
                "status": "CONCILIADO",
                "plaza": "CULIACAN CENTRO",
                "fechaIntegracion": null
            },
            {
                "fechaMovimiento": "09/05/2021",
                "referencia": "1234",
                "claveRastreo": "3",
                "importe": 500.0,
                "status": "CONCILIADO",
                "plaza": "CULIACAN CENTRO",
                "fechaIntegracion": null
            },
            {
                "fechaMovimiento": "11/05/2021",
                "referencia": "1650000415",
                "claveRastreo": "20",
                "importe": 1357.0,
                "status": "CONCILIADO",
                "plaza": "CHIHUAHUA",
                "fechaIntegracion": "11/05/2021"
            },
            {
                "fechaMovimiento": "28/05/2021",
                "referencia": "1007004714",
                "claveRastreo": "12316649990",
                "importe": 500.0,
                "status": "CONCILIADO",
                "plaza": "LOS MOCHIS",
                "fechaIntegracion": null
            },
            {
                "fechaMovimiento": "28/05/2021",
                "referencia": "1007004714",
                "claveRastreo": "12316649999",
                "importe": 31.42,
                "status": "CONCILIADO",
                "plaza": "LOS MOCHIS",
                "fechaIntegracion": null
            },
            {
                "fechaMovimiento": "28/05/2021",
                "referencia": "1007004714",
                "claveRastreo": "12316649998",
                "importe": 250.0,
                "status": "CONCILIADO",
                "plaza": "LOS MOCHIS",
                "fechaIntegracion": null
            }
        ],
        "totalElements": 7,
        "totalPages": 1,
        "last": true,
        "numberOfElements": 7,
        "sort": null,
        "first": true,
        "size": 1000000,
        "number": 0
    },
    "totalPorConciliar": 148600.0,
    "totalConciliados": 2988.42,
    "totalMovimientos": 151588.42
}

function createData(plaza, importeCobrado, fechadeCobro, fechadeIntegracion, numdeReferencia, clavedeRastreo, estatus) {
    return { plaza, importeCobrado, fechadeCobro, fechadeIntegracion, numdeReferencia, clavedeRastreo, estatus };
}

let apiresponselements =  apiResponse.page.content;
let dataTable = [];
    
for (let i=0; i < apiresponselements.length; i++) {
  let singleRow = createData(apiresponselements[i].plaza, "$" + apiresponselements[i].importe.toLocaleString(), apiresponselements[i].fechaMovimiento, apiresponselements[i].fechaIntegracion, Number(apiresponselements[i].referencia).toLocaleString(), apiresponselements[i].claveRastreo, apiresponselements[i].status)
  dataTable.push(singleRow)
}


const wrapper = shallow(
  <PaginationTable
      data={dataTable}
  />
);

describe('Tabla personalizada', () => {

  test('El componente <PaginationTable /> existe en el proyecto', () => {
      expect(wrapper.exists()).toBe(true);
  });


});
