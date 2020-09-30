import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import NavBar from "../components/Navbar";
import nearbySearch from "../helper/nearbySearch";
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

function Map({ currentLocation }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [destination, setDestination] = useState();
  const [filterOption, setFilterOption] = useState("bar");
  const [midPoint, setMidpoint] = useState();
  
  console.log("search results:", searchResults);
  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);
  //Get search results based on midpoint
  useEffect(() => {
    async function getSearchResults() {
      const results = await nearbySearch(midPoint, 500, filterOption);
      setSearchResults(results);
    }
    if (midPoint) {
      getSearchResults();
    }
  }, [midPoint]);


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <NavBar
        currentLocation={currentLocation}
        panTo={panTo}
        setDestination={setDestination}
        setFilterOption={setFilterOption}
        setMidpoint={setMidpoint}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={currentLocation}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={currentLocation} />
        {destination && <Marker position={destination} />}
        {/* map array of businesses */}
        {searchResults.map((marker, index) => (
          <Marker key={index} position={marker.geometry.location} />
        ))}
      </GoogleMap>
      {/* side bar pass markers array */}
    </div>
  );
}

export default Map;
