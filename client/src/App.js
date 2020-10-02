import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import socketIOClient from "socket.io-client";
// import nearbySearch from "./helper/nearbySearch";
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

function App() {
  const [response, setResponse] = useState("");
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

  //establishing socket connection
  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001");
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <Map currentLocation={currentLocation} setUser={setUser} user={user} />
    </>
  );
}

export default App;
