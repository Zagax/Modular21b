import React, { Component } from "react";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import {Link} from "react-router-dom"; 

class HojaUrgencias extends Component{
    constructor(props){
        super(props)

        this.state={
            id: '',
            Fecha: '',
            Nombre: '',
            Edad: '',
            Adscripcion: '',
            Codigo: '',
            Cargo: '',
            NoTelefono: '',
            ProvieneDe: '',
            Ubicacion: '',
            TrasladoA: '',
            Padecimiento: '',
            Diabetes: 'false',
            DiabetesDiagnostico: '',
            DiabetesTratamiento: '',
            Hipertension: 'false',
            HipertensionDiagnostico: '',
            HipertensionTratamiento: '',
            Epilepsia: 'false',
            EpilepsiaDiagnostico: '',
            EpilepsiaTratamiento: '',
            Asma: 'false',
            AsmaDiagnostico: '',
            AsmaTratamiento: '',
            Cirugias: '',
            Alergias: '',
            Sangre: '',
            TensionArterial: '',
            FC: '',
            FR: '',
            Temperatura: '',
            Saturacion: '',
            Glucosa: '',
            EscalaGlasgow: '',
            Neurologico: '',
            CabezaCuello: '',
            Cardiopulmonar: '',
            Abdomen: '',
            Extremidades: '',
            Diagnostico: '',
            Condicion: '',
            PronostioS: '',
            Tratamiento: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = e=> {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('https://seguridadqci.herokuapp.com/hojaurgencias', this.state)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const{ Fecha, Nombre, Edad, Adscripcion, Codigo, Cargo, NoTelefono, ProvieneDe, Ubicacion, TrasladoA, Padecimiento,  DiabetesDiagnostico, DiabetesTratamiento, HipertensionDiagnostico, HipertensionTratamiento, EpilepsiaDiagnostico, EpilepsiaTratamiento, AsmaDiagnostico, AsmaTratamiento, Cirugias, Alergias, Sangre, TensionArterial, FC, FR, Temperatura, Saturacion, Glucosa, EscalaGlasgow, Neurologico, CabezaCuello, Cardiopulmonar, Abdomen, Extremidades, Diagnostico, Condicion, PronostioS, Tratamiento, } = this.state
        return(
            <div>
                <br></br>
                <br></br>
                <div className= "container mt-5">
                    <Link to='/hojaurgencias/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="HojaUrgenciasIcon.png" width="75" height="75"/>{' '}
                    Hoja de Urgencias{' '}
                    <img alt="" src="HojaUrgenciasIcon.png" width="75" height="75"/>
                </h1>
                <h2 className="display-4" align="center">Ficha Clinica</h2>
                <Form onSubmit={this.submitHandler} className="needs-validation"> 
                    <Container>
                        <Row>
                            <Col>
                                Fecha: <input className="form-control" type="date" name="Fecha" value={Fecha} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Nombre: <input className="form-control" type="text" name="Nombre" value={Nombre} onChange={this.changeHandler} ></input>
                            </Col>
                            <Col>
                                Edad: <input className="form-control" type="text" name="Edad" value={Edad} onChange={this.changeHandler} ></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Adscripcion: <input className="form-control" type="text" name="Adscripcion" value={Adscripcion} onChange={this.changeHandler} ></input>
                            </Col>
                            <Col>
                                Codigo: <input className="form-control" type="text" name="Codigo" value={Codigo} onChange={this.changeHandler} ></input>
                            </Col>
                            <Col>
                                Cargo: <input className="form-control" type="text" name="Cargo" value={Cargo} onChange={this.changeHandler} ></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Tel/Cel: <input className="form-control" type="text" name="NoTelefono" placeholder="10 Digitos" value={NoTelefono} onChange={this.changeHandler} ></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Proveniente de: <input className="form-control" type="text" name="ProvieneDe" placeholder="Escuela o Institucion de Procedencia" value={ProvieneDe} onChange={this.changeHandler} ></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Ubicacion del Servicio: <input className="form-control" type="text" name="Ubicacion" placeholder="Donde solicita el servicio" value={Ubicacion} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Traslado A: <input className="form-control" type="text"  name="TrasladoA" placeholder="Institucion de salud a la que sera trasladado de ser necesario" value={TrasladoA} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 align="center">Principio y Evolucion del Paciente:</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <textarea className="form-control" name="Padecimiento" placeholder="Descripcion y evolucion de los sintomas" value={Padecimiento} onChange={this.changeHandler}></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 align="center">Antescedentes de Importancia:</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="group5" type="checkbox" name="Diabetes" value={true} onChange={this.changeHandler}/>  Diabetes 
                            </Col>
                            <Col>
                                Tiempo de Diagnostico: <input className="form-control" type="text" name="DiabetesDiagnostico" value={DiabetesDiagnostico} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tratamiento: <input className="form-control" type="text" name ="DiabetesTratamiento" value={DiabetesTratamiento} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="group5" type="checkbox" name="Hipertension" value={true} onChange={this.changeHandler}/>  Hipertension 
                            </Col>
                            <Col>
                                Tiempo de Diagnostico: <input className="form-control" type="text" name="HipertensionDiagnostico" value={HipertensionDiagnostico} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tratamiento: <input className="form-control" type="text" name="HipertensionTratamiento" value={HipertensionTratamiento} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="group5" type="checkbox" name="Epilepsia" value={true} onChange={this.changeHandler}/>  Epilepsia 
                            </Col>
                            <Col>
                                Tiempo de Diagnostico: <input className="form-control" type="text" name="EpilepsiaDiagnostico" value={EpilepsiaDiagnostico} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tratamiento: <input className="form-control" type="text" name="EpilepsiaTratamiento" value={EpilepsiaTratamiento} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="group5" type="checkbox" name="Asma" value={true} onChange={this.changeHandler}/>  Asma 
                            </Col>
                            <Col>
                                Tiempo de Diagnostico: <input className="form-control" type="text" name="AsmaDiagnostico" value={AsmaDiagnostico} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tratamiento: <input className="form-control" type="text" name="AsmaTratamiento" value={AsmaTratamiento} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Cirugias: <input className="form-control" type="text" name="Cirugias" value={Cirugias} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Alergias: <input className="form-control" type="text" name="Alergias" value={Alergias} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Grupo y RH: <input className="form-control" type="text" name="Sangre" value={Sangre} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 align="center">Exploracion Fisica:</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Tension Arterial: <input className="form-control" type="text" name="TensionArterial" value={TensionArterial} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                FC: <input className="form-control" type="text" name="FC" value={FC} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                FR: <input className="form-control" type="text" name="FR" value={FR} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Temperatura: <input className="form-control" type="text" name="Temperatura" value={Temperatura} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Saturacion: <input className="form-control" type="text" name="Saturacion" value={Saturacion} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Glucosa: <input className="form-control" type="text" name="Glucosa" value={Glucosa} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Escala Glasgow: <input className="form-control" type="text" name="EscalaGlasgow" value={EscalaGlasgow} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Neurologico: <input className="form-control" type="text" name="Neurologico" value={Neurologico} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Cabeza y Cuello: <input className="form-control" type="text" name="CabezaCuello" value={CabezaCuello} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Cardiopulmonar: <input className="form-control" type="text" name="Cardiopulmonar" value={Cardiopulmonar} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Abdomen: <input className="form-control" type="text" name="Abdomen" value={Abdomen} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Extremidades: <input className="form-control" type="text" name="Extremidades" value={Extremidades} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Diagnostico: <input className="form-control" type="text" name="Diagnostico" value={Diagnostico} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Condicion: <input className="form-control" type="text" name="Condicion" value={Condicion} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Pronostico: <input className="form-control" type="text" name="PronostioS" value={PronostioS} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Tratamiento: <textarea className="form-control" name="Tratamiento" placeholder="Tratamiento y/o medicamentos indicados por el medico de la institucion" value={Tratamiento} onChange={this.changeHandler}></textarea>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                    <center>
                        <button type='Submit' className='btn btn-primary btn-lg btn-success' href="">Guardar</button>
                    </center>
                </Form>
            </div>
        )
    }
}

export default HojaUrgencias