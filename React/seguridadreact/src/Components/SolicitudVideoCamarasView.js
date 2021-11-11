import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container } from 'react-bootstrap';

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
    exportPDF = (elt) => {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;

        var img = new Image()
        img.src = elt.fotoIdF
        var img2 = new Image()
        img2.src = elt.fotoIdB

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "Solicitud VideoCamaras";
        const headers = [["ID","CodigoAlumno", "atendio","dateSolicitud", "fotoIdF", "fotoIdB", "noCamara",
                            "horario", "hecho", ]];

        const data = [[ elt.id, elt.codigoAlumno, elt.atendio, elt.dateSolicitud, elt.fotoIdF, elt.fotoIdB,
                        elt.noCamara,elt.horario, elt.hecho ]];
    
                let content = {
                startY: 50,
                head: headers,
                body: data,
                didDrawCell: function (data) {
                    if (data.section === 'body' && data.column.index === 4){
                        data.cell.width=300
                        data.cell.height=100
                        doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y +2, data.cell.width, data.cell.height, "Alias", "SLOW")
                    }
                    if (data.section === 'body' && data.column.index === 5){
                        data.cell.width=300
                        data.cell.height=100
                        doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW")
                    }
                }
            }
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reportes Solicitud de VideoCamaras: "+elt.id+".pdf")
    }
    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/solcamara/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    goBack(){
        window.history.back()
    }

    render(){
        const {SolicitudVideoCamarasLista} = this.state
        console.log(SolicitudVideoCamarasLista)
        return(
            <div>
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
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

export default SolicitudVideoCamarasView