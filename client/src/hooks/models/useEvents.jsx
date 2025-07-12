import useAPIGet from "../api/useAPIGet";
import useAPIPost from "../api/useAPIPost";
import Event from "../../models/Event";

const useGetEvents = (options = {}) => {
    const { data, loading, error, getData } = useAPIGet({
        endpoint: "/events",
        parser: (res) => (res.events || []).map((p) => new Event(p)),
        ...options,
    });

    return { events: data, loading, error, getData };
};

const usePostEvent = ({ group_id }) => {
    const { data, loading, error, postData } = useAPIPost({
        endpoint: !isNaN(group_id) ? `/groups/${group_id}/events` : "/events",
    });

    return { postResponse: data, loading, error, postData };
};

export { useGetEvents, usePostEvent };
