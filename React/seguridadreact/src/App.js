// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import "../node_modules/jquery/dist/jquery.min.js";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import RomperCandado from './Components/RomperCandado';
import ActaAdministrativa from './Components/ActaAdministrativa';
import PaseSalida from './Components/PaseSalida';
import ReporteIncidentes from './Components/ReporteIncidentes';
import Bicicleta from './Components/Bicicleta';
import EventoSocial from './Components/EventoSocial';
import ReporteIncidentesView from './Components/ReporteIncidentesView'
import HojaUrgencias from './Components/HojaUrgencias';
import CredencialPerdida from './Components/CredencialPerdida';
import IncidentesMatPel from './Components/IncidentesMatPel';
import ActaAdministrativaView from './Components/ActaAdministrativaView';
import PaseSalidaView from './Components/PaseSalidaView';
import RomperCandadoView from './Components/RomperCandadoView';
import CredencialPerdidaView from './Components/CredencialPerdidaView';
import IncidentesMatPelView from './Components/IncidentesMatPelView';
import HojaUrgenciasView from './Components/HojaUrgenciasView';
import BicicletaView from './Components/BicicletaView';
import EventoSocialView from './Components/EventoSocialView';
import FalloCamara from './Components/FalloCamara';
import FalloCamaraViews from './Components/FalloCamaraViews';
import SolicitudVideoCamarasView from './Components/SolicitudVideoCamarasView';
import SolicitudVideoCamara from './Components/SolicitudVideoCamaras';
import { Container, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import LoginButton from './Components/Login';
import LogoutButton from './Components/Logout';
import Profile from './Components/Profile';
import logo from "./logo.svg";

//import Button from 'react-bootstrap';
//import cucei from './images/cucei.png';

function App(){
  // document.getElementById("myDiv").style.marginRight = "50px";
  const { isAuthenticated } = useAuth0();

  return(
    //<AuthExample></AuthExample>
    // <h2>The Components way</h2><Login/><br /><Logout />
    
    <Router>
        <Navbar bg="dark" variant="dark" expand={false} collapseOnSelect>
        <Container fluid>
          <Navbar.Brand>
            <a href = "https://seguridadqci.netlify.app/" >
              <img alt="" src="/353px-Escudo_UdeG.svg.png" width="30" height="30" className="d-inline-block align-top" />{' '}
            </a>
            Seguridad CUCEI
          </Navbar.Brand>
          {/* Login */}
          {/* <div id="myDiv" >
          <Login></Login>
          </div> */}
          {isAuthenticated ? (
            <>
              <Navbar.Toggle aria-controls="offcanvasNavbar responsive-navbar-nav" />
              <Navbar.Offcanvas id="offcanvasNavbar" arial-labelledby="offcanvasNavbarLabel" placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3" id="collasible-nav-dropdown">
                  {/* <Login></Login> */}
                    <NavDropdown title="Seguridad" id="offcanvasNavbarDropdown collasible-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to='/actaadmin' className="btn btn-outline-dark">Acta Administrativa</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/bicicleta' className="btn btn-outline-dark">Bicicleta Sin Asegurar</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/crendencialperdida' className="btn btn-outline-dark">Credencial Perdida</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/social' className="btn btn-outline-dark">Evento Social-Organizativo</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/hojaurgencias' className="btn btn-outline-dark">Hoja de Urgencias</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/incidentesmatpet' className="btn btn-outline-dark">Incidentes Material Peligroso</Link>{' '}
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/pasesalida' className="btn btn-outline-dark">Pase de Salida</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/reporteincidentes' className="btn btn-outline-dark">Reporte de Incidencias</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/rompercandado' className="btn btn-outline-dark">Apertura de Candado</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link to='/solicitudcam' className="btn btn-outline-dark">Solicitud de VideoCamaras</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Mantenimiento" id="collasible-nav-dropdown">
                      <NavDropdown.Item>
                        <Link to='/fallocamara' className="btn btn-outline-dark">Fallo de Camara/Switch</Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <LogoutButton />
                </Offcanvas.Body>
              </Navbar.Offcanvas></>
            ) : (
                <LoginButton />
                )
            }
        </Container>
      </Navbar>
      
      <Switch>
        <Route path= '/' exact>
        
        <div className="App">
            <img src="CUCEILogo.png" className="App-logo" alt="logo" />
            {isAuthenticated ? (
            <>
                <Profile />
                <LogoutButton />
            </>
            ) : (
              <div>Bienvenido invitado! Por favor ingresa</div>
            //<LoginButton />
            )}
            </div>
        </Route>
        <Route path='/actaadmin' exact>
          <ActaAdministrativa></ActaAdministrativa>
        </Route>
        <Route path='/actaadmin/view' exact>
          <ActaAdministrativaView></ActaAdministrativaView>
        </Route>
        <Route path='/bicicleta' exact>
          <Bicicleta></Bicicleta>
        </Route>
        <Route path='/bicicleta/view'>
          <BicicletaView></BicicletaView>
        </Route>
        <Route path='/crendencialperdida' exact>
          <CredencialPerdida></CredencialPerdida>
        </Route>
        <Route path='/crendencialperdida/view' exact>
          <CredencialPerdidaView></CredencialPerdidaView>
        </Route>
        <Route path='/social' exact>
          <EventoSocial></EventoSocial>
        </Route>
        <Route path='/social/view' exact>
          <EventoSocialView></EventoSocialView>
        </Route>
        <Route path='/fallocamara' exact>
          <FalloCamara></FalloCamara>
        </Route>
        <Route path='/fallocamara/view' exact>
          <FalloCamaraViews></FalloCamaraViews>
        </Route>
        <Route path='/hojaurgencias' exact>
          <HojaUrgencias></HojaUrgencias>
        </Route>
        <Route path='/hojaurgencias/view' exact>
          <HojaUrgenciasView></HojaUrgenciasView>
        </Route>
        <Route path='/incidentesmatpet' exact>
          <IncidentesMatPel></IncidentesMatPel>
        </Route>
        <Route path='/incidentesmatpet/view' exact>
          <IncidentesMatPelView></IncidentesMatPelView>
        </Route>
        <Route path='/pasesalida' exact>
          <PaseSalida></PaseSalida>
        </Route>
        <Route path='/pasesalida/view' exact>
          <PaseSalidaView></PaseSalidaView>
        </Route>
        <Route path='/reporteincidentes' exact>
          <ReporteIncidentes></ReporteIncidentes>
        </Route>
        <Route path='/reporteincidentes/view' exact>
          <ReporteIncidentesView></ReporteIncidentesView>
        </Route>
        <Route path='/rompercandado' exact>
          <RomperCandado></RomperCandado>
        </Route>
        <Route path='/rompercandado/view' exact>
          <RomperCandadoView></RomperCandadoView>
        </Route>
        <Route path='/solicitudcam' exact>
          <SolicitudVideoCamara></SolicitudVideoCamara>
        </Route>
        <Route path='/solicitudcam/view' exact>
          <SolicitudVideoCamarasView></SolicitudVideoCamarasView>
        </Route>
        <Route path='/logout' exact>
        {/* <LogoutButton></Logout> */}
        </Route>
      </Switch>
      

    </Router>

  );


}

export default App;
