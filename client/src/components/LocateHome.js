import React from 'react';
import './Nav.css';
import logo from '../images/rare-items-rube-potato.png';


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
      <img src={logo} alt="potato" />
    </button>
  );
}

export default LocateHome;