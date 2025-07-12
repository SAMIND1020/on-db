import { useCallback, useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useAPIPost = ({ endpoint }) => {
    const { api } = useServerContext();

    const [data, setData] = useState([]);

    const postData = useCallback(
        async (body) => {
            const res = await api.post(endpoint, body, {
                validateToken: true,
            });

            setData(res);
            return res;
        },
        [api, endpoint]
    );

    return { data, postData };
};

export default useAPIPost;
