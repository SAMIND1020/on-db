const { User, Person, Group, Event, Service } = require('../models');

const userExistById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) throw new Error(`There isnt user with id: ${id}`)
}

const emailUserExist = async (email) => {
    const condition = await User.findOne({ where: { email } });

    if (condition) throw new Error(`There is already a user with email: ${email}`)
}

const personExistById = async (id) => {
    const person = await Person.findByPk(id);

    if (!person) throw new Error(`There isnt person with id: ${id}`)
}

const emailPersonExist = async (email) => {
    const condition = await Person.findOne({ where: { email } });

    if (condition) throw new Error(`There is already a person with email: ${email}`)
}
const phonePersonExist = async (phone) => {
    const condition = await Person.findOne({ where: { phone } });

    if (condition) throw new Error(`There is already a person with phone: ${phone}`)
}

const identityPersonExist = async (identity) => {
    const condition = await Person.findOne({ where: { identity } });

    if (condition) throw new Error(`There is already a person with identity: ${identity}`)
}

const personIdUserExist = async (person_id) => {
    const condition = await User.findOne({ where: { PersonId: person_id } });

    if (condition) throw new Error(`There is already a user with person_id: ${person_id}`)
}

const influencerExistById = async (id) => {
    if (typeof id != "undefined") {
        const influencer = await User.findByPk(id);

        if (!influencer) throw new Error(`There isnt influencer with id: ${id}`)
    }

}

const groupExistById = async (id) => {
    const group = await Group.findByPk(id);

    if (!group) throw new Error(`There isnt group with id: ${id}`)
}

const generalEventExistById = async (id) => {
    const event = await Event.findOne({ raw: true, where: { id, groupId: null } });

    if (!event) throw new Error(`There isnt general event with id: ${id}`)
}

const eventExistById = async (id) => {
    const event = await Event.findByPk(id);

    if (!event) throw new Error(`There isnt event with id: ${id}`)
}

const eventBelongsToGroup = async (id, { req: { params: { group_id } } }) => {
    const event = await Event.findOne({ where: { id, groupId: group_id } })

    if (!event) throw new Error(`There isnt event with id: ${id} in group with id: ${group_id}`)
}

const serviceExistById = async (id) => {
    const service = await Service.findByPk(id);

    if (!service) throw new Error(`There isnt service with id: ${id}`)
}

const membersExistsById = async (members) => {
    const personIds = members;
    const existingPersons = await Person.findAll({
      where: {
        id: personIds,
      },
    });

    const existingPersonIds = existingPersons.map((person) => person.id);
    
    const missingIds = personIds.filter((id) => !existingPersonIds.includes(id));

    if (missingIds.length > 0) {
      throw new Error(`The following people do not exist: ${missingIds.join(', ')}`);
    }
    return true;
}

const influencersExistsById = async (influencers) => {
    const userIds = influencers;
    const existingUsers = await User.findAll({
      where: {
        id: userIds,
      },
    });

    const existingUserIds = existingUsers.map((user) => user.id);
    
    const missingIds = userIds.filter((id) => !existingUserIds.includes(id));

    if (missingIds.length > 0) {
      throw new Error(`The following users do not exist: ${missingIds.join(', ')}`);
    }
    return true;
}

module.exports = {
    userExistById,
    emailUserExist,
    personExistById,
    emailPersonExist,
    phonePersonExist,
    identityPersonExist,
    personIdUserExist,
    influencerExistById,
    groupExistById,
    generalEventExistById,
    eventExistById,
    eventBelongsToGroup,
    serviceExistById,
    membersExistsById,
    influencersExistsById
};