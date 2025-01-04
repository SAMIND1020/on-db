const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");

const { validateInputs, emailUserExist } = require("../middlewares");

const routes = Router();

routes.post("/login", [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('email', "There isnt a user with that email").not().custom(emailUserExist),
    validateInputs
], login);

// routes.post("/", validateJWT, renewToken);

module.exports = routes;