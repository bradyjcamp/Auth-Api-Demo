'use strict';

const { server } = require('../server');
const supertest = require('supertest');
const request = supertest(server);
const { db, items, settings } = require('../models/index');
const { authDb, users } = require('../auth/models/index');
const testUsers = [];

beforeAll(async () => {
  await authDb.sync();
  await db.sync();
  await settings.create({
    hideCompleted: true,
    pageItems: 5,
    sort: 'difficulty',
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

  test('Should store user settings to db', async () => {

    const response = await request.post('/api/user/settings').send({
      id: 'osknyo',
      hideCompleted: false,
      pageItems: 3,
      sort: 'difficulty',
    }).set('Authorization', `Bearer ${testUsers[1].token}`);
    
    expect(response.status).toBe(201);
    expect(response.body.hideCompleted).toBeFalsy();
    expect(response.body.pageItems).toBe(3);
    expect(response.body.sort).toBe('difficulty');
  });

  test('should get my user settings', async () => { 
    const response = await request.get('/api/user/settings/osknyo').set('Authorization', `Bearer ${testUsers[1].token}`)
    
    expect(response.status).toBe(200);
    expect(response.body.hideCompleted).toBeFalsy();
    expect(response.body.pageItems).toBe(3);
    expect(response.body.sort).toBe('difficulty');
  })

  test('should update settings of user ', async () => {

    const response = await request.put('/api/storage/settings/osknyo').send({
      hideCompleted: true ,
    }).set('Authorization', `Bearer ${testUsers[2].token}`);

    expect(response.status).toBe(200);
    expect(response.body.hideCompleted).toBeTruthy();
  });

  test('Should remove a user settings obj', async () => {

    const response = await request.delete('/api/storage/settings/osknyo').set('Authorization', `Bearer ${testUsers[3].token}`);

    expect(response.status).toBe(204);
  });

});
