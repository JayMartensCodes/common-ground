DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  geolocation VARCHAR(255),
  avatar VARCHAR(255) DEFAULT 'https://www.flaticon.com/svg/static/icons/svg/843/843280.svg',
  active BOOLEAN DEFAULT TRUE,
  UNIQUE(email)
);