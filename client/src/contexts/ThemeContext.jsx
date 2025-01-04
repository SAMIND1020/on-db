/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { THEME_TYPES } from "../types";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || THEME_TYPES.LIGHT;
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTheme, ThemeProvider };
