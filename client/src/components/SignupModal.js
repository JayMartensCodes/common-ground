import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

function SignupModal({ setUser, currentLocation }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const signUp = () => {
    if (!name || !email || !password || !currentLocation) {
      setError("Please fill all fields correctly!");
    } else {
      const user = { name, email, password, currentLocation };
      axios
        .post("/users", user)
        .then((res) => {
          const signedUpUser = {
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
            geolocation: JSON.parse(res.data.geolocation),
          };  
          localStorage.setItem("user", JSON.stringify(signedUpUser));
          handleClose();
          reset();
          setUser(signedUpUser);
        })
        .catch((error) => {
          setError("Email already in use!");
        });
    }
  };

  return (
    <div>
      <Button onClick={handleShow}>Sign Up</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={signUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignupModal;
