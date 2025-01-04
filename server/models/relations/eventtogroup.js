const Event = require("../db_models/event");
const Group = require("../db_models/group");

Group.hasMany(Event, { foreignKey: "groupId" });
Event.belongsTo(Group, { as: 'group' });