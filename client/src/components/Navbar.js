import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Search from "./Search";
import LocateHome from "./LocateHome";
import Filter from "./Filter";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./Wannabedropdown";

function NavBar({ panTo, currentLocation }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LoginModal />
          <SignupModal />
        </Nav>
        <Nav>
          <Search currentLocation={currentLocation} panTo={panTo} />
          <LocateHome panTo={panTo} />
        </Nav>
        <Nav>
          <DropDown />
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default NavBar;
