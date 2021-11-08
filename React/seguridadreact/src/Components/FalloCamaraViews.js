import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
        // <tr key={user.id} >
        // <th>{user.NoCamara}</th>
        // <th>{user.Informacion}</th>
        // <th>{user.IP}</th>
        // <th>{user.SITE}</th>
        // <th>{user.Modulo}</th>
        // <th>{user.Marca}</th>
        // <th>{user.DescFalla}</th>
        // <th>{user.Toreos}</th>
        // <th>{user.MateriaUt}</th>
        // <th>{user.Solucionado.toString()}</th>
        // <th>{user.Observaciones}</th>

        const title = "Fallo Camara";
        const headers = [["ID","NoCamara","Informacion", "IP","SITE","Modulo",
        "Marca", "DescFalla", "Toreos", "MateriaUt", "Solucionado", "Observaciones"]];
        
        const data = [[elt.id, elt.NoCamara, elt.IP, elt.SITE,elt.Modulo, elt.Marca, elt.DescFalla,
        elt.Toreos, elt.MateriaUt, elt.Solucionado, elt.Observaciones]];
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
        //   didDrawCell: function (data) {
        //     if (data.section === 'body' && data.column.index === 2) {
        //         data.cell.width=300
        //         data.cell.height=100
        //         doc.addImage(img, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias","SLOW")
        //     }
        //     if (data.section === 'body' && data.column.index === 3) {
        //         data.cell.width=300
        //         data.cell.height=100
        //         doc.addImage(img2, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width, data.cell.height, "Alias2","SLOW")
        //     }
        //   }
          
        };
        
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Evento Social: "+elt.id+".pdf")
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
                                    <th><Button onClick={() => this.exportPDF(user)}>Generar Reporte</Button></th>
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