import React from "react";

import Search from "./Search";

import LocateHome from "./LocateHome";
import Filter from "./Filter";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./Wannabedropdown";
import './Navbar.css';

function NavBar({
  panTo,
  currentLocation,
  setDestination,
  setFilterOption,
  setMidpoint,
}) {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <LoginModal />
          <SignupModal />
        </Nav>
        <Nav>
          {/* <Filter setFilterOption={setFilterOption} /> */}
          <Search
            currentLocation={currentLocation}
            panTo={panTo}
            setDestination={setDestination}
            setFilterOption={setFilterOption}
            setMidpoint={setMidpoint}
          />
        </Nav>
        <Nav>
          <DropDown />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
