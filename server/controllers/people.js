const buildResponse = require('../helpers/buildresponse');
const { Person, User, Service, Group } = require('../models');

const getPeople = async (req, res) => {
    const { page = 1, includeServices = false, includeGroups = false } = req.query;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find all people(limit by page) and count number of active people
    const [people, total] = await Promise.all([
        Person.findAll({
            limit,
            offset,
            include: [
                { model: User, as: "influencer" },
                ...(includeServices ? [{ model: Service }] : []),
                ...(includeGroups ? [{ model: Group }] : []),
            ].filter(Boolean)
        }),
        Person.count()
    ]);

    res.json(buildResponse(people, {
        renamedFields: { Services: "services", Groups: "groups" }, // Adjust based on your actual associated field name
        excludedFields: ["Services.PersonsService", "Groups.PersonsGroup"],
        customFields: { total },
        dataName: "people",
        msg: `The request was successfully`
    }));
}

const getPersonById = async (req, res) => {
    const { id } = req.params;
    const { includeServices = false, includeGroups = false } = req.query;

    // FindByPk(by id)
    const person = await Person.findOne({
        where: { id },
        include: [
            { model: User, as: "influencer" },
            ...(includeServices ? [{ model: Service }] : []),
            ...(includeGroups ? [{ model: Group }] : []),
        ].filter(Boolean)
    });

    res.json(buildResponse(person, {
        renamedFields: { Services: "services", Groups: "groups" }, // Adjust based on your actual associated field name
        excludedFields: ["Services.PersonsService", "Groups.PersonsGroup"],
        dataName: "person",
        msg: `The person with id: ${id}`
    }));
};


const postPeople = async (req, res) => {
    const { updatedAt, createdAt, influencerId, influencer_id, id, ...body } = req.body;
    const { influencerPerson } = req.query;

    try {
        // Create Person
        const person = new Person(body);

        // Save on DB
        await person.save();

        // Associate the person with the user(if there is a influencer_id)
        if (typeof influencer_id != "undefined") {
            const influencer = await User.findByPk(influencer_id,
                influencerPerson ? { include: [{ model: Person, as: "person" }] } : null);
            await person.setInfluencer(influencer);
            person.dataValues.influencer = influencer
        }

        res.status(201).json({
            msg: "The person was created successfully",
            person,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }
};

const putPeople = async (req, res) => {
    const { influencerPerson } = req.query;
    const { id } = req.params;
    const { id: _id, updateAt, createdAt, influencerId, influencer_id, ...body } = req.body;

    try {
        // Find person
        const person = await Person.findByPk(id);

        // Update the person
        await person.update(body)

        // Update the associeated influencer
        if (typeof influencer_id != "undefined") {
            const newInfluencer = await User.findByPk(influencer_id,
                influencerPerson ? { include: [{ model: Person, as: "person" }] } : null);
            await person.setInfluencer(newInfluencer);
            person.dataValues.influencer = newInfluencer
        }

        res.status(201).json({
            msg: `The person with id: ${id} was updated successfully`,
            person
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deletePeople = async (req, res) => {
    const { id } = req.params;


    try {
        // Find Person
        const person = await Person.findByPk(id);

        // Delete Person
        await person.destroy();

        res.status(201).json({
            msg: `The person with id: ${id} was deleted successfully`,
            person
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getPeople,
    getPersonById,
    postPeople,
    putPeople,
    deletePeople,
};