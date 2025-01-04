const db = require('../../database')

const Event = require('../db_models/event')
const Person = require('../db_models/person')

const EventPerson = db.define('EventPerson', {});

Event.belongsToMany(Person, { through: EventPerson });
Person.belongsToMany(Event, { through: EventPerson });

module.exports = EventPerson;