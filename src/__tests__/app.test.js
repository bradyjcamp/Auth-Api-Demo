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
    console.log('response.body? ', response.body)
    expect(response.status).toBe(201);
    expect(response.body.user.username).toEqual(username);
    expect(response.body.user.role).toEqual('user');
    expect(response.body.user.token).toBeTruthy();
  });

  test('Should sign in a user with basic auth credentials', async () => {

    const response = await request.post('/signin').auth(username, password);

    expect(response.status).toBe(200);
    expect(response.body.user.username).toEqual(username);
    expect(response.body.user.role).toEqual('user');
    expect(response.body.user.token).toBeTruthy();
  });
});
