import React, { Component } from 'react';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';
import { ApoloMenuSurface, ApoloCheckBox } from 'dsmapolo-react';
import PropTypes from 'prop-types';

export class CustomTable extends Component{

    state ={
        selectedRows : this.props.data.items.map(e=>({
            status:this.props.rowsSelects.includes(e.key),
            key:e.key
        })),
        topCheck:false,
        menuOpen: false
    }

    componentDidMount(){
        this.setState({
            topCheck:this._checarTopCheck()
        });
    }
    componentDidUpdate(prevProps){
        if(prevProps.data.items !== this.props.data.items){
            this.setState({
                selectedRows : this.props.data.items.map(e=>({
                    status:this.props.rowsSelects.includes(e.key),
                    key:e.key
                })),
                topCheck:this._checarTopCheck()
            });
        }
    }
    _checarTopCheck=()=>{
        const { rowsSelects=[],data:{items=[]} } = this.props;

        return rowsSelects.length>0 ?
            (rowsSelects.length==items.length ? true : 'parcial')
        : false;
    }

    handleSelectedAll(){
        const {evSelected, data, permits} = this.props;
        let aviableRows = data.items.map(row => {
          if(permits.includes(row.statusRst)){
            return row;
          }
        });
        aviableRows = aviableRows.filter(row => row != undefined);
        const estatusAll  = this.state.selectedRows.filter(e=>e.status).length !== aviableRows.length;
        const topCheck = estatusAll ;

        let selectedRows =  aviableRows.map(e=>({
            status:  estatusAll ,
            key:e.key
        }));

        evSelected(selectedRows);
        this.setState({selectedRows,topCheck});
    }

    handleSelectedIndex(key){
        const {evSelected,data} = this.props;
        let selectedRows = this.state.selectedRows.map(e=>{
            e.status = e.key === key ? !e.status : e.status;
            return e;
        });
        const selecteds_rows = selectedRows.filter(e=>e.status).length;
        const topCheck = selecteds_rows > 0 ? (selecteds_rows === data.items.length ? true :'parcial' ): false;
        evSelected( selectedRows );
        this.setState({selectedRows,topCheck});
    }
    render(){
        const { selectedRows,topCheck } = this.state;
        const { columns, data, selected,pages,menus } = this.props;
        return(<div>
            <div  className="mdc-data-table apolo-container-table">
                <table className="mdc-data-table__table" aria-label="Dessert calories">
                    <THead
                        columns={columns}
                        selected={selected}
                        evSelected={this.handleSelectedAll.bind(this)}
                        topCheck={topCheck}
                        menuOpen={this.state.menuOpen}
                        onclickOpenMenu={(event) => { this.setState({menuOpen:event.currentTarget}); }}
                        onclickCloseMenu={() => { this.setState({menuOpen: null}); }}
                    />
                    <TBody
                        columns={columns}
                        data={data}
                        selected={selected}
                        evSelected={this.handleSelectedIndex.bind(this)}
                        selectedRows={selectedRows}
                        menus={menus}
                    />
                </table>
            </div>
            <TFooter pages={pages} />
        </div>);
    }
}

const SelectedRow = ({selected=false,onClick=(e)=>{return e;},status=false,indeterminate=false})=> { // eslint-disable-line
   return !selected ||
        <ApoloCheckBox
            checked={status}
            onClick={e=>onClick(e)}
            indeterminate={indeterminate}
        />;
};

const THead =({columns=[],selected=false,evSelected=()=>{},topCheck=false})=>( <thead> { /* eslint-disable-line */}
    <tr  className="mdc-data-table__header-row">
      <th style={{width:20,color:'#FFFFFF'}}>
        <SelectedRow
            selected={selected}
            onClick={evSelected}
            status={topCheck}
            indeterminate = {topCheck === 'parcial'}
        />
    </th>
        {columns.map(dato=>{
            const  {name='', data='', right=false } = dato;
            return(<th className={`mdc-data-table__header-cell  ${ right ? ' mdc-data-table__header-cell--numeric' :''}`  } key={name} role="columnheader" scope="col" name={name} >{data}</th>);
        })}
        <th></th>
    </tr>
</thead>);

const TBody = ({columns=[],data={},selected=false,evSelected=(index=0)=>index ,selectedRows=[],menus=[]})=>{ //eslint-disable-line
    const  onClick = (e,i) =>{
        e.preventDefault();
        data.event(i);
    };
    const selectedClick =(e,i)=>{
        e.preventDefault();
        evSelected(i);
    };
    const getKeyState = key =>{
        const indice = selectedRows.findIndex(e=> e.key ===  key);
        return indice === -1 ? false : selectedRows[indice]['status'];
    };
    return(<tbody  className="mdc-data-table__content">
    {data.items.map((row,index)=><tr onClick={e=>onClick(e,row.key)} key={index} className="mdc-data-table__row" data-row-id="u0">
        <SelectedRow
            selected={selected}
            onClick={ev=>selectedClick(ev,row.key)}
            status={getKeyState(row.key) }
        />
        {
            columns.map((cell)=>{
                const { name } = cell;
                return (<td  className={`mdc-data-table__cell  ${ cell.right ? ' mdc-data-table__cell--numeric' :''}` } key={name+row.key} >{ row[name]}</td>);
            })
        }
        <td>
            {menus.length > 1 ?
            <ApoloMenuSurface
                items={menus.map(e=><div key={row.key} onClick={()=>e.event(row.key)}>{e.value}</div>)}
            /> : <div onClick={()=>menus.event(row.key)}>{menus.value}</div>}
        </td>
    </tr>)}
</tbody>);
};

const TFooter =({pages={}})=>{ // eslint-disable-line
    const { now=0, to=0, rows=0,defaultSelect=10,valuesSelect=[10,15,20],disable=false, actions={
        change:e=>e,
        next:()=>{},
        prev:()=>{},

    } } = pages;

    return (<div className="apolo-table-footer">
        <div>
            <span> Filas por páginas </span>
            <select disabled={disable} className="apolo-table-foot-select" onChange={e=>actions.change(e.target.value)} defaultValue={defaultSelect}>
                {valuesSelect.map(e=><option key={e} value={e}>{e}</option>)}
            </select>
            <label> {now} - {to} </label> <span style={{padding:5}}> {' de '} </span> <label> {rows} </label>
            <span className="">
                <IconButton onClick={actions.prev}> <MaterialIcon icon="keyboard_arrow_left" /></IconButton>
                <IconButton onClick={actions.next}> <MaterialIcon icon="keyboard_arrow_right" /></IconButton>
            </span>
        </div>
    </div>);
};

CustomTable.propTypes = {
    columns: PropTypes.any,
    data: PropTypes.any,
    selected: PropTypes.any,
    evSelected: PropTypes.func,
    rowsSelects: PropTypes.any,
    pages: PropTypes.any,
    menus: PropTypes.any,
    permits: PropTypes.any
};


CustomTable.defaultProps ={
    columns : [
        {
            name:'any',
            data:'any',
            right:false,
        }
    ],
    data : {
        event(index){
            return index;
        },
        items:[]
    },
    selected:true,
    evSelected(items){
        return items;
    },
    rowsSelects:[],
    pages:{
        now:0,
        to:0,
        rows:0,
        defaultSelect:15,
        actions:{
            change:e=>e,
            next(){},
            prev(){}
        }
    },
    menus:[],
    permits: []
};
