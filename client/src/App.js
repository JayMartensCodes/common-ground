import axios from "axios";
import React, { useState, useEffect } from "react";

import Map from "./components/Map";
// import nearbySearch from "./helper/nearbySearch";
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

function App() {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [user, setUser] = useState(null)
  //Check local storage for a user
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  //Get current location and setMarker to Home
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null,
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <>
      <Map currentLocation={currentLocation} setUser={setUser} user={user} />
    </>
  );
}

export default App;
