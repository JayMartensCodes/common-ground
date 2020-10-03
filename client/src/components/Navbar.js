import React from "react";

import Search from "./Search";
import RadiusSelector from "./RadiusSelector";
import LocateHome from "./LocateHome";
import Filter from "./Filter";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./Wannabedropdown";
import "./Nav.css";

function NavBar({
  panTo,
  currentLocation,
  setDestination,
  setFilterOption,
  setMidpoint,
  setUser,
  user,
  setRadius,
  friendRequests,
  setFriendRequests,
}) {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Brand>Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <LocateHome panTo={panTo} />
        <Nav>
          <Search
            currentLocation={currentLocation}
            setDestination={setDestination}
            setMidpoint={setMidpoint}
          />
          <Filter setFilterOption={setFilterOption} />
          <RadiusSelector setRadius={setRadius} />
        </Nav>
        <Nav className="mr-auto">
          {!user && (
            <>
              <LoginModal setUser={setUser} />
              <SignupModal setUser={setUser} />
            </>
          )}
          {user && (
            <>
              <Navbar.Brand>Hello {user.name}</Navbar.Brand>
              <DropDown setUser={setUser} user={user} friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
