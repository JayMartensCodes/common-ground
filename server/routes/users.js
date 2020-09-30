const express = require('express');
const router = express.Router();

module.exports = ({ getUsers, insertUser, getUser }) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });

  router.get('/user/:email', (req, res) => {
    const email = req.params.email

    getUser(email)
      .then((user) => res.json(user))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post('/', (req, res) => {
    const { first_name, last_name, email, password, home_address } = JSON.parse(req.body.user)

    insertUser(first_name, last_name, email, password, home_address)
      .then((user) => res.json(user))
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};