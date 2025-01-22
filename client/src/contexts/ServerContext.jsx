/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ServerContext = createContext();

const ServerProvider = ({ children }) => {
    const [serverToken, setServerToken] = useState("");

    const fetchResponse = async (method, url, body, options = {}) => {
        const { validateToken } = options;

        if (validateToken && !serverToken) return {};

        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/server${url}`,
            {
                method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-token": serverToken,
                },
                body: method !== "GET" ? JSON.stringify(body) : undefined,
            }
        );

        // TODO: First restart errors(login error "Password incorrect" doesn´t work in the first load)
        return await response.json();
    };

    const api = {
        get: (url, body, options) => fetchResponse("GET", url, body, options),
        post: (url, body, options) => fetchResponse("POST", url, body, options),
        put: (url, body, options) => fetchResponse("PUT", url, body, options),
        delete: (url, body, options) =>
            fetchResponse("DELETE", url, body, options),
    };

    return (
        <ServerContext.Provider value={{ api, setServerToken }}>
            {children}
        </ServerContext.Provider>
    );
};

const useServerContext = () => {
    const context = useContext(ServerContext);
    if (!context) {
        throw new Error("useServerContext must be used within a ServerContext");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useServerContext, ServerProvider };
