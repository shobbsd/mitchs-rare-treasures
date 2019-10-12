const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    connection.destroy();
  });
  describe('/treasures', () => {
    it('GET:200 returns an array of treasures', () => {
      return request(app)
        .get('/api/treasures')
        .expect(200)
        .then(({ body: { treasures } }) => {
          expect(treasures).to.be.an('array');
          expect(treasures[0]).to.have.keys([
            'treasure_id',
            'treasure_name',
            'colour',
            'age',
            'cost_at_auction',
            'shop_name'
          ]);
        });
    });
  });
});
