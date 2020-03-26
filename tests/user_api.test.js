const supertest = require('supertest');
const app = require('../app');
const pool = require('../dao/poolConnection');

const api = supertest(app);

describe('Testing /api/users route CRUD-requests', () => {
  test('items should be returned as json', async () => {
    await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

// Deleting all items from test database after every test run, so that testing is not dependent on your database state

afterAll(async done => {
  pool.end();
  done();
});
