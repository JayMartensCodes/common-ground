import React from 'react';
import './Wannabedropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../images/user.png';


function DropDown({ setUser }) {

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        <img src={logo} alt="potato" />
      </Dropdown.Toggle>

      <Dropdown.Menu id="dropdownmenu">
        <Dropdown.Item href="#/action-2">Find Friend</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown >
  );
}

export default DropDown;