/* eslint-disable react/prop-types */
import { ALERT_TYPES } from "../../types";

const Alert = ({ children, type }) => {
    const alertStyles = {
        [ALERT_TYPES.ERROR]: "bg-red-600 text-white",
        [ALERT_TYPES.SUCCESS]: "bg-green-600 text-white",
        [ALERT_TYPES.WARNING]: "bg-yellow-500 text-black",
        [ALERT_TYPES.INFO]: "bg-blue-500 text-white",
    };

    const selectedStyle = alertStyles[type] || "bg-gray-300 text-black";

    return <div className={`p-3 rounded-xl ${selectedStyle}`}>{children}</div>;
};

export default Alert;
