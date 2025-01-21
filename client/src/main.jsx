import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { ServerProvider } from "./contexts/ServerContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ServerProvider>
            <AuthProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </ServerProvider>
    </StrictMode>
);
