const jwt = require("jsonwebtoken");

const generateJWT = ({id, email}) => {
    return new Promise((resolve, reject) => {
        const payload = { id, email };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: "3h" },
            (err, token) => {
                if(err) reject(err)
                else resolve(token);
            }
        );
    });
};

module.exports = {
    generateJWT,
};