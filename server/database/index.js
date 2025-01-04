const { Sequelize } = require('sequelize');

const { force, sync } = require('./config')

const db = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: 'mysql'
});

if (sync)
  db.query(`SET FOREIGN_KEY_CHECKS = ${!force ? "1" : "0"};`).then(
    () =>
      db.sync({ force })
  )



module.exports = db;