const db = require('../../database')

const Service = require('../db_models/service')
const Person = require('../db_models/person')

const PersonService = db.define('PersonsService', {});

Person.belongsToMany(Service, { through: PersonService });
Service.belongsToMany(Person, { through: PersonService });

module.exports = PersonService;