import React, { useEffect, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

function Directions({ currentLocation, selected }) {
  const [directions, setDirections] = useState();

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    if (selected) {
      directionsService.route(
        {
          origin: currentLocation,
          destination: selected.geometry.location,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } else {
      return;
    }
  }, [selected, currentLocation]);
  return <DirectionsRenderer directions={directions} />;
}

export default Directions;
