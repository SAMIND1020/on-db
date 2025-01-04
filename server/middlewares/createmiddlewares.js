function createMiddlewares({ requiredMiddlewares = [], optionalMiddlewares = [] }) {
    return (options = {}) => {
        const { optional = {} } = options;
        const middlewares = [...optionalMiddlewares];

        if (optional)
            middlewares.push(...requiredMiddlewares.map(middleware => middleware.optional({ checkFalsy: true })));
        else
            middlewares.push(...requiredMiddlewares)

        return middlewares
    }
}

module.exports = createMiddlewares;