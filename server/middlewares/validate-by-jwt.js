const { ROLES_TYPES } = require("../helpers/types");
const { User } = require("../models");

const validateIDByJWT = (req, res, next) => {
    const { id } = req.params;
    const authUser = req.authUser;

    if (authUser.id != id) return res.status(401).json({ msg: "Unauthorized user" });

    next();
}

/* const validateMemberByJWT = (req, res, next) => {
     const { id } = req.params;
     const authUser = req.authUser;

     const fn = async () => {
         const member = await ProjectsToUser.findOne({ where: { projectId: id, userId: authUser.id } });

         if (!member) return res.status(401).json({ msg: "Unauthorized user" });

         next();
     }

     fn();
 }*/

const validateIsAdminByJWT = (req, res, next) => {
    const authUser = req.authUser;

    const fn = async () => {
        const user = await User.findOne({ where: { id: authUser.id, rol: ROLES_TYPES.ADMIN } });

        if (!user) return res.status(401).json({ msg: "Unauthorized user" });

        next();
    }

    fn();
}

module.exports = {
    validateIDByJWT,
    // validateMemberByJWT,
    validateIsAdminByJWT,
}