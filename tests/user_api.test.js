const supertest = require('supertest');
const app = require('../app');
const pool = require('../dao/poolConnection');
const { deleteAllUsersFromDB } = require('../dao/usersDao');

const api = supertest(app);

let dummyUser = {
  name: 'Jane Doe',
  password: 'supersecretpasswordthatwouldbenormallyhashed',
  email: 'janedoe@hotmail.com'
};

describe('Testing /api/users route CRUD-requests', () => {
  test('items should be returned as json', async () => {
    await api
      .get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('Creating a new user should work', async () => {
    await api
      .post('/api/users')
      .send(dummyUser)
      .then(res => {
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
      });
  });
  test("Creating a new user missing fields shouldn't work", async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Invalid User',
        password: 'secretword'
      })
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });
  test('Creating a new user with already existing name should not work', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Jane Doe',
        password: 'secretword',
        email: 'jane123@gmail.com'
      })
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
          'Username or email already in use, please try again.'
        );
      });
  });
  test('Creating a new user with already existing email should not work', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'JaneDoe123',
        password: 'secretword',
        email: 'janedoe@hotmail.com'
      })
      .then(res => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual(
          'Username or email already in use, please try again.'
        );
      });
  });
});

// Deleting all items from test database after every test run, so that testing is not dependent on your database state

afterAll(async done => {
  await deleteAllUsersFromDB();
  pool.end();
  done();
});
