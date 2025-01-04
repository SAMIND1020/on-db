const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There arent token in the request'
        });
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valid'
            })
        }


        req.authUser = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valid'
        })
    }

}




module.exports = {
    validateJWT
}