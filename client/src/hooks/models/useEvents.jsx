import { useEffect, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useGetEvents = ({ onLoadPage = () => {} }) => {
    const { api } = useServerContext();

    const [getEventsResponse, setGetEventsResponse] = useState({});

    useEffect(() => {
        if (Object.keys(getEventsResponse).length === 0) {
            fetchGetEvents();
            return;
        }

        if (
            Object.keys(getEventsResponse).length !== 0 &&
            getEventsResponse?.events
        ) {
            onLoadPage(getEventsResponse?.events);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getEventsResponse]);

    const fetchGetEvents = async () => {
        const res = await api.get("/events?page=1", undefined, {
            validateToken: true,
        });

        setGetEventsResponse(res);
        return res;
    };

    return { getEventsResponse, fetchGetEvents };
};

export { useGetEvents };
