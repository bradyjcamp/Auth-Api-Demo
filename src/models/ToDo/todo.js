'use strict';

const ToDoModel = (sequelize, DataTypes) => sequelize.define('Items', {
  text: { type: DataTypes.STRING, required: false },
  assignee: {type: DataTypes.STRING, required: false},
  difficulty: {type: DataTypes.INTEGER, required: false},
});

module.exports = ToDoModel;