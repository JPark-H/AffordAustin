import './MainNavBar.css';
import { Nav, Navbar, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import * as Icon from 'react-bootstrap-icons';



function MainNavBar() {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
        <Navbar.Brand href="#home" className="nav_bar_brand">
          <p className="m-0"><Icon.House style={{marginTop: "-.2em", fontSize:"30px"}}></Icon.House> AffordAustin</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight:10, fontSize:"60%"}}></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" style={{color:"white"}}>
          <Nav className="me-auto nav_bar_options">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#Housing">Housing</Nav.Link>
            <Nav.Link href="#ChildCare">Child Care</Nav.Link>
            <Nav.Link href="#Jobs">Jobs</Nav.Link>
            <Nav.Link href="#About">About</Nav.Link>
            <Nav.Link href="#Search">Search?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default MainNavBar;
