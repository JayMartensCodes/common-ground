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

function TravelMode({ setTravelMode }) {
  const [value, setValue] = useState("Travel Mode");

  const handleChange = (value) => {
    console.log(value);
    setTravelMode(value);
    setValue(value);
  };
  return (
    <div className="travel-mode">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton>
          <span id="my-label">{value.toUpperCase()}</span>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="WALKING">Walking</ListboxOption>
            <ListboxOption value="BICYCLING">Bicycling</ListboxOption>
            <ListboxOption value="DRIVING">Driving</ListboxOption>
            <ListboxOption value="TRANSIT">Transit</ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default TravelMode;
