import useAPIGet from "../api/useAPIGet";
import Service from "../../models/Service";

const useGetServices = (options = {}) => {
    const {data, api} = useAPIGet({
        endpoint: "/services",
        parser: (res) => (res.services || []).map((p) => new Service(p)),
        ...options,
    });

    return { services: data, ...api };
};

export { useGetServices };
