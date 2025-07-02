function createMiddlewares({ requiredMiddlewares = [], optionalMiddlewares = [] }) {
  return (options = {}) => {
    const { optional = false } = options;
    const middlewares = [...optionalMiddlewares];

    middlewares.push(
      ...requiredMiddlewares.map(mw => {
        if (typeof mw !== 'function' || typeof mw.run === 'function')
          throw new Error("No es una funcion valida: () => check...");

        return optional ? mw().optional({ checkFalsy: true }) : mw();
      })
    );

    return middlewares;
  };
}

module.exports = createMiddlewares;