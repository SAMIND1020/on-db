const buildResponse = require('../helpers/buildresponse');
const { Group, Event, Person, User } = require('../models');

const getGroups = async (req, res) => {
    const { page = 1 } = req.query;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find all groups(limit by page) and count number of active groups
    const [groups, total] = await Promise.all([
        Group.findAll({
            limit, offset,
            include: [{ model: Event }, { model: Person }, { model: User, attributes: { exclude: ["password"] } }]
        }),
        Group.count()
    ]);

    res.json(buildResponse(groups, {
        dataName: "groups",
        renamedFields: { Events: "events", People: "members", Users: "influencers" },
        excludedFields: ["People.PersonsGroup", "Users.UsersGroup", "People.EventsGroup"],
        msg: "The request was successful",
        customFields: { total }
    }));
}

const getGroupById = async (req, res) => {
    const { id } = req.params;

    // FindByPk(by id)
    const group = await Group.findOne({
        where: { id },
        include: [{ model: Event }, { model: Person }, { model: User, attributes: { exclude: ["password"] } }]
    });

    res.json(buildResponse(group, {
        renamedFields: { Events: "events", People: "members", Users: "influencers" },
        excludedFields: ["People.PersonsGroup", "Users.UsersGroup", "People.EventsGroup"],
        dataName: "group",
        msg: `The group with id: ${group.id}`
    }));
};


const postGroups = async (req, res) => {
    const { updatedAt, createdAt, id, members, influencers, ...body } = req.body;

    try {
        // Create Group
        const group = new Group(body);

        // Save on DB
        await group.save();

        // Associate the members to the group
        if (members) {
            await group.setPeople(members); // Ensure this matches your association
        }

        // Associate the influencers to the group
        if (members) {
            await group.setUsers(influencers); // Ensure this matches your association
        }

        // Re-fetch the group to include the updated members list
        const updatedGroup = await Group.findByPk(group.id, {
            include: [{ model: Person }, { model: User, attributes: { exclude: ["password"] } }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedGroup, {
            renamedFields: { People: "members", Users: "influencers" }, // Adjust based on your actual associated field name
            excludedFields: ["People.PersonsGroup", "Users.UsersGroup"],
            dataName: "group",
            msg: `The group was created successfully`
        }));

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }
};

const putGroups = async (req, res) => {
    const { id } = req.params;
    const { id: _id, updateAt, createdAt, members, influencers, ...body } = req.body;

    try {
        // Find group
        const group = await Group.findByPk(id);

        // Update the group
        await group.update(body)

        // Associate the members to the group
        if (members) {
            await group.setPeople(members); // Ensure this matches your association
        }

        // Associate the influencers to the group
        if (members) {
            await group.setUsers(influencers); // Ensure this matches your association
        }

        // Re-fetch the group to include the updated members list
        const updatedGroup = await Group.findByPk(id, {
            include: [{ model: Person }, { model: User, attributes: { exclude: ["password"] } }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedGroup, {
            renamedFields: { People: "members", Users: "influencers" }, // Adjust based on your actual associated field name
            excludedFields: ["People.PersonsGroup", "Users.UsersGroup"],
            dataName: "group",
            msg: `The group with id: ${id} was updated successfully`
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deleteGroups = async (req, res) => {
    const { id } = req.params;


    try {
        // Find Group
        const group = await Group.findByPk(id);

        // Delete Group
        await group.destroy();

        res.status(201).json({
            msg: `The group with id: ${id} was deleted successfully`,
            group
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getGroups,
    getGroupById,
    postGroups,
    putGroups,
    deleteGroups,
};