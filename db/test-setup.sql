DROP DATABASE IF EXISTS mitchs_rare_treasures_test;
CREATE DATABASE mitchs_rare_treasures_test;

\c mitchs_rare_treasures_test;

CREATE TABLE owners (
  owner_id SERIAL PRIMARY KEY,
  forename VARCHAR(255),
  surname VARCHAR(255),
  age INT NOT NULL,
  CHECK (age BETWEEN 16 AND 250)
);


CREATE TABLE shops (
  shop_id SERIAL PRIMARY KEY,
  shop_name VARCHAR(255) NOT NULL,
  owner_id INT REFERENCES owners(owner_id) NOT NULL,
  slogan TEXT
);


CREATE TABLE treasures (
  treasure_id SERIAL PRIMARY KEY,
  treasure_name VARCHAR(255) NOT NULL,
  colour VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  cost_at_auction NUMERIC(10, 2) NOT NULL,
  shop_id INT REFERENCES shops(shop_id) NOT NULL
);

