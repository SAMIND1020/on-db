const { Router } = require("express");
const { check } = require("express-validator");

const { ID_TYPES, MARITALSTATUS_TYPES } = require("../helpers/types");

const { firstCommit } = require("../database/config")

const {
    validateInputs,
    personExistById,
    createMiddlewares,
    emailPersonExist,
    phonePersonExist,
    identityPersonExist,
    influencerExistById,
    validateJWT,
    validateIsAdminByJWT,
} = require("../middlewares");

const {
    getPeople,
    getPersonById,
    postPeople,
    putPeople,
    deletePeople
} = require("../controllers/people");


const routes = Router();

const middlewaresPeople = createMiddlewares({
    requiredMiddlewares: [
        check("name", "The name must be a string").isString(),
        check("email", "The email is not valid").isEmail(),
        check('email').custom(emailPersonExist),
        check("phone", "The phone is not valid").isNumeric(),
        check('phone').custom(phonePersonExist),
        check("identity", "The identity is not valid").isNumeric(),
        check('identity').custom(identityPersonExist),
        check('influencer_id').custom(influencerExistById)
    ],
    optionalMiddlewares: [
        check('address_lat', "The address_lat must be a float").optional({ checkFalsy: true }).isFloat(),
        check('address_lon', "The address_lon must be a float").optional({ checkFalsy: true }).isFloat(),
        check('familiy', "The familiy must be a string").optional({ checkFalsy: true }).isString(),
        check('marital_status', `Invalid marital_status. Must be one of: ${Object.values(MARITALSTATUS_TYPES).join(', ')}`)
            .optional({ checkFalsy: true }).isIn(Object.values(MARITALSTATUS_TYPES)),
        check('id_type', `Invalid id_type. Must be one of: ${Object.values(ID_TYPES).join(', ')}`)
            .optional({ checkFalsy: true }).isIn(Object.values(ID_TYPES)),
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
], getPeople);

routes.get(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(personExistById),
        validateJWT,
        validateInputs,
    ],
    getPersonById
);

routes.post(
    "/",
    [
        ...middlewaresPeople({ optional: false }),
        !firstCommit ? validateJWT : null,
        !firstCommit ? validateIsAdminByJWT : null,
        validateInputs,
    ].filter(Boolean),
    postPeople
);

routes.put(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(personExistById),
        ...middlewaresPeople({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    putPeople
);

routes.delete(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(personExistById),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    deletePeople
);

module.exports = routes;
