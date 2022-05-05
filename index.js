'use strict';

require('dotenv').config();
const { db, items } = require('./src/models');
const { authDb, users } = require('./src/auth/models');
const server = require('./src/server.js');


db.sync().then(async () => {
  // await items.create({
  //   userId: 1,
  //   subject: 'Test',
  //   content: 'We are testing',
  // });
  authDb.sync().then(async() => {
    // await users.create({
    //   username: 'admin',
    //   password: 'password',
    //   role: 'admin',
    // });
    // await users.create({
    //   username: 'writer',
    //   password: 'password',
    //   role: 'writer',
    // });
    // await users.create({
    //   username: 'editor',
    //   password: 'password',
    //   role: 'editor',
    // });
    server.start(process.env.PORT||3000);
  });
});
