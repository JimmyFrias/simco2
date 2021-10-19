import React, { useState } from 'react';
import { motivoAutorizacion, motivoRechazo } from '../components/pages/actionsSelects';
// import { actions, motivoAutorizacion, motivoRechazo } from './actionsSelects';
const useModalAutorization = () => {

    const [showModal, setShowModal] = useState({
        isOpen: false,
        action: 'autorizar solicitud',
        options: motivoAutorizacion,
    });


    const changeShowModal = (e) => {

        switch (e.target.value) {
            case 1:
                return setShowModal({
                    autorizar: true,
                    isOpen: true,
                    action: 'Autorizar solicitud de reclamación',
                    options: motivoAutorizacion,
                    text: '¿Estas seguro que deseas autorizar la solicitud de reclamación?',
                    button: 'Autorizar',
                });

            case 2:
                return setShowModal({
                    autorizar: false,
                    isOpen: true,
                    action: 'Rechazar solicitud de reclamación',
                    options: motivoRechazo,
                    text: '¿Estas seguro que deseas rechazar la solicitud de reclamación?',
                    button: 'rechazar',
                });
            default:
                break;
        }
    };

    return { changeShowModal, showModal, setShowModal };
};

export default useModalAutorization;