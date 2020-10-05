import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import socketIOClient from "socket.io-client";
import axios from "axios";
const socket = socketIOClient("http://localhost:3001");
// import nearbySearch from "./helper/nearbySearch";
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

function App() {
  const [response, setResponse] = useState("");
  const [currentLocation, setCurrentLocation] = useState(center);
  const [user, setUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState(null)
  const [friendList, setFriendList] = useState(null)
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

  //establishing socket connection and fetch friend requests
  useEffect(() => {    
    if (user) {
      socket.emit("setSocketId", user.id);
      Promise.all([
        axios.get(`users/friend-requests/${user.id}`),
        axios.get(`users/friend-list/${user.id}`),
      ])
        .then((all) => {
          setFriendRequests(all[0].data)
          setFriendList(all[1].data)
        })
        .catch((error) => console.log(error))
    }
    socket.on("FromAPI", (data) => {
      console.log(data);
      setResponse(data);
    });
  }, [user]);

  return (
    <>
      <Map currentLocation={currentLocation} setUser={setUser} user={user} friendRequests={friendRequests} setFriendRequests={setFriendRequests} friendList={friendList}/>{" "}
    </>
  );
}

export default App;
