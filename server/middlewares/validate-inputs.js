const { validationResult } = require('express-validator');
const { ID_TYPES } = require('../helpers/types');


const validateInputs = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateInputs
}