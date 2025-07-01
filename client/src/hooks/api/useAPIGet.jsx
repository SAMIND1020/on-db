import { useCallback, useEffect, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useAPIGet = ({
    endpoint,
    parser = (x) => x,
    page = 1,
    autoLoad = true,
    onLoad = () => {},
}) => {
    const { api } = useServerContext();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const res = await api.get(`${endpoint}?page=${page}`, undefined, {
            validateToken: true,
        });

        const parsed = parser(res);
        setData(parsed);
        onLoad(parsed);
        return parsed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[api, endpoint, page]);

    useEffect(() => {
        if (autoLoad) fetchData();
    }, [autoLoad, fetchData]);

    return { data, loading, error, fetchData };
};

export default useAPIGet;
