import React, { useEffect, useState } from "react";
import { InfoWindow, DistanceMatrixService } from "@react-google-maps/api";
import "./SelectedPlace.css";

function SelectedPlace({ selected, setSelected, currentLocation }) {
  const [photos, setPhotos] = useState("");
  const [travelTime, setTravelTime] = useState();
  const [distance, setDistance] = useState();

  useEffect(() => {
    if (selected.photos) {
      const url = selected.photos[0].html_attributions[0];
      const urlParsed = url.split("=");
      const secondSplit = urlParsed[1].split(">");
      const result = secondSplit[0].replace(/['"]+/g, "");

      setPhotos(result);
    } else {
      return;
    }
  }, [selected]);

  const openHours = (place) => {
    if (!place.opening_hours) {
      return <h2>No Hours Available</h2>;
    }
    if (place.opening_hours.open_now) {
      return <h2>OPEN</h2>;
    } else {
      return <h2>CLOSED</h2>;
    }
  };
  return (
    <>
        // put this into another component
      <InfoWindow
        position={selected.geometry.location}
        onCloseClick={() => setSelected(null)}
      >
        <div>
          <h2>
            <a href={`${photos}`} target="_blank" rel="noopener noreferrer">
              {selected.name}
            </a>
          </h2>

          <img src={selected.icon} alt="icon" />
          {openHours(selected)}
          <h3>Type: {(selected.types[0], selected.types[1])}</h3>
          <h3>{selected.vicinity}</h3>
          <h4 class='rating'>
            Rating {selected.rating} ({selected.user_ratings_total})
          </h4>
          <p>Travel Time: {travelTime}</p>
          <p>Distance: {distance}</p>
          put a button potentially to
        </div>
      </InfoWindow>
      <DistanceMatrixService
        options={{
          destinations: [selected.geometry.location],
          origins: [currentLocation],
          travelMode: "WALKING",
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
