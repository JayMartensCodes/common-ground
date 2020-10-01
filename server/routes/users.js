const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

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
    let { name, email, password } = req.body
    password = bcrypt.hashSync(password, salt)
    insertUser(name, email, password)
      .then((user) => res.json(user))
      .catch((err) => res.json({ error: err.message }));
  });

  router.post('/signIn', (req, res) => {
    const { email, password } = req.body
    getUser(email)
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          res.json(user)
        } else {
          res.json({error: "wrong password"})
        }
      })
      .catch((err) => res.json({ error: err.message }));
  })

  return router;
};