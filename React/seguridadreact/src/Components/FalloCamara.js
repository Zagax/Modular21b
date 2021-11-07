import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";

class FalloCamara extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            NoCamara : '',
            Informacion : '',
            IP : '',
            SITE : '',
            Modulo: '',
            Marca : '',
            DescFalla : '',
            Toreos : '',
            MateriaUt: '',
            Solucionado : '',
            Observaciones : '',
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
            .post('https://seguridadqci.herokuapp.com/camara', this.state)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        // dateSolicitud Poner en la api la hora del sistema


        const {NoCamara,Informacion, SITE, Modulo, Marca, DescFalla, Toreos,
                 MateriaUt, Solucionado, Observaciones, IP} = this.state;

        return (
            <div>
                <div className= "container mt-5">
                    <Link to='/fallocamara/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="FalloCamaraIcon.jpg" width="75" height="75"/>{' '}
                    Fallo de Camara/Switch{' '}
                    <img alt="" src="FalloCamaraIcon.jpg" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                <h2 align="center">Informacion</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                No. Camara: <input className="form-control" type="text" name="NoCamara" value={NoCamara} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Informacion: <input className="form-control" type="text" name="Informacion" value={Informacion} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                IP: <input className="form-control" type="text" name="IP" value={IP} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                SITE: <input className="form-control" type="text" name="SITE" value={SITE} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Modulo: <input className="form-control" type="text" name="Modulo" value={Modulo} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Marca: <input className="form-control" type="text" name="Marca" value={Marca} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Descripcion de la Falla: <input className="form-control" type="text" name="DescFalla" value={DescFalla} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Toreos de reproduccion: <input className="form-control" type="text" name="Toreos" value={Toreos} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Material Utilizado: <input className="form-control" type="text" name="MateriaUt" value={MateriaUt} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Solucionado: <input className="form-control" type="text" name="Solucionado" value={Solucionado} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Observaciones: <input className="form-control" type="text" name="Observaciones" value={Observaciones} onChange={this.changeHandler}></input>
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

export default FalloCamara;