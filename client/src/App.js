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
  const [currentLocation, setCurrentLocation] = useState(center);
  const [user, setUser] = useState(null);
  const [friendRequests, setFriendRequests] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [commonGrounds, setCommonGrounds] = useState(null);
  const [selected, setSelected] = useState(null);
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
          if (currentLocation === center) {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        },
        () => null,
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  }, [currentLocation]);

  //establishing socket connection and fetch friend requests
  useEffect(() => {
    if (user) {
      setCurrentLocation(user.geolocation);
      socket.emit("setSocketId", user.id);
      Promise.all([
        axios.get(`users/friend-requests/${user.id}`),
        axios.get(`users/friend-list/${user.id}`),
        axios.get(`users/common-grounds/${user.id}`),
      ])
        .then((all) => {
          setFriendRequests(all[0].data);
          all[1].data.forEach((friend) => {
            friend.geolocation = JSON.parse(friend.geolocation);
          });
          setFriendList(all[1].data);
          setCommonGrounds(all[2].data);
        })
        .catch((error) => console.log(error));
    }
    socket.on("friend-request", (data) => {
      setFriendRequests(data);
    });
    socket.on("common-ground-request", (data) => {
      setCommonGrounds(data);
    });
    socket.on("accepted-common-ground", (data) => {
      setSelected(JSON.parse(data.geolocation));
    });
    socket.on("accepted-friend-request", (data) => {  
      data.forEach((friend) => {
        if (typeof friend.geolocation !== 'object') {
          friend.geolocation = JSON.parse(friend.geolocation);
        }
      });
      setFriendList(data)
    })
  }, [user]);

  useEffect(() => {
    if (user) {
      axios.get(`users/friend-list/${user.id}`).then((res) => {
        res.data &&
          res.data.forEach((friend) => {
            friend.geolocation = JSON.parse(friend.geolocation);
          });
        setFriendList(res.data);
      });
    }
  }, [user, friendRequests]);

  return (
    <>
      <Map
        currentLocation={currentLocation}
        setUser={setUser}
        user={user}
        friendRequests={friendRequests}
        setFriendRequests={setFriendRequests}
        friendList={friendList}
        setFriendList={setFriendList}
        commonGrounds={commonGrounds}
        setCommonGrounds={setCommonGrounds}
        selected={selected}
        setSelected={setSelected}
        setCurrentLocation={setCurrentLocation}
      />
    </>
  );
}

export default App;
