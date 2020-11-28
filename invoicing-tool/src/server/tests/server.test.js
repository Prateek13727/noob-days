const expect =  require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {Item} = require('./../models/item');
const {Invoice} = require('./../models/item');
const {app} = require('./../server');
const { items, populateItems } = require('./seed/seed');

// beforeEach(populateItems);

describe('POST /invoice', () => {
  it('create a new invoice', (done) => {
    const items = [
      {
        name: "Oil",
        quantity: 1,
        medical: false,
        price: 420,
        tax:.20
      },
    ]
    request(app)
      .post('/invoice')
      .send(items)
      .expect(200)
      .expect((res) => {
        expect(res.body[Object.keys(res.body)[0]].length).toBe(1);
        expect(res.body[Object.keys(res.body)[0]][0].name).toBe("Oil");
        return done();
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
      })
  });
});

