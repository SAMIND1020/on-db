const { DataTypes } = require('sequelize');
const db = require('../../database');

const Service = db.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),

        allowNull: false
    }
});

module.exports = Service;