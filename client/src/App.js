import React, { useState, useEffect } from "react";


import Map from "./components/Map";
// import nearbySearch from "./helper/nearbySearch";

function App() {
  const [currentLocation, setCurrentLocation] = useState({});
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
      <Map currentLocation={currentLocation}/>
      
    </>
  );
}

export default App;
