DROP TABLE IF EXISTS common_grounds CASCADE;
CREATE TABLE common_grounds (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  friend_id INTEGER REFERENCES users(id),
  confirmed BOOLEAN DEFAULT false,
  geolocation VARCHAR(255) NOT NULL,
  UNIQUE (user_id, friend_id, geolocation)
);