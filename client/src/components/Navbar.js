import React from "react";

import Search from "./Search";

import LocateHome from "./LocateHome";
import Filter from "./Filter";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./Wannabedropdown";
<<<<<<< HEAD
import './Nav.css';
=======
>>>>>>> 8c15229c439db75fa9e12a07f0421f23d518b71c

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
          <Filter />
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
