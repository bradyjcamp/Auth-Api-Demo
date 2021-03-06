'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./data-collection.js')
const ToDoModel = require('./ToDo/todo.js');
const SettingsModel = require('./preferences/settings.js');

const DATABASE_URL_TEST = process.env.DATABASE_URL_TEST || 'sqlite:memory:'

const sequelize = new Sequelize(DATABASE_URL_TEST);

const items = ToDoModel(sequelize, DataTypes);
const settings = SettingsModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  items: new Collection(items),
  settings: new Collection(settings)
}