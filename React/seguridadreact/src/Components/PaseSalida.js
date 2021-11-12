import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Button from 'react-bootstrap/Button'

class PrintComponent extends Component {
    render() {
        return (
          <div>
            <ReactToPrint
              trigger={() => <Container><br/><Button variant="warning">Imprimir Formato</Button></Container>}
              content={() => this.componentRef}
            />
            <PaseSalida ref={el => (this.componentRef = el)} />
          </div>
        );
      }
}

export default PrintComponent

class PaseSalida extends Component{
    constructor(props) {
        super(props)

        this.state={
            id: '',
            CodigoAlumno: '',
            FotoIdF: null,
            FotoIdB: null,
            Sello: '',
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
        console.log(this.state)
        let form_data = new FormData();
        form_data.append('id', this.state.id);
        form_data.append('CodigoAlumno', this.state.CodigoAlumno);
        form_data.append('FotoIdF', this.state.FotoIdF, this.state.FotoIdF.name);
        form_data.append('FotoIdB', this.state.FotoIdB, this.state.FotoIdB.name);
        form_data.append('Sello', this.state.Sello);
        form_data.append('Descripcion', this.state.Descripcion);
        form_data.append('Fecha', this.state.Fecha);
        axios
            .post('https://seguridadqci.herokuapp.com/pasesalida', form_data)
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const { CodigoAlumno, Sello, Descripcion} = this.state
        return (            
            <div>
                <div className= "container mt-5">
                    <Link to='/pasesalida/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="PaseSalidaIcon.jpg" width="75" height="75"/>{' '}
                    Pase de Salida{' '}
                    <img alt="" src="PaseSalidaIcon.jpg" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Codigo Alumno: <input className="form-control" type="text" name="CodigoAlumno" value={CodigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Identificacion Frente: <input className="form-control" type="file" name="FotoIdF" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Identificacion Detras: <input className="form-control" type="file" name="FotoIdB" onChange={this.handleInputChange}></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Sello: <input className="form-control" type="text" name="Sello" value={Sello} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Descripcion: <input className="form-control" type="text" name="Descripcion" value={Descripcion} onChange={this.changeHandler}></input>
                            </Col>
                        </Row>
                        <br></br>
                        <center>
                            <Button type='Submit' className='btn btn-primary btn-lg btn-success' href="">Guardar</Button>
                        </center>
                    </Container>
                </Form>
            </div>
        )
    }
}

//export default PaseSalida