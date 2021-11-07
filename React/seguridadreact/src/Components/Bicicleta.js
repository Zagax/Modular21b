import React, {Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
class Bicicleta extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            CodigoAlumno: '',
            FotoIdF : null,
            FotoIdB : null,
            Descripcion: '',
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
        console.log(data)
        let form_data = new FormData();
        form_data.append('id', this.state.id);
        form_data.append('CodigoAlumno', this.state.CodigoAlumno);
        form_data.append('FotoIdF', this.state.FotoIdF, this.state.FotoIdF.name);
        form_data.append('FotoIdB', this.state.FotoIdB, this.state.FotoIdB.name);
        form_data.append('Descripcion', this.state.Descripcion);
        axios
            .post('https://seguridadqci.herokuapp.com/bicicleta', form_data)
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
        const {CodigoAlumno,Descripcion } = this.state;

        return (
            <div>
                <div className= "container mt-5">
                    <Link to='/bicicleta/view' className= "btn btn-info">Listado</Link>
                </div>
                <h1 className="display-3" align="center">
                    <img alt="" src="BiciSinSeguroIcon.jpg" width="75" height="75"/>{' '}
                    Bicicleta Sin Asegurar{' '}
                    <img alt="" src="BiciSinSeguroIcon.jpg" width="75" height="75"/>
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                Codigo de Alumno: <input className="form-control" type="text" name="CodigoAlumno" value={CodigoAlumno} onChange={this.changeHandler}></input>
                            </Col>
                            <Col>
                                Identificacion Frente: <input className="form-control" type="file" name="FotoIdB" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Identificacion Atras: <input className="form-control" type="file" name="FotoIdF" onChange={this.handleInputChange}></input>
                            </Col>
                            <Col>
                                Descripcion: <input className="form-control" type="text" name="Descripcion" placeholder="Caracteristicas del vehiculo" value={Descripcion} onChange={this.changeHandler}></input>
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

export default Bicicleta