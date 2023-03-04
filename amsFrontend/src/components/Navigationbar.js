import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

const Navigationbar = ()=>{

  const navigate = useNavigate()

  const logoutButtonHandler = ()=>{
      navigate("/")
  }
   return (
    <Navbar key="xl" bg="light" expand="xl" className="mb-3">
    <Container fluid>
      <Navbar.Brand href="#">
         <p className="navbar-logo">AMS</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xl" />
      <Navbar.Offcanvas
        id="offcanvasNavbar-expand-xl"
        aria-labelledby="offcanvasNavbarLabel-expand-xl"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel-expand-xl">
            AMS
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 nav-links-container">
            <Nav.Link href="#action1" >
                 <p className="navbar-link" onClick={logoutButtonHandler}>Logout</p>
            </Nav.Link>          
          </Nav>
          
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
   );
}

export default Navigationbar;