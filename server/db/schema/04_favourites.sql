DROP TABLE IF EXISTS favourite_places CASCADE;
CREATE TABLE favourite_places (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  place_id INTEGER REFERENCES places(id)  
);