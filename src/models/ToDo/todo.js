'use strict';

const ToDoModel = (sequelize, DataTypes) => sequelize.define('toDoItem', {
  text: { type: DataTypes.STRING, required: false },
  assignee: {type: DataTypes.STRING, required: false},
  difficulty: {type: DataTypes.STRING, required: false},
});

module.exports = ToDoModel;