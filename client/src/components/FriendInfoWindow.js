import React, { useState } from "react";
import { InfoWindow, DistanceMatrixService } from "@react-google-maps/api";

import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsRailwayIcon from "@material-ui/icons/DirectionsRailway";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { red, green } from "@material-ui/core/colors";

import { getMidPoint } from "../helper/mapHelpers";

function FriendInfoWindow({
  setFriendSelected,
  friendSelected,
  currentLocation,
  travelMode,
  setMidpoint,
}) {
  const [travelTime, setTravelTime] = useState();
  const [distance, setDistance] = useState();

  const getTravelMode = (mode) => {
    switch (mode) {
      case "WALKING":
        return <DirectionsWalkIcon />;
      case "DRIVING":
        return <DirectionsCarIcon />;
      case "BICYCLING":
        return <DirectionsBikeIcon />;
      case "TRANSIT":
        return <DirectionsRailwayIcon />;
      default:
        break;
    }
  };

  const handleClick = () => {
    try {
      const middle = getMidPoint(currentLocation, friendSelected.geolocation);
      setMidpoint(middle);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div>
      <InfoWindow
        position={friendSelected.geolocation}
        onCloseClick={() => setFriendSelected(null)}
        options={{ disableAutoPan: true }}
      >
        <div>
          <Typography component="h1">{friendSelected.name}</Typography>
          <FiberManualRecordIcon
            style={
              friendSelected.active
                ? { color: green[500] }
                : { color: red[500] }
            }
          />
          <div className="travel-div">
            <p>
              <TimerIcon />
              {travelTime}
            </p>
            <p>
              <DirectionsIcon />
              {distance}
            </p>
            <p>{getTravelMode(travelMode)}Travel-Mode</p>
          </div>
          <button className="share-btn" onClick={handleClick}>
            <SearchIcon />
            Find Common Ground
          </button>
        </div>
      </InfoWindow>
      <DistanceMatrixService
        options={{
          destinations: [friendSelected.geolocation],
          origins: [currentLocation],
          travelMode: travelMode,
        }}
        callback={(res) => {
          try {
            setTravelTime(res.rows[0].elements[0].duration.text);
            setDistance(res.rows[0].elements[0].distance.text);
          } catch (error) {
            console.log({ error: error });
          }
        }}
      />
    </div>
  );
}

export default FriendInfoWindow;
