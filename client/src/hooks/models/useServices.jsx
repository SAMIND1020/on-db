import useAPIGet from "../api/useAPIGet";
import Service from "../../models/Service";

const useGetServices = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/services",
        parser: (res) => (res.services || []).map((p) => new Service(p)),
        ...options,
    });

    return { services: data, loading, error, getData };
};

export { useGetServices };
