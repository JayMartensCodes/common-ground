import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
  InfoWindow,
  DirectionsService,
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
  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
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
  }, [midPoint, filterOption]);

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
        <Marker
          key="home"
          position={currentLocation}
          animation={window.google.maps.Animation.DROP}
          icon={{
            url:
              "https://www.flaticon.com/svg/static/icons/svg/3448/3448561.svg",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        {destination && (
          <>
            <Marker
              key="destination"
              position={destination}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url:
                  "https://www.flaticon.com/svg/static/icons/svg/3410/3410277.svg",
                scaledSize: new window.google.maps.Size(35, 35),
              }}
            />
            <Circle
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
              }}
              center={midPoint}
              radius={500}
            />
            <Marker
              key="midpoint"
              position={midPoint}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url:
                  "https://www.flaticon.com/svg/static/icons/svg/179/179715.svg",
                scaledSize: new window.google.maps.Size(35, 35),
              }}
            />
          </>
        )}
        {searchResults.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geometry.location}
            animation={window.google.maps.Animation.DROP}
            icon={{
              url: marker.icon,
              scaledSize: new window.google.maps.Size(35, 35),
            }}
            onClick={() => setSelected(marker)}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={selected.geometry.location}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.name}</h2>
              <img src={selected.icon} alt="icon" />
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      {/* side bar pass markers array */}
    </div>
  );
}

export default Map;
