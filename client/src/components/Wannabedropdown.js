import React from 'react';
import './LocateHome.css';
// import logo from '../images/rare-items-rube-potato.png';


function DropDown({ panTo }) {
  return (
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button"
        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown button
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Messages</a>
        <a class="dropdown-item" href="#">Friends</a>
        <a class="dropdown-item" href="#">Share Map</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
  );
}

export default DropDown;