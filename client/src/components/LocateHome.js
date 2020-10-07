import React from "react";
import "./Nav.css";
import { lightBlue } from "@material-ui/core/colors";
import HomeIcon from "./HomeIcon";

function LocateHome({ panTo, setSearchResults, setDestination, user }) {
  return (
    <button
      className="locate"
      onClick={() => {
        panTo(user.geolocation);
        setSearchResults([]);
        setDestination();
      }}
    >
      <HomeIcon style={{ color: lightBlue[500] }} />
    </button>
  );
}

export default LocateHome;
