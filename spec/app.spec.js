process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

chai.use(require('sams-chai-sorted'));

describe('/api', () => {
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
    it('GET:200 returns an array of treasures sorted by cost by default', () => {
      return request(app)
        .get('/api/treasures')
        .expect(200)
        .then(({ body: { treasures } }) => {
          expect(treasures).to.be.sortedBy('cost_at_auction', {
            descending: true
          });
        });
    });
    it('GET:200 returns an array of treasures sorted by any valid column', () => {
      return request(app)
        .get('/api/treasures?sort_by=age')
        .expect(200)
        .then(({ body: { treasures } }) => {
          expect(treasures).to.be.sortedBy('age', {
            descending: true
          });
        });
    });
    it('GET:200 returns an array of treasures sorted in ascending order', () => {
      return request(app)
        .get('/api/treasures?order=asc')
        .expect(200)
        .then(({ body: { treasures } }) => {
          expect(treasures).to.be.sortedBy('cost_at_auction', {
            ascending: true
          });
        });
    });
    it('POST:201 returns the newly created treasure', () => {
      return request(app)
        .post('/api/treasures')
        .send({
          treasure_name: 'gold stuff',
          colour: 'green',
          age: 2346,
          cost_at_auction: 249303.99,
          shop_id: 4
        })
        .expect(201)
        .then(({ body: { treasure } }) => {
          expect(treasure).to.eql({
            treasure_id: 27,
            treasure_name: 'gold stuff',
            colour: 'green',
            age: 2346,
            cost_at_auction: '249303.99',
            shop_id: 4
          });
        });
    });
    describe('Errors', () => {
      it('GET:400 returns a message explaining that is not a valid sort_by', () => {
        return request(app)
          .get('/api/treasures?sort_by=cheese')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              'Acceptable sort_bys are: treasure_name, age, cost_at_auction, treasure_id'
            );
          });
      });
      it('GET:400 returns a message explaining that is not a valid order', () => {
        return request(app)
          .get('/api/treasures?order=cheese')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('order mut be either asc or desc');
          });
      });
      it('POST: 400 returns a message explaining there are too many keys', () => {
        return request(app)
          .post('/api/treasures')
          .send({
            treasure_name: 'gold stuff',
            colour: 'green',
            age: 2346,
            jimminiy: 249303.99,
            cost_at_auction: 249303.99,
            shop_id: 4
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              'column "jimminiy" of relation "treasures" does not exist'
            );
          });
      });
      it('POST: 400 returns a message explaining there are too few keys', () => {
        return request(app)
          .post('/api/treasures')
          .send({
            treasure_name: 'gold stuff',
            colour: 'green',
            age: 2346,
            shop_id: 4
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('cost_at_auction is missing from insertion');
          });
      });
    });
    describe('/:article_id', () => {
      it('PATCH:200 returns the updated article', () => {
        return request(app)
          .patch('/api/treasures/1')
          .send({ cost_at_auction: 1 })
          .then(({ body: { treasure } }) => {
            expect(treasure).to.eql({
              age: 200,
              colour: 'turquoise',
              cost_at_auction: '1.00',
              shop_id: 1,
              treasure_id: 1,
              treasure_name: 'treasure-a'
            });
          });
      });
      it('PATCH:200 returns the article with no changes if cost_at_auction is not provided', () => {
        return request(app)
          .patch('/api/treasures/1')
          .send({ jelly: 1 })
          .then(({ body: { treasure } }) => {
            expect(treasure).to.eql({
              age: 200,
              colour: 'turquoise',
              cost_at_auction: '1.00',
              shop_id: 1,
              treasure_id: 1,
              treasure_name: 'treasure-a'
            });
          });
      });
      it('DELETE:204', () => {
        return request(app)
          .del('/api/treasures/1')
          .expect(204);
      });
      describe('Errors', () => {
        it("PATCH:404 explains that the treasure doesn't exist", () => {
          return request(app)
            .patch('/api/treasures/1000')
            .send({ cost_at_auction: 1 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('There is no treasure with id "1000"');
            });
        });
        it('PATCH:400 explains that the treasure should be a number', () => {
          return request(app)
            .patch('/api/treasures/not-a-number')
            .send({ cost_at_auction: 1 })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal(
                'invalid input syntax for integer: "not-a-number"'
              );
            });
        });
        it('PATCH:400 explains that the cost_at_auction should be a number', () => {
          return request(app)
            .patch('/api/treasures/not-a-number')
            .send({ cost_at_auction: 'money' })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal(
                'invalid input syntax for type numeric: "money"'
              );
            });
        });
        it("DEL:404 explains that the treasure doesn't exist", () => {
          return request(app)
            .del('/api/treasures/1000')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('There is no treasure with id "1000"');
            });
        });
      });
    });
  });
  describe('/owners', () => {
    it('GET:200 returns an array of owners', () => {
      return request(app)
        .get('/api/owners')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners).to.be.an('array');
          expect(owners[0]).to.have.keys([
            'age',
            'forename',
            'owner_id',
            'surname',
            'shop_count',
            'stock_value'
          ]);
        });
    });
    it('GET:200 returns an array of owners sorted by forename in ascending order with a limit of 10', () => {
      return request(app)
        .get('/api/owners')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.length).to.equal(10);
          expect(owners).to.be.sortedBy('forename');
        });
    });
    it('GET:200 returns an array of owners sorted by forename in ascending order with a limit of 10', () => {
      return request(app)
        .get('/api/owners')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.length).to.equal(10);
          expect(owners).to.be.sortedBy('forename');
        });
    });
    it('GET:200 can sort by forename, surname and age', () => {
      const sort_by = ['forename', 'surname', 'age'];
      const promises = sort_by.map(column => {
        return request(app)
          .get(`/api/owners?sort_by=${column}`)
          .expect(200)
          .then(({ body: { owners } }) => {
            expect(owners).to.be.sortedBy(column);
          });
      });
      return Promise.all(promises);
    });
    it('GET:200 accepts max age queries', () => {
      return request(app)
        .get('/api/owners?max_age=25')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.every(({ age }) => age < 25)).to.be.true;
        });
    });
    it('GET:200 accepts min age queries', () => {
      return request(app)
        .get('/api/owners?min_age=30')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.every(({ age }) => age > 30)).to.be.true;
        });
    });
    it('GET:200 accepts exact age queries', () => {
      return request(app)
        .get('/api/owners?exact_age=21')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.every(({ age }) => +age === 21)).to.be.true;
        });
    });
    it('GET:200 accepts forename age queries', () => {
      return request(app)
        .get('/api/owners?forename=firstname-c')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.every(({ forename }) => forename === 'firstname-c')).to
            .be.true;
        });
    });
    it('GET:200 accepts surname age queries', () => {
      return request(app)
        .get('/api/owners?surname=lastname-c')
        .expect(200)
        .then(({ body: { owners } }) => {
          expect(owners.every(({ surname }) => surname === 'lastname-c')).to.be
            .true;
        });
    });
    describe('Errors', () => {
      it('GET:400 not an allowed query', () => {
        return request(app)
          .get('/api/owners?doughnut=true')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('query not allowed');
          });
      });
      it('GET:400 age queries must be a number', () => {
        return request(app)
          .get('/api/owners?max_age=not-a-number')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal(
              'invalid input syntax for integer: "not-a-number"'
            );
          });
      });
    });
  });
  describe('/shops', () => {
    it('GET:200 returns an array of shops', () => {
      return request(app)
        .get('/api/shops')
        .expect(200)
        .then(({ body: { shops } }) => {
          expect(shops).to.be.an('array');
          expect(shops[0]).to.have.keys([
            'shop_id',
            'shop_name',
            'shop_owner',
            'slogan',
            'stock_value'
          ]);
        });
    });
  });
});
