import React from 'react';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
// import logo from '../images/rare-items-rube-potato.png';


function DropDown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" size="lg" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Message</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Find Friends</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Share Location</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;