import React, { Component } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

class Grafica extends Component{
    constructor(props) {
        super(props)
        this.state={
            urls:""
        }
    }

    render(){
        //const {urls} = this.state;
        return (
            <div>
                <h1 className="display-3" align="center">
                    Grafica de prediccion
                </h1>
                <Form onSubmit={this.submitHandler} className="needs-validation">
                    <Container>
                        <Row>
                            <Col>
                                <img src="https://seguridadqci.herokuapp.com/GraficaLineal.png" alt="Y mi gráfica?"> </img>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        )
    }
}

export default Grafica