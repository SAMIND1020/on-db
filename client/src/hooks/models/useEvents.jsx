import useAPIGet from "../api/useAPIGet";
import Event from "../../models/Event";

const useGetEvents = (options = {}) => {
    const {data, api} = useAPIGet({
        endpoint: "/events",
        parser: (res) => (res.events || []).map((p) => new Event(p)),
        ...options,
    });

    return { events: data, ...api };
};

export { useGetEvents };
