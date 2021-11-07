import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class FalloCamaraViews extends Component {
    constructor(props){
        super(props)

        this.state={
            FalloCamaraLista: []
        }
    }
    
    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/camara')
        .then(response => {
            console.log(response)
            this.setState({FalloCamaraLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/camara/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {FalloCamaraLista} = this.state
        console.log(FalloCamaraLista)
        return(
            <div>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>No. Camara</th>
                            <th>Informacion</th>
                            <th>IP</th>
                            <th>SITE</th>
                            <th>Modulo</th>
                            <th>Marca</th>
                            <th>Descripcion de Falla</th>
                            <th>Toreos</th>
                            <th>Material</th>
                            <th>Solucionado</th>
                            <th>Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            FalloCamaraLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.NoCamara}</th>
                                    <th>{user.Informacion}</th>
                                    <th>{user.IP}</th>
                                    <th>{user.SITE}</th>
                                    <th>{user.Modulo}</th>
                                    <th>{user.Marca}</th>
                                    <th>{user.DescFalla}</th>
                                    <th>{user.Toreos}</th>
                                    <th>{user.MateriaUt}</th>
                                    <th>{user.Solucionado.toString()}</th>
                                    <th>{user.Observaciones}</th>
                                    <th><Button variant="danger" onClick={() => this.removeCategory(user.id)}>Eliminar</Button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default FalloCamaraViews