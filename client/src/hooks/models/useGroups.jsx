import useAPIGet from "../api/useAPIGet";
import useAPIPut from "../api/useAPIPut";
import Group from "../../models/Group";

const useGetGroups = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/groups",
        parser: (res) => (res.groups || []).map((p) => new Group(p)),
        ...options,
    });

    return { groups: data, loading, error, getData };
};

const usePutGroups = (options = {}) => {
    const { data, loading, error, putData } = useAPIPut({
        endpoint: "/groups",
        ...options,
    });

    return { putResponse: data, loading, error, putData };
};

export { useGetGroups, usePutGroups };
