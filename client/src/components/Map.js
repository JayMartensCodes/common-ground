import React, { useRef, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import NavBar from "../components/Navbar";
import mapStyles from "../mapStyles";

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

function Map({ currentLocation }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <div>
      <NavBar currentLocation={currentLocation} panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </div>
  );
}

export default Map;
