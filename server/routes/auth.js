const { Router } = require("express");
const { check } = require("express-validator");

const { login, renewToken } = require("../controllers/auth");

const { validateInputs, emailUserExist, validateJWT } = require("../middlewares");

const routes = Router();

routes.post("/login", [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
], login);

routes.get("/", validateJWT, renewToken);

module.exports = routes;