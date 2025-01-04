const Server = require("./server");

// DB Models
const Event = require("./db_models/event");
const Group = require("./db_models/group");
const Person = require("./db_models/person");
const Service = require("./db_models/service");
const User = require("./db_models/user");

// Relations
const EventGroup = require("./relations/eventtogroup");
const EventPerson = require("./relations/eventtoperson");
const PersonGroups = require("./relations/persontogroup");
const PersonService = require("./relations/persontoservice");
const UserGroup = require("./relations/usertogroup");
const UserPerson = require("./relations/usertoperson");

module.exports = {
    // DB Models
    Event,
    Group,
    Person,
    Server,
    Service,
    User,

    // Relations
    EventGroup,
    EventPerson,
    PersonGroups,
    PersonService,
    UserGroup,
    UserPerson
}