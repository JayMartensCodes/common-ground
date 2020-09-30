import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import NavBar from "../components/Navbar";
import nearbySearch from "../helper/nearbySearch";
import { getMidPoint } from "../helper/mapHelpers";
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
  const [searchResults, setSearchResults] = useState([]);
  const [destination, setDestination] = useState({});
  const [filterOption, setFilterOption] = useState("bar");

  //test
  console.log({ currentLocation });
  console.log({ searchResults });
  console.log({ destination });
  console.log({ filterOption });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  useEffect(() => {
    async function getSearchResults() {
      const middle = getMidPoint(currentLocation, destination);
      console.log({ middle });
      const midPointSearch =
        middle === undefined
          ? await nearbySearch(center, 1000, filterOption)
          : await nearbySearch(middle, 1000, filterOption);
      setSearchResults(midPointSearch);
    }

    getSearchResults();
  }, [setDestination]);


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <NavBar
        currentLocation={currentLocation}
        panTo={panTo}
        setSearchResults={setSearchResults}
        setDestination={setDestination}
        setFilterOption={setFilterOption}
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
