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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getFilterOptions } from "../helper/mapHelpers";

function SelectedPlace({
  selected,
  setSelected,
  currentLocation,
  travelMode,
  user,
}) {
  const [travelTime, setTravelTime] = useState();
  const [distance, setDistance] = useState();
  const [commonGroundShow, setCommonGroundShow] = useState(false);
  const [email, setEmail] = useState("");
  const addCommonGroundHide = () => setCommonGroundShow(false);
  const addCommonGroundShow = () => setCommonGroundShow(true);

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

  const reset = () => {
    setEmail("");
  };

  const sendCommonGroundRequest = () => {
    const commonGround = {
      geolocation: selected,
      user: user.id,
      friend: email,
    };

    axios
      .post("/users/common-ground/", commonGround)
      .then((res) => {
        console.log(res);
        addCommonGroundHide();
        reset();
      })
      .catch((error) => console.log(error));
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
            <img src={getFilterOptions(selected.types[0])} alt="icon" />
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
          {selected.rating && (
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

              {/* <button className="share-btn" onClick={addCommonGroundShow}>
                <ShareRoundedIcon />
              </button> */}
            </div>
          )}
          <div className="share-div">
            <button className="share-btn" onClick={addCommonGroundShow}>
              <ShareRoundedIcon className="share-icon" />
              Share Common Ground
            </button>
          </div>
        </div>
      </InfoWindow>
      <DistanceMatrixService
        options={{
          destinations: [selected.geometry.location],
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

      <Modal show={commonGroundShow} onHide={addCommonGroundHide}>
        <Modal.Header closeButton>
          <Modal.Title>Share Common Ground</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Friend's Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={addCommonGroundHide}>
            Close
          </Button>
          <Button variant="dark" onClick={sendCommonGroundRequest}>
            Send Common Ground Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectedPlace;
