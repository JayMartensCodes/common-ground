import React, { useState } from "react";
import { InfoWindow, DistanceMatrixService } from "@react-google-maps/api";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import TimerIcon from "@material-ui/icons/Timer";
import DirectionsIcon from "@material-ui/icons/Directions";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import DirectionsRailwayIcon from "@material-ui/icons/DirectionsRailway";
import "./SelectedPlace.css";

function SelectedPlace({ selected, setSelected, currentLocation, travelMode }) {
  const [travelTime, setTravelTime] = useState();
  const [distance, setDistance] = useState();

  const openHours = (place) => {
    if (!place.opening_hours) {
      return <h2 style={{ color: "red" }}>No Hours Available</h2>;
    }
    if (place.opening_hours.open_now) {
      return <h2 style={{ color: "#04A4E7" }}>OPEN</h2>;
    } else {
      return <h2 style={{ color: "red" }}>CLOSED</h2>;
    }
  };

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

  return (
    <>
      <InfoWindow
        position={selected.geometry.location}
        onCloseClick={() => setSelected(null)}
        options={{ disableAutoPan: true }}
      >
        <div>
          <Typography component="h1">{selected.name}</Typography>
          {openHours(selected)}
          <div className="types">
            <Typography component="h3">
              {selected.types[0].toUpperCase()}
            </Typography>
            <img src={selected.icon} alt="icon" />
          </div>
          <Typography component="p">{selected.vicinity}</Typography>
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
          {selected.rating ? (
            <div className="stars">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="read-only"
                value={selected.rating}
                precision={0.25}
                size="small"
                readOnly
              />
              <Typography component="span">
                Users ({selected.user_ratings_total})
              </Typography>

              <button className="share-btn">
                <ShareRoundedIcon />
              </button>
            </div>
          ) : (
            <button className="share-btn">
              <ShareRoundedIcon />
            </button>
          )}
        </div>
      </InfoWindow>
      <DistanceMatrixService
        options={{
          destinations: [selected.geometry.location],
          origins: [currentLocation],
          travelMode: travelMode,
        }}
        callback={(res) => {
          console.log(res);
          setTravelTime(res.rows[0].elements[0].duration.text);
          setDistance(res.rows[0].elements[0].distance.text);
        }}
      />
    </>
  );
}

export default SelectedPlace;
