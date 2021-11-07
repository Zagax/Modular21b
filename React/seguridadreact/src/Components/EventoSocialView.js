import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class EventoSocialView extends Component {
    constructor(props){
        super(props)

        this.state={
            EventoSocialLista: []
        }
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/social')
        .then(response => {
            console.log(response)
            this.setState({EventoSocialLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/social/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {EventoSocialLista} = this.state
        console.log(EventoSocialLista)
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>Nombre del Evento</th>
                            <th>Fecha y Hora</th>
                            <th>Pronostico</th>
                            <th>Mensaje de Seguridad</th>
                            <th>Estrategias</th>
                            <th>Recursos</th>
                            <th>Croquis</th>
                            <th>Organigrama</th>
                            <th>Estado de Fuerza</th>
                            <th>Nombre de Encargado</th>
                            <th>Telefono de Encargado</th>
                            <th>Correo de Encargado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            EventoSocialLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.NombreEvento}</th>
                                    <th>{user.FechaHora}</th>
                                    <th>{user.Pronostico}</th>
                                    <th>{user.MensajeSeguridad}</th>
                                    <th>{user.Estrategia}</th>
                                    <th>{user.Recurso}</th>
                                    <th>{user.Croquis}</th>
                                    <th>{user.Organigrama}</th>
                                    <th>{user.Estado}</th>
                                    <th>{user.NombreEncargado}</th>
                                    <th>{user.TelefonoEncargado}</th>
                                    <th>{user.CorreoEncargado}</th>
                                    <th><Button onClick={() => this.removeCategory(user.id)}>Eliminar</Button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default EventoSocialView