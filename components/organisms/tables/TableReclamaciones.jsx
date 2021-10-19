import React, { useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';
import TesoreriaContext from '../../../context/TesoreriaContext';
import { Link } from 'react-router-dom';

export const TableReclamaciones = () => {

  const { showReclamaciones } = useContext(TesoreriaContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const changePageSize = (e) => {
    setRowsPerPage(e.target.value);
  };
  const columns = [
    { id: 'folioreclamacion', label: 'Folio de reclamación' },
    { id: 'fechareclamacion', label: 'Fecha de reclamación' },
    { id: 'empresaria', label: 'Empresaria' },
    { id: 'tiporeclamacion', label: 'Tipo de reclamación' },
    { id: 'importe', label: 'Importe' },
    { id: 'estatusreclamacion', label: 'Estatus' }
  ];

  const handleChangePagePrev = () => {
    let currentPage = page;
    let prevPage = currentPage - 1;
    if (currentPage > 0) {
      setPage(prevPage);
    }
  };

  const handleChangePageNext = () => {
    let currentTotalElements = showReclamaciones?.totalElements || 0;
    let currentPageSize = rowsPerPage;
    let currentPage = page;
    let nextPage = currentPage + 1;
    if (currentPage + 1 < currentTotalElements / currentPageSize) {
      setPage(nextPage);
    }
  };



  let fromElement = page * rowsPerPage + 1;
  let toElement = (page + 1) * rowsPerPage;
  if (toElement > showReclamaciones?.totalElements) {
    toElement = showReclamaciones?.totalElements;
  }

  return showReclamaciones?.content.length ? (
    <Paper >
      <Table aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                className='reclamaciones_paginationTable'
                key={index}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {showReclamaciones.content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            return (
              <TableRow hover role='checkbox' tabIndex={-1} key={index}>

                <TableCell  >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}>{row['folioreclamacion']}</Link>
                </TableCell>
                <TableCell >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}> {row['fechareclamacion']} </Link>
                </TableCell>
                <TableCell >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}> {row['empresaria']} </Link>
                </TableCell>
                <TableCell >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}> {row['tiporeclamacion']} </Link>
                </TableCell>
                <TableCell >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}> {row['importe']} </Link>
                </TableCell>
                <TableCell >
                  <Link to={`mtesoreria-reclamaciones/${row['id']}`}> {row['estatusreclamacion']} </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className='apolo-table-footer'>
        <div>
          <span>Filas por páginas</span>
          <select className='apolo-table-foot-select' onChange={changePageSize} defaultValue={rowsPerPage}>
            {
              [10, 15, 25, 50, 100].map(item => <option key={item} value={item}>{item}</option>)
            }
          </select>
          <label> {fromElement} - {toElement} </label> <span style={{ padding: 5 }}> {' de '} </span> <label> {showReclamaciones?.totalElements} </label>
          <span>
            <IconButton onClick={handleChangePagePrev} > <MaterialIcon icon='keyboard_arrow_left' /></IconButton>
            <IconButton onClick={handleChangePageNext} > <MaterialIcon icon='keyboard_arrow_right' /></IconButton>
          </span>
        </div>
      </div>
    </Paper>
  ) :
    (
      <div className="text-center empty-results">
        <p>No se encontraron resultados de la búsqueda.</p>
      </div>
    );
};
export default TableReclamaciones;