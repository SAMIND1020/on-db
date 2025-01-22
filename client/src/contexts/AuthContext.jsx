/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

import { useRenewToken } from "../hooks/models/useAuth";

import User from "../models/User";
import { useServerContext } from "./ServerContext";

import { encryptToken, decryptToken } from "../helpers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { renewTokenResponse, fetchRenewToken } = useRenewToken();
    const { setServerToken } = useServerContext();

    const [user, _setUser] = useState({});
    const [token, setToken] = useState(
        () => decryptToken(localStorage.getItem("token")) || ""
    );

    const setUser = (response) => {
        const newUser =
            Object.keys(response.user).length !== 0
                ? new User(response.user)
                : {};
        _setUser(newUser);
        setToken(response.token);
    };

    useEffect(() => {
        setServerToken(token);
        localStorage.setItem("token", encryptToken(token));
    }, [token, setServerToken]);

    useEffect(() => {
        if (
            !renewTokenResponse ||
            Object.keys(renewTokenResponse).length === 0
        ) {
            if (typeof token === "string" && token !== "") fetchRenewToken();
            return;
        }

        if (renewTokenResponse.token) setUser(renewTokenResponse);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renewTokenResponse]);

    return (
        <AuthContext.Provider value={{ user, setUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContext");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuthContext, AuthProvider };
