const buildResponse = require('../helpers/buildresponse');
const { Service, Person } = require('../models');

const getServices = async (req, res) => {
    const { page = 1 } = req.query;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find all services(limit by page) and count number of active services
    const [services, total] = await Promise.all([
        Service.findAll({
            limit, offset,
            include: [{ model: Person }]
        }),
        Service.count()
    ]);

    res.json(buildResponse(services, {
        dataName: "services",
        renamedFields: { People: "members" },
        msg: "The request was successful",
        customFields: { total }
    }));
}

const getServiceById = async (req, res) => {
    const { id } = req.params;

    // FindByPk(by id)
    const service = await Service.findOne({
        where: { id },
        include: [{ model: Person }]
    });

    res.json(buildResponse(service, {
        renamedFields: { People: "members" },
        dataName: "service",
        msg: `The service with id: ${service.id}`
    }));
};


const postServices = async (req, res) => {
    const { updatedAt, createdAt, id, members, ...body } = req.body;

    try {
        // Create Service
        const service = new Service(body);

        // Save on DB
        await service.save();

        // Associate the members to the service
        if (members) {
            await service.setPeople(members); // Ensure this matches your association
        }

        // Re-fetch the service to include the updated members list
        const updatedService = await Service.findByPk(service.id, {
            include: [{ model: Person }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedService, {
            renamedFields: { People: "members" }, // Adjust based on your actual associated field name
            excludedFields: ["People.PersonsService"],
            dataName: "service",
            msg: "The service was created successfully"
        }));

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }
};

const putServices = async (req, res) => {
    const { id } = req.params;
    const { id: _id, updateAt, createdAt, members, ...body } = req.body;

    try {
        // Find service
        const service = await Service.findByPk(id);

        // Update the service
        await service.update(body)

        // Associate the members to the service
        if (members) {
            await service.setPeople(members); // Ensure this matches your association
        }

        // Re-fetch the service to include the updated members list
        const updatedService = await Service.findByPk(id, {
            include: [{ model: Person }] // Adjust accordingly based on your model setup
        });

        res.status(201).json(buildResponse(updatedService, {
            renamedFields: { People: "members" }, // Adjust based on your actual associated field name
            excludedFields: ["People.PersonsService"],
            dataName: "service",
            msg: `The service with id: ${id} was updated successfully`
        }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deleteServices = async (req, res) => {
    const { id } = req.params;


    try {
        // Find Service
        const service = await Service.findByPk(id);

        // Delete Service
        await service.destroy();

        res.status(201).json({
            msg: `The service with id: ${id} was deleted successfully`,
            service
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getServices,
    getServiceById,
    postServices,
    putServices,
    deleteServices,
};