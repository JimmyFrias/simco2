import React, { Component } from 'react';



import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import PieChartOutlinedIcon from '@material-ui/icons/PieChartOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { ApoloDatePicker, ApoloButton } from 'dsmapolo-react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import moment from 'moment';
import '../styles/custom.css';

import  '../styles/segundaConciliacionMercadoPago.css';
import PaginationTable from './PaginationTable.js';
import { getConciliacionMercadoPagoExcel } from '../conciliacionMercadoPago/actions';
import { getConciliacionMercadoPago } from '../conciliacionMercadoPago/actions';



const fin = moment().format('DD/MM/YYYY');


const theme = createMuiTheme({
  palette: {
    primary: {main: '#00AC68'},
  },
  overrides: {
    MuiFormControl: {
      root: {
        height: '80px',
      },
    },
    MuiInputBase: {
      root: {
        height: '49px',
      },
    },
  },
});

export class ConsultaConciliacionMercadoPago extends Component {

  constructor(props) {
      super(props);
      this.handleChangePageSize = this.handleChangePageSize.bind(this);
      this.handleChangePagePrev= this.handleChangePagePrev.bind(this);
      this.handleChangePageNext= this.handleChangePageNext.bind(this);
      this.state = {
        claveRastreo: '',
        numeroReferencia: '',
        status: '',
        fechaInicio: '',
        fechaFinal: '',
        totalElements: '-',
        tableData: '',
        totalPorConciliar: '-',
        totalConciliados: '-',
        totalMovimientos: '-',
        pageNo: 0,
        pageSize: 10,
        waiting: false,
        showResult: false,
        buscar: false,
        clickDate1: false,
        clickDate2: true
      };
  }

  handleChangeClave = (e) => {
    this.setState({claveRastreo: e.target.value.substr(0,50)});
    this.setState({buscar: false});
  }
  handleChangeReferencia = (e) => {
    this.setState({numeroReferencia: e.target.value.substr(0,10)});
    this.setState({buscar: false});
  }
  onPaste = (e) => {
    const str = e.clipboardData.getData('Text');
    const newStr = str.replace(/[+-.]/g, '');
    if (str !== newStr) {
      e.preventDefault();
    }
  }
  handleChangeStatus = (e) => {
    this.setState({status: e.target.value});
    this.setState({buscar: false});
  }
  handleChangeFechaDesde = (e) => {
    this.setState({fechaInicio: e});
    this.setState({buscar: false});
  }
  handleChangeFechaHasta = (e) => {
    this.setState({fechaFinal: e});
    this.setState({buscar: false});
  }
  handleChangePageSize = (event) => {
    this.setState({pageSize:  +event.target.value});
    this.setState({pageNo:  0});
  };
  handleChangePagePrev = () => {
    let currentPage = this.state.pageNo;
    let prevPage = currentPage -1;
    if(currentPage > 0) {
      this.setState({pageNo: prevPage});
    }
  };
  handleChangePageNext = () => {
    let currentTotalElements = this.state.totalElements;
    let currentPageSize = this.state.pageSize;
    let currentPage = this.state.pageNo;
    let nextPage = currentPage + 1;
    if (currentPage +1 < (currentTotalElements/currentPageSize)) {
      this.setState({pageNo: nextPage});
    }
  };
  getConciliacionMercadoPagoExcel = async () => {
    await this.setState({waiting: true});
    let query={};
    query.claveRastreo = this.state.claveRastreo;
    query.numeroReferencia = this.state.numeroReferencia;
    query.status = this.state.status;
    query.fechaInicio = this.state.fechaInicio;
    query.fechaFinal = this.state.fechaFinal;
    await this.props.actionGetConciliacionMercadoPagoExcel(query);
    await this.setState({ waiting: false, showResult: true,});
  }
  getConciliacionMercadoPago = async () => {
    await this.setState({waiting: true});
    let query={};
    query.claveRastreo = this.state.claveRastreo;
    query.numeroReferencia = this.state.numeroReferencia;
    query.status = this.state.status;
    query.fechaInicio = this.state.fechaInicio;
    query.fechaFinal = this.state.fechaFinal;
    query.pageNo = 0;
    query.pageSize = 10000000;
    await this.props.actionGetConciliacionMercadoPago(query);
    
    function createData(plaza, importeCobrado, fechadeCobro, fechadeIntegracion, numdeReferencia, clavedeRastreo, estatus) {
      return { plaza, importeCobrado, fechadeCobro, fechadeIntegracion, numdeReferencia, clavedeRastreo, estatus };
    }
    
    let apiresponselements = this.props.conciliacion.page.content;
    let tableRows = [];
    
    for (let i=0; i < apiresponselements.length; i++) {
      let singleRow = createData(apiresponselements[i].plaza, '$' + apiresponselements[i].importe.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), apiresponselements[i].fechaMovimiento, apiresponselements[i].fechaIntegracion, apiresponselements[i].referencia, apiresponselements[i].claveRastreo, apiresponselements[i].status);
      tableRows.push(singleRow);
    }
    await this.setState({tableData: tableRows});
    await this.setState({pageNo: 0});
    await this.setState({totalElements: this.props.conciliacion.page.totalElements});
    await this.setState({totalPorConciliar: this.props.conciliacion.totalPorConciliar});
    await this.setState({totalConciliados:  this.props.conciliacion.totalConciliados});
    await this.setState({totalMovimientos:  this.props.conciliacion.totalMovimientos});
    await this.setState({waiting: false, showResult: true,});
    await this.setState({buscar: true});
  }
  render() {
    let maxFechaHasta = '';
    if (this.state.fechaFinal === '') {
      maxFechaHasta = fin;
    } else  {
      maxFechaHasta = this.state.fechaFinal;
    }
    return (

      <div className="segundaConciliacionMercadoPago_pageContainer">
        <div className="segundaConciliacionMercadoPago_topContainer">
          
          <div className="segundaConciliacionMercadoPago_topArea">
            <div className="segundaConciliacionMercadoPago_title">
              <p>Segunda Conciliación Mercado Pago</p>
            </div>
            <div className="segundaConciliacionMercadoPago_descargarButtonArea">
              <ApoloButton contained
                id='buttonSearch'
                className="segundaConciliacionMercadoPago_button"
                disabled={
                  !(this.state.status && this.state.fechaInicio && this.state.fechaFinal && this.state.buscar)
                }
                onClick={this.getConciliacionMercadoPagoExcel.bind(this)}
                full
              >
                <GetAppRoundedIcon /><p className="segundaConciliacionMercadoPago_buttonLabel">DESCARGAR EXCEL</p>
              </ApoloButton>
            </div>
          </div>
          <div className="segundaConciliacionMercadoPago_bottomArea">
            <MuiThemeProvider theme={theme}>
              <div className="segundaConciliacionMercadoPago_textfieldarea">
                <TextField
                  style= {{ width: '100%'}} 
                  name="clavederastreo"
                  id="conciliacion-mercadopago-clavederastreo"
                  label="Clave de Rastreo"
                  variant="outlined"
                  autoComplete="off"
                  value={this.state.claveRastreo}
                  onChange={this.handleChangeClave.bind(this)} 
                />
              </div>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <div className="segundaConciliacionMercadoPago_textfieldarea">
                <TextField
                  style= {{ width: '100%'}}
                  name="ndereferencia"
                  id="conciliacion-mercadopago-ndereferencia"
                  label="No. de Referencia"
                  variant="outlined"
                  autoComplete="off"
                  type="number"
                  onKeyPress={ (evt) => {
                    evt.key === 'E' && evt.preventDefault() || evt.key === 'e' && evt.preventDefault() || evt.key === '´' && evt.preventDefault() || evt.key === '.' && evt.preventDefault() || evt.key === '-' && evt.preventDefault() || evt.key === '+' && evt.preventDefault();
                  }}
                  onPaste={this.onPaste.bind(this)}
                  value={this.state.numeroReferencia}
                  onChange={this.handleChangeReferencia.bind(this)}
                />
              </div>
            </MuiThemeProvider>
            <MuiThemeProvider theme={theme}>
              <div className="segundaConciliacionMercadoPago_textfieldarea">
                <TextField
                  style= {{ width: '100%'}} 
                  name="estatus"
                  id="conciliacion-mercadopago-estatus"
                  label="Estatus"
                  variant="outlined"
                  select
                  value={this.state.status}
                  onChange={this.handleChangeStatus.bind(this)}
                >
                  <MenuItem value="TODOS">Todos</MenuItem>
                  <MenuItem value="CONCILIADO">Conciliado</MenuItem>
                  <MenuItem value="POR CONCILIAR">Por Conciliar</MenuItem>
                </TextField>
              </div>
            </MuiThemeProvider>
            <div className="segundaConciliacionMercadoPago_textfieldarea">
              <ApoloDatePicker
                  id='fechaInicio'
                  name='fechaInicio'
                  label={ 'Fecha Inicio' }
                  value={this.state.fechaInicio}
                  onChange={this.handleChangeFechaDesde.bind(this)}
                  maxDate={maxFechaHasta}
              />
            </div>
            <div className="segundaConciliacionMercadoPago_textfieldarea">
              <ApoloDatePicker
                  id='fechaFin'
                  name='fechaFin'
                  label={ 'Fecha Fin' }
                  minDate={this.state.fechaInicio}
                  value={this.state.fechaFinal}
                  onChange={this.handleChangeFechaHasta.bind(this)}
                  maxDate={fin}
              />
            </div>
            <div className="segundaConciliacionMercadoPago_textfieldarea">
              <ApoloButton contained
                id='buttonSearch'
                text={'Buscar'}
                disabled={
                  !(this.state.status && this.state.fechaInicio && this.state.fechaFinal)
                }
                onClick={this.getConciliacionMercadoPago.bind(this)}
                full
              />
            </div>
          </div>

        </div>

        <div className="segundaConciliacionMercadoPago_pagosDigitales">
          <div className="segundaConciliacionMercadoPago_pagosDigitales_title">
            <p>Pagos Digitales</p>
          </div>
          <div className="segundaConciliacionMercadoPago_pagosDigitales_bottomArea">
            
            <div className="segundaConciliacionMercadoPago_pagosDigitales_info">
              <div className="segundaConciliacionMercadoPago_pagosDigitales_icon">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_iconAreaPurple">
                <PieChartOutlinedIcon />
                </div>
              </div>
              <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_area">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_tittle">
                  <span>Total por Conciliar</span>
                </div>
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_number">
                  { this.state.totalPorConciliar === '-' ? (
                      <span>{this.state.totalPorConciliar}</span>
                    ) : (
                      <span>{Number(this.state.totalPorConciliar).toLocaleString()}</span>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="segundaConciliacionMercadoPago_pagosDigitales_info">
              <div className="segundaConciliacionMercadoPago_pagosDigitales_icon">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_iconAreaGreen">
                  <CheckBoxOutlinedIcon />
                </div>
              </div>
              <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_area">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_tittle">
                  <span>Total Conciliados</span>
                </div>
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_number">
                  { this.state.totalConciliados === '-' ? (
                      <span>{this.state.totalConciliados}</span>
                    ) : (
                      <span>{Number(this.state.totalConciliados).toLocaleString()}</span>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="segundaConciliacionMercadoPago_pagosDigitales_info">
              <div className="segundaConciliacionMercadoPago_pagosDigitales_icon">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_iconAreaBlue">
                  <CheckCircleOutlineOutlinedIcon />
                </div>
              </div>
              <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_area">
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_tittle">
                  <span>Total de Movimientos </span>
                </div>
                <div className="segundaConciliacionMercadoPago_pagosDigitales_totales_number">
                  { this.state.totalMovimientos === '-' ? (
                      <span>{this.state.totalMovimientos}</span>
                    ) : (
                      <span>{Number(this.state.totalMovimientos).toLocaleString()}</span>
                    )
                  }
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="segundaConciliacionMercadoPago_table">
          {
            this.state.totalElements === 0 ? (
              <div className="segundaConciliacionMercadoPago_noResultados">
                <p>No se han encontrado resultados</p>
              </div>
              ) : this.state.totalElements === '-' ? (
                <div className="segundaConciliacionMercadoPago_noResultados">
                  <p></p>
                </div>
              ) : (
              <PaginationTable 
                data={this.state.tableData}
                totalElements={this.state.totalElements}
                changePagePrev={this.handleChangePagePrev}
                changePageNext={this.handleChangePageNext}
                changePageSize={this.handleChangePageSize}
                page={this.state.pageNo}
                rowsPerPage={this.state.pageSize}
              />
            ) 
          }
        </div>
      </div>
      
    );
  }
}



ConsultaConciliacionMercadoPago.propTypes = {
  actionGetConciliacionMercadoPago: PropTypes.func.isRequired,
  actionGetConciliacionMercadoPagoExcel: PropTypes.func.isRequired,
  conciliacion: PropTypes.any.isRequired,
  conciliacionExcel: PropTypes.any.isRequired,
  permisos: PropTypes.any.isRequired,
};

const mapStateToProps = state => {
  return {
      conciliacionExcel: state.ConciliacionMercadoPago.conciliacionExcel,
      conciliacion: state.ConciliacionMercadoPago.conciliacion,
      permisos: state.BasePermits.permits
  };
};

const mapDispatchToProps = dispatch => {
  return {
      actionGetConciliacionMercadoPago: (query) => dispatch(getConciliacionMercadoPago(query)),
      actionGetConciliacionMercadoPagoExcel: (query) => dispatch(getConciliacionMercadoPagoExcel(query)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ConsultaConciliacionMercadoPago);


