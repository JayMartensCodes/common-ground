import React, { useEffect, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

function Directions({ currentLocation, selected, travelMode }) {
  const [directions, setDirections] = useState();

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    if (selected) {
      directionsService.route(
        {
          origin: currentLocation,
          destination: selected.geometry.location,
          travelMode: travelMode,
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
  }, [selected, currentLocation, travelMode]);
  return (
    <>
      {selected && (
        <DirectionsRenderer
          directions={directions}
          preserveViewport={true}
          options={{
            polylineOptions: {
              strokeOpacity: 0.80,
              strokeColor: "#04A4E7",
              strokeWeight: 10
            },
          }}
        />
      )}
    </>
  );
}

export default Directions;
