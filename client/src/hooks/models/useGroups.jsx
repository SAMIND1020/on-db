import useAPIGet from "../api/useAPIGet";
import Group from "../../models/Group";

const useGetGroups = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/groups",
        parser: (res) => (res.groups || []).map((p) => new Group(p)),
        ...options,
    });

    return { groups: data, loading, error, getData };
};

export { useGetGroups };
