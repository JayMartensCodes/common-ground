import React from "react";
import "./Nav.css";
import { lightBlue } from "@material-ui/core/colors";
import HomeIcon from "./HomeIcon";

function LocateHome({
  panTo,
  setSearchResults,
  setDestination,
  user,
  currentLocation,
  setSelected,
}) {
  return (
    <button
      className="locate"
      onClick={() => {
        if (!user) {
          panTo(currentLocation);
          setSearchResults([]);
          setDestination();
          setSelected(null);
        } else {
          panTo(user.geolocation);
          setSearchResults([]);
          setDestination();
          setSelected(null);
        }
      }}
    >
      <HomeIcon style={{ color: lightBlue[500] }} />
    </button>
  );
}

export default LocateHome;
