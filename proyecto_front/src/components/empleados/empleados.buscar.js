import React from 'react';
import { request } from '../helper/helper';
import { Container, Row } from 'react-bootstrap';
import './empleados.css';

class EmpleadosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        request
        .get('/empleados')
        .then((response) => {
            console.log(response.data);
        })
        .catch ((err) => {
            console.log(err);
        })
    }

    render() { 
        return (
            <Container id="empleados-buscar-container">
                <Row>
                    <h2>
                        Buscar Empleados
                    </h2>
                </Row>
            </Container>
        );
    }
}
 
export default EmpleadosBuscar;