import React, { useState } from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";
import "./Filter.css";
import "@reach/listbox/styles.css";

function Filter() {
  const [value, setValue] = useState("Choose a filter");

  // let labelId = `taco-label--${useId()}`;

  return (
    <div className="filter">
      <ListboxInput value={value} onChange={(value) => setValue(value)}>
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
