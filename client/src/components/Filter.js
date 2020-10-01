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

function Filter({ setFilterOption }) {
  const [value, setValue] = useState("Choose a filter");

  // let labelId = `taco-label--${useId()}`;
  const handleChange = (value) => {
    //setFilterOption(value);  //UNCOMMENT THIS 
    setValue(value);
  };
  return (
    <div className="filter">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton arrow="▼" />
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="default">Choose a filter</ListboxOption>
            <ListboxOption value="coffee">Coffee</ListboxOption>
            <ListboxOption value="bar">Bar</ListboxOption>
            <ListboxOption value="restaurant">Restaurant</ListboxOption>
            <ListboxOption value="park">Park</ListboxOption>
            <ListboxOption value="hotel">Hotel</ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default Filter;
