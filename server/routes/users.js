const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

module.exports = (
  {
    getUsers,
    insertUser,
    getUser,
    insertFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    makeFriendRequestMutual,
    getFriendsList,
    common_grounds,
    acceptCommonGroundRequest,
    declineCommonGroundRequest,
  },
  io
) => {
  /* GET users listing. */
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/user/:email", (req, res) => {
    const email = req.params.email;

    getUser(email)
      .then((user) => res.json(user))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/friend-list/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    getFriendsList(user_id)
      .then((friendRequests) => res.json(friendRequests))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/friend-requests/:friend_id", (req, res) => {
    const friend_id = req.params.friend_id;
    getFriendRequests(friend_id)
      .then((friendRequests) => res.json(friendRequests))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get("/common-grounds/:friend_id", (req, res) => {
    const friend_id = req.params.friend_id;
    common_grounds(friend_id)
      .then((friendRequests) => res.json(friendRequests))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/", (req, res) => {
    let { name, email, password, currentLocation } = req.body;
    password = bcrypt.hashSync(password, salt);
    getUser(email)
      .then((user) => {
        if (!user) {
          insertUser(name, email, password, currentLocation).then((user) => {
            res.json(user);
          });
        } else {
          res.status(400).json("User already exists");
        }
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  });

  router.post("/signIn", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    getUser(email)
      .then((user) => {
        if (!user) {
          res.status(400).json({ error: err.message });
        } else if (bcrypt.compareSync(password, user.password)) {
          res.json(user);
        } else {
          res.status(400).json({ error: "wrong password" });
        }
      })
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/friend-request", (req, res) => {
    const { email, user_id } = req.body;
    getUser(email)
      .then((user) => {
        insertFriendRequest(user_id, user.id).then((friendRequest) => {
          getFriendRequests(friendRequest.friend_id).then((friendsReqests) => {
            io.to(friendRequest.friend_id).emit(
              "friend-request",
              friendsReqests
            );
            res.json(friendRequest);
          });
        });
      })
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/acceptFriendRequest", (req, res) => {
    const request_id = req.body.id;
    acceptFriendRequest(request_id)
      .then((friendRequest) => {
        const user_id = friendRequest.friend_id;
        const friend_id = friendRequest.user_id;
        makeFriendRequestMutual(user_id, friend_id).then((friendRequest) =>
          res.json(friendRequest)
        );
      })
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/declineFriendRequest", (req, res) => {
    const request_id = req.body.id;
    declineFriendRequest(request_id)
      .then((friendRequest) => res.json(friendRequest))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/declineCommonGroundRequest", (req, res) => {
    const request_id = req.body.id;
    declineCommonGroundRequest(request_id)
      .then((commonRequest) => res.json(commonRequest))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post("/acceptCommonGroundRequest", (req, res) => {
    const request_id = req.body.id;
    acceptCommonGroundRequest(request_id)
      .then((commonRequest) => res.json(commonRequest))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
