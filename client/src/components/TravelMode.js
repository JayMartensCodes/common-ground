import React, { useState } from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";
import "./Nav.css";
import "@reach/listbox/styles.css";
import carIcon from "../images/car.png";
import bikeIcon from "../images/bycicle.png";
import trainIcon from "../images/train.png";
import walkIcon from "../images/walk.png";

console.log(bikeIcon);

function TravelMode({ setTravelMode }) {
  const [value, setValue] = useState(walkIcon);

  const handleChange = (value) => {
    setTravelMode(value);
    switch (value) {
      case "WALKING":
        setValue(walkIcon);
        break;
      case "DRIVING":
        setValue(carIcon);
        break;
      case "BICYCLING":
        setValue(bikeIcon);
        break;
      case "TRANSIT":
        setValue(trainIcon);
        break;
      default:
        break;
    }
  };
  return (
    <div className="travel-mode">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton>
          <span id="my-label">
            <img src={value} alt="nav-value" />
          </span>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="WALKING">
              <img src={walkIcon} alt="walking" />
            </ListboxOption>
            <ListboxOption value="BICYCLING">
              <img src={bikeIcon} alt="bicycling" />
            </ListboxOption>
            <ListboxOption value="DRIVING">
              <img src={carIcon} alt="driving" />
            </ListboxOption>
            <ListboxOption value="TRANSIT">
              <img src={trainIcon} alt="transit" />
            </ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default TravelMode;
