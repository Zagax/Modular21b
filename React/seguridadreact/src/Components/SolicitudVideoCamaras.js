import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
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

class SolicitudVideoCamara extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            codigoAlumno: '',
            atendio : '',
            dateSolicitud : '',
            noCamara : '',
            horario : '',
            hecho : '',
            fotoIdF : null,
            fotoIdB : null,
        }
    }


    changeHandler = (e) =>{
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
        console.log(this.state)
        let form_data = new FormData();
        form_data.append('id', this.state.id);
        form_data.append('codigoAlumno', this.state.codigoAlumno);
        form_data.append('atendio', this.state.atendio);
        form_data.append('dateSolicitud', this.state.dateSolicitud);
        form_data.append('noCamara', this.state.noCamara);
        form_data.append('horario', this.state.horario);
        form_data.append('hecho', this.state.hecho);
        form_data.append('fotoIdF', this.state.fotoIdF, this.state.fotoIdF.name);
        form_data.append('fotoIdB', this.state.fotoIdB, this.state.fotoIdB.name);
        axios
            .post('https://seguridadqci.herokuapp.com/solcamara', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        // dateSolicitud Poner en la api la hora del sistema
        const {codigoAlumno, atendio,noCamara,horario,hecho} = this.state;

        return (
            <div>
                <div className= "container mt-5">
                    <Link to='/solicitudcam/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="VideoCamaraIcon.jpg" width="60" height="60"/>{' '}
                    Solicitud de Video Camara{' '}
                    <img alt="" src="VideoCamaraIcon.jpg" width="60" height="60"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Codigo Alumno: <input className="form-control" type="text" name="codigoAlumno" value={codigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Atendio: <input className="form-control" type="text" name="atendio" value={atendio} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                No. Camara: <input className="form-control" type="text" name="noCamara" value={noCamara} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Horarios: <input className="form-control" type="text" name="horario" value={horario} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Hechos: <input className="form-control" type="text" name="hecho" value={hecho} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                FotoIdB: <input className="form-control" type="file" name="fotoIdB" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                FotoIdF: <input className="form-control" type="file" name="fotoIdF" onChange={this.handleInputChange}></input>
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

//export default SolicitudVideoCamara