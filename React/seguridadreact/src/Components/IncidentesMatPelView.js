import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container } from 'react-bootstrap';

class IncidentesMatPelView extends Component {
    constructor(props){
        super(props)

        this.state={
            IncidentesLista: []
        }
    }

    exportPDF = (elt) => {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;

        var img = new Image()
        img.src = elt.EvidenciaFoto

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = "Reporte Incidentes Material Peligroso";
        const headers = [["ID","Fecha", "Ubicacion","Fenomeno","Descripcion","Evaluacion","Tareas","Recursos","Estrategias","EvidenciaFoto"]];
        const data = [[elt.id, elt.Fecha, elt.Ubicacion, elt.Fenomeno, elt.Descripcion, elt.Evaluacion, elt.Tareas, elt.Recursos, elt.Estrategias, elt.EvidenciaFoto]];
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
          didDrawCell: function (data) {
            if (data.section === 'body' && data.column.index === 10) {
                data.cell.width=300
                data.cell.height=100
                doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias","SLOW")
            }
          }
        };
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reporte Incidentes Material Peligroso ID: "+elt.id+".pdf")
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/reporteincidentesmatpel')
        .then(response => {
            console.log(response)
            this.setState({IncidentesLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/reporteincidentesmatpel/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    goBack(){
        window.history.back()
    }

    render(){
        const {IncidentesLista} = this.state
        console.log(IncidentesLista)
        return(
            <div>
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Ubicacion</th>
                            <th>Fenomeno</th>
                            <th>Descripcion</th>
                            <th>Evaluacion</th>
                            <th>Tareas</th>
                            <th>Recursos</th>
                            <th>Estrategias</th>
                            <th>Evidencia Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            IncidentesLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.Fecha}</th>
                                    <th>{user.Ubicacion}</th>
                                    <th>{user.Fenomeno}</th>
                                    <th>{user.Descripcion}</th>
                                    <th>{user.Evaluacion}</th>
                                    <th>{user.Tareas}</th>
                                    <th>{user.Recursos}</th>
                                    <th>{user.Estrategias}</th>
                                    <th><img src={user.EvidenciaFoto} width="100" height="100" alt ="imagen"/> </th>
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

export default IncidentesMatPelView