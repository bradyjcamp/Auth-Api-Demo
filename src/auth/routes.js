'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models'); // need to create
const basicAuth = require('./middleware/basic');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = await users.create(req.body);
    let results = {
      user: user,
      token: user.token,
    };
    res.status(201).json(results);
  }catch(e){
    console.error(e.message);
  }

});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  let user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

module.exports = authRouter;


