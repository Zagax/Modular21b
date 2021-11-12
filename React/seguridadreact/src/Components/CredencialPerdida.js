import React, { Component } from "react";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'

class PrintComponent extends Component {
    render() {
        return (
          <div>
            <ReactToPrint
              trigger={() => <Container><br/><Button variant="warning">Imprimir Formato</Button></Container>}
              content={() => this.componentRef}
            />
            <CredencialPerdida ref={el => (this.componentRef = el)} />
          </div>
        );
      }
}

export default PrintComponent

class CredencialPerdida extends Component{
    constructor(props){
        super(props)

        this.state={
            NombreA: '',
            Carrera: '',
            Codigo: '',
            FechaYHora: '',
            FotoIneFrente: null,
            FotoIneTrasera: null,
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
        form_data.append('NombreA', this.state.NombreA);
        form_data.append('Carrera', this.state.Carrera);
        form_data.append('Codigo', this.state.Codigo);
        form_data.append('FotoIneFrente', this.state.FotoIneFrente, this.state.FotoIneFrente.name);
        form_data.append('FotoIneTrasera', this.state.FotoIneTrasera, this.state.FotoIneTrasera.name);
        axios
            .post('https://seguridadqci.herokuapp.com/credencialperdida', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const { NombreA, Carrera, Codigo } = this.state
        return(
            <div>
                <div className= "container mt-5">
                    <Link to='/crendencialperdida/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="CredencialIcon.png" width="75" height="75"/>{' '}
                    Credencial Perdida y Recuperada{' '}
                    <img alt="" src="CredencialIcon.png" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Nombre de Alumno: <input className="form-control" type="text" required name="NombreA" value={NombreA} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Carrera: <input className="form-control" type="text" required name="Carrera" value={Carrera} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Codigo: <input className="form-control" type="text" required name="Codigo" value={Codigo} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Identificacion Frente: <input accept="image/png, image/jpeg" className="form-control" type="file" name="FotoIneFrente" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Identificacion Detras: <input accept="image/png, image/jpeg" className="form-control" type="file" name="FotoIneTrasera" onChange={this.handleInputChange}></input>
                            </Col>
                        </Row>
                        <br></br>
                        <center>
                            <button type='Submit' className='btn btn-primary btn-lg btn-success' href="">Submit</button>
                        </center>                    
                    </Container>
                </Form>
            </div>
        )
    }
}

//export default CredencialPerdida