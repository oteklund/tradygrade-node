const supertest = require('supertest');
const app = require('../app');
const pool = require('../dao/poolConnection');
const { deleteAllItemsFromItemTable } = require('../dao/itemsDao');

const api = supertest(app);

test('items should be returned as json', async () => {
  await api
    .get('/api/marketplace/items')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Creating a new item should work', async () => {
  await api
    .post('/api/marketplace/items')
    .send({
      name: 'Television',
      sellerId: '1',
      description: 'Perfect television for all your needs',
      category: 'electronics',
      price: 100,
      condition: 'Perfect',
      sold: false,
      listedAt: '2020-03-02T22:00:00.000Z',
      expires: '2020-04-02T21:00:00.000Z',
      pictureURL: 'http://localhost:1235/'
    })
    .then(res => {
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });
});
test('Creating a new item with invalid fields should not work', async () => {
  await api
    .post('/api/marketplace/items')
    .send({
      name: 'Television',
      sellerId: '1',
      description: 'Perfect television for all your needs',
      category: 'electronics',
      condition: 'Perfect',
      sold: false,
      listedAt: '2020-03-02T22:00:00.000Z',
      expires: '2020-04-02T21:00:00.000Z',
      pictureURL: 'http://localhost:1235/'
    })
    .then(res => {
      expect(res.statusCode).toBe(400);
    });
});

afterAll(async done => {
  await deleteAllItemsFromItemTable();
  pool.end();
  done();
});
