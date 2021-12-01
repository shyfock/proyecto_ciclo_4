import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import '../empleados.css'
import ConfirmationPrompts from '../../prompts/confirmation';
import MessagePrompt from '../../prompts/messages';


class EmpleadosEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idEmpleado: this.props.getIdEmpleado(),
            redirect: false,
            message: {
                text: '',
                show: false,
            },
            confirmation: {
                title: ' Modificar empleado ',
                text: ' ¿Desea modificar el empleado? ',
                show: false,
            },
            loading: false,
            empleado: {
                nombre: '',
                apellido_p: '',
                apellido_m: '',
                telefono: '',
                mail: '',
                direccion: '',
            }
        }
        this.onExitedMessage = this.onExitedMessage.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount() {
        this.getEmpleado();
        console.log(this.props.getIdEmpleado())
    }

    getEmpleado() {
        this.setState({ loading: true });
        request
        .get(`/empleados/${this.state.idEmpleado}`)
        .then((response) => {
            console.log(response);
            this.setState({
                empleado: response.data,
                loading: false
            });
        })
        .catch((err) => {
            console.error(err);
            this.setState({ loading: false });
        })
    }

    setValue(index, value) {
        this.setState({
            empleado: {
                ...this.state.empleado,
                [index]: value,
            },
        });
    }

    guardarEmpleados() {
        this.setState({loading: true});
        request
            .put(`/empleados/${this.state.idEmpleado}`, this.state.empleado)
            .then((response) => {
                if(response.data.exito) {
                    this.setState({
                        loading: false,
                        redirect: response.data.exito,
                        message: {
                            text: response.data.msg,
                            show: true,
                        }
                    });
                    console.log(response.data);
                }
                this.setState({ loading: false })
            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: false });
            });
    }

    onExitedMessage() {
        if(this.state.redirect) this.props.changeTab('buscar');
    }

    onCancel() {
        this.setState({
            confirmation: {
                ...this.state.confirmation,
                show: false,
            }
        })
    }

    onConfirm() {
        this.setState(
            {
                confirmation: {
                    ...this.state.confirmation,
                    show: false,
                },
            },
        this.guardarEmpleados()
        );
        window.location.reload();
    }

    render() { 
        return (
            <Container id="empleados-crear-container">
                <MessagePrompt
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
                <ConfirmationPrompts
                    show={this.state.confirmation.show}
                    title={this.state.confirmation.title}
                    text={this.state.confirmation.text}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                />
                <Loading show={this.state.loading}/>
                <Row>
                    <h1>Editar Empleados</h1>
                </Row>
                <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            value={this.state.empleado.nombre}
                            onChange={(e) => this.setValue('nombre', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control
                            value={this.state.empleado.apellido_p}
                            onChange={(e) => this.setValue('apellido_p', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                            value={this.state.empleado.apellido_m}
                            onChange={(e) => this.setValue('apellido_m', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            value={this.state.empleado.telefono}
                            onChange={(e) => this.setValue('telefono', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={this.state.empleado.mail}
                            onChange={(e) => this.setValue('mail', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            value={this.state.empleado.direccion}
                            onChange={(e) => this.setValue('direccion', e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button 
                        variant="primary" 
                        onClick={() => 
                            this.setState({
                                confirmation: {
                                    ...this.state.confirmation,
                                    show: true
                                },
                            })
                        }
                    >
                        Guardar Empleado
                    </Button>
                </Form>
                </Row>
            </Container>
        );
    }
}
 
export default EmpleadosEditar;