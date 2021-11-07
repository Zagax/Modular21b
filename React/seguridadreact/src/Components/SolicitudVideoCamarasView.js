import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

class SolicitudVideoCamarasView extends Component {
    constructor(props){
        super(props)

        this.state={
            SolicitudVideoCamarasLista: []
        }
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/solcamara')
        .then(response => {
            console.log(response)
            this.setState({SolicitudVideoCamarasLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/solcamara/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {SolicitudVideoCamarasLista} = this.state
        console.log(SolicitudVideoCamarasLista)
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Codigo de Alumno</th>
                            <th>Atendio</th>
                            <th>Fecha de Solicitud</th>
                            <th>No. Camara</th>
                            <th>Horario</th>
                            <th>Hecho</th>
                            <th>Identificacion Frente</th>
                            <th>Identificacion Detras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SolicitudVideoCamarasLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.codigoAlumno}</th>
                                    <th>{user.atendio}</th>
                                    <th>{user.dateSolicitud}</th>
                                    <th>{user.noCamara}</th>
                                    <th>{user.horario}</th>
                                    <th>{user.hecho}</th>
                                    <th><img src={user.fotoIdF} width="100" height="100" alt ="imagen"/> </th>
                                    <th><img src={user.fotoIdB} width="100" height="100" alt ="imagen"/> </th>
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

export default SolicitudVideoCamarasView