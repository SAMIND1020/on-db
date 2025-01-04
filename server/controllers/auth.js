const bcrypt = require("bcryptjs");

const { User } = require('../models');

const { generateJWT } = require("../helpers/help-JWT");
const buildResponse = require("../helpers/buildresponse");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        // If the password isn't valid
        const validatePassword = bcrypt.compareSync(
            password,
            user.password
        );
        if (!validatePassword) return false;

        if (!user) return res.status(400).json({
            msg: "The email or the password isn't correct",
        })

        const payload = { id: user.id, email: user.email }


        // Generate JWT
        const token = await generateJWT(payload);

        res.json(buildResponse(user, {
            msg: "The user has been logged correctly",
            dataName: "user",
            customFields: { token },
            excludedFields: [ "password" ]
        }));
    } catch (err) {
        console.log(err);

        res.status(500).json({ err });
    }
};

const renewToken = async (req, res) => {
    const { authUser } = req;

    // Generate JWT
    const token = await generateJWT({ id: authUser.id, email: authUser.email });

    res.json({
        user: authUser,
        token
    })
}

module.exports = {
    login,
    renewToken
};