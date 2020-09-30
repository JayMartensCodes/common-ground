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

  const insertUser = (first_name, last_name, email, password, home_address) => {
    const query = {
      text: 'INSERT INTO users (first_name, last_name, email, password, home_address) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [first_name, last_name, email, password, home_address]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getUser,
    insertUser
  };
};