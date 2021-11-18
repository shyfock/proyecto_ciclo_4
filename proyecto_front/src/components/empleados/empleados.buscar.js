import React from 'react';
import { request } from '../helper/helper';
import { Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import './empleados.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const products = [{'id':1, 'ggg':6, 'name':2, 'price':3},{'name':2},{'price':3}];
const columns = [
{
    dataField: '_id',
    text: 'ID'
},
{
    dataField: 'nombre',
    text: 'Nombre'
},
{
    dataField: 'apellido_p',
    text: 'Primer Apellido'
},
{
    dataField: 'apellido_m',
    text: 'Segundo apellido'
}];

let employees = [];


export default class EmpleadosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: Array
        }
    }

    componentDidMount() {
        request
        .get('/empleados')
        .then((response) => {
            console.log(response.data);
            //this.setState('employees', JSON.stringify(response.data));
            console.log(this.state.employees);
        })
        .catch ((err) => {
            console.log(err);
        });
    }
    
    render() {
        return (
            <Container id="empleados-buscar-container">
                <Row>
                    <h2>
                        Buscar Empleados
                    </h2>
                </Row>
                <BootstrapTable keyField='_id' data={ employees } columns={ columns } />
            </Container>
        );
    }
}
  
