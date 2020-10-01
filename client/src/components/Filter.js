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
    <div className="dropdown">
      <ListboxInput value={value} onChange={handleChange} class="dropdown-menu">
        <ListboxButton arrow="▼" />
        <ListboxPopover>
          <ListboxList>
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
