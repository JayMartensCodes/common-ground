module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUser = (email) => {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const insertUser = (name, email, password) => {
    const query = {
      text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING email, name',
      values: [name, email, password]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getUser,
    insertUser
  };
};