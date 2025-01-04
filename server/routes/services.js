const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateInputs,
    serviceExistById,
    createMiddlewares,
    validateJWT,
    validateIsAdminByJWT
} = require("../middlewares");

const { getServices, getServiceById, postServices, putServices, deleteServices } = require("../controllers/services");

const routes = Router();

const middlewaresServices = createMiddlewares({
    requiredMiddlewares: [
        check("name", "The name is required").not().isEmpty(),
        check("name", "The name must be a string").isString(),
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
], getServices);

routes.get(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(serviceExistById),
        validateJWT,
        validateInputs,
    ],
    getServiceById
);

routes.post(
    "/",
    [
        ...middlewaresServices({ optional: false }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    postServices
);

routes.put(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(serviceExistById),
        ...middlewaresServices({ optional: true }),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    putServices
);

routes.delete(
    "/:id",
    [
        check("id", "The id must be a number").isNumeric(),
        check("id").custom(serviceExistById),
        validateJWT,
        validateIsAdminByJWT,
        validateInputs,
    ],
    deleteServices
);

module.exports = routes;
