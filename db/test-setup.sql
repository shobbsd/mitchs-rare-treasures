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

INSERT INTO shop_owners (forename, surname, age) 
  VALUES ('Mitch', 'Lloyd', 28), ('Sam', 'Caine', 30), ('Anat', 'Dean', 22), ('Jonty', 'Rathers', 32);

INSERT INTO shops (shop_name, shop_owner, slogan) VALUES ('Mitch''s Rare Treasures', 1, 'If it ain''t broke, I''ll Mitch it!'), ('The Bull and The China Shop', 1, 'Broken is beautiful'), ('Ozymandias''s Timeless Delights', 2, 'Everything is antique, including my cultural reference points'), ('Oh Gnome You Don''t!', 3, 'Garden Gnomes from around the world');


INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop) 
  VALUES ('Tudor Book of Hymns', 'beige', 13, 0.99, 1), ('Tadpole Chair', 'brown', 5, 15.45, 1), ('The Laptop', 'white', 120, 0.01, 1), ('Tome of Smugness', 'brown', 2500, 100000, 3), ('Summer Beach Party Gnome', 'multicoloured', 6, 10.99, 4);


-- CREATE TABLE categories (
--   category_id SERIAL PRIMARY KEY, 
--   category VARCHAR(255)
-- );

-- CREATE TABLE treasure_categories (
--   treasure_category_id SERIAL PRIMARY KEY, 
--   category_id INT REFERENCES categories(category_id) NOT NULL, 
--   treasure_id INT REFERENCES treasures(treasure_id) NOT NULL
-- );


