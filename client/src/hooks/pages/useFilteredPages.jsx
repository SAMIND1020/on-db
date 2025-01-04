import { useState, useEffect } from "react";

import { ROLES_TYPES } from "../../types";

const useFilteredPages = (pages, user) => {
    const [filteredPages, setFilteredPages] = useState([]);

    useEffect(() => {
        const allowedPaths = ["home", "groups", "settings", "events"];
        const role = user?.rol;

        setFilteredPages(
            pages.filter((p) => {
                if (p.path === "login") return false;
                if (
                    role === ROLES_TYPES.ADMIN ||
                    role === ROLES_TYPES.ADMIN_INFLUENCER
                )
                    return true;

                if (role === ROLES_TYPES.INFLUENCER)
                    return allowedPaths.includes(p.path);

                return p.path === "home";
            })
        );
    }, [pages, user]);

    return filteredPages;
};

export default useFilteredPages;
