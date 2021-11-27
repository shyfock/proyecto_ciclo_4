import React from 'react';
import { Container, Navbar, Nav, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSeedling } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie/es6';
//import { deleteToken } from '../helper/token'

import './navbar.css';

const cookies = new Cookies();

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    logOut() {
        cookies.remove('_s', {
            path: '/',
            domain: 'localhost'
        });
        window.location.reload();
    }
    render() {
        return (
            <Navbar id="navbar" bg="primary" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/home">
                    <FontAwesomeIcon icon={faSeedling} />
                    <span id="usuario-sub-branm">Eco Tripulantes</span>
                    </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link> */}
                                
                            </Nav>
                            <DropdownButton id="dropdown-basic-button" title="usuario">
                                <Dropdown.Header>
                                    <Row>
                                        <FontAwesomeIcon icon={faUserCircle} />
                                    </Row>
                                    <Row>
                                        #USUARIO#
                                    </Row>
                                </Dropdown.Header>
                                <Dropdown.Item href="/login">Iniciar sesión</Dropdown.Item>
                                <Dropdown.Item href="/register">Crear cuenta</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>{this.logOut()}}
                                >
                                    Cerrar sesión
                                </Dropdown.Item>
                            </DropdownButton>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}