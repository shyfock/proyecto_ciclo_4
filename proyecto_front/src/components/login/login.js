import React, { Component } from 'react';
import axios from 'axios'; 
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { API_HOST as host } from '../../app.json'
//import { setToken } from '../helper/token'
import './login.css';
import { isNull } from 'util';
import Cookies from 'universal-cookie'
import { calculateSessionExpiration } from '../helper/helper'
import Loading from '../loading/loading';

const cookies = new Cookies();

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usuario: '',
            pass: ''
        };
    }
    iniciarSesion() {
        this.setState({ loading: true })
        axios.post(`${host}/usuarios/login`, {
            usuario: this.state.usuario,
            pass: this.state.pass,
        })
        .then((response) => {
            if(isNull(response.data.token)) {
                alert('Usuario y/o contraseña invalida');
            } else {
                console.log(response);
                //setToken(response.data.token);
                cookies.set('_s', response.data.token, {
                    path: '/',
                    expires: calculateSessionExpiration(),
                });
                this.props.history.push('/empleados');
            }
            this.setState({ loading: false });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ loading: false });
        });

        //alert(`usuario: ${this.state.usuario} - password: ${this.state.password}`)
    }
    render() { 
        return (
            <Container id="login-container">
                <Loading show={ this.state.loading }/>
                <Row>
                    <Col>
                        <Row>
                            <h1>
                                <FontAwesomeIcon icon={faSeedling} />
                                Eco Tripulantes
                            </h1>
                        </Row>
                        <Row>
                            <h2>Iniciar Sesión</h2>
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
                                placeholder="Usuario"
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
                            //type="submit"
                            onClick={() => {
                                this.iniciarSesion()
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default login;