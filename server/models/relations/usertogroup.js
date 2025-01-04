const db = require('../../database')

const Group = require('../db_models/group')
const User = require('../db_models/user')

const GroupUser = db.define('GroupUser', {});

Group.belongsToMany(User, { through: GroupUser });
User.belongsToMany(Group, { through: GroupUser });

module.exports = GroupUser;