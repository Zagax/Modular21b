import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

        const title = "Evento Social";
        const headers = [["ID","NombreEvento","FechaHora", "Pronostico","MensajeSeguridad","Estrategia",
        "Recurso", "Croquis", "Organigrama", "Estado", "NombreEncargado", "TelefonoEncargado", "CorreoEncargado"]];
        
        const data = [[elt.id, elt.NombreEvento, elt.FechaHora, elt.Pronostico, elt.MensajeSeguridad, elt.Estrategia,
        elt.Recurso, elt.Croquis, elt.Organigrama, elt.Estado, elt.NombreEncargado, elt.TelefonoEncargado, elt.CorreoEncargado]];
    
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

export default EventoSocialView