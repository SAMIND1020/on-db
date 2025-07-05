/* eslint-disable react/prop-types */
import { ALERT_TYPES } from "../../types";

const Alert = ({ children, type, size = "md" }) => {
    const alertStyles = {
        [ALERT_TYPES.ERROR]: "bg-red-600 text-white",
        [ALERT_TYPES.SUCCESS]: "bg-green-600 text-white",
        [ALERT_TYPES.WARNING]: "bg-yellow-500 text-black",
        [ALERT_TYPES.INFO]: "bg-blue-500 text-white",
    };

    const sizeStyle =
        size === "sm"
            ? "px-1 pt-1 pb-[3px] rounded-lg text-xs line-clamp-1 overflow-hidden text-ellipsis hover:line-clamp-none hover:mb-2 max-w-[225px] h-fit leading-tight"
            : size === "md"
            ? "p-3 rounded-xl text-[14.5px]"
            : "";
    const selectedStyle = alertStyles[type] || "bg-gray-300 text-black";

    return <div className={`${sizeStyle} ${selectedStyle}`}>{children}</div>;
};

export default Alert;
