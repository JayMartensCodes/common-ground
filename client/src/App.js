import React, { useState, useEffect } from "react";
import Map from "./components/Map";
// import nearbySearch from "./helper/nearbySearch";
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

function App() {
  const [currentLocation, setCurrentLocation] = useState(center);
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
      <Map currentLocation={currentLocation} />
    </>
  );
}

export default App;
