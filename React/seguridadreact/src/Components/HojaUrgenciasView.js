import React, {Component} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container } from 'react-bootstrap';

class HojaUrgenciasView extends Component {
    constructor(props){
        super(props)

        this.state={
            IncidentesLista: []
        }
    }

    exportPDF = (elt) => {
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;

        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = "Hoja de Urgencias";
        const headers = [["ID", "Fecha", "Nombre", "Edad", "Adscripcion", "Codigo", "Cargo", "Telefono", "Proviene", "Ubicacion", "Traslado", "Padecimientos", "Diabetes", "Diagnostico", "Tratamiento", "Hipertension", "Diagnostico", "Tratamiento", "Epilepsia", "Diagnostico", "Tratamiento", "Asma", "Diagnostico", "Tratamiento", "Cirugias", "Alergias", "Sangre", "Tension Arterial", "FC", "FR", "Temperatura", "Saturacion", "Glucosa", "Escala Glasgow", "Neurologico", "Cabeza y Cuello", "Cardiopulmonar", "Abdomen", "Extremidades", "Diagnostico", "Condicion", "Pronostico", "Tratamiento"]];
        const data = [[elt.id, elt.Fecha, elt.Nombre, elt.Edad, elt.Adscripcion, elt.Codigo, elt.Cargo, elt.NoTelefono, elt.ProvieneDe, elt.Ubicacion, elt.TrasladoA, elt.Padecimiento, elt.Diabetes, elt.DiabetesDiagnostico, elt.DiabetesTratamiento, elt.Hipertension, elt.HipertensionDiagnostico, elt.HipertensionTratamiento, elt.Epilepsia, elt.EpilepsiaDiagnostico, elt.EpilepsiaTratamiento, elt.Asma, elt.AsmaDiagnostico, elt.AsmaTratamiento, elt.Cirugias, elt.Alergias, elt.Sangre, elt.TensionArterial, elt.FC, elt.FR, elt.Temperatura, elt.Saturacion, elt.Glucosa, elt.EscalaGlasgow, elt.Neurologico, elt.CabezaCuello, elt.Cardiopulmonar, elt.Abdomen, elt.Extremidades, elt.Diagnostico, elt.Condicion, elt.PronostioS, elt.Tratamiento]];

        let content = {
            startY: 50,
            head: headers,
            body: data
        }

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Hoja de Urgencias ID: "+elt.id+".pdf")
    }

    componentDidMount(){
        axios.get('https://seguridadqci.herokuapp.com/hojaurgencias')
        .then(response => {
            console.log(response)
            this.setState({IncidentesLista: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    removeCategory (ids) {
        fetch('https://seguridadqci.herokuapp.com/hojaurgencias/'+ids+'/',{
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
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Adscripcion</th>
                            <th>Codigo</th>
                            <th>Cargo</th>
                            <th>Numero de Telefono</th>
                            <th>Procedencia</th>
                            <th>Ubicacion</th>
                            <th>Translado</th>
                            <th>Padecimiento</th>
                            <th>Diabetes</th>
                            <th>Diabetes diagnostico</th>
                            <th>Diabetes tratamiento</th>
                            <th>Hipertension</th>
                            <th>Hipertension diagnostico</th>
                            <th>Hipertension tratamiento</th>
                            <th>Epilepsia</th>
                            <th>Epilepsia diagnostico</th>
                            <th>Epilepsia tratamiento</th>
                            <th>Asma</th>
                            <th>Asma diagnostico</th>
                            <th>Asma tratamiento</th>
                            <th>Cirguias</th>
                            <th>Alergias</th>
                            <th>Tipo de sangre</th>
                            <th>Tension arterial</th>
                            <th>FC</th>
                            <th>FR</th>
                            <th>Temperatura</th>
                            <th>Saturacion</th>
                            <th>Glucosa</th>
                            <th>Escala Glasgow</th>
                            <th>Neurologico</th>
                            <th>Cabeza y cuello</th>
                            <th>Cardio pulmonar</th>
                            <th>Abdomen</th>
                            <th>Extremidades</th>
                            <th>Diagnostico</th>
                            <th>Condicion</th>
                            <th>Pronostico</th>
                            <th>Tratamiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            IncidentesLista.map((user) => (
                                <tr key={user.id} >
                                    <th>{user.Fecha}</th>
                                    <th>{user.Nombre}</th>
                                    <th>{user.Edad}</th>
                                    <th>{user.Adscripcion}</th>
                                    <th>{user.Codigo}</th>
                                    <th>{user.Cargo}</th>
                                    <th>{user.NoTelefono}</th>
                                    <th>{user.ProvieneDe}</th>
                                    <th>{user.Ubicacion}</th>
                                    <th>{user.TrasladoA}</th>
                                    <th>{user.Padecimiento}</th>
                                    <th>{user.Diabetes.toString()}</th>
                                    <th>{user.DiabetesDiagnostico}</th>
                                    <th>{user.DiabetesTratamiento}</th>
                                    <th>{user.Hipertension.toString()}</th>
                                    <th>{user.HipertensionDiagnostico}</th>
                                    <th>{user.HipertensionTratamiento}</th>
                                    <th>{user.Epilepsia.toString()}</th>
                                    <th>{user.EpilepsiaDiagnostico}</th>
                                    <th>{user.EpilepsiaTratamiento}</th>
                                    <th>{user.Asma.toString()}</th>
                                    <th>{user.AsmaDiagnostico}</th>
                                    <th>{user.AsmaTratamiento}</th>
                                    <th>{user.Cirugias}</th>
                                    <th>{user.Alergias}</th>
                                    <th>{user.Sangre}</th>
                                    <th>{user.TensionArterial}</th>
                                    <th>{user.FC}</th>
                                    <th>{user.FR}</th>
                                    <th>{user.Temperatura}</th>
                                    <th>{user.Saturacion}</th>
                                    <th>{user.Glucosa}</th>
                                    <th>{user.EscalaGlasgow}</th>
                                    <th>{user.Neurologico}</th>
                                    <th>{user.CabezaCuello}</th>
                                    <th>{user.Cardiopulmonar}</th>
                                    <th>{user.Abdomen}</th>
                                    <th>{user.Extremidades}</th>
                                    <th>{user.Diagnostico}</th>
                                    <th>{user.Condicion}</th>
                                    <th>{user.PronostioS}</th>
                                    <th>{user.Tratamiento}</th>
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

export default HojaUrgenciasView