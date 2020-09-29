import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "./Filter.css";
import "@reach/combobox/styles.css";

function Filter() {
  const [filter, setFilter] = useState("");

  const handleInput = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="filter">
      <Combobox aria-labelledby="filter">
        <ComboboxInput
          value={filter}
          onChange={handleInput}
          placeholder="Filter results"
        />
        <ComboboxPopover>
          <ComboboxList>
            <ComboboxOption value="Bar" />
            <ComboboxOption value="Restaurant" />
            <ComboboxOption value="Coffee" />
            <ComboboxOption value="Park" />
            <ComboboxOption value="Hotel" />
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Filter;
