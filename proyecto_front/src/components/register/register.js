import axios from 'axios';
import React, { Component } from 'react'
import { API_HOST as host } from '../../app.json'
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import '../login/login.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usuario: '',
            pass: ''
        }
    }

    crearCuenta() {
        axios.post(`${host}/usuarios/register`, {
            usuario: this.state.usuario,
            pass: this.state.pass,
        })
        .then((response) => {
            console.log({
                msg: 'Usuario creado con éxito',
                msg2: response,
            });
        })
        .catch ((err) => {
            console.log(err);
        });
    }
    render() { 
        return (  
            <Container id="login-container">
                <Row>
                    <Col>
                        <Row>
                            <h1>Eco Tripulantes</h1>
                        </Row>
                        <Row>
                            <h2>Crear cuenta de usuario</h2>
                        </Row>
                    </Col>
                    <Col
                        sm="12"
                        xs="12"
                        md={{ span:4, offset:4 }}
                        lg={{ span:4, offset:4 }}
                        xl={{ span:4, offset:4 }}
                    >
                    <Form>
                        <Form.Group >
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    this.setState({usuario: e.target.value})
                                }
                                type="text"
                                placeholder="Nombre de usuario"
                            />
                            {/* {
                                this.state.usuario
                            } */}
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                Contraseña
                            </Form.Label>
                            <Form.Control 
                                onChange={(e) =>
                                    this.setState({pass: e.target.value})
                                }
                                type="password"
                                placeholder="Contraseña"
                            />
                            {/* {
                                this.state.password
                            } */}
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={() => {
                                this.crearCuenta()
                            }}
                        >
                            Crear cuenta
                        </Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Register;