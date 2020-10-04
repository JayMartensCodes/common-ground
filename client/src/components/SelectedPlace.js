import React, { useEffect, useState } from "react";
import { InfoWindow, DistanceMatrixService } from "@react-google-maps/api";
import "./SelectedPlace.css";

function SelectedPlace({ selected, setSelected, currentLocation, travelMode }) {
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
      return <h5>No Hours Available</h5>;
    }
    if (place.opening_hours.open_now) {
      return <h5>OPEN</h5>;
    } else {
      return <h5>CLOSED</h5>;
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
          <h5>
            <a href={`${photos}`} target="_blank" rel="noopener noreferrer">
              {selected.name}
            </a>
          </h5>

          {/* <img src={selected.icon} alt="icon" /> */}
          {openHours(selected)}
          <p>Type: {(selected.types[0], selected.types[1])}</p>
          <p>{selected.vicinity}</p>
          <p class="rating">
            Rating {selected.rating} ({selected.user_ratings_total})
          </p>
          <p>
            Travel Time: {travelTime}
          </p>
          <p> Distance: {distance}</p>
          {/* put a button potentially to */}
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
