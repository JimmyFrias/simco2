import React, { Component } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Notificaciones } from 'utils-accouting';

import { ApoloDatePicker, ApoloButton } from 'dsmapolo-react';

import '../styles/custom.css';

import { getComprobanteSpei } from '../comprobantesSPEI/actions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import ImageViewer from '../utils/ImageViewer';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#00AC68'},
  }
});

const today = moment().format('DD/MM/YYYY');
const minDate = moment('2000-01-01').format('DD/MM/YYYY');

export class ConsultaComprobantesSPEI extends Component {

  constructor(props) {
      super(props);
      this.state = {
          openDialog: false,
          anchorEl: null,
          query: {
            folio: '',
            fecha:'',
          },
          waiting: false,
          pageNumber: 1,
          showResult: false,
      };
  }

  getComprobanteSpei = async () => {
      let actualDay = parseInt(moment().format('DD'));
      let actualMonth = parseInt(moment().format('MM'));
      let actualYear = parseInt(moment().format('YYYY'));

      let datePicked = this.state.query.fecha.split('/');
      let dayPicked = parseInt(datePicked[0]);
      let monthPicked = parseInt(datePicked[1]);
      let yearPicked = parseInt(datePicked[2]);

      let showMessageError = false;
      if(yearPicked > actualYear){
        showMessageError = true;
      }
      if(yearPicked >= actualYear && monthPicked > actualMonth){
        showMessageError = true;
      }
      if(yearPicked >= actualYear && monthPicked >= actualMonth && dayPicked > actualDay) {
        showMessageError = true;
      }
      if(showMessageError) {
        Notificaciones.infoMessage('La fecha seleccionada debe ser menor o igual al actual');
        return;
      }
      await this.setState({
          waiting: true
      });
      let query={};
      Object.assign(query, this.state.query);
      query.fecha = this.formatDate(query.fecha);
      await this.props.actionGetComprobanteSpei(query);
      await this.setState({
          waiting: false,
          showResult: true,
      });
  }

  formatDate = (date) => {
    let newDate = date.split('/');
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  }

  paramsActions = async (target,  data) => {
    if(data != '' && target === 'folio') {
      const reg = /^[\w\d]+$/;
      if(data.toString().length > 10){
       return;
      }
      if(!reg.test(data)) {
       return;
      }
      if(data.includes('_')){
        return;
      }
    }
    await this.setState(prevState => ({
        query: {
            ...prevState.query,
            [target]: data,
        }
    }));
  };

  clearData = async () => {
    await this.setState(prevState => ({
        query: {
            ...prevState.query,
            folio: '',
            fecha: '',
        },
        showResult: false,
    }));
  }

  formatMoney = (numberCCSPEI, decPlacesCCSPEI, decSepCCSPEI, thouSepCCSPEI) => {
    if (typeof thouSepCCSPEI === 'undefined') {
      decSepCCSPEI = ',';
    }
    if (typeof decSepCCSPEI === 'undefined') {
      decSepCCSPEI = '.';
    }
    if (isNaN(decPlacesCCSPEI = Math.abs(decPlacesCCSPEI))) {
      decPlacesCCSPEI = 2;
    }
    let signCCSPEI = numberCCSPEI < 0 ? '-' : '';
    let iCCSPEI = String(parseInt(numberCCSPEI = Math.abs(Number(numberCCSPEI) || 0).toFixed(decPlacesCCSPEI)));
    let jCCSPEI = iCCSPEI.length;
    jCCSPEI = jCCSPEI > 3 ? jCCSPEI % 3 : 0;

    return signCCSPEI +
      (jCCSPEI ? iCCSPEI.substr(0, jCCSPEI) + thouSepCCSPEI : '') +
      iCCSPEI.substr(jCCSPEI).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSepCCSPEI) +
      (decPlacesCCSPEI ? decSepCCSPEI + Math.abs(numberCCSPEI - iCCSPEI).toFixed(decPlacesCCSPEI).slice(2) : '');
  }

  validaEntrada = (event) => {
    const reg = /^[\w\d]+$/;
    if(!reg.test(event.key)) {
      event.preventDefault();
    }
  }

  render() {
    const { query:{ folio, fecha }, waiting, pageNumber, showResult } = this.state;
    const { comprobante } = this.props;
      return (
        <div className="containerLayout">
            <div className="containerTitleLayout">
                <span className="tituloLayout">Comprobante SPEI BBVA</span>
            </div>
            <div className="containerComprobantes">
              <div className="form">
                <span className="tituloForm">Datos de búsqueda</span>
                <hr className="hrdivisor"/>
                <div className="inputsContainer">
                  <div className="inputTextDiv">
                    <MuiThemeProvider theme={theme}>
                      <TextField
                          name="folio"
                          id="folio"
                          label="Folio"
                          value={folio}
                          margin="none"
                          variant="outlined"
                          autoComplete="off"
                          onChange={(e) => { this.paramsActions('folio', e.target.value); }}
                          inputProps={{ style:{height:'13px'} }}
                          onKeyPress={(event) => { this.validaEntrada(event); }}
                          fullWidth
                      />
                    </MuiThemeProvider>
                  </div>
                  <ApoloDatePicker
                    id='fecha'
                    name='fecha'
                    label={ 'Fecha' }
                    required
                    onChange={ (date) => { this.paramsActions('fecha', date); } }
                    value={fecha}
                    maxDate={today}
                    minDate={minDate}
                  />
                </div>
                <div className="buttonContainer">
                  <ApoloButton contained
                    id='buttonSearch'
                    text={'Buscar'}
                    disabled={!(folio != '' && fecha != '')}
                    waiting={waiting}
                    onClick={ this.getComprobanteSpei }
                    full
                  />
                </div>
              </div>
              <div className="result">
               { showResult ?
                 <div>
                 { comprobante.hasOwnProperty('pdf') ?
                 <div>
                  <div className="resultTitle">
                    <span className="buttonCloseResult" onClick={ this.clearData }>X</span>
                    <span className="tituloResult">Resultado de búsqueda</span>
                  </div>
                  <div className="resultSection">
                    <div className="pdfPreview">
                      <ImageViewer
                        src={comprobante.hasOwnProperty('pdf') && comprobante.pdf ? comprobante.pdf : null}
                        rotationIncrement={90}
                        scaleIncrement={0.5}
                        showControls={true}
                        docType={'pdf'}
                        onDocumentLoadSuccess={({ numPages }) => {
                          this.setState({ numPages });
                        }}
                        documentPrefix={'ComprobanteSPEI'}
                        pageNumber={pageNumber}
                        folioVale={folio}
                      />
                    </div>
                    <div className="detalleComprobante">
                      <span className="tituloDetalle">Nombre del cliente</span>
                      <span className="datosDetalle">{comprobante.hasOwnProperty('cliente') ? comprobante.cliente : 'N/A'}</span>
                      <span className="tituloDetalle">Monto</span>
                      <span className="datosDetalle">{comprobante.hasOwnProperty('monto') ?  `$${this.formatMoney(comprobante.monto, 2, '.', ',')}` : 'N/A'}</span>
                      <span className="tituloDetalle">Banco</span>
                      <span className="datosDetalle">{comprobante.hasOwnProperty('banco') ? comprobante.banco : 'N/A'}</span>
                      <span className="tituloDetalle">Plaza</span>
                      <span className="datosDetalle">{comprobante.hasOwnProperty('plaza') ? comprobante.plaza : 'N/A'}</span>
                      <span className="tituloDetalle">Empresaria</span>
                      <span className="datosDetalle">{comprobante.hasOwnProperty('empresaria') ? comprobante.empresaria : 'N/A'}</span>
                    </div>
                  </div>
                 </div>
                  : <div>
                      <div className="resultTitle">
                        <span className="buttonCloseResult" onClick={ this.clearData }>X</span>
                        <span className="tituloResult">Resultado de búsqueda</span>
                      </div>
                      <span className="errorResponse">No hay resultados de búsqueda</span>
                    </div> }
                  </div>
                : null }
              </div>
            </div>
        </div>
      );
  }
}

ConsultaComprobantesSPEI.propTypes = {
    actionGetComprobanteSpei: PropTypes.func.isRequired,
    comprobante: PropTypes.any.isRequired,
    permisos: PropTypes.any.isRequired
};


const mapStateToProps = state => {
    return {
        comprobante: state.ComprobatesSPEI.comprobante,
        permisos: state.BasePermits.permits
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionGetComprobanteSpei: (query) => dispatch(getComprobanteSpei(query)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ConsultaComprobantesSPEI);
