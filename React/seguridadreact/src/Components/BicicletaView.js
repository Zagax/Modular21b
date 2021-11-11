import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';


class BicicletaView extends Component {
    constructor(props){
        super(props)

        this.state={
            BicicletaLista: []
        }
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/bicicleta')
        .then(response => {
            console.log(response)
            this.setState({BicicletaLista: response.data})
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
        img.src = elt.FotoIdF
        var img2 = new Image()
        img2.src = elt.FotoIdB

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = "Reporte Bicicleta";
        const headers = [["ID","Codigo", "Foto Frente","Foto Back","Descripcion","Fecha"]];
        const data = [[elt.id, elt.CodigoAlumno, elt.FotoIdF, elt.FotoIdB, elt.Descripcion, elt.Fecha]];
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
          didDrawCell: function (data) {
            if (data.section === 'body' && data.column.index === 2) {
                data.cell.width=300
                data.cell.height=100
                doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias","SLOW")
            }
            if (data.section === 'body' && data.column.index === 3) {
                data.cell.width=300
                data.cell.height=100
                doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW2")
            }
          }
          
        };
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Reportes de Bicicleta sin asegurar: "+elt.id+".pdf")
    }

    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/bicicleta/'+ids+'/',{
            method: 'DELETE',
            headers: {'Accept':'application/json','Content-Type':'application/json'}
        })
        window.location.reload()
    }
    
    goBack(){
        window.history.back()
    }

    render(){
        const {BicicletaLista} = this.state
        console.log(BicicletaLista)
        return(
            <div>
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
                <br/>
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>CodigoAlumno</th>
                            <th>Foto id frente</th>
                            <th>Foto id detras</th>
                            <th>Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            BicicletaLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.CodigoAlumno}</th>
                                    <th><img src={user.FotoIdF} width="100" height="100" alt ="imagen"/> </th>
                                    <th><img src={user.FotoIdB} width="100" height="100" alt ="imagen"/> </th>
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

export default BicicletaView