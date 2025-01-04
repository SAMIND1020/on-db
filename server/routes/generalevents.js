const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateJWT,
    validateInputs,
    generalEventExistById,
    createMiddlewares,
    membersExistsById,
    validateIsAdminByJWT
} = require("../middlewares");

const {
    getGeneralEvents,
    getGeneralEventById,
    postGeneralEvents,
    putGeneralEvents,
    deleteGeneralEvents
} = require("../controllers/generalevents");

const routes = Router();

const middlewaresGeneralEvents = createMiddlewares({
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

routes.get("/", [
    check("page", "The page must be numberic").isNumeric(),
    validateInputs,
    check("page").custom((page) => {
        if ((Number(page) - 1) >= 0) return true;
        throw new Error('The page isnt valid')
    }),
    validateJWT,
    validateInputs
], getGeneralEvents);

routes.get(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(generalEventExistById),
        validateJWT,
        validateInputs
    ],
    getGeneralEventById
);

routes.post(
    "/",
    [
        ...middlewaresGeneralEvents({ optional: false }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    postGeneralEvents
);

routes.put(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(generalEventExistById),
        ...middlewaresGeneralEvents({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    putGeneralEvents
);

routes.delete(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(generalEventExistById),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    deleteGeneralEvents
);

module.exports = routes;
