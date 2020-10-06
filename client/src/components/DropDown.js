import React, { useState } from "react";
import "./DropDown.css";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../images/rat.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function DropDown({
  setUser,
  user,
  friendRequests,
  setFriendRequests,
  commonGrounds,
  setCommonGrounds,
  setSelected,
  setFriendList,
}) {
  const [addFriendShow, setAddFriendShow] = useState(false);
  const [friendRequestShow, setFriendRequestShow] = useState(false);
  const [commonGroundsShow, setCommonGroundsShow] = useState(false);
  const [email, setEmail] = useState("");
  const addFriendHandleClose = () => setAddFriendShow(false);
  const addFriendHandleShow = () => setAddFriendShow(true);
  const friendRequestHandleClose = () => setFriendRequestShow(false);
  const friendRequestHandleShow = () => setFriendRequestShow(true);
  const commonGroundsHandleClose = () => setCommonGroundsShow(false);
  const commonGroundsHandleShow = () => setCommonGroundsShow(true);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setFriendList(null);
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

  const declineCommonGroundsRequest = (id) => {
    const request = { id };
    axios
      .post("/users/declineCommonGroundRequest", request)
      .then((res) => {
        const newCommonGrounds = commonGrounds.filter(
          (commonGround) => commonGround.id !== id
        );
        setCommonGrounds(newCommonGrounds);
      })
      .catch((error) => console.log(error));
  };

  const acceptCommonGroundsRequest = (id) => {
    const request = { id };

    axios
      .post("/users/acceptCommonGroundRequest", request)
      .then((res) => {
        const location = JSON.parse(res.data.geolocation);
        const newCommonGrounds = commonGrounds.filter(
          (commonGround) => commonGround.id !== id
        );
        setCommonGrounds(newCommonGrounds);
        setSelected(location);
        commonGroundsHandleClose();
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
            Friend Requests
            <span className="badge badge-pill badge-danger friend-number">
              {friendRequests ? friendRequests.length : 0}
            </span>
          </Dropdown.Item>
          <Dropdown.Item onClick={commonGroundsHandleShow}>
            Common Ground Requests
            <span className="badge badge-pill badge-danger friend-number">
              {commonGrounds ? commonGrounds.length : 0}
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
          {friendRequests &&
            friendRequests.map((friendRequest) => {
              return (
                <div
                  key={friendRequest.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 25 }}>
                    {friendRequest.name}
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      onClick={() => declineFriendRequest(friendRequest.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="dark"
                      style={{ marginLeft: 10 }}
                      onClick={() => acceptFriendRequest(friendRequest.id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              );
            })}
          {friendRequests && friendRequests.length === 0 && (
            <Alert variant="info">
              No Friend Requests{" "}
              <span role="img" aria-label="sad-emoji">
                😔
              </span>
              !
            </Alert>
          )}
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

      <Modal show={commonGroundsShow} onHide={commonGroundsHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pending Common Ground Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {commonGrounds &&
            commonGrounds.map((commonGround) => {
              return (
                <div
                  key={commonGround.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 25 }}>
                    {commonGround.name}
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        declineCommonGroundsRequest(commonGround.id)
                      }
                    >
                      Decline
                    </Button>
                    <Button
                      variant="dark"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        acceptCommonGroundsRequest(commonGround.id)
                      }
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              );
            })}
          {commonGrounds && commonGrounds.length === 0 && (
            <Alert variant="info">No Common Ground Requests!</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={commonGroundsHandleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DropDown;
