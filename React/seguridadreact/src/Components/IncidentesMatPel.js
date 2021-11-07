import React, { Component } from "react";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class ReporteIncidentesMatPel extends Component{
    constructor(props){
        super(props)

        this.state={
            id: '',
            Fecha: '',
            Ubicacion: '',
            Fenomeno: '',
            Descripcion: '',
            Evaluacion: '',
            Tareas: '',
            Recursos: '',
            Estrategias: '',
            EvidenciaFoto: null,
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
        form_data.append('Fecha', this.state.Fecha);
        form_data.append('Ubicacion', this.state.Ubicacion);
        form_data.append('Fenomeno', this.state.Fenomeno);
        form_data.append('Descripcion', this.state.Descripcion);
        form_data.append('Evaluacion', this.state.Evaluacion);
        form_data.append('Tareas', this.state.Tareas);
        form_data.append('Recursos', this.state.Recursos);
        form_data.append('Estrategias', this.state.Estrategias);
        form_data.append('EvidenciaFoto', this.state.EvidenciaFoto, this.state.EvidenciaFoto.name);
        axios
            .post('http://127.0.0.1:8000/reporteincidentesmatpel', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const{ Ubicacion, Fenomeno, Descripcion, Evaluacion, Tareas, Recursos, Estrategias } = this.state
        return(
            <div>
                <br></br>
                <br></br>
                <div className= "container mt-5">
                    <Link to='/incidentesmatpet/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-4" align="center">
                    <img alt="" src="IncidentesIcon.png" width="75" height="75"/>{' '}
                    Reporte Incidentes Mat-Pel{' '}
                    <img alt="" src="IncidentesIcon.png" width="75" height="75"/>{' '}
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Ubicacion: <input className="form-control" type="text" required name="Ubicacion" value={Ubicacion} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Fenomeno Perutbador:  <input className="form-control" type="text" required name="Fenomeno" value={Fenomeno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Descripcion de los Hechos: <textarea className="form-control" required name="Descripcion" value={Descripcion} onChange={this.changeHandler}></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Evaluacion de Daños: <textarea className="form-control" required name="Evaluacion" value={Evaluacion} onChange={this.changeHandler}></textarea>
                            </Col>
                            <Col>
                                Tareas Realizadas:  <textarea className="form-control" required name="Tareas" value={Tareas} onChange={this.changeHandler}></textarea>
                            </Col>
                            <Col>
                                Recursos Humanos y Materiales Utilizados: <textarea className="form-control" required name="Recursos" value={Recursos} onChange={this.changeHandler}></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Estrategias y Recomendaciones para evitar Incidencias: <textarea className="form-control" name="Estrategias" value={Estrategias} onChange={this.changeHandler}></textarea>
                            </Col>
                            <Col>
                                Evidencia Fotografica: <input className="form-control" type="file" name="EvidenciaFoto" onChange={this.handleInputChange}></input>
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

export default ReporteIncidentesMatPel