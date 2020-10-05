import React from "react";
import Search from "./Search";
import RadiusSelector from "./RadiusSelector";
import LocateHome from "./LocateHome";
import Filter from "./Filter";
import TravelMode from "./TravelMode";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./Wannabedropdown";
import Alert from "react-bootstrap/Modal";
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
  setTravelMode,
  friendRequests,
  setFriendRequests,
  error,
  setError
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
          <TravelMode setTravelMode={setTravelMode} />
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
        <Nav>
          {
            setError && (
              <>
                <Alert variant="success"> {this.state.errorMessage}</Alert >
              </>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
