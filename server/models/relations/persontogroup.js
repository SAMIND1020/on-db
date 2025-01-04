const db = require('../../database')

const Group = require('../db_models/group')
const Person = require('../db_models/person')

const PersonGroup = db.define('PersonsGroup', {});

Person.belongsToMany(Group, { through: PersonGroup });
Group.belongsToMany(Person, { through: PersonGroup });

module.exports = PersonGroup;