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

const mode = { walkIcon, bikeIcon, carIcon, trainIcon }

console.log(bikeIcon);

function TravelMode({ setTravelMode }) {
  const [value, setValue] = useState(mode.walkIcon);

  const handleChange = (value) => {
    console.log(value);
    setTravelMode(value);
    setValue(value);
  };
  return (
    <div className="travel-mode">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton>
          <span id="my-label"> <img src={value} /> </span>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="WALKING">
              <img src={walkIcon} />
            </ListboxOption>
            <ListboxOption value="BICYCLING">
              <img src={bikeIcon} />
            </ListboxOption>
            <ListboxOption value="DRIVING">
              <img src={carIcon} />
            </ListboxOption>
            <ListboxOption value="TRANSIT">
              <img src={trainIcon} />
            </ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default TravelMode;
