import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";

class PrintComponent extends Component {
    render() {
        return (
          <div>
            <ReactToPrint
              trigger={() => <Container><br/><Button variant="warning">Imprimir Formato</Button></Container>}
              content={() => this.componentRef}
            />
            <ReporteIncidentes ref={el => (this.componentRef = el)} />
          </div>
        );
      }
}

export default PrintComponent

class ReporteIncidentes extends Component{
    constructor(props) {
        super(props)

        this.state={
            id: '',
            CodigoAlumno: '',
            FechaHora: '',
            Ubicacion: '',
            ObjetosP: '',
            FotoIdF: null,
            FotoIdB: null,
            Estatura: '',
            Apariencia: '',
            Tez: '',
            Cabello: '',
            Ojos: '',
            Cara: '',
            Boca: '',
            TipoRopa: '',
            Gorra: '',
            EdadAprox: '',
            Cicatrices: '',
            Tatuajes: '',
            Piercings: '',
            Otra: '',
            Huida: '',
            Observacion: '',
            Descripcion: '',
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
      };

    submitHandler = (data) => {
        data.preventDefault()
        console.log(data)
        let form_data = new FormData();
        form_data.append('id', this.state.id);
        form_data.append('CodigoAlumno', this.state.CodigoAlumno);
        form_data.append('FechaHora', this.state.FechaHora);
        form_data.append('Ubicacion', this.state.Ubicacion);
        form_data.append('ObjetosP', this.state.ObjetosP);
        form_data.append('FotoIdF', this.state.FotoIdF, this.state.FotoIdF.name);
        form_data.append('FotoIdB', this.state.FotoIdB, this.state.FotoIdB.name);
        form_data.append('Estatura', this.state.Estatura);
        form_data.append('Apariencia', this.state.Apariencia);
        form_data.append('Tez', this.state.Tez);
        form_data.append('Cabello', this.state.Cabello);
        form_data.append('Ojos', this.state.Ojos);
        form_data.append('Cara', this.state.Cara);
        form_data.append('Boca', this.state.Boca);
        form_data.append('TipoRopa', this.state.TipoRopa);
        form_data.append('Gorra', this.state.Gorra);
        form_data.append('EdadAprox', this.state.EdadAprox);
        form_data.append('Cicatrices', this.state.Cicatrices);
        form_data.append('Tatuajes', this.state.Tatuajes);
        form_data.append('Piercings', this.state.Piercings);
        form_data.append('Otra', this.state.Otra);
        form_data.append('Huida', this.state.Huida);
        form_data.append('Observacion', this.state.Observacion);
        form_data.append('Descripcion', this.state.Descripcion);
        axios
            .post('https://seguridadqci.herokuapp.com/incidencias', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const { CodigoAlumno, Ubicacion, ObjetosP, Estatura,
        Apariencia, Tez, Cabello, Ojos, Cara, Boca, TipoRopa, Gorra, EdadAprox, Cicatrices,
        Tatuajes, Piercings, Otra, Huida, Observacion, Descripcion} = this.state
        return (
            <div>
                <div className= "container mt-5">
                    <br></br>
                    <Link to='/reporteincidentes/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="ReporteIncidentesIcon.png" width="75" height="75"/>{' '}
                    Reporte de Incidentes{' '}
                    <img alt="" src="ReporteIncidentesIcon.png" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                <h2 align="center">Datos de Identificacion del Afectado</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Codigo Alumno: <input className="form-control" type="text" name="CodigoAlumno" value={CodigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2 align="center">Datos del Incidente</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Ubicacion: <input className="form-control" type="text" name="Ubicacion" placeholder="calles, cruces, frente a algun comercio o local" value={Ubicacion} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Objetos perdidos: <input className="form-control" type="text" name="ObjetosP" value={ObjetosP} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                               <h2 align="center">Media Filiacion del Agresor</h2> 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Estatura en metros: <input className="form-control" type="number" step="0.01" name="Estatura" value={Estatura} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Apariencia: <input className="form-control" type="text" name="Apariencia" value={Apariencia} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tez: <input className="form-control" type="text" name="Tez" value={Tez} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Cabello: <input className="form-control" type="text" name="Cabello" value={Cabello} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Ojos: <input className="form-control" type="text" name="Ojos" value={Ojos} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Cara: <input className="form-control" type="text" name="Cara" value={Cara} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Boca: <input className="form-control" type="text" name="Boca" value={Boca} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tipo de Ropa: <input className="form-control" type="text" name="TipoRopa" value={TipoRopa} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Gorra: <input className="form-control" type="text" name="Gorra" value={Gorra} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Edad Aproximada: <input className="form-control" type="number" min="1" max="100" step="1" name="EdadAprox" value={EdadAprox} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Cicatrices: <input className="form-control" type="text" name="Cicatrices" value={Cicatrices} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Tatuajes: <input className="form-control" type="text" name="Tatuajes" value={Tatuajes} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Piercings: <input className="form-control" type="text" name="Piercings" value={Piercings} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Otra: <input className="form-control" type="text" name="Otra" value={Otra} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Medio Utilizado Para Huir: <input className="form-control" type="text" name="Huida" placeholder="Caracteristicas del vehiculo" value={Huida} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Observaciones: <input className="form-control" type="text" name="Observacion" value={Observacion} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Descripcion del incidente: <textarea className="form-control" name="Descripcion" placeholder="Descripcion del incidente" value={Descripcion} onChange={this.changeHandler}></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Identificacion Frente: <input className="form-control" type="file" name="FotoIdF" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Identificacion Detras: <input className="form-control" type="file" name="FotoIdB" onChange={this.handleInputChange}></input>
                            </Col>
                        </Row>
                        <br></br>
                        <center>
                            <button type='Submit' className='btn btn-primary btn-lg btn-success' href="">Guardar</button>
                        </center>
                    </Container>
                </Form>
            </div>
        )
    }
}

//export default ReporteIncidentes