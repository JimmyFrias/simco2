import React, { useState, useMemo, useContext, } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ApoloButton, ApoloDatePicker } from 'dsmapolo-react';
import moment from 'moment';
import { axiosPost } from '../../../api/axiosRequest';
const fin = moment().format('DD/MM/YYYY');
const startDate = moment().subtract(1, 'month').format('DD/MM/YYYY');
// const b = moment().add(1, 'day');
// console.log(a);
import toastr from 'toastr';
import PropTypes from 'prop-types';
import TesoreriaContext from '../../../context/TesoreriaContext';
import { getObtenerDistribuidora2 } from '../../../reclamaciones/actions';
import UploadIcon from '../../atoms/icons/UploadIcon';
import { formatCurrency } from './formatCurrent';
import compressImage from '../../pages/compress-image';


const initialState = {
  plaza: '',
  idplaza: '', idproducto: '',
  canaltransaccion: '', origenreclamacion: '',
  motivoreclamacion: '', endFiles: [], claveempresaria: false,
  importereclamado: false
};
const FormReclams = ({ idReclamo }) => {
  const [disabled, setDisabled] = useState(true);
  const [disabledGetDistributor, setDisabledGetDistributor] = useState(true);
  const [form, setForm] = useState(initialState);
  const { catalogues, getReclaims, theme } = useContext(TesoreriaContext);
  const [distributor, setDistributor] = useState({});

  const addReclaims = async (e) => {
    e.preventDefault();

    const formulary = new FormData(e.target);
    const formatUpload = form.importereclamado.replaceAll('$', '');
    const formatImport = formatUpload.replaceAll(',', '');
    formulary.set('importereclamado', formatImport);
    formulary.set('fechasuceso', form?.fechaSuceso);
    formulary.set('claveempresaria', form?.claveempresaria);
    formulary.set('folio', form?.folio ? form?.folio : "");
    formulary.delete('evidencia');
    form?.endFiles?.map(l => formulary.append('evidencia', l));
    // form?.endFiles?.map(l => formulary.append('evidencia', l));
    axiosPost('tesoreria/mtesoreria-reclamaciones/solicitud-reclamacion', formulary)
      .then(response => {
        if (response.status === 200) {
          toastr.success('La solicitud se ha creado exitosamente');
          getReclaims();
          setForm(initialState);
          setDistributor({});
        } else {
          toastr.warning('La solicitud no se ha creado');
        }
      });
    e.target.reset();
  };

  const validateEntry = (e) => {
    if (!/^[0-9]{0,10}$/gi.test(e.target.value)) {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validateFolio = (e) => {
    if (!/^[a-z0-9]{0,20}$/gi.test(e.target.value)) {
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useMemo(() => {
    if (
      form?.distributor
      && form.claveempresaria
      && form.importereclamado?.length
      && form.file
      && form?.motivoreclamacion !== null
      && form?.idproducto !== null
      && form?.canaltransaccion !== null
      && form?.origenreclamacion !== null
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    form.claveempresariaInput?.length && form?.idplaza ? setDisabledGetDistributor(false) : setDisabledGetDistributor(true);

  }, [form]);



  const removeArchiveName = (indexFile) => {
    const newFiles = form?.endFiles?.filter((element, index) => index !== indexFile);
    if (newFiles.length) {
      setForm({ ...form, file: true, listFiles: newFiles, endFiles: newFiles });

    } else {
      setForm({ ...form, file: false, listFiles: [], endFiles: [] });
    }
    // setForm({ ...form, file: false });

  };

  const getObtenerDistribuidora = (e) => {
    setDistributor({});
    const query = {
      idPlaza: form?.idplaza,
      clave: form?.claveempresariaInput,
    };
    getObtenerDistribuidora2(query).then(response => {
      if (response?.message) {
        setForm({ ...form, distributor: false });
      }

      if (!response?.message) {
        setDistributor(response);
        setForm({ ...form, distributor: true, claveempresaria: response.id });
      }

    });
    return e;
  };

  const handleChangeSelects = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    const files = Array.from(e.target.files);
    const file = e.target.files[0];
    if (file.size > 5000000) {
      setForm({ ...form, file: false });
      toastr.warning('No se pueden cargar archivos mayores a 5 MB');
    } else {
      const images = form.endFiles.concat(files);
      setForm({ ...form, file: true, endFiles: images });
    }
  };


  const handleChangeFechaDesde = (e) => {
    setForm({ ...form, fechaSuceso: e });
  };

  // const removeArchive = () => {
  //   const archive = document.querySelector('input[name="evidencia"]');
  //   archive.value = '';
  //   setForm({ ...form, evidencia: false, file: false });
  // };

  const handledCurrency = (e) => {
    const format = formatCurrency(e.target.value);
    setForm({ ...form, [e.target.name]: format, formatImporte: format });
  };

  return (
    <form onSubmit={addReclaims} encType="multipart/form-data">

      <input type='text' name="tiporeclamacion" hidden value={idReclamo} />
      <div className="reclamacionesDrawerInputs">
        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '100%' }}
            name="idplaza"
            id="reclamacionesplaza"
            label="Plaza*"
            variant="outlined"

            select
            value={form?.idplaza}
            onChange={handleChangeSelects}
          >
            {catalogues?.plaza?.map((item) => (
              <MenuItem key={item.clave} value={item.id}>
                {item.id} - {item.descripcion}
              </MenuItem>
            ))}
          </TextField>
        </MuiThemeProvider>

        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '70%', marginLeft: '20px' }}
            name="claveempresariaInput"
            id="reclamacionesclaveempresaria"
            label="Clave Empresaria"
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: '20' }}
            pattern="[0-9]{10}"
            required
            type="number"
            onChange={validateEntry}
            value={form?.claveempresariaInput}
          />
        </MuiThemeProvider>
      </div>
      <div className="buscarReclamacionContainer">
        <ApoloButton
          contained
          id="traerDistribuidora"
          text="Traer"
          disabled={disabledGetDistributor}
          onClick={getObtenerDistribuidora}
          full
        />
      </div>
      <div className="reclamacionesDrawersText1">
        <p>Nombre empresaria</p>
        <p>Referencia Bancaria</p>
      </div>
      <div className="reclamacionesDrawersText2">
        <p>{distributor?.nombreCompleto}</p>
        <p>{distributor?.numeroReferenciaPagos}</p>
      </div>
      <div className="reclamacionesDrawerInputs">
        <div className="reclamacionesFechadelSuceso">
          <MuiThemeProvider>
            <ApoloDatePicker
              label={'Fecha Suceso*'}
              value={form?.fechaSuceso}
              onChange={handleChangeFechaDesde}
              minDate={startDate}
              maxDate={fin}
            />
          </MuiThemeProvider>
        </div>
        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '100%' }}
            name="idproducto"
            id="producto"
            label="Producto*"
            variant="outlined"
            select
            value={form?.idproducto}
            onChange={handleChangeSelects}
          >
            {catalogues?.productos?.map((item) => (
              <MenuItem key={item.claveProducto} value={item.claveProducto}>
                {item.descripcionProducto}
              </MenuItem>
            ))}
          </TextField>
        </MuiThemeProvider>
      </div>
      <div className="reclamacionesDrawerInputs">
        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '100%' }}
            name="canaltransaccion"
            id="canaltransaccion"
            label="Canal de Transacción*"
            variant="outlined"
            select
            value={form?.canaltransaccion}
            onChange={handleChangeSelects}
          >
            {catalogues?.canales?.map((item) => (
              <MenuItem key={item.claveCanal} value={item.claveCanal}>
                {item.descripcionCanal}
              </MenuItem>
            ))}
          </TextField>
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '70%', marginLeft: '20px' }}
            name="importereclamado"
            id="importereclamado"
            label="Importe reclamado"
            variant="outlined"
            autoComplete="off"
            inputProps={{ maxLength: '14' }}
            pattern="[0-9]{5,10}"
            required
            onChange={handledCurrency}
            value={form.formatImporte}
          />
        </MuiThemeProvider>
      </div>
      <div className="reclamacionesDrawerInputs">
        <MuiThemeProvider theme={theme}>
          <TextField
            style={{ width: '100%' }}
            name="origenreclamacion"
            label="Origen de reclamación*"
            variant="outlined"
            select
            value={form?.origenreclamacion}
            onChange={handleChangeSelects}
          >
            {catalogues?.origenreclamacion?.map((item) => (
              <MenuItem key={item.claveorigenreclamacion} value={item.claveorigenreclamacion}>
                {item.claveorigenreclamacion} - {item.descripcionorigenreclamacion}
              </MenuItem>
            ))}
          </TextField>
        </MuiThemeProvider>

        {(form?.origenreclamacion !== 701 && form?.origenreclamacion !== '' && form?.origenreclamacion !== null && form?.origenreclamacion !== undefined) ? (
          <MuiThemeProvider theme={theme}>
            <TextField
              style={{ width: '70%', marginLeft: '20px' }}
              name="folio"
              id="reclamacionesfolio"
              label="Folio"
              variant="outlined"
              autoComplete="off"
              // inputProps={{ maxLength: '20' }}
              onChange={validateFolio}
              value={form?.folio}
            //onChange={handleChangeSelects}
            />
          </MuiThemeProvider>

        ) : <></>

        }
      </div>
      <MuiThemeProvider theme={theme}>
        <TextField
          style={{ width: '100%' }}
          name="motivoreclamacion"
          id="motivoreclamacion"
          label="Motivo de reclamación*"
          variant="outlined"
          select
          value={form?.motivoreclamacion}
          onChange={handleChangeSelects}
        >
          {catalogues?.motivoreclamacion?.map((item) => (
            <MenuItem key={item.claveMotivoReclamacion} value={item.claveMotivoReclamacion}>
              {item.descripcionMotivoReclamacion}
            </MenuItem>
          ))}
        </TextField>
      </MuiThemeProvider>
      <div className="">

        <input
          id="fileUploader"
          className="inputfile"
          name="evidencia"
          type="file"
          multiple
          required
          onChange={handleChangeFile}
          accept=".pdf,.jpeg"
        />
        <label htmlFor="fileUploader">
          <UploadIcon />
          ADJUNTAR ARCHIVO

        </label>

        {
          form?.endFiles?.map((element, index) => (
            <div className="flex removeFile " key={element.name}>
              <p className="text-primary">{element.name}</p>
              <span className="pointer secondary" role="button" onClick={() => removeArchiveName(index)}>
                X
              </span>
            </div>))
        }
      </div>
      <br></br>
      <br></br>
      <br></br>

      <ApoloButton
        contained
        id="buttonSearch"
        text="CREAR"
        full
        disabled={disabled}
        type="submit"
      />
    </form>
  );
};
FormReclams.propTypes = {
  idReclamo: PropTypes.number.isRequired
};

export default FormReclams;