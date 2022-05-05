'use strict';

process.env.SECRET = 'secretstring';

const { server } = require('../server');
const supertest = require('supertest');
const request = supertest(server);
let { authDb } = require('../auth/models/index');

beforeAll( async () => {
  await authDb.sync();
});
afterAll( async () => {
  await authDb.drop();
});

describe('Testing the Express app', () => {

  let username = 'test_user';
  let password = 'test_password';

  test('Should register a user', async () => {
    const response = await request.post('/signup').send({
      username,
      password,
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(username);
    expect(response.body.role).toEqual('user');
    expect(response.body.token).toBeTruthy();
  });

  test('Should sign in a user with basic auth credentials', async () => {

    const response = await request.post('/signin').auth(username, password);

    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(username);
    expect(response.body.role).toEqual('user');
    expect(response.body.token).toBeTruthy();
  });
});
