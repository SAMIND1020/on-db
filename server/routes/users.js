const { Router } = require("express");
const { check } = require("express-validator");

const { ROLES_TYPES } = require("../helpers/types");

const { firstCommit } = require("../database/config");

const {
    validateInputs,
    userExistById,
    createMiddlewares,
    personIdUserExist,
    emailUserExist,
    validateJWT,
    validateIsAdminByJWT,
    personExistById,
} = require("../middlewares");

const { getUsers, getUserById, postUsers, putUsers, deleteUsers } = require("../controllers/users");

const routes = Router();

const middlewaresUsers = createMiddlewares({
    requiredMiddlewares: [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(emailUserExist),
        check('rol', 'The rol is required').not().isEmpty(),
        check('rol').isIn([ROLES_TYPES.ADMIN, ROLES_TYPES.INFLUENCER]),
        check('person_id', 'The person_id is required').not().isEmpty(),
        check('person_id').custom(personExistById),
        check('person_id').custom(personIdUserExist)
    ]
})

routes.get("/", [
    check("page", "The page must be numberic").isNumeric(),
    validateInputs,
    check("page").custom((page) => {
        if ((Number(page) - 1) >= 0) return true;
        throw new Error('The page isnt valid')
    }),
    validateJWT,
    validateInputs
], getUsers);

routes.get(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(userExistById),
        validateJWT,
        validateInputs,
    ],
    getUserById
);

routes.post(
    "/",
    [
        ...middlewaresUsers({ optional: false }),
        !firstCommit ? validateJWT : null,
        !firstCommit ? validateIsAdminByJWT : null,
        validateInputs,
    ].filter(Boolean),
    postUsers
);

routes.put(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(userExistById),
        ...middlewaresUsers({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    putUsers
);

routes.delete(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(userExistById),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    deleteUsers
);

module.exports = routes;
