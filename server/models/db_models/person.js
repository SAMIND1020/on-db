const { DataTypes } = require('sequelize');
const db = require('../../database');

const { ID_TYPES, MARITALSTATUS_TYPES } = require('../../helpers/types');

const Person = db.define('Person', {
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
    phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    identity: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    address_lat: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    address_lon: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    id_type: {
        type: DataTypes.ENUM,
        values: Object.values(ID_TYPES),
        allowNull: true
    },
    family: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    marital_status: {
        type: DataTypes.ENUM,
        values: Object.values(MARITALSTATUS_TYPES),
        allowNull: true
    }
});

module.exports = Person