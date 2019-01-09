const faker = require('faker');
const random = require('lodash.random');
const { promisify } = require('util');
const fs = require('fs');
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const generateOwner = () => {
  return {
    forename: faker.name.firstName(),
    surname: faker.name.lastName(),
    age: random(16, 120)
  };
};

const generateMultiples = (n, generator, limitCondition) => {
  return Array.from({ length: n }, () => generator(limitCondition));
};

const generateShop = ownerCount => {
  return {
    shop_name: faker.company.companyName(),
    shop_owner: random(1, ownerCount),
    slogan: faker.company.catchPhrase()
  };
};

const generateTreasure = shopCount => {
  return {
    treasure_name: `${faker.company.catchPhraseAdjective()} ${faker.commerce.productName()}`,
    colour: faker.commerce.color(),
    age: random(5, 1000),
    cost_at_auction: random(0, 100000),
    shop: random(1, shopCount)
  };
};

const generateFileText = js => `module.exports = ${JSON.stringify(js)}`;

module.exports = (ownerCount, shopCount, treasureCount) => {
  const owners = generateMultiples(ownerCount, generateOwner);
  const shops = generateMultiples(shopCount, generateShop, ownerCount);
  const treasures = generateMultiples(
    treasureCount,
    generateTreasure,
    shopCount
  );
  mkdir('./db/data/dev-data')
    .catch(() => console.log('Overwriting existing files in intel directory'))
    .then(() => {
      return writeFile(
        './db/data/dev-data/owners.js',
        generateFileText(owners),
        'utf8'
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/shops.js',
        generateFileText(shops),
        'utf8'
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/treasures.js',
        generateFileText(treasures),
        'utf8'
      );
    });
};
