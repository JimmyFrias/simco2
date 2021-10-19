import React, { Component } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../styles/custom.css';
import { ApoloButton, ApoloDatePicker, ApoloDialog } from 'dsmapolo-react';
import { createMuiTheme, MuiThemeProvider, TextField } from '@material-ui/core';
import { getConsultaRSTSantander, postCancelacionRSTSantander, resetListCancelacionesRTSSantander } from '../ConsultaCancelacionRSTSantander/actions';
import { CustomTable } from './CustomTable';

const theme = createMuiTheme({
    palette: {
        primary: {main: '#00AC68'},
    }
});

const columnsTable = [
    { name: 'numeroRastreo', data: '# Rastreo' },
    { name: 'fechaCanje', data: 'Fecha canje' },
    { name: 'horaCanje', data: 'Hora' },
    { name: 'nombrePlaza', data: 'Plaza' },
    { name: 'claveColocadora', data: 'Clave empresaria' },
    { name: 'folioVale', data: 'Folio vale' },
    { name: 'nombreCliente', data: 'Cliente' },
    { name: 'celularCliente', data: 'Celular' },
    { name: 'companiaTelefonicaCliente', data: 'Compañía' },
    { name: 'importe', data: 'Importe' },
    { name: 'statusRst', data: 'Estatus' },
    { name: 'motivoRechazoRst', data: 'Motivo de rechazo' },
];

const fin = moment().format('DD/MM/YYYY');

export class ConsultaCancelacionRSTSantander extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: {
                folioVale: '',
                nombre:'',
                importe: '',
                fechaDesde: '',
                fechaHasta: '',
                pageSize: 10,
                pageNo: 0,
            },
            rowNow: 1,
            rowTo: 10,
            showDialog: false,
            selectedRows: [],
            showEmptyResult: false,
        };
        this.escFunction = this.escFunction.bind(this);
    }

    searchButtonDisabled = () => {
        const { query: { folioVale, nombre, importe, fechaDesde, fechaHasta } } = this.state;
        let valid = folioVale.length >= 3 || nombre.length >= 3 || importe != '' || fechaDesde != '' || fechaHasta;
        return valid;
    }

    escFunction(event){
      if(event.keyCode === 27) {
        this.dialogCancel();
      }
    }

    async componentDidMount() {
        await this.setState({ showEmptyResult: false });
        await this.props.actionResetListCancelacionesRTSSantander();
        document.addEventListener('keydown', this.escFunction, false);
    }

    componentWillUnmount(){
      document.removeEventListener('keydown', this.escFunction, false);
    }

    getConsultaRSTSantander = async (fromButton = false) => {
        let queryToSend = {};
        Object.assign(queryToSend, this.state.query);
        queryToSend.fechaDesde = this.formatDateC(queryToSend.fechaDesde);
        queryToSend.fechaHasta = this.formatDateC(queryToSend.fechaHasta);
        if(fromButton){
          queryToSend.pageNo = 0;
          await this.setState(({ query }) => {
            return {
              query: {
                ...query,
                pageNo: 0,
                pageSize: 10,
              },
              rowNow: 1
            };
          });
        }
        await this.props.actionGetConsultaRSTSantander(queryToSend);
        await this.setState({ selectedRows: [], showEmptyResult: true });
        await this.setState({
          rowTo: this.props.listRstSantander.numberOfElements,
        });
    }

    buttonCancelRST = async () => {
        this.setState({ showDialog: true });
    }

    dialogCancel = async() => {
        this.setState({ showDialog: false });
    }

    postCancelacionRSTSantander = async () => {
        const { selectedRows } = this.state;
        const { listRstSantander } = this.props;
        const list =  listRstSantander.content;
        const prestamosSelected = selectedRows.map( element => list.filter(obj => obj.idPrestamo  === element));
        const idPrestamos = prestamosSelected.map( prestamo => prestamo[0].idPrestamo)
            .reduce((l,r) => `${l},${r}`, '')
            .substring(1);
        await this.props.actionPostCancelacionRSTSantander({ idPrestamos });
        await this.getConsultaRSTSantander();
        this.setState({ showDialog: false });
    }

    formatDateC = (date) => {
        if (date == '') {
            return date;
        }
        let newDate = date.split('/');
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    }

      paramsActions = (target, data) => {
        if(data != '' && target === 'importe') {
          if(data.toString().length > 20){
           return;
          }
        }
        if (target === 'folioVale') {
          if (!/^[a-z0-9]{0,10}$/gi.test(data)) {
            return;
          }
        }
        if (target === 'nombre') {
          if (!/^[a-z\s]{0,50}$/gi.test(data)) {
            return;
          }
        }
        this.setState(({ query }) => {
          return {
            query: {
              ...query,
              [target]: data,
            }
          };
        });
    }

    evSelected = (rows) => {
      const { listRstSantander } = this.props;
      let { selectedRows } = this.state;
      const permits = ['CADUCO', 'RECHAZADO', 'ACTIVO'];

      let currentRow = {};
      for ( const { key, status } of rows ) {
          if (status && !selectedRows.includes(key)) {
              currentRow = listRstSantander.content.filter(item => item.idPrestamo === key);
              if(permits.includes(currentRow[0].statusRst)){
                selectedRows.push(key);
              }
          }
          if (!status && selectedRows.includes(key)) {
              selectedRows.splice(selectedRows.indexOf(key), 1);
          }
      }
      this.setState({ selectedRows });
    }

    tableData = (data) => {
      let newDataTable = [];
      let dataTable = [];
      data.map((val) => {
        newDataTable.push({
          'numeroRastreo': val.numeroRastreo,
          'fechaCanje': val.fechaCanje,
          'horaCanje': `${val.horaCanje} Hrs.`,
          'nombrePlaza': val.nombrePlaza,
          'claveColocadora':  val.claveColocadora,
          'folioVale': val.folioVale,
          'nombreCliente': val.nombreCliente,
          'celularCliente': val.celularCliente,
          'companiaTelefonicaCliente': val.companiaTelefonicaCliente,
          'importe': `$${this.formatMoneyCancelaciones(val.importe, 2, '.', ',')}`,
          'statusRst': val.statusRst,
          'motivoRechazoRst': val.motivoRechazoRst,
          'idPrestamo': val.idPrestamo,
          'key': val.idPrestamo,
          'status': false,
        });
      });
      dataTable.items = newDataTable;
      return dataTable;
    }

    formatMoneyCancelaciones = (number, decPlaces, decSep, thouSep) => {
      if (typeof thouSep === 'undefined') {
        decSep = ',';
      }
      if (typeof decSep === 'undefined') {
        decSep = '.';
      }
      if (isNaN(decPlaces = Math.abs(decPlaces))) {
        decPlaces = 2;
      }
      let sign = number < 0 ? '-' : '';
      let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
      let j = i.length;
      j = j > 3 ? j % 3 : 0;

      return sign +
        (j ? i.substr(0, j) + thouSep : '') +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : '');
    }

    setPage = async (action, size) => {
      const { listRstSantander } = this.props;
      if(action==='prev' && this.state.query.pageNo > 0){
        await this.setState(prevState => ({
            query: {
                ...prevState.query,
                'pageNo': this.state.query.pageNo - 1
            }
        }));
      }
      if(action==='next' && this.state.query.pageNo < listRstSantander.totalPages-1){
        await this.setState(prevState => ({
          query: {
            ...prevState.query,
            'pageNo': this.state.query.pageNo + 1
          }
        }));
      }
      if(action==='limit'){
        await this.setState(prevState => ({
            query: {
                ...prevState.query,
                'pageSize': size
            }
        }));
      }
      await this.getConsultaRSTSantander();
      let to = this.state.query.pageNo == 0 ? this.state.query.pageSize :
               this.state.query.pageSize * (this.state.query.pageNo + 1);
      let actualRow = this.state.query.pageNo == 0 ? 1 :
                  (this.state.query.pageNo * this.state.query.pageSize) + 1;
      await this.setState({
        rowTo: this.props.listRstSantander.totalElements > 0 && this.props.listRstSantander.totalElements < to ?
        this.props.listRstSantander.totalElements : to,
        rowNow: actualRow
      });
    }

    validaEntradaNumeros = (event) => {
      const reg = /^[0-9]*$/;
      if(!reg.test(event.key)) {
        event.preventDefault();
      }
    }

    diferenciaFechas = (dateFrom, dateTo) => {
      const fecha1 = moment(this.formatDateC(dateFrom));
      const fecha2 = moment(this.formatDateC(dateTo));
      const dif = fecha2.diff(fecha1, 'days');
      return dif > 0;
    }

    handlerCopyCobranza = (event) => {
      event.preventDefault();
    }

    render() {
        const { query: { folioVale, nombre, importe, fechaDesde, fechaHasta },
                rowNow, rowTo, selectedRows, showEmptyResult, showDialog } = this.state;
        const { listRstSantander } = this.props;
        return (
            <div className="containerLayout">
                <div className="containerTitleLayoutCancelacion">
                    <span className="tituloLayoutCancelacion">Consulta / Cancelación de RST Santander</span>
                </div>
                <div className="containerComprobantes">
                    <div className="form25">
                        <span className="tituloForm">Datos de búsqueda</span>
                        <hr className="hrdivisorCancelaciones"/>
                        <div className="inputsContainerCancelaciones">
                            <div className="inputTextDivCancelaciones">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name="folio"
                                        id="folio"
                                        label="Folio vale"
                                        margin="none"
                                        variant="outlined"
                                        autoComplete="off"
                                        value={folioVale}
                                        onChange={ e => this.paramsActions('folioVale', e.target.value) }
                                        inputProps={{ style: { height: '13px '} }}
                                        fullWidth
                                        onPaste={this.handlerCopyCobranza}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="inputTextDivCancelaciones">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name="nombre"
                                        id="nombre"
                                        label="Nombre cliente"
                                        margin="none"
                                        variant="outlined"
                                        autoComplete="off"
                                        value={nombre}
                                        onChange={ e => this.paramsActions('nombre', e.target.value) }
                                        inputProps={{ style: { height: '13px '} }}
                                        fullWidth
                                        onPaste={this.handlerCopyCobranza}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="inputTextDivCancelaciones">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name="importe"
                                        id="importe"
                                        label="Importe"
                                        margin="none"
                                        variant="outlined"
                                        autoComplete="off"
                                        value={importe}
                                        onKeyPress={(event) => { this.validaEntradaNumeros(event); }}
                                        onChange={ e => this.paramsActions('importe', e.target.value) }
                                        inputProps={{ style: { height: '13px '} }}
                                        fullWidth
                                        onPaste={this.handlerCopyCobranza}
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="datePickerDiv">
                                <ApoloDatePicker
                                    id='fechaInicio'
                                    name='fechaInicio'
                                    label={ 'Fecha inicio' }
                                    onChange={ date => this.paramsActions('fechaDesde', date) }
                                    value={fechaDesde}
                                    maxDate={this.diferenciaFechas(fechaHasta, fin) ? fechaHasta : fin }
                                    fullWidth
                                />
                            </div>
                            <div className="datePickerDiv">
                                <ApoloDatePicker
                                    id='fechaFin'
                                    name='fechaFin'
                                    label={ 'Fecha fin' }
                                    onChange={ date => this.paramsActions('fechaHasta', date) }
                                    value={fechaHasta}
                                    minDate={fechaDesde}
                                    maxDate={fin}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className="buttonContainerCancelaciones">
                            <ApoloButton contained
                                id='buttonSearch'
                                text={'Buscar'}
                                disabled={ !this.searchButtonDisabled() }
                                onClick={ () => { this.getConsultaRSTSantander(true); } }
                                full
                            />
                        </div>
                    </div>
                    <div className="result75">
                        <span className="tituloForm">&nbsp;</span>
                        <hr className="hrdivisor"/>
                        <div className="tituloTable">
                            {
                                listRstSantander && listRstSantander.length != 0 ? (
                                    <div className="elementosSeleccionados">
                                        { `${ selectedRows.length } elemento(s) seleccionado(s)` }
                                    </div>
                                ) : (
                                    <span/>
                                )
                            }
                            <ApoloButton
                                id='buttonCancel'
                                text={'Cancelar RST'}
                                disabled={ selectedRows.length == 0 }
                                waiting={ false }
                                onClick={ this.buttonCancelRST }
                                flat
                            />
                        </div>
                        <hr className="hrdivisor"/>
                        {
                          listRstSantander.hasOwnProperty('content') && listRstSantander.content.length != 0 ? (
                                <CustomTable
                                    selected={true}
                                    evSelected={this.evSelected}
                                    rowsSelects={selectedRows}
                                    columns={columnsTable}
                                    data={this.tableData(listRstSantander.content)}
                                    permits={['CADUCO', 'RECHAZADO', 'ACTIVO']}
                                    pages={{
                                        now: rowNow,
                                        to: rowTo,
                                        rows: listRstSantander.totalElements,
                                        actions: {
                                            change: (size) => this.setPage('limit', size),
                                            next: () => this.setPage('next'),
                                            prev: () => this.setPage('prev'),
                                        }
                                    }}
                                />
                            ) : (
                                showEmptyResult ? (
                                    <div className="noEntriesFound">No se encontraron coincidencias con los datos de búsqueda ingresados</div>
                                ) : (
                                    <div/>
                                )
                            )
                        }
                    </div>
                </div>
                <ApoloDialog
                    title={ 'Cancelar RST seleccionado' }
                    text={ '¿Estás seguro que deseas cancelar el RST Santander del cliente seleccionado?' }
                    isOpen={ showDialog }
                    acept={{
                        text: 'Aceptar',
                        onClick: this.postCancelacionRSTSantander
                    }}
                    cancel={{
                        text: 'Cancelar',
                        onClick: this.dialogCancel,
                    }}
                />
            </div>
        );
    }
}

ConsultaCancelacionRSTSantander.propTypes = {
    listRstSantander: PropTypes.any.isRequired,
    actionGetConsultaRSTSantander: PropTypes.any.isRequired,
    actionPostCancelacionRSTSantander: PropTypes.any.isRequired,
    actionResetListCancelacionesRTSSantander: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
    return {
        listRstSantander: state.ConsultaCancelacionRSTSantander.listRstSantander
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionGetConsultaRSTSantander: (query) => dispatch(getConsultaRSTSantander(query)),
        actionPostCancelacionRSTSantander: (query) => dispatch(postCancelacionRSTSantander(query)),
        actionResetListCancelacionesRTSSantander: () => dispatch(resetListCancelacionesRTSSantander()),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ConsultaCancelacionRSTSantander);
