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
import foodIcon from "../images/tacos.png";
import coffeeIcon from "../images/latte.png";
import barIcon from "../images/cheers.png";
import parkIcon from "../images/park.png";
import hotelIcon from "../images/hotel.png";

function Filter({ setFilterOption }) {
  const [value, setValue] = useState("Choose a filter");

  const handleChange = (value) => {
    console.log(value);
    setFilterOption(value)
    setValue(value);
  };
  return (
    <div className="filter">
      <ListboxInput value={value} onChange={handleChange}>
        <ListboxButton>
          <span id="my-label">{value.toUpperCase()}</span>
        </ListboxButton>
        <ListboxPopover>
          <ListboxList id="dropdownmenu">
            <ListboxOption value="coffee">Coffee</ListboxOption>
            <ListboxOption value="bar">Bar</ListboxOption>
            <ListboxOption value="restaurant">Restaurant</ListboxOption>
            <ListboxOption value="park">Park</ListboxOption>
            <ListboxOption value="hotel">Hotel</ListboxOption>
            <ListboxOption value="darkmode">the dark alley</ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default Filter;
