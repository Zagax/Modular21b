import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container } from 'react-bootstrap';

class RomperCandadoView extends Component {
    constructor(props){
        super(props)

        this.state={
            RomperLista: []
        }
    }

    exportPDF = (elt) => {
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;

        var img = new Image()
        img.src = elt.FotoIdF
        var img2 = new Image()
        img2.src = elt.FotoIdB

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = "Reporte Apertura de Candado";
        const headers = [["ID", "Nombre", "Codigo", "Carrera", "Descripcion", "Identificacion Frente", "Identificacion Detras", "Fecha"]];
        const data = [[elt.id, elt.NombreAlumno, elt.CodigoAlumno, elt.Carrera, elt.Descripcion, elt.FotoIdF, elt.FotoIdB, elt.Fecha]];

        let content = {
            startY: 50,
            head: headers,
            body: data,
            didDrawCell: function (data) {
                if (data.section === 'body' && data.column.index === 5){
                    data.cell.width=300
                    data.cell.height=100
                    doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y +2, data.cell.width, data.cell.height, "Alias", "SLOW")
                }
                if (data.section === 'body' && data.column.index === 6){
                    data.cell.width=300
                    data.cell.height=100
                    doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW2")
                }
            }
        }

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reporte Apertura de Candado ID: "+elt.id+".pdf")
    }
    
    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/rompercandado')
        .then(response => {
            console.log(response)
            this.setState({RomperLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/rompercandado/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }

    render(){
        const {RomperLista} = this.state
        console.log(RomperLista)
        return(
            <div>
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
                <Table bordered striped responsive>
                    <thead>
                        <tr>
                            <th>Nombre de Alumno</th>
                            <th>Codigo de Alumno</th>
                            <th>Carrera</th>
                            <th>Identificacion Frente</th>
                            <th>Identificacion Detras</th>
                            <th>Descripcion</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            RomperLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.NombreAlumno}</th>
                                    <th>{user.CodigoAlumno}</th>
                                    <th><img src={user.FotoIdF} width="100" height="100" alt ="imagen"/> </th>
                                    <th><img src={user.FotoIdB} width="100" height="100" alt ="imagen"/> </th>
                                    <th>{user.Descripcion}</th>
                                    <th>{user.Fecha}</th>
                                    <th><Button variant="danger" onClick={() => this.removeCategory(user.id)}>Eliminar</Button></th>
                                    <th><Button variant="info" onClick={() => this.exportPDF(user)}></Button></th>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default RomperCandadoView