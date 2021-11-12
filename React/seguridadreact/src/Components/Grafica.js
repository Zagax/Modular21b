import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class Grafica extends Component{
    constructor(props) {
        super(props)
        this.state={
            Regresion:"https://seguridadqci.herokuapp.com/GraficaLineal.png",
            AutoRegresion:"https://seguridadqci.herokuapp.com/Grafica.png"
        }
    }

    goBack(){
        window.history.back()
    }

    render(){
        const {Regresion,AutoRegresion} = this.state;
        return (
            <div>
                <Container>
                    <Button onClick={() => this.goBack()}>Regresar</Button>
                </Container>
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>Grafica</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th>Regresion Lineal:</th>
                                <th><img src={Regresion} alt ="Y mi grafica?"/></th>
                            </tr>
                            <tr>
                                <th>Auto Regresion:</th>
                                <th><img src={AutoRegresion} alt ="Y mi grafica?"/></th>
                            </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Grafica