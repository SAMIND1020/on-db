const bcrypt = require('bcryptjs');
const { User, Person, Group } = require('../models');
const buildResponse = require('../helpers/buildresponse');

const getUsers = async (req, res) => {
    const { page = 1 } = req.query;

    // Set the limit(default: 5) and the offset(defined by page)
    const limit = 5;
    const offset = limit * (Number(page) - 1);

    // Find allusers(limit by page) and count number of active users
    const [users, total] = await Promise.all([
        User.findAll({
            limit,
            offset,
            attributes: { exclude: ['password'] },
            include: [{ model: Person, as: 'person' },
            { model: Group }]
        }),
        User.count()
    ]);

    res.json(buildResponse(users,
        {
            dataName: "users",
            msg: "The request was successful",
            customFields: { total },
            excludedFields: ["Groups.GroupUser"],
            renamedFields: { Groups: "groups" }
        }
    ));
}

const getUserById = async (req, res) => {
    const { id } = req.params;

    // FindByPk(by id, excluding the password for the response)
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
        include: [{ model: Group }]
    });

    res.json(buildResponse(user,
        {
            dataName: "user",
            renamedFields: { Groups: "groups" },
            excludedFields: ["Groups.GroupUser"],
            msg: `The user with id: ${user.id}`,
        }
    ));
};


const postUsers = async (req, res) => {
    const { updatedAt, createdAt, password, person_id, personId, id, ...body } = req.body;

    try {
        // Create User
        const user = new User(body);

        // Bcript the password
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

        // Save on DB
        await user.save();

        // Associate the person with the user
        const person = await Person.findByPk(person_id);
        await user.setPerson(person);

        user.dataValues.person = person

        res.status(201).json({
            msg: "The user was created successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }
};

const putUsers = async (req, res) => {
    const { id } = req.params;
    const { id: _id, password, updateAt, createdAt, person_id, personId, ...body } = req.body;

    try {
        // Find user
        const user = await User.findByPk(id);

        // Bcript the password
        body.password = typeof password === "string" ? bcrypt.hashSync(password, bcrypt.genSaltSync()) : user.password;

        // Update the user
        await user.update(body)

        res.status(201).json({
            msg: `The user with id: ${id} was updated successfully`,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};

const deleteUsers = async (req, res) => {
    const { id } = req.params;


    try {
        // Find User
        const user = await User.findByPk(id);

        // Delete User
        await user.destroy();

        res.status(201).json({
            msg: `The user with id: ${id} was deleted successfully`,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Something has gone wrong' })
    }

};


module.exports = {
    getUsers,
    getUserById,
    postUsers,
    putUsers,
    deleteUsers,
};