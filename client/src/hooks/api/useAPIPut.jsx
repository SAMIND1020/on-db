import { useCallback, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useAPIPut = ({ endpoint, id }) => {
    const { api } = useServerContext();

    const [data, setData] = useState([]);

    const putData = useCallback(
        async (body, _id) => {
            const res = await api.put(`${endpoint}/${id || _id}`, body, {
                validateToken: true,
            });

            setData(res);
            return res;
        },
        [api, endpoint, id]
    );

    return { data, putData };
};

export default useAPIPut;
