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
    <Navbar collapseOnSelect>
      <Navbar.Brand href="#home">Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <LocateHome panTo={panTo} />
        <Nav>
          <Search
            currentLocation={currentLocation}
            panTo={panTo}
            setDestination={setDestination}
            setFilterOption={setFilterOption}
            setMidpoint={setMidpoint}
          />
        </Nav>
        <Nav className="mr-auto">
          <LoginModal />
          <SignupModal />
          <DropDown />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
