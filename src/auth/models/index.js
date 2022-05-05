'use strict';

const userModel = require('./users');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL_TEST = process.env.DATABASE_URL_TEST || 'sqlite:auth';

const sequelize = new Sequelize(DATABASE_URL_TEST, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  authDb: sequelize,
  users: userModel(sequelize, DataTypes),
};