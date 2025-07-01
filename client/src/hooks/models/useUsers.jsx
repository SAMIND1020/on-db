import useAPIGet from "../api/useAPIGet";
import User from "../../models/User";

const useGetUsers = (options = {}) => {
    const {data, api} = useAPIGet({
        endpoint: "/users",
        parser: (res) => (res.users || []).map((p) => new User(p)),
        ...options,
    });

    return { users: data, ...api };
};

export { useGetUsers };
