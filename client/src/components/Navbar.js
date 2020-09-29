import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Search from './Search';
import LocateHome from './LocateHome';
import LoginModal from './Modal';

function NavBar({ panTo }) {
  function login() {
    console.log('hello');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Common-Ground</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LoginModal />
          </Nav>
          <Nav>
            <Search className="mr-sm-2" panTo={panTo} />
            <LocateHome panTo={panTo} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
