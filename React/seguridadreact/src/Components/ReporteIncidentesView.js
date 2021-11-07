import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';

class ReporteIncidentesView extends Component {
    constructor(props){
        super(props)

        this.state={
            IncidentesLista: []
        }
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/incidencias')
        .then(response => {
            console.log(response)
            this.setState({IncidentesLista: response.data})
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

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        var img = new Image()
        img.src = elt.FotoIdF
        var img2 = new Image()
        img2.src = elt.FotoIdB

        const title = "Reporte de Incidente";
        const headers = [["ID", "Codigo", "Fecha y hora ","Ubicacion","Objetos Perdidos","Foto Id Frente","Foto Id Detras","Estatura","Apariencia","Tez","Cabello","Ojos","Cara","Boca",
                        "Tipo de ropa","Gorra","Edad Aproximada","Cicatrices","Tatuajes","Piercings","Otra","Huida","Observacion", "Descripcion"]];
        const data = [[elt.id, elt.CodigoAlumno, elt.FechaHora, elt.Ubicacion, elt.ObjetosP, elt.FotoIdF, elt.FotoIdB, elt.Estatura, elt.Apariencia, elt.Tez, elt.Cabello, elt.Ojos,
        elt.Cara, elt.Boca, elt.TipoRopa, elt.Gorra, elt.EdadAprox, elt.Cicatrices, elt.Tatuajes, elt.Piercings, elt.Otra, elt.Huida, elt.Observacion, elt.Descripcion]];
    
        let content = {
          startY: 50,
          head: headers,
          body: data, 
          didDrawCell: function (data) {
            if (data.section === 'body' && data.column.index === 5) {
                data.cell.width=300
                data.cell.height=100
                doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias","SLOW")
            }
            if (data.section === 'body' && data.column.index === 6) {
                data.cell.width=300
                data.cell.height=100
                doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW2")
            }
          }
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reportes de Incidente ID: "+elt.id+".pdf")
    }

    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/incidencias/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {IncidentesLista} = this.state
        console.log(IncidentesLista)
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Codigo de Alumno</th>
                            <th>Fecha y hora</th>
                            <th>Ubicacion</th>
                            <th>Objetos perdidos</th>
                            <th>Identificacion Frente</th>
                            <th>Identificacion Detras</th>
                            <th>Estatura</th>
                            <th>Apariencia</th>
                            <th>Tez</th>
                            <th>Cabello</th>
                            <th>Ojos</th>
                            <th>Cara</th>
                            <th>Boca</th>
                            <th>Tipo de ropa</th>
                            <th>Gorra</th>
                            <th>Edad aproximada</th>
                            <th>Cicatrices</th>
                            <th>Tatuajes</th>
                            <th>Piercings</th>
                            <th>Otra</th>
                            <th>Huida</th>
                            <th>Observacion</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            IncidentesLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.id}</th>
                                    <th>{user.CodigoAlumno}</th>
                                    <th>{user.FechaHora}</th>
                                    <th>{user.Ubicacion}</th>
                                    <th>{user.ObjetosP}</th>
                                    <th><img src={user.FotoIdF} width="100" height="100" alt ="imagen"/> </th>
                                    <th><img src={user.FotoIdB} width="100" height="100" alt ="imagen"/> </th>
                                    <th>{user.Estatura}</th>
                                    <th>{user.Apariencia}</th>
                                    <th>{user.Tez}</th>
                                    <th>{user.Cabello}</th>
                                    <th>{user.Ojos}</th>
                                    <th>{user.Cara}</th>
                                    <th>{user.Boca}</th>
                                    <th>{user.TipoRopa}</th>
                                    <th>{user.Gorra}</th>
                                    <th>{user.EdadAprox}</th>
                                    <th>{user.Cicatrices}</th>
                                    <th>{user.Tatuajes}</th>
                                    <th>{user.Piercings}</th>
                                    <th>{user.Otra}</th>
                                    <th>{user.Huida}</th>
                                    <th>{user.Observacion}</th>
                                    <th>{user.Descripcion}</th>
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

export default ReporteIncidentesView