const { DataTypes } = require('sequelize');
const db = require('../../database');

const { ROLES_TYPES } = require('../../helpers/types');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM,
    values: Object.values(ROLES_TYPES),
    allowNull: false
  }
});



module.exports = User