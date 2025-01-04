const { Event, Person } = require('../models');
const buildResponse = require('../helpers/buildresponse');

const getGeneralEvents = async (req, res) => {
    const { page = 1 } = req.query;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find all events(limit by page) and count number of active events
    const [events, total] = await Promise.all([
        Event.findAll({
            limit, offset,
            where: { groupId: null },
            attributes: {
                exclude: ["groupId"]
            },
            include: [{ model: Person }]
        }),
        Event.count()
    ]);

    res.json(buildResponse(events, {
        dataName: "events",
        msg: "The request was successful",
        customFields: { total },
        renamedFields: { People: "attendance" }
    }));
}

const getGeneralEventById = async (req, res) => {
    const { id } = req.params;

    // FindByPk(by id)
    const event = await Event.findByPk(id, {
        raw: true, attributes: {
            exclude: ["groupId"]
        }
    });

    res.json({
        msg: `The event with id: ${event.id}`,
        event
    });
};


const postGeneralEvents = async (req, res) => {
    const { updatedAt, createdAt, id, groupId, attendance, ...body } = req.body;

    try {
        // Create Event
        const event = new Event(body);

        // Save on DB
        await event.save();

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

const putGeneralEvents = async (req, res) => {
    const { id } = req.params;
    const { id: _id, updateAt, createdAt, groupId, attendance, ...body } = req.body;

    try {
        // Find event
        const event = await Event.findByPk(id);

        // Update the event
        await event.update(body)

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
            msg: `The event with id: ${id} was updated successfully`
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deleteGeneralEvents = async (req, res) => {
    const { id } = req.params;


    try {
        // Find Event
        const event = await Event.findByPk(id);

        // Delete Event
        await event.destroy();

        res.status(201).json({
            msg: `The event with id: ${id} was deleted successfully`,
            event
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getGeneralEvents,
    getGeneralEventById,
    postGeneralEvents,
    putGeneralEvents,
    deleteGeneralEvents,
};