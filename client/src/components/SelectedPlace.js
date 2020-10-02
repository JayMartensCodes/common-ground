import React, { useEffect, useState } from "react";
import { InfoWindow } from "@react-google-maps/api";

function SelectedPlace({ selected, setSelected }) {
  const [photos, setPhotos] = useState("");

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
  console.log(selected);
  return (
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
        <h4>
          Rating {selected.rating} ({selected.user_ratings_total})
        </h4>
      </div>
    </InfoWindow>
  );
}

export default SelectedPlace;
