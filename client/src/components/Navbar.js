import React from "react";
import Search from "./Search";
import RadiusSelector from "./RadiusSelector";
import LocateHome from "./LocateHome";
import Filter from "./Filter";
import TravelMode from "./TravelMode";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import DropDown from "./DropDown";
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
  commonGrounds,
  setCommonGrounds,
  setSelected,
  setFriendList,
  setSearchResults,
  setCurrentLocation,
}) {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Brand>Common-Ground</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <LocateHome
          panTo={panTo}
          setSearchResults={setSearchResults}
          setDestination={setDestination}
          setCurrentLocation={setCurrentLocation}
        />
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
              <SignupModal
                setUser={setUser}
                currentLocation={currentLocation}
              />
            </>
          )}
          {user && (
            <>
              <Navbar.Brand>
                Hello {user.name}
                <span
                  className="badge badge-pill badge-danger friend-number"
                  style={{ marginLeft: 10 }}
                >
                  {friendRequests &&
                    commonGrounds &&
                    friendRequests.length + commonGrounds.length !== 0 &&
                    friendRequests.length + commonGrounds.length}
                  {friendRequests &&
                    !commonGrounds &&
                    friendRequests.length !== 0 &&
                    friendRequests.length}
                  {!friendRequests &&
                    commonGrounds &&
                    commonGrounds.length !== 0 &&
                    commonGrounds.length}
                </span>
              </Navbar.Brand>
              <DropDown
                setUser={setUser}
                user={user}
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
                commonGrounds={commonGrounds}
                setCommonGrounds={setCommonGrounds}
                setSelected={setSelected}
                setFriendList={setFriendList}
                setSearchResults={setSearchResults}
              />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
