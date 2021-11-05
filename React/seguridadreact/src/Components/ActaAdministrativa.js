import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';

class ActaAdministrativa extends Component{
    constructor(props) {
        super(props)

        this.state={
            id: '',
            CodigoAlumno: '',
            NoOficio: '',
            Lugar: '',
            NombreAl: '',
            Causa: '',
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
            .post('https://seguridadqci.herokuapp.com/actaadministrativa', this.state)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const { CodigoAlumno, NoOficio, Lugar, NombreAl, Causa} = this.state
        return (
            <div>
                <br></br>
                <br></br>
                <div className= "container mt-5">
                    <Link to='/actaadmin/view' className="btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="ActaAdminIcon.jpg" width="30" height="30"/>{' '}
                    Acta Administrativa{' '}
                    <img alt="" src="ActaAdminIcon.jpg" width="30" height="30"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Codigo de Alumno: <input className="form-control" type="text" name="CodigoAlumno" value={CodigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Nombre de Alumno: <input className="form-control" type="text" name="NombreAl" value={NombreAl} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                No. Oficio: <input className="form-control" type="text" name="NoOficio" value={NoOficio} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Lugar: <input className="form-control" type="text" name="Lugar" value={Lugar} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Causa: <input className="form-control" type="text" name="Causa" value={Causa} onChange={this.changeHandler}></input>
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

export default ActaAdministrativa