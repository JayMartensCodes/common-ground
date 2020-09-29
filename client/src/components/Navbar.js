import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Search from "./Search";
import LocateHome from "./LocateHome";

function NavBar({ panTo }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#login">Login</Nav.Link>
        </Nav>
        <Nav>
          <Search panTo={panTo} />
          <LocateHome panTo={panTo} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
