import React, { useState } from "react";
import "./Wannabedropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../images/user.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";

function DropDown({ setUser, user, friendRequests, setFriendRequests }) {
  const [addFriendShow, setAddFriendShow] = useState(false);
  const addFriendHandleClose = () => setAddFriendShow(false);
  const addFriendHandleShow = () => setAddFriendShow(true);
  const [friendRequestShow, setFriendRequestShow] = useState(false);
  const friendRequestHandleClose = () => setFriendRequestShow(false);
  const friendRequestHandleShow = () => setFriendRequestShow(true);
  const [email, setEmail] = useState("");

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const reset = () => {
    setEmail("");
  };

  const sendFriendRequest = () => {
    const friendRequest = {
      user_id: user.id,
      email,
    };
    axios
      .post("/users/friend-request", friendRequest)
      .then((res) => {
        addFriendHandleClose();
        reset();
      })
      .catch((error) => console.log(error));
  };

  const declineFriendRequest = (id) => {
    const request = { id };
    axios
      .post("/users/declineFriendRequest", request)
      .then((res) => {
        const newFriendRequests = friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
        setFriendRequests(newFriendRequests);
      })
      .catch((error) => console.log(error));
  };

  const acceptFriendRequest = (id) => {
    const request = { id };
    axios
      .post("/users/acceptFriendRequest", request)
      .then((res) => {
        const newFriendRequests = friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
        setFriendRequests(newFriendRequests);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
          <img src={logo} alt="potato" />
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdownmenu">
          <Dropdown.Item onClick={addFriendHandleShow}>
            Add Friends
          </Dropdown.Item>
          <Dropdown.Item onClick={friendRequestHandleShow}>
            Friend Requests{" "}
            <span className="badge badge-pill badge-danger friend-number">
              {friendRequests ? friendRequests.length : 0}
            </span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={logout}>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={addFriendShow} onHide={addFriendHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Friend's Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={addFriendHandleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={sendFriendRequest}>
            Send Friend Request
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={friendRequestShow} onHide={friendRequestHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pending Friend Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {friendRequests && friendRequests.map((friendRequest) => {
            return (
              <div key={friendRequest.id}>
                {friendRequest.name}
                <Button
                  variant="outline-secondary"
                  onClick={() => declineFriendRequest(friendRequest.id)}
                >
                  Decline
                </Button>
                <Button variant="dark" onClick={() => acceptFriendRequest(friendRequest.id)}>
                  Accept
                </Button>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={friendRequestHandleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DropDown;
