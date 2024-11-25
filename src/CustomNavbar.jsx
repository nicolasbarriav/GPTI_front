import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from 'react-router-dom';  // Importamos Link de react-router-dom

function CustomNavbar() {
  return (
    <Navbar expand="lg" fixed className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt9a6cb2faab703fa5/65a68ebb130790558acbf0cb/falabella.com_green_icon.svg"
            className="navbar-logo"
            alt="Falabella logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/historial">Historial</Nav.Link>
          <Nav.Link as={Link} to="/generar-oferta">Generar oferta</Nav.Link>
          <Nav.Link as={Link} to="/informacion-adicional">Agregar Información adicional</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
