'use strict';

process.env.SECRET = 'secretstring';

const { server } = require('../server');
const supertest = require('supertest');
const request = supertest(server);
const { authDb, users } = require('../auth/models/index');
const { db, items } = require('../models');


beforeAll(async () => {
  await authDb.sync();
  await db.sync();
  await items.create({
    text: 'hello',
    assignee: 'Test',
    difficulty: 'We are testing',
  });
  await buildUsers();
});

afterAll(async () => {
  await authDb.drop();
  await db.drop();
});

let testUsers = [];

async function buildUsers() {
  let testAdmin = await users.create({
    username: 'admin',
    password: 'password',
    role: 'admin',
  });
  let testWriter = await users.create({
    username: 'writer',
    password: 'password',
    role: 'writer',
  });
  let testEditor = await users.create({
    username: 'editor',
    password: 'password',
    role: 'editor',
  });
  let testUser = await users.create({
    username: 'user',
    password: 'password',
    role: 'user',
  });

  testUsers.push(testUser);
  testUsers.push(testWriter);
  testUsers.push(testEditor);
  testUsers.push(testAdmin);
}

describe('Testing CRUD of APP', () => {
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

  test('Should create a todo, on POST to items', async () => {

    const response = await request.post('/api/storage/items').send({
      description: 'New todo',
      assignee: 'test person',
      difficulty: 3,
    }).set('Authorization', `Bearer ${testUsers[0]}`);

    expect(response.status).toBe(201);
    expect(response.body.description).toBe('New todo');
    expect(response.body.assignee).toBe('test person');
    expect(response.body.difficulty).toBe(3);
  });

  test('Should read all todos on GET to items', async () => {

    const response = await request.get('/api/storage/items');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].description).toBe('New todo');
  });


  test('Should update a todo on PATCH to /items/:id', async () => {

    const response = await request.patch('/api/storage/items/1').send({
      assignee: 'new test person',
    });

    expect(response.status).toBe(200);
    expect(response.body.assignee).toBe('new test person');
    expect(response.body[0].description).toBe('New todo');
  });

  test('Should remove a todo on DELETE to /items/:id', async () => {

    const response = await request.delete('/api/storage/items/1');

    expect(response.status).toBe(204);
    expect(response.body.id).toBe(1);
  });
})