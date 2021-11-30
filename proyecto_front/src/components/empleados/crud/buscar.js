import React from 'react';
//import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
//import './empleados.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import DataGrid from '../../grid/grid';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import ConfirmationPrompts from '../../prompts/confirmation';
import MessagePrompt from '../../prompts/messages';




const columns = [
{
    dataField: '_id',
    text: 'Product ID',
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
        this.state = {
            idEmpleado: null,
            loading: false,
            confirmation: {
                title: 'Eliminar el empleado',
                text: '¿Desea eliminar el empleado?',
                show: false,
            },
            message: {
                text: '',
                show: false,
            }
        }
        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount() {}

    onClickEditButton(row) {
        this.props.setIdEmpleado(row._id);
        this.props.changeTab('editar');
    }

    onClickDeleteButton(row) {
        this.setState({
            idEmpleado: row._id,
            confirmation: {
                ...this.state.confirmation,
                show: true,
            }
        })    
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
        this.setState({
            confirmation: {
                ...this.state.confirmation,
                show: false,
            }
        }, this.eliminarEmpleado())
    }

    eliminarEmpleado() {
        this.setState({ loading: true })
        request
        .delete(`/empleados/${this.state.idEmpleado}`)
        .then((response) => {
            this.setState({
                loading: false,
                message: {
                    text: response.data.msg,
                    show: true,
                }
            })
            if(response.data.exito)
                this.reLoadPage();
            this.setState({ loading: false })
        })
        .catch((err) => {
            console.error(err)
            this.setState({ loading: false })
        })
    }
    
    reLoadPage() {
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    render() {

        return (
            <Container id="empleados-buscar-container">
                <ConfirmationPrompts
                    show={this.state.confirmation.show}
                    title={this.state.confirmation.title}
                    text={this.state.confirmation.text}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                />
                <MessagePrompt
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
                <Loading
                    show={this.state.loading}
                />
                <Row>
                    <h2>
                        Buscar Empleados
                    </h2>
                </Row>
                <Row>
                    <DataGrid
                        url="/empleados"
                        columns={ columns }
                        showEditButton={true}
                        showDeleteButton={true}
                        onClickEditButton={this.onClickEditButton}
                        onClickDeleteButton={this.onClickDeleteButton}
                    />
                </Row>
            </Container>
        );
    }
}
  
