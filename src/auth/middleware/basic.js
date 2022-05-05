'use strict';

const base64 = require('base-64');
const { users } = require('../models'); // need to add


module.exports = async (req, res, next) => {
  if(!req.headers.authorization){
    return _error();
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, password] = base64.decode(basic).split(':');
  try {
    req.user = await users.authenticateBasic(user, password);
    next();
  } catch(e){
    _error();
  }

  function _error(){
    res.status(403).send('Invalid Login');
  }
}