import React, { Component } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Notificaciones } from 'utils-accouting';
import {  ApoloButton } from 'dsmapolo-react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { sendFile, setFileCsv, setWaiting, setCharginFile } from '../catalogoAtmBbva/actions';

import './CatalogoAtmBbva.css';

export class CatalogoAtmBbva extends Component {

  constructor(props) {
      super(props);
      this.state = {
        file: '',
        filecsv: '',
        countData: 0,
      };
  }

  onUnload = e => {
     e.preventDefault();
     e.returnValue = '';
  }

  componentDidUpdate() {
    if (this.state.file){
      window.addEventListener('beforeunload', this.onUnload);
    }
  }

  componentWillUnmount() {
      window.removeEventListener('beforeunload', this.onUnload);
  }

  handleChange = async (event) => {
    const files = event.currentTarget.files;
    if (files && files[0]) {
      await this.setState({ file: files[0] });
    }
    await this.handleFile();
  };

  handleFile = async () => {
    await this.props.actionSetCharginFile(true);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {

      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws);
      const isFileValid = await this.checkFileValidate(data);
      if(!isFileValid){
        Notificaciones.warningMessage('El formato del archivo adjunto no es el esperado.');
        await this.props.actionSetCharginFile(false);
        await this.deleteFile();
        return;
      }
      data = await this.formatFile(data);
      let worksheetcvs = XLSX.utils.json_to_sheet(data);
      let workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheetcvs, 'Cajeros ATM BBVA');
      let wopts = { bookType:'csv', bookSST:false, type:'base64' };
      let wbout = XLSX.write(workbook,wopts);
      const filecsv = await this.urltoFile(`data:text/plain;base64,${wbout}`, `${this.state.file.name.split('.')[0]}.csv`,'text/csv')
      .then(function(file){
         return file;
      });
      await this.props.actionSetFileCsv(filecsv);
      await this.setState({countData: data.length, filecsv: filecsv});
      await this.props.actionSetCharginFile(false);
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  checkFileValidate = async (data) => {
    const atm = 'ATM';
    const sitio = 'Sitio';
    const estado = 'Estado';
    const ciudad = 'Ciudad';
    const cp = 'CP';
    const colonia = 'Colonia';
    let isValid = false;

    for (let i = 0; i < data.length; i++) {
      if (atm in data[i] && sitio in data[i] &&
          estado in data[i] && ciudad in data[i] &&
          cp in data[i] && colonia in data[i]) {
        isValid = true;
      } else {
        return;
      }
    }

    return isValid;
  }

  urltoFile = (url, filename, mimeType) =>{
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }

  formatFile = async (jsonFile) => {
    let newJsonFile = [];
    let currentRowJson = {};
    for (let i = 0; i < jsonFile.length; i++) {
      currentRowJson = {
        ATM: jsonFile[i].ATM,
        Sitio: jsonFile[i].Sitio,
        Estado: jsonFile[i].Estado,
        Ciudad: jsonFile[i].Ciudad,
        CP: jsonFile[i].CP,
        Colonia: jsonFile[i].Colonia,
      };
      newJsonFile.push(currentRowJson);
    }
    return newJsonFile;
  }

  saveFile = async() => {
      const { waiting } = this.props;
      await this.props.actionSetWaiting();
      await this.props.actionSendFile(this.props.filecsv);
      if(!waiting){
        await this.deleteFile();
      }
  }

  deleteFile = async () => {
    await this.setState({countData: 0, filecsv: '', file: ''});
    window.removeEventListener('beforeunload', this.onUnload);
    document.getElementById('fileUploader').value = '';
  }

 UploadIcon = (props) => {
    return (
      <SvgIcon {...props} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '10px', marginBottom: '-6px'}}>
        <path d="M1.5 12.75V15C1.5 16.2426 2.50736 17.25 3.75 17.25H14.25C15.4926 17.25 16.5 16.2426 16.5 15V12.75C16.5 12.3358 16.1642 12 15.75 12C15.3358 12 15 12.3358 15 12.75V15C15 15.4142 14.6642 15.75 14.25 15.75H3.75C3.33579 15.75 3 15.4142 3 15V12.75C3 12.3358 2.66421 12 2.25 12C1.83579 12 1.5 12.3358 1.5 12.75Z" fill="#00AC68"/>
        <path d="M11.4697 5.03033C11.7626 5.32322 12.2374 5.32322 12.5303 5.03033C12.8232 4.73744 12.8232 4.26256 12.5303 3.96967L9.53033 0.96967C9.23744 0.676777 8.76256 0.676777 8.46967 0.96967L5.46967 3.96967C5.17678 4.26256 5.17678 4.73744 5.46967 5.03033C5.76256 5.32322 6.23744 5.32322 6.53033 5.03033L9 2.56066L11.4697 5.03033Z" fill="#00AC68"/>
        <path d="M8.25 1.5V12C8.25 12.4142 8.58579 12.75 9 12.75C9.41421 12.75 9.75 12.4142 9.75 12V1.5C9.75 1.08579 9.41421 0.75 9 0.75C8.58579 0.75 8.25 1.08579 8.25 1.5Z" fill="#00AC68"/>
      </SvgIcon>
    );
  }

  render() {
    const { waiting, charginFile } = this.props;
    const { countData, file, filecsv } = this.state;
    return (
      <div className="containerAtm">
            <h2 className="titleAtm">Catálogo ATM BBVA</h2>
            <div className="labelAtm">
              <span className="labelCopyAtm">
                A continuación adjunta el archivo con el catálogo
              </span>
              <span className="labelCopyAtm">
                ATM BBVA
              </span>
            </div>
            <div className="labelCountDataAtm">
              <span className="labelCopyAtm">
                {countData}  elemento(s) preparado(s)
              </span>
            </div>
            {filecsv == '' ?
              charginFile ?
              <div><span className="labelCopyAtm">Cargando Archivo...</span></div>
              :
              <div>
                <input
                  id="fileUploader"
                  type="file"
                  onChange={(event) => this.handleChange(event)}
                  accept=".xls,.xlsx"
                  className="inputfile"
                />
                <label htmlFor="fileUploader">
                { this.UploadIcon() }
                  ADJUNTAR ARCHIVO
                </label>
              </div>
            :
              <div className="divFile">
                <span className="labelinputFile">
                  {file.name} ({(file.size / 1000).toFixed(2)} KB)
                </span>
                <span id="deleteFile" className="labelinputFileDelete" onClick={waiting ? () => {} : this.deleteFile}>
                  X
                </span>
              </div>
            }
            <div className="buttonSaveContainerAtm">
              <div className="buttonSaveAtm">
                <ApoloButton contained
                  id='buttonSave'
                  text={'GUARDAR'}
                  onClick={ this.saveFile }
                  full
                  waiting={waiting}
                  disabled={countData === 0}
                />
              </div>
            </div>
          </div>
    );
  }
}

CatalogoAtmBbva.propTypes = {
  filecsv: PropTypes.any.isRequired,
  waiting: PropTypes.any.isRequired,
  charginFile: PropTypes.any.isRequired,
  actionSendFile: PropTypes.func.isRequired,
  actionSetFileCsv: PropTypes.func.isRequired,
  actionSetWaiting: PropTypes.func.isRequired,
  actionSetCharginFile: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
      filecsv: state.CatalogoAtmBbva.filecsv,
      waiting: state.CatalogoAtmBbva.waiting,
      charginFile: state.CatalogoAtmBbva.charginFile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionSetFileCsv: (file) => dispatch(setFileCsv(file)),
        actionSendFile: (file) => dispatch(sendFile(file)),
        actionSetWaiting: () => dispatch(setWaiting()),
        actionSetCharginFile: (status) => dispatch(setCharginFile(status)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CatalogoAtmBbva);
