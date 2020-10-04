DROP TABLE IF EXISTS friends CASCADE;
CREATE TABLE friends (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  friend_id INTEGER REFERENCES users(id),
  confirmed BOOLEAN DEFAULT false,
  UNIQUE (user_id, friend_id)
);
