import React, { useEffect, useState } from "react";
import { InfoWindow, DistanceMatrixService } from "@react-google-maps/api";

function SelectedPlace({ selected, setSelected, currentLocation, travelMode }) {
  const [url, setUrl] = useState("");
  const [travelTime, setTravelTime] = useState();
  const [distance, setDistance] = useState();

  useEffect(() => {
    if (selected.url) {
      const url = selected.url[0].html_attributions[0];
      const urlParsed = url.split("=");
      const secondSplit = urlParsed[1].split(">");
      const result = secondSplit[0].replace(/['"]+/g, "");

      setUrl(result);
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
      <InfoWindow
        position={selected.geometry.location}
        onCloseClick={() => setSelected(null)}
      >
        <div>
          <h2>
            <a href={`${url}`} target="_blank" rel="noopener noreferrer">
              {selected.name}
            </a>
          </h2>

          <img src={selected.icon} alt="icon" />
          {openHours(selected)}
          <h3>Type: {(selected.types[0], selected.types[1])}</h3>
          <h3>{selected.vicinity}</h3>
          <h4>
            Rating {selected.rating} ({selected.user_ratings_total})
          </h4>
          <p>{travelMode} Time: {travelTime}</p>
          <p>Distance: {distance}</p>
        </div>
      </InfoWindow>
      <DistanceMatrixService
        options={{
          destinations: [selected.geometry.location],
          origins: [currentLocation],
          travelMode: travelMode,
        }}
        callback={(res) => {
          setTravelTime(res.rows[0].elements[0].duration.text);
          setDistance(res.rows[0].elements[0].distance.text);
        }}
      />
    </>
  );
}

export default SelectedPlace;
