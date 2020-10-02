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

function TravelMode({ setRadius }) {
  const [value, setValue] = useState("Search Radius");

  // let labelId = `taco-label--${useId()}`;
  const handleChange = (value) => {
    setValue(value);
    console.log(value);
    switch (value) {
      case "small":
        setRadius(500);
        break;
      case "medium":
        setRadius(850);
        break;
      case "large":
        setRadius(1000);
        break;
      case "huge":
        setRadius(1500);
        break;
      default:
        break;
    }
  };
  return (
    <div className="radius">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton>
          <span id="my-label">{value.toUpperCase()}</span>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="small">Small</ListboxOption>
            <ListboxOption value="medium">Medium</ListboxOption>
            <ListboxOption value="large">Large</ListboxOption>
            <ListboxOption value="huge">Huge</ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default TravelMode;
