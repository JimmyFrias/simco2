
import React, { Component } from 'react';


import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

import PropTypes from 'prop-types';


export class PaginationTable extends Component {

  constructor(props) {
      super(props);
  }

  render() {

    const changePagePrev = this.props.changePagePrev;
    const changePageNext = this.props.changePageNext;
    const changePageSize = this.props.changePageSize;
    const page = this.props.page;
    const rowsPerPage = this.props.rowsPerPage;
    let totalElements = this.props.totalElements;
    let rows2 = this.props.data;

    const columns = [
      { id: 'plaza', label: 'Plaza' },
      { id: 'importeCobrado', label: 'Importe Cobrado' },
      { id: 'fechadeCobro', label: 'Fecha de Cobro' },
      { id: 'fechadeIntegracion', label: 'Fecha de Integración' },
      { id: 'numdeReferencia', label: 'Num. de Referencia' },
      { id: 'clavedeRastreo', label: 'Clave de Rastreo' },
      { id: 'estatus', label: 'Estatus' }
    ];

    let fromElement = page * rowsPerPage + 1;
    let toElement = (page +1) * rowsPerPage;
    if (toElement > totalElements) {
      toElement = totalElements;
    }

    return (

      <Paper >
  
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className="segundaConciliacionMercadoPago_paginationTable"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="apolo-table-footer">
            <div>
              <span>Filas por páginas</span>
              <select className="apolo-table-foot-select" onChange={changePageSize} defaultValue={rowsPerPage}>
                <option key={10} value={10}>10</option>
                <option key={25} value={25} >25</option>
                <option key={100} value={100}>100</option>
              </select>
              <label> {fromElement} - {toElement} </label> <span style={{padding:5}}> {' de '} </span> <label> {totalElements} </label>
              <span className="">
                <IconButton onClick={changePagePrev} > <MaterialIcon icon="keyboard_arrow_left" /></IconButton>
                <IconButton onClick={changePageNext} > <MaterialIcon icon="keyboard_arrow_right" /></IconButton>
            </span>
            </div>
          </div>
        
      </Paper>
    );
  }
}


PaginationTable.propTypes = {
  data: PropTypes.any.isRequired,
  totalElements: PropTypes.any.isRequired,
  changePagePrev: PropTypes.func.isRequired,
  changePageNext: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  page: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.any.isRequired
};

  export default PaginationTable;
