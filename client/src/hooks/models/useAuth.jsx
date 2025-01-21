import { useState } from "react";

import { useServerContext } from "../../contexts/ServerContext";

const useLogin = () => {
    const { api } = useServerContext();

    const [loginResponse, setLoginResponse] = useState({});

    const fetchLogin = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });

        setLoginResponse(res);
        return res;
    };

    return { loginResponse, fetchLogin };
};

const useRenewToken = () => {
    const { api } = useServerContext();

    const [renewTokenResponse, setRenewTokenResponse] = useState({});

    const fetchRenewToken = async () => {
        const res = await api.get("/auth", undefined, {
            validateToken: true,
        });

        setRenewTokenResponse(res);
        return res;
    };

    return { renewTokenResponse, fetchRenewToken };
};

export { useLogin, useRenewToken };
