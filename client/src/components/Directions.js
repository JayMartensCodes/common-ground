import React, { useEffect, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import carMapIcon from "../images/carMap.png";
import bikeMapIcon from "../images/bicycle.png";
import trainMapIcon from "../images/trainMap.png";
import walkMapIcon from "../images/man-walking.png";

function Directions({ currentLocation, selected, travelMode }) {
  const [directions, setDirections] = useState();

  const getMode = (mode) => {
    switch (mode) {
      case "WALKING":
        return walkMapIcon;
      case "DRIVING":
        return carMapIcon;
      case "BICYCLING":
        return bikeMapIcon;
      case "TRANSIT":
        return trainMapIcon;
      default:
        break;
    }
  };

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
          options={{
            polylineOptions: {
              strokeOpacity: 0.8,
              strokeColor: "#04A4E7",
              strokeWeight: 10,
            },
            suppressInfoWindows: true,
            preserveViewport: true,
            markerOptions: {
              icon: {
                url: getMode(travelMode),
                scaledSize: new window.google.maps.Size(50, 50),
                anchor: new window.google.maps.Point(0, 0),
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Directions;
