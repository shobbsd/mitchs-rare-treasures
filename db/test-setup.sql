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
  shop_id INT REFERENCES shops(shop_id) NOT NULL
);

INSERT INTO shop_owners (forename, surname, age) VALUES
  ('firstname-b', 'lastname-b', 30),
  ('firstname-c', 'lastname-c', 21),
  ('firstname-d', 'lastname-d', 17),
  ('firstname-e', 'lastname-e', 23),
  ('firstname-f', 'lastname-f', 75),
  ('firstname-a', 'lastname-a', 55),
  ('firstname-g', 'lastname-g', 89),
  ('firstname-h', 'lastname-h', 27),
  ('firstname-i', 'lastname-i', 63),
  ('firstname-j', 'lastname-j', 29),
  ('firstname-k', 'lastname-k', 102);

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


INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES
  ('treasure-a', 'turquoise', 200, 20, 1),
  ('treasure-d', 'azure', 100, 1001, 2),
  ('treasure-b', 'gold', 13, 500, 4),
  ('treasure-f', 'onyx', 56, 0.01, 3),
  ('treasure-h', 'carmine', 13, 6.90, 6),
  ('treasure-u', 'khaki', 3, 3.99, 7),
  ('treasure-e', 'onyx', 10865, 99999.99, 8),
  ('treasure-n', 'magenta', 13, 6.99, 9),
  ('treasure-i', 'burgundy', 11, 18.99, 10),
  ('treasure-c', 'gold', 13, 15.99, 11),
  ('treasure-r', 'silver', 89, 8.99, 9),
  ('treasure-j', 'mikado', 504, 2340.99, 1),
  ('treasure-g', 'carmine', 65, 0.59, 5),
  ('treasure-l', 'cobalt', 77, 6.99, 2),
  ('treasure-p', 'turquoise', 13, 987.99, 6),
  ('treasure-m', 'burgundy', 77, 5.99, 4),
  ('treasure-o', 'saffron', 13, 78.99, 5),
  ('treasure-k', 'magenta', 13, 23.99, 7),
  ('treasure-q', 'magenta', 1, 60.99, 8),
  ('treasure-s', 'silver', 9, 12.99, 3),
  ('treasure-t', 'mikado', 13, 41.99, 10),
  ('treasure-v', 'ivory', 3, 78.99, 11),
  ('treasure-w', 'silver', 13, 60.99, 1),
  ('treasure-x', 'cobalt', 234, 7.99, 2),
  ('treasure-y', 'saffron', 54, 2.99, 3),
  ('treasure-z', 'ivory', 90, 48.99, 4);
