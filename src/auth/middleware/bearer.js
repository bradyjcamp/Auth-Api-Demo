'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { return _error() }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    console.log('test');
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    _error()
  }
  function _error(){
    next('Invalid Login');
  }
}