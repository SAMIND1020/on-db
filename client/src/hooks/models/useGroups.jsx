import { useEffect, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";
import { useAuthContext } from "../../contexts/AuthContext";

const useGetGroups = ({ onLoadPage = () => {} }) => {
    const { api } = useServerContext();
    const { token } = useAuthContext();

    const [getGroupsResponse, setGetGroupsResponse] = useState({});

    useEffect(() => {
        if (Object.keys(getGroupsResponse).length === 0) {
            if (typeof token === "string" && token !== "") fetchGetGroups();
            return;
        }
        
        if (
            Object.keys(getGroupsResponse).length !== 0 &&
            getGroupsResponse?.groups
        ) {
            onLoadPage(getGroupsResponse?.groups);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getGroupsResponse]);

    const fetchGetGroups = async () => {
        const res = await api.get("/groups?page=1", undefined, {
            validateToken: true,
        });

        setGetGroupsResponse(res);
        return res;
    };

    return { getGroupsResponse, fetchGetGroups };
};

export { useGetGroups };
