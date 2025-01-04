const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateJWT,
    validateInputs,
    eventExistById,
    groupExistById,
    createMiddlewares,
    eventBelongsToGroup,
    membersExistsById,
    validateIsAdminByJWT
} = require("../middlewares");

const { getGroupEvents, postGroupEvents, putGroupEvents, deleteGroupEvents } = require("../controllers/eventsbygroup");

const routes = Router();

const middlewaresGroupEvents = createMiddlewares({
    requiredMiddlewares: [
        check("name", "The name is required").not().isEmpty(),
        check("init_date", "The init_date is required").not().isEmpty(),
        check("init_date", "The init_date must be a datetime with format 'YYYY-MM-DD HH:MM:SS'").isISO8601(),
        check("finish_date", "The finish_date is required").not().isEmpty(),
        check("finish_date", "The finish_date must be a datetime with format 'YYYY-MM-DD HH:MM:SS'").isISO8601(),
    ],
    optionalMiddlewares: [
        check('attendance', 'The attendance must be a array').optional({ checkFalsy: true }).isArray(),
        validateInputs,
        check('attendance').optional({ checkFalsy: true }).custom(membersExistsById)
    ]
})

routes.get("/:group_id/events", [
    check("group_id").custom(groupExistById),
    check("page", "The page must be numberic").isNumeric(),
    validateInputs,
    check("page").custom((page) => {
        if ((Number(page) - 1) >= 0) return true;
        throw new Error('The page isnt valid')
    }),
    validateJWT,
    validateInputs
], getGroupEvents);

routes.post(
    "/:group_id/events",
    [

        check("group_id").custom(groupExistById),
        ...middlewaresGroupEvents({ optional: false }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs
    ],
    postGroupEvents
);

routes.put(
    "/:group_id/events/:id",
    [
        check("group_id").custom(groupExistById),
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(eventExistById),
        check("id").custom(eventBelongsToGroup),
        ...middlewaresGroupEvents({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs
    ],
    putGroupEvents
);

routes.delete(
    "/:group_id/events/:id",
    [
        check("group_id").custom(groupExistById),
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(eventExistById),
        check("id").custom(eventBelongsToGroup),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs
    ],
    deleteGroupEvents
);

module.exports = routes;
