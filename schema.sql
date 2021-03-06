CREATE DATABASE IF NOT EXISTS commitspy;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  github_id VARCHAR(200) UNIQUE
);
CREATE TABLE IF NOT EXISTS sessions(
  id SERIAL PRIMARY KEY,
  github_id VARCHAR(200) REFERENCES users(github_id),
  session VARCHAR(200)
);
CREATE TABLE IF NOT EXISTS repos(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  organization VARCHAR(200),
  repo VARCHAR(200)
);