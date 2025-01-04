const { Group, Event, Person } = require('../models');
const buildResponse = require('../helpers/buildresponse');

const getGroupEvents = async (req, res) => {
    const { page = 1 } = req.query;
    const { group_id } = req.params;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find all events(limit by page) and count number of active events
    const [events, total] = await Promise.all([
        Event.findAll({
            limit, offset,
            where: { groupId: group_id },
            include: [{ model: Group, as: 'group' }, { model: Person }]
        }),
        Event.count()
    ]);

    res.json(buildResponse(
        events,
        {
            dataName: "events",
            renamedFields: { People: "attendace" },
            msg: "The request was successful",
            customFields: { total }
        }
    ));
}

const postGroupEvents = async (req, res) => {
    const { updatedAt, createdAt, groupId, id, attendance, ...body } = req.body;
    const { group_id } = req.params;

    try {
        // Create GroupEvent
        const event = new Event(body);

        // Save on DB
        await event.save();

        // Associate the event with the group
        const group = await Group.findByPk(group_id);
        await event.setGroup(group);
        event.dataValues.group = group

        // Associate the attendance to the event
        if (attendance) {
            await event.setPeople(attendance); // Ensure this matches your association
        }

        // Re-fetch the event to include the updated attendance list
        const updatedEvent = await Event.findByPk(event.id, {
            include: [{ model: Person }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedEvent, {
            renamedFields: { People: "attendance" }, // Adjust based on your actual associated field name
            excludedFields: ["People.EventPerson"],
            dataName: "event",
            msg: "The event was created successfully"
        }));

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }
};

const putGroupEvents = async (req, res) => {
    const { id } = req.params;
    const { id: _id, updateAt, createdAt, groupId, group_id, attendance, ...body } = req.body;

    try {
        // Find event
        const event = await Event.findByPk(id);

        // Update the event
        await event.update(body)

        // Associate the person with the user
        if (typeof group_id != "undefined") {
            const newGroup = await Group.findByPk(group_id);
            await event.setGroup(newGroup);
            event.dataValues.group = newGroup
        }

        // Associate the attendance to the event
        if (attendance) {
            await event.setPeople(attendance); // Ensure this matches your association
        }

        // Re-fetch the event to include the updated attendance list
        const updatedEvent = await Event.findByPk(id, {
            include: [{ model: Person }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedEvent, {
            renamedFields: { People: "attendance" }, // Adjust based on your actual associated field name
            excludedFields: ["People.EventPerson"],
            dataName: "event",
            msg: `The event with id: ${id} was updated successfully`
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deleteGroupEvents = async (req, res) => {
    const { id } = req.params;

    try {
        // Find GroupEvent
        const event = await Event.findByPk(id);

        // Delete GroupEvent
        await event.destroy();

        res.json({
            msg: `The event with id: ${id} was deleted successfully`,
            event
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getGroupEvents,
    postGroupEvents,
    putGroupEvents,
    deleteGroupEvents,
};