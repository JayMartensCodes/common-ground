import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';


function SignupModal({ setUser }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reset = () => {
    setName("")
    setEmail("")
    setPassword("")
  }

  const signUp = () => {
    const user = { name, email, password }
    axios.post('/users', user)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        handleClose()
        reset()
        setUser(res.data)
      })
      .catch((error) => console.log(error))
  }


  return (
    <div>
      <Button onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
              <Form.Text className="text-muted">
                Join the underground potato life!
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={signUp}>Sign Up</Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignupModal;