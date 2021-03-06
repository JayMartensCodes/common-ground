import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
} from "@react-google-maps/api";
import person from "../images/rat.png";
import searchIcon from "../images/magnifying-glass.png";
import NavBar from "../components/Navbar";
import SelectedPlace from "./SelectedPlace";
import Directions from "./Directions";
import axios from "axios";
import mapStyles from "../mapStyles";
import FriendInfoWindow from "./FriendInfoWindow";
import FriendDirections from "./FriendDirections";
import { getFilterOptions } from "../helper/mapHelpers";

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

function Map({
  currentLocation,
  setUser,
  user,
  friendRequests,
  setFriendRequests,
  friendList,
  commonGrounds,
  setCommonGrounds,
  selected,
  setSelected,
  setFriendList,
  setCurrentLocation,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [destination, setDestination] = useState();
  const [filterOption, setFilterOption] = useState("bar");
  const [radius, setRadius] = useState(500);
  const [travelMode, setTravelMode] = useState("WALKING");
  const [midPoint, setMidpoint] = useState();
  const [friendSelected, setFriendSelected] = useState();

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
    const source = axios.CancelToken.source();

    const nearbySearch = async (geoLocation, radius, type) => {
      const lat = geoLocation.lat;
      const lng = geoLocation.lng;
      const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        const results = response.data.results;
        setSearchResults(results);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    if (midPoint && filterOption) {
      nearbySearch(midPoint, radius, filterOption);
      panTo(midPoint);
    }
    return () => {
      source.cancel();
    };
  }, [midPoint, filterOption, radius, panTo]);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <NavBar
        currentLocation={currentLocation}
        setDestination={setDestination}
        setFilterOption={setFilterOption}
        setMidpoint={setMidpoint}
        panTo={panTo}
        user={user}
        setUser={setUser}
        setRadius={setRadius}
        setTravelMode={setTravelMode}
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
        commonGrounds={commonGrounds}
        setCommonGrounds={setCommonGrounds}
        setSelected={setSelected}
        setFriendList={setFriendList}
        setSearchResults={setSearchResults}
        setCurrentLocation={setCurrentLocation}
      />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={currentLocation}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker
          key="home"
          position={currentLocation}
          animation={window.google.maps.Animation.BOUNCE}
          icon={{
            url: person,
            scaledSize: new window.google.maps.Size(70, 70),
          }}
        />
        {destination && midPoint && (
          <>
            <Marker
              key="destination"
              position={destination}
              animation={window.google.maps.Animation.BOUNCE}
              icon={{
                url:
                  "https://www.flaticon.com/svg/static/icons/svg/1180/1180062.svg",
                scaledSize: new window.google.maps.Size(70, 70),
              }}
            />
            <Circle
              options={{
                strokeColor: "#DD636E",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#DD636E",
                fillOpacity: 0.25,
              }}
              center={midPoint}
              radius={radius}
            />
            <Marker
              key="midpoint"
              position={midPoint}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: searchIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          </>
        )}
        {searchResults.map((marker, index) =>
          marker.business_status === "OPERATIONAL" ? (
            <Marker
              key={index}
              position={marker.geometry.location}
              animation={window.google.maps.Animation.DROP}
              icon={{
                url: getFilterOptions(marker.types[0]),
                scaledSize: new window.google.maps.Size(45, 45),
              }}
              onClick={() => {
                setSelected(marker);
                setFriendSelected(null);
              }}
            />
          ) : null
        )}
        {friendList &&
          friendList.map((friend) => (
            <Marker
              key={friend.friend_id}
              position={friend.geolocation}
              animation={window.google.maps.Animation.BOUNCE}
              icon={{
                url: friend.avatar,
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              onClick={() => {
                setFriendSelected(friend);
                setSelected(null);
              }}
            />
          ))}
        {selected && (
          <>
            <SelectedPlace
              setSelected={setSelected}
              selected={selected}
              currentLocation={currentLocation}
              travelMode={travelMode}
              user={user}
            />
            <Directions
              currentLocation={currentLocation}
              selected={selected}
              travelMode={travelMode}
            />
            <Circle
              options={{
                strokeColor: "#DD636E",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#DD636E",
                fillOpacity: 0.25,
              }}
              center={midPoint}
              radius={radius}
            />
          </>
        )}
        {friendSelected && (
          <>
            <FriendInfoWindow
              setFriendSelected={setFriendSelected}
              friendSelected={friendSelected}
              setSelected={setSelected}
              currentLocation={currentLocation}
              travelMode={travelMode}
              setMidpoint={setMidpoint}
            />
            <FriendDirections
              currentLocation={currentLocation}
              friendSelected={friendSelected}
              travelMode={travelMode}
            />
            <Circle
              options={{
                strokeColor: "#DD636E",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#DD636E",
                fillOpacity: 0.25,
              }}
              center={midPoint}
              radius={radius}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
