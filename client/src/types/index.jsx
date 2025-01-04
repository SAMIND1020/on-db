// chartConfig.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const INPUT_TYPES = Object.freeze({
    TEXT: "text",
    SELECT: "select",
    CHECKBOXES: "checkboxes",
    DATE: "date",
});

export const ID_TYPE_TYPES = Object.freeze([
    { label: "Citizenship Card", value: "C.C" },
    { label: "Identity Card", value: "T.I" },
    { label: "Foreigner's Identity Card", value: "C.E" },
]);

export const MARITAL_STATUS_TYPES = Object.freeze([
    "single",
    "married",
    "divorced",
    "widowed",
    "separated",
]);

export const ROLES_TYPES = Object.freeze({
    ADMIN: "Admin",
    INFLUENCER: "Influencer",
    ADMIN_INFLUENCER: "Admin_Influencer",
});

export const COLORS_TYPES = Object.freeze([
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
]);

export const THEME_TYPES = Object.freeze({ LIGHT: "light", DARK: "dark" });
