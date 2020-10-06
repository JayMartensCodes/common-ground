import React from "react";
import "./Nav.css";
import { lightBlue } from "@material-ui/core/colors";
import HomeIcon from "./HomeIcon";

function LocateHome({ panTo, setSearchResults, setDestination, setCurrentLocation }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
        setSearchResults([]);
        setDestination();
      }}
    >
      <HomeIcon style={{ color: lightBlue[500] }} />
    </button>
  );
}

export default LocateHome;
