import { Drawer } from '@material-ui/core';
import { ApoloButton } from 'dsmapolo-react';
import React, { useContext } from 'react';
import TesoreriaContext from '../../../context/TesoreriaContext';
import ModalReclaims from '../modal/ModalReclaims';

const ActionModal = () => {
  const { changeModal, isOpenModal } = useContext(TesoreriaContext);
  return (
    <div className="reclamaciones_topArea">
      <div className="reclamaciones_title">
        <p>Reclamaciones</p>
      </div>
      <div>
        <React.Fragment key="right">
          <Drawer anchor="right" open={isOpenModal} onClose={changeModal}>
            <ModalReclaims />
          </Drawer>
        </React.Fragment>
      </div>

      <div className="reclamaciones_descargarButtonArea">
        <ApoloButton
          contained
          id="buttonSearch"
          className="reclamaciones_button"
         onClick={changeModal}
          full
        >
          <p>+ CREAR SOLICITUD</p>
        </ApoloButton>
      </div>
    </div>
  );
};

export default ActionModal;
