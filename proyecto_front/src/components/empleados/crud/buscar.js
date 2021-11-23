import React from 'react';
//import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
//import './empleados.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import DataGrid from '../../grid/grid';




const columns = [
{
    dataField: '_id',
    text: 'ID',
    hidden: true
},
{
    dataField: 'nombre',
    text: 'Nombre'
},
{
    dataField: 'apellido_p',
    text: 'Primer apellido'
},
{
    dataField: 'apellido_m',
    text: 'Segundo apellido'
},
{
    dataField: 'telefono',
    text: 'Teléfono'
},
{
    dataField: 'mail',
    text: 'Email'
},
{
    dataField: 'direccion',
    text: 'Dirección'
}];

export default class EmpleadosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {}
    
    render() {

        return (
            <Container id="empleados-buscar-container">
                <Row>
                    <h2>
                        Buscar Empleados
                    </h2>
                </Row>
                <Row>
                    <DataGrid url="/empleados" columns={ columns }/>
                </Row>
            </Container>
        );
    }
}
  
