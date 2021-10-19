import React, { Fragment, useContext, useEffect, useState } from 'react';
import '../../styles/DetalleReclamaciones.css';
import '../../styles/reclamaciones.css';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { getDetailReclaim } from '../../reclamaciones/actions';
import { ApoloDialogUI, ApoloSelectUI } from 'dsmapolo-react';
import { Link } from 'react-router-dom';
import './../ConsultaComprobantesRstBbva.styl';
import ModalAuthorization from '../organisms/modal/ModalAuthorization';
import { axiosPut } from '../../api/axiosRequest';
import { actions, motivoAutorizacion, motivoRechazo } from './actionsSelects';
import PreviewArchive from '../organisms/preview/PreviewArchive';
import ItemDetail from '../atoms/items/ItemDetail';
import Subtitle from '../atoms/subtitles/Subtitle';
import { formatCurrency } from '../organisms/forms/formatCurrent';
import { ReactReduxContext } from 'react-redux';
import decode from 'jwt-decode';
import {toastr} from 'toastr';

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );


const DetailReclaim = (props) => {
  const { store } = useContext(ReactReduxContext);
  const [user, setUser] = useState();
useEffect(() => {
    if (store.getState()?.Login?.login) {
        const response = decode(store.getState().Login.login);
        setUser(response?.payload?.usuario);
    }
}, []);


  const [detail, setDetail] = useState({});
  const [showView, setShowView] = useState(false);
  const [value, setValue] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {
    foliosolicitud,
    estatus,
    fechasuceso,
    numerosecuencia,
    claveempresaria,
    claveinstitucion,
    nombreempresaria,
    periodo,
    descripcioncanal,
    descripcionmotivoreclamacion,
    descripciontiporeclamacion,
    fechasolicitud,
    motivoreclamacion,
    canaltransaccion,
    producto,
    descripcionproducto,
    importereclamado,
    referenciabancaria,
    descripcionplaza,
    evidencia,
    resolucion1,
    motivoresolucion1,
    resolucion2,
    motivoresolucion2,
    fecharesolucion,
  } = detail;


  useEffect(() => {
    const id = props.match.params.id;
    getDetailReclaim(id).then((response) => setDetail(response));
  }, []);

  const loadArchive = (url) => {
    const baseUrl =
      `http://apiscomun.concredito.io:8087/api/file/gcp?path=aclaraciones/${url}`;
    toDataURL(baseUrl).then((dataUrl) => {
      const archive = dataUrl
        .replace('data:image/jpeg;base64,', '')
        .replace('data:application/octet-stream;base64,', '');

      setShowView({ archive: archive, name: url });
    });
  };

  const close = () => {
    setShowView(false);
  };

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



  const submitAutorizar = () => {

    axiosPut('cambiar-estatus', {
      'idsolicitud' : parseInt(props.match.params.id),
      'motivoautorizacion' : parseInt(value),
      'estatusreclamacion' : 'AUTORIZADA',
      'idusuario': user?.noEmpleado
  }).then(response => {
    if(response)
      toastr.success('Haz autorizado la solicitud con éxito')
    });
  };
  
  const submitRechazar = () => {
    axiosPut('cambiar-estatus', {
      'idsolicitud' : parseInt(props.match.params.id),
      'motivoautorizacion' : parseInt(value),
      'estatusreclamacion' : 'RECHAZAR',
      'idusuario': user?.noEmpleado
    }).then(response => {
      if(response)
        toastr.success('Haz rechazado la solicitud con éxito')

    }
      );
    
   
  };


  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };
  const changeSelect  =(val ) => {
    if(val){
      setValue(val);
      setButtonDisabled(false);
    }

  };
  const closeModal = () => {
    setShowModal({ ...setShowModal, isOpen: false });
    setButtonDisabled(true);
  } 

  return (
    <div className="reclamaciones_pageContainer">

      <ApoloDialogUI
        dialogTitle={showModal.action}
        dialogContent={<ModalAuthorization
          options={showModal.options}
          select={{ value: value, setValue: changeSelect }}
          text={showModal.text}
        />}
        dialogButtons={[
          {
            descripcion: 'CANCELAR',
            onClick: () => closeModal()
          },
          {
            descripcion: showModal.button,
            disabled: buttonDisabled,
            onClick: showModal.autorizar ? submitAutorizar : submitRechazar,
          }
        ]}
        onClosing={() => setShowModal({ ...setShowModal, isOpen: false })}
        open={showModal.isOpen}
      />
      <div className="App">
        <section className="wrp_form">
          <Grid container className="mb-6">
            <Grid item xs={12} sm={10}>
              <Link to="/mtesoreria-reclamaciones">
                <Button variant="text" size="small">
                  <ArrowBackIcon />
                </Button>
              </Link>
              <strong>
                Detalles solicitud <span>{foliosolicitud}</span>
              </strong>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              item
              lg={2}
              xs={1}
              sm={2}
            >

              <ApoloSelectUI
                label="Acciones"
                width="100%"
                data={{
                  array: actions,
                }}
                onChange={changeShowModal}
              />
            </Grid>
          </Grid>

          <Subtitle text="Datos de la solicitud" />

          <Grid container direction="row" spacing={2} className="wrapper_row">
            <ItemDetail
              label="Estatus de solicitud"
              text={estatus}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Fecha de solicitud"
              text={formatDate(fechasolicitud)}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Folio de solicitud"
              text={foliosolicitud}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Tipo de reclamación"
              text={descripciontiporeclamacion}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Perìodo"
              text={periodo}
              xs={6}
              sm={4}
              md={3}
              lg={1}
            />
            <ItemDetail
              label="Clave de la institución"
              text={claveinstitucion}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="No.de secuencia"
              text={numerosecuencia}
              xs={6}
              sm={4}
              md={3}
              lg={1}
            />
          </Grid>

          <Subtitle text="Datos de la reclamación" />
          <Grid container direction="row" spacing={2} className="wrapper_row">
            <ItemDetail
              label="Fecha del suceso"
              text={formatDate(fechasuceso)}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Empresaria"
              text={nombreempresaria}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Clave empresaria"
              text={claveempresaria}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Plaza"
              text={descripcionplaza}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Referencia bancaria"
              text={referenciabancaria}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Importe reclamado"
              text={ formatCurrency(importereclamado)}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />

            <ItemDetail
              label="Producto"
              text={`${producto} - ${descripcionproducto}`}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <ItemDetail
              label="Canal de transacción"
              text={`${canaltransaccion} - ${descripcioncanal}`}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              />
            <ItemDetail
              label="Motivo de reclamación"
              text={`${motivoreclamacion} - ${descripcionmotivoreclamacion}`}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            />
            <Grid item className="item-data" xs={6} sm={4} md={3} lg={2}>
              <Typography color="text.secondary" variant="subtitle2">
                Archivoss
              </Typography>
              <Typography color="" variant="subtitle1">
                {evidencia?.map((item) => (
                  <p key={item.id} className="box_link_file text-primary hover">
                    <div
                      role="button"
                      onClick={() =>
                        loadArchive(
                          item.ruta
                            .replaceAll('aclaraciones/', '')
                            .replaceAll('"', '')
                        )
                      }
                    >
                      {item.ruta
                        .replaceAll('aclaraciones/', '')
                        .replaceAll('"', '')}
                    </div>
                  </p>
                ))}
              </Typography>

              {showView ? (
                <Fragment>
                  <div onClick={close}>close</div>
                  <PreviewArchive
                    archive={showView?.archive}
                    name={showView?.name}
                  />
                </Fragment>
              ) : (
                ''
              )}
            </Grid>
          </Grid>

          <Subtitle text="Datos de la resolución" />
          <Grid container direction="row" className="wrapper_row">
            <Grid container direction="row" spacing={4}>
              <Grid item xs={12} sm={6} md={5}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className="wrapper_sec"
                >
                  <Grid className="item-data" item xs={12}>
                    <ItemDetail
                      label="Fecha de resolución"
                      text={fecharesolucion}
                    />
                  </Grid>
                  <ItemDetail
                    label="Resolución por Crédito"
                    text={resolucion1}
                    item
                    xs={6}
                    sm={6}
                  />
                  <ItemDetail
                    label="Motivo"
                    text={motivoresolucion1}
                    item
                    xs={6}
                    sm={6}
                  />
                  <ItemDetail
                    label="Resolución por Tesorería"
                    text={resolucion2}
                    item
                    xs={6}
                    sm={6}
                  />
                  <ItemDetail
                    label="Motivo"
                    text={motivoresolucion2}
                    item
                    xs={6}
                    sm={6}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </div>
    </div>
  );
};

export default DetailReclaim;