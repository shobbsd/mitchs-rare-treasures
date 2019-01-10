DROP DATABASE IF EXISTS mitchs_rare_treasures_test;
CREATE DATABASE mitchs_rare_treasures_test;

\c mitchs_rare_treasures_test;

CREATE TABLE shop_owners (
  owner_id SERIAL PRIMARY KEY, 
  forename VARCHAR(255), 
  surname VARCHAR(255), 
  age INT NOT NULL, 
  CHECK (age BETWEEN 16 AND 250)
);


CREATE TABLE shops (
  shop_id SERIAL PRIMARY KEY, 
  shop_name VARCHAR(255) NOT NULL, 
  shop_owner INT REFERENCES shop_owners(owner_id) NOT NULL, 
  slogan TEXT
);


CREATE TABLE treasures (
  treasure_id SERIAL PRIMARY KEY,
  treasure_name VARCHAR(255) NOT NULL, 
  colour VARCHAR(255) NOT NULL, 
  age INT NOT NULL, 
  cost_at_auction NUMERIC(10, 2) NOT NULL,
  shop INT REFERENCES shops(shop_id) NOT NULL
);

INSERT INTO shop_owners (forename, surname, age) VALUES
  ('firstname-b', 'lastname-b', 30),
  ('firstname-c', 'lastname-c', 21),
  ('firstname-d', 'lastname-d', 22),
  ('firstname-e', 'lastname-e', 23),
  ('firstname-f', 'lastname-f', 24),
  ('firstname-a', 'lastname-a', 25),
  ('firstname-g', 'lastname-g', 26),
  ('firstname-h', 'lastname-h', 27),
  ('firstname-i', 'lastname-i', 20),
  ('firstname-j', 'lastname-j', 29),
  ('firstname-k', 'lastname-k', 28);

INSERT INTO shops (shop_name, shop_owner, slogan) VALUES
  ('shop-b', 1, 'slogan-b'),
  ('shop-d', 2, 'slogan-d'),
  ('shop-e', 3, 'slogan-e'),
  ('shop-f', 4, 'slogan-f'),
  ('shop-g', 5, 'slogan-g'),
  ('shop-h', 6, 'slogan-h'),
  ('shop-i', 7, 'slogan-i'),
  ('shop-a', 8, 'slogan-a'),
  ('shop-j', 9, 'slogan-j'),
  ('shop-k', 10, 'slogan-k'),
  ('shop-c', 2, 'slogan-c');


INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop) VALUES
  ('treasure-a', 'colour-a', 13, 20, 1),
  ('treasure-d', 'colour-d', 13, 1001, 2),
  ('treasure-b', 'colour-b', 13, 500, 4),
  ('treasure-f', 'colour-f', 13, 0.01, 3),
  ('treasure-h', 'colour-h', 13, 6.90, 6),
  ('treasure-u', 'colour-u', 13, 0.99, 7),
  ('treasure-e', 'colour-e', 13, 0.99, 8),
  ('treasure-n', 'colour-n', 13, 0.99, 9),
  ('treasure-i', 'colour-i', 13, 0.99, 10),
  ('treasure-c', 'colour-c', 13, 0.99, 11),
  ('treasure-r', 'colour-r', 13, 0.99, 9),
  ('treasure-j', 'colour-j', 13, 0.99, 1),
  ('treasure-g', 'colour-g', 13, 0.99, 5),
  ('treasure-l', 'colour-l', 13, 0.99, 2),
  ('treasure-p', 'colour-p', 13, 0.99, 6),
  ('treasure-m', 'colour-m', 13, 0.99, 4),
  ('treasure-o', 'colour-o', 13, 0.99, 5),
  ('treasure-k', 'colour-k', 13, 0.99, 7),
  ('treasure-q', 'colour-q', 13, 0.99, 8),
  ('treasure-s', 'colour-s', 13, 0.99, 3),
  ('treasure-t', 'colour-t', 13, 0.99, 10),
  ('treasure-v', 'colour-v', 13, 0.99, 11),
  ('treasure-w', 'colour-w', 13, 0.99, 1),
  ('treasure-x', 'colour-x', 13, 0.99, 2),
  ('treasure-y', 'colour-y', 13, 0.99, 3),
  ('treasure-z', 'colour-z', 13, 0.99, 4);
