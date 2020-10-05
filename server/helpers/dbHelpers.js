module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUser = (email) => {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getFriendRequests = (friend_id) => {
    const query = {
      text:
        "SELECT users.name, friends.id FROM friends LEFT JOIN users ON users.id = friends.user_id WHERE friend_id = $1 AND confirmed IS NOT TRUE",
      values: [friend_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const common_grounds = (friend_id) => {
    const query = {
      text:
        "SELECT users.name, common_grounds.id FROM common_grounds LEFT JOIN users ON users.id = common_grounds.user_id WHERE friend_id = $1 AND confirmed IS NOT TRUE",
      values: [friend_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getFriendsList = (user_id) => {
    const query = {
      text:
        "SELECT geolocation, friend_id, name, users.active, users.avatar FROM friends LEFT JOIN users ON  users.id = friends.friend_id WHERE friends.user_id = $1 AND confirmed IS TRUE",
      values: [user_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const acceptFriendRequest = (request_id) => {
    const query = {
      text: "UPDATE friends SET confirmed = TRUE WHERE id = $1 RETURNING *",
      values: [request_id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const makeFriendRequestMutual = (user_id, friend_id) => {
    const query = {
      text:
        "INSERT INTO friends (user_id, friend_id, confirmed) VALUES ($1, $2, TRUE) RETURNING *",
      values: [user_id, friend_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const declineFriendRequest = (request_id) => {
    const query = {
      text: "DELETE FROM friends WHERE id = $1",
      values: [request_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const declineCommonGroundRequest = (request_id) => {
    const query = {
      text: "DELETE FROM common_grounds WHERE id = $1",
      values: [request_id],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const acceptCommonGroundRequest = (request_id) => {
    const query = {
      text: "UPDATE common_grounds SET confirmed = TRUE WHERE id = $1 RETURNING *",
      values: [request_id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const insertUser = (name, email, password, currentLocation) => {
    const query = {
      text:
        "INSERT INTO users (name, email, password, geolocation) VALUES ($1, $2, $3, $4) RETURNING email, name, id",
      values: [name, email, password, currentLocation],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const insertFriendRequest = (user_id, friend_id) => {
    const query = {
      text:
        "INSERT INTO friends (user_id, friend_id) VALUES ($1, $2) RETURNING friend_id",
      values: [user_id, friend_id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getUser,
    insertUser,
    insertFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    makeFriendRequestMutual,
    getFriendsList,
    common_grounds,
    declineCommonGroundRequest,
    acceptCommonGroundRequest,
  };
};
