import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import NavBar from "./components/Navbar";
import nearbySearch from "./helper/nearbySearch";

const libraries = ["places", "directions"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

function App() {
  const [marker, setMarker] = useState({});

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //Get current location and setMarker to Home
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setMarker({
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

  useEffect(() => {
    nearbySearch(center, 2000, "restaurant");
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <NavBar panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={marker}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={marker} />
      </GoogleMap>
    </>
  );
}

export default App;
