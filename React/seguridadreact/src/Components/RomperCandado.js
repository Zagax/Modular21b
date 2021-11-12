import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

class PrintComponent extends Component {
    render() {
        return (
          <div>
            <ReactToPrint
              trigger={() => <Container><br/><Button variant="warning">Imprimir Formato</Button></Container>}
              content={() => this.componentRef}
            />
            <Bicicleta ref={el => (this.componentRef = el)} />
          </div>
        );
      }
}

export default PrintComponent

class RomperCandado extends Component{
    constructor(props) {
        super(props)

        this.state={
            id: '',
            NombreAlumno:'',
            CodigoAlumno:'',
            Carrera:'',
            FotoIdF: null,
            FotoIdB: null,
            Descripcion: '',
            Fecha: '',
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
        form_data.append('NombreAlumno', this.state.NombreAlumno);
        form_data.append('CodigoAlumno', this.state.CodigoAlumno);
        form_data.append('Carrera', this.state.Carrera);
        form_data.append('FotoIdF', this.state.FotoIdF, this.state.FotoIdF.name);
        form_data.append('FotoIdB', this.state.FotoIdB, this.state.FotoIdB.name);
        form_data.append('Descripcion', this.state.Descripcion);
        form_data.append('Fecha', this.state.Fecha);
        axios
            .post('https://seguridadqci.herokuapp.com/rompercandado', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const { NombreAlumno, Carrera, CodigoAlumno, Descripcion} = this.state
        return (
            <div>
                <div className= "container mt-5">
                    <Link to='/rompercandado/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="RomperCandadoIcon.png" width="60" height="60"/>{' '}
                    Apertura de Candado{' '}
                    <img alt="" src="RomperCandadoIcon.png" width="60" height="60"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Nombre de Alumno: <input className="form-control" type="text" name="NombreAlumno" value={NombreAlumno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Carrera: <input className="form-control" type="text" name="Carrera" value={Carrera} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Codigo: <input className="form-control" type="text" name="CodigoAlumno" value={CodigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Descripcion: <textarea className="form-control" name="Descripcion" placeholder="Caracteristicas y ubicacion del candado" value={Descripcion} onChange={this.changeHandler}></textarea>
                            </Col>
                            <Col>
                                Identificacion Frente: <input accept="image/png, image/jpeg" className="form-control" type="file" name="FotoIdF" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Identificacion Detras: <input accept="image/png, image/jpeg" className="form-control" type="file" name="FotoIdB" onChange={this.handleInputChange}></input>
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

//export default RomperCandado