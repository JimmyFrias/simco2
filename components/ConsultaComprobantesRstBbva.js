import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { createMuiTheme, MuiThemeProvider, TextField } from '@material-ui/core';
import { ApoloButton, ApoloDatePicker } from 'dsmapolo-react';
import {
    getDetallesComprobante,
    getImprimeRST,
} from '../ConsultaComprobantesRstBbva/actions';

import './ConsultaComprobantesRstBbva.styl';
import ImageViewer from '../utils/ImageViewer';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#00AC68' },
    }
});

const today = moment().format('DD/MM/YYYY');
const minDate = moment('2000-01-01').format('DD/MM/YYYY');

export class ConsultaComprobantesRstBbva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                folioVale: '',
                fecha: '',
            }
        };
    }

    formatMoney = (numberCCSPEI, decPlacesCCSPEI, decSepCCSPEI, thouSepCCSPEI) => {
        if (typeof thouSepCCSPEI === 'undefined') {
            thouSepCCSPEI = ',';
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

    paramsActions = async (target, data) => {
        if (target === 'folioVale') {
            if (!/^[a-z0-9]{0,10}$/gi.test(data)) {
                return;
            }
        }
        await this.setState(oldState => ({
            query: {
                ...oldState.query,
                [target]: data.toUpperCase(),
            }
        }));
    }

    buttonSearch = async () => {
        const query = Object.assign({}, this.state.query);
        query.fecha = this.formatDate(query.fecha);
        await this.setState({ waiting: true });
        await this.props.actionGetDetallesComprobante(query);
        await this.props.actionGetImprimeRST(query);
        await this.setState({ waiting: false });
    }

    formatDate = (date) => {
        let newDate = date.split('/');
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    }

    render () {
        const { query: { folioVale, fecha }, waiting } = this.state;
        const { comprobante, comprobante_error, pdfRst } = this.props;
        const pdfRstBinary = new Uint8Array(pdfRst).reduce((data, byte) => data + String.fromCharCode(byte), '');
        const pdfRstBase64 = btoa(pdfRstBinary);
        return (
            <div className='container-consulta-comprobantes-rst-santander'>
                <div className='title-header-wrapper'>
                    <span className='title-header'>Comprobante RST BBVA</span>
                </div>
                <div className='grid-left'>
                    <div className='datos-busqueda-title-wrapper'>
                        <span className='datos-busqueda-title'>Datos de búsqueda</span>
                    </div>
                    <hr className='hr-divisor' />
                    <div className='form-container'>
                        <div className='form-inputs-container'>
                            <div className='folio-wrapper'>
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name='folioVale'
                                        id='folioVale'
                                        label='Folio'
                                        margin='none'
                                        variant='outlined'
                                        autoComplete='off'
                                        value={folioVale}
                                        onChange={ e => this.paramsActions('folioVale', e.target.value) }
                                        inputProps={{ style: { height: '13px' } }}
                                        onKeyPress={ () => {} }
                                        fullWidth
                                    />
                                </MuiThemeProvider>
                            </div>
                            <ApoloDatePicker
                                id='fecha'
                                name='fecha'
                                label='Fecha'
                                value={fecha}
                                required
                                onChange={ date => this.paramsActions('fecha', date) }
                                maxDate={today}
                                minDate={minDate}
                            />
                        </div>
                        <div className='form-button-wrapper'>
                            <ApoloButton contained
                                id='buttonSearch'
                                text='Buscar'
                                disabled={ !(folioVale != '' && fecha != '') }
                                waiting={ waiting }
                                onClick={ this.buttonSearch }
                                full
                                />
                        </div>
                    </div>
                </div>
                <div className='grid-right'>
                    <div className='datos-busqueda-title-wrapper'>
                        <span className='resultado-busqueda-title'>Resultado de búsqueda</span>
                    </div>
                    <hr className='hr-divisor' />
                    {
                        Object.keys(comprobante).length > 0 ? (
                            <div className='results-container'>
                                <div className='pdf-preview-wrapper'>
                                    <ImageViewer
                                        src={ pdfRstBase64 }
                                        rotationIncrement={90}
                                        scaleIncrement={0.5}
                                        showControls={true}
                                        docType={'pdf'}
                                        onDocumentLoadSuccess={ ({ numPages }) => {
                                            this.setState({ numPages });
                                        }}
                                        pageNumbe={1}
                                        documentPrefix={'ComprobanteRSTBBVA'}
                                        folioVale={folioVale}
                                    />
                                </div>
                                <div className='detalle-comprobante'>
                                    <div className='titulo-detalle'>Nombre del cliente</div>
                                    <div className='dato-detalle'>{comprobante.cliente || '?'}</div>
                                    <div className='titulo-detalle'>Monto</div>
                                    <div className='dato-detalle'>{comprobante.monto ? `$${this.formatMoney(comprobante.monto)}` : '?'}</div>
                                    <div className='titulo-detalle'>Plaza</div>
                                    <div className='dato-detalle'>{comprobante.plaza || '?'}</div>
                                    <div className='titulo-detalle'>Empresaria</div>
                                    <div className='dato-detalle'>{comprobante.empresaria || '?'}</div>
                                </div>
                            </div>
                        ) : (
                            <div className='error-message-container'>
                                <span className='error-message'>
                                    { comprobante_error && comprobante_error.message ? 'No hay resultados de búsqueda' : '' }
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

ConsultaComprobantesRstBbva.propTypes = {
    comprobante: PropTypes.object.isRequired,
    comprobante_error: PropTypes.object.isRequired,
    pdfRst: PropTypes.string,
    pdfRst_error: PropTypes.string.isRequired,
    actionGetDetallesComprobante: PropTypes.func.isRequired,
    actionGetImprimeRST: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        comprobante: state.ConsultaComprobantesRstBbva.comprobante,
        comprobante_error: state.ConsultaComprobantesRstBbva.comprobante_error,
        pdfRst: state.ConsultaComprobantesRstBbva.pdfRst,
        pdfRst_error: state.ConsultaComprobantesRstBbva.pdfRst_error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionGetDetallesComprobante: query => dispatch(getDetallesComprobante(query)),
        actionGetImprimeRST: query => dispatch(getImprimeRST(query)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ConsultaComprobantesRstBbva);
