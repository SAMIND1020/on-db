const createMiddlewares = require('./createmiddlewares')
const dbValidators = require("./db-validators");
const validateByJWT = require("./validate-by-jwt");
const validateInputs = require("./validate-inputs");
const validateJWT = require("./validate-jwt");

module.exports = {
    ...dbValidators,
    ...validateByJWT,
    ...validateInputs,
    ...validateJWT,
    createMiddlewares,
}