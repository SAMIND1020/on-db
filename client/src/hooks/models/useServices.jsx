import useAPIGet from "../api/useAPIGet";
import useAPIPut from "../api/useAPIPut";
import Service from "../../models/Service";

const useGetServices = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/services",
        parser: (res) => (res.services || []).map((p) => new Service(p)),
        ...options,
    });

    return { services: data, loading, error, getData };
};

const usePutServices = (options = {}) => {
    const { data, loading, error, putData } = useAPIPut({
        endpoint: "/services",
        ...options,
    });

    return { putResponse: data, loading, error, putData };
};

export { useGetServices, usePutServices };
