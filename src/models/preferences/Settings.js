'use strict';

const SettingsModel = (sequelize, DataTypes) => sequelize.define('Settings', {
  hideCompleted: { type: DataTypes.BOOLEAN, required: true },
  pageItems: {type: DataTypes.INTEGER, required: true},
  sort: {type: DataTypes.STRING, required: true},
});



module.exports = SettingsModel;