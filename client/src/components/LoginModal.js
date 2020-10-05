import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';

function LoginModal({ setUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const reset = () => {
    setEmail("")
    setPassword("")
  }

  const login = () => {
    const user = { email, password }
    axios.post('/users/signIn', user)
      .then((res) => {
        if (!res.data.error) {
          const loggedInUser = {
            email: res.data.email,
            name: res.data.name,
            id: res.data.id
          }
          localStorage.setItem('user', JSON.stringify(loggedInUser))
          handleClose()
          reset()
          setUser(loggedInUser)
        }
      })
      .catch((error) => {
        setError("Username or Password incorrect!");
        console.log(error);
      });
  }

  return (
    <div>
      <Button onClick={handleShow} >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={login}>
            Login
          </Button>

        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default LoginModal;
