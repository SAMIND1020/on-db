const User = require('../db_models/user')
const Person = require('../db_models/person')

Person.belongsTo(User, { as: 'influencer' });

User.belongsTo(Person, { as: 'person' });