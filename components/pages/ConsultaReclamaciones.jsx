import React from 'react';
import '../../styles/custom.css';
import '../../styles/reclamaciones.css';
import TableReclamaciones from '../organisms/tables/TableReclamaciones';
import TesoreriaState from '../../context/TesoreriaState';
import HeaderTable from '../HeaderTable';
import ActionModal from '../organisms/header/ActionModal';


const Reclamaciones = () => {
      return (
      <TesoreriaState>
        <div className='reclamaciones_pageContainer'>
          <div className='reclamaciones_topContainer'>
            <ActionModal />
            <HeaderTable />
          </div>
          <br></br>
          <br></br>
          <div className='reclamaciones_table'>
            <TableReclamaciones />
          </div>
        </div>
        </TesoreriaState> 
      );
};

export default Reclamaciones;
