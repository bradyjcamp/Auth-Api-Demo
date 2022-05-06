'use strict';

const { server } = require('../server');
const supertest = require('supertest');
const request = supertest(server);
const { db, items } = require('../models/index');
const { authDb, users } = require('../auth/models/index');
const testUsers = [];

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

  test('Should create a todo, on POST to items', async () => {

    const response = await request.post('/api/storage/items').send({
      text: 'New todo',
      assignee: 'test person',
      difficulty: 3,
    }).set('Authorization', `Bearer ${testUsers[1].token}`);

    expect(response.status).toBe(201);
    expect(response.body.text).toBe('New todo');
    expect(response.body.assignee).toBe('test person');
    expect(response.body.difficulty).toBe(3);
  });

  test('Should read all todos on GET to items', async () => {

    const response = await request.get('/api/storage/items').set('Authorization', `Bearer ${testUsers[0].token}`)

    expect(response.status).toBe(200);
    expect(response.body.length).toBeTruthy();
    expect(response.body[0].text).toBe('hello');
  });


  test('Should update a todo on PATCH to /items/:id', async () => {

    const response = await request.put('/api/storage/items/1').send({
      assignee: 'new test person',
    }).set('Authorization', `Bearer ${testUsers[2].token}`);

    expect(response.status).toBe(200);
    expect(response.body.assignee).toBe('new test person');
    expect(response.body.text).toBe('hello');
  });

  test('Should remove a todo on DELETE to /items/:id', async () => {

    const response = await request.delete('/api/storage/items/1').set('Authorization', `Bearer ${testUsers[3].token}`);

    expect(response.status).toBe(204);
  });
})