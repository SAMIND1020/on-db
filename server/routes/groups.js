const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateInputs,
    groupExistById,
    createMiddlewares,
    membersExistsById,
    validateIsAdminByJWT,
    validateJWT,
    influencersExistsById
} = require("../middlewares");

const { getGroups, getGroupById, postGroups, putGroups, deleteGroups } = require("../controllers/groups");

const routes = Router();

const middlewaresGroups = createMiddlewares({
    requiredMiddlewares: [
        check("name", "The name is required").not().isEmpty(),
        check("name", "The name must be a string").isString(),
    ],
    optionalMiddlewares: [
        check("description", "The description must be a string").optional({ checkFalsy: true }).isString(),
        check('members', 'The members must be a array').optional({ checkFalsy: true }).isArray(),
        check('influencers', 'The influencers must be a array').optional({ checkFalsy: true }).isArray(),
        validateInputs,
        check('members').optional({ checkFalsy: true }).custom(membersExistsById),
        check('influencers').optional({ checkFalsy: true }).custom(influencersExistsById)
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
    validateInputs,
], getGroups);

routes.get(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(groupExistById),
        validateJWT,
        validateInputs,
    ],
    getGroupById
);

routes.post(
    "/",
    [
        ...middlewaresGroups({ optional: false }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    postGroups
);

routes.put(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(groupExistById),
        ...middlewaresGroups({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    putGroups
);

routes.delete(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(groupExistById),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    deleteGroups
);

module.exports = routes;
