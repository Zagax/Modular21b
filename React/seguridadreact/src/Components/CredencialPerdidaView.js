import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class CredencialPerdidaView extends Component {
    constructor(props){
        super(props)

        this.state={
            CredencialLista: []
        }
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/credencialperdida')
        .then(response => {
            console.log(response)
            this.setState({CredencialLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    exportPDF = (elt) => {
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;

        var img = new Image()
        img.src = elt.FotoIneFrente
        var img2 = new Image()
        img2.src = elt.FotoIneTrasera

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = "Reporte Credencial Perdida";
        const headers = [["ID", "Nombre", "Carrera", "Codigo", "Identificacion Frente", "Identificacion Detras", "Fecha"]];
        const data = [[elt.id, elt.NombreA, elt.Carrera, elt.FotoIneFrente, elt.FotoIneTrasera, elt.FechaYHora]];

        let content = {
            startY: 50,
            head: headers,
            body: data,
            didDrawCell: function (data) {
                if (data.section === 'body' && data.column.index === 3){
                    data.cell.width=300
                    data.cell.height=100
                    doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y +2, data.cell.width, data.cell.height, "Alias", "SLOW")
                }
                if (data.section === 'body' && data.column.index === 4){
                    data.cell.width=300
                    data.cell.height=100
                    doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW2")
                }
            }
        }

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reporte Credencial Perdida ID: "+elt.id+".pdf")
    }

    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/credencialperdida/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {CredencialLista} = this.state
        console.log(CredencialLista)
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>Nombre de Alumno</th>
                            <th>Carrera</th>
                            <th>Codigo de Alumno</th>
                            <th>Identificacion Frente</th>
                            <th>Identificacion Detras</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            CredencialLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.NombreA}</th>
                                    <th>{user.Carrera}</th>
                                    <th>{user.Codigo}</th>
                                    <th><img src={user.FotoIneFrente} width="100" height="100" alt ="imagen"/> </th>
                                    <th><img src={user.FotoIneTrasera} width="100" height="100" alt ="imagen"/> </th>
                                    <th>{user.FechaYHora}</th>
                                    <th><Button variant="danger" onClick={() => this.removeCategory(user.id)}>Eliminar</Button></th>
                                    <th><Button variant="info" onClick={() => this.exportPDF(user)}>Generar Reporte</Button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default CredencialPerdidaView