import React from "react";
import "./Nav.css";
import logo from "../images/rare-items-rube-potato.png";
import { red } from "@material-ui/core/colors";
import HomeIcon from "./HomeIcon";

function LocateHome({ panTo }) {
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
          },
          () => null
        );
      }}
    >
      <HomeIcon style={{ color: red[500] }} />
    </button>
  );
}

export default LocateHome;
