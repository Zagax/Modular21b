import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Col, Container, Row, Form } from "react-bootstrap";

class EventoSocial extends Component{
    constructor(props){
        super(props)

        this.state = {
            id : '',
            NombreEvento: '',
            FechaHora : '',
            Pronostico  : '',
            MensajeSeguridad : '',
            Estrategia : '',
            Recurso: '',
            Croquis: '',
            Organigrama : '',
            Estado : '',
            NombreEncargado: '', 
            TelefonoEncargado: '',
            CorreoEncargado: '',
        }
    }


    changeHandler = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitHandler = e=> {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('https://seguridadqci.herokuapp.com/social', this.state)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
    
        const {NombreEvento, FechaHora,Pronostico, MensajeSeguridad, Estrategia, Recurso, Croquis,Organigrama, Estado,
        NombreEncargado, TelefonoEncargado, CorreoEncargado } = this.state;

        return (
            <div>
                <br></br>
                <br></br>
                <div className= "container mt-5">
                    <Link to='/social/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="EventoSocialIcon.png" width="75" height="75"/>{' '}
                    Evento Social-Organizativo{' '}
                    <img alt="" src="EventoSocialIcon.png" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Nombre del Evento: <input className="form-control" type="text" name="NombreEvento" value={NombreEvento} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Fecha y Hora: <input className="form-control" type="date" name="FechaHora" value={FechaHora} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Pronostico: <input className="form-control" type="text" name="Pronostico" placeholder="Climatico" value={Pronostico} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Mensaje de Seguridad: <input className="form-control" type="text" name="MensajeSeguridad" value={MensajeSeguridad} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Estrategias: <input className="form-control" type="text" name="Estrategia" value={Estrategia} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Recursos: <input className="form-control" type="text" name="Recurso" value={Recurso} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Croquis: <input className="form-control" type="text" name="Croquis" placeholder="Pequeño mapa del lugar" value={Croquis} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Organigrama: <input className="form-control" type="text" name="Organigrama" value={Organigrama} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Estado de fuerza: <input className="form-control" type="text" name="Estado" value={Estado} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Nombre del Encargado: <input className="form-control" type="text" name="NombreEncargado" value={NombreEncargado} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Telefono del Encargado: <input className="form-control" type="text" name="TelefonoEncargado" placeholder="10 Digitos" value={TelefonoEncargado} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Correo del Encargado: <input className="form-control" type="text" name="CorreoEncargado" placeholder="Correo Institucional" value={CorreoEncargado} onChange={this.changeHandler}></input>
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

export default EventoSocial