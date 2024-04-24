/* eslint-disable react/prop-types */
import { ALERT_TYPES } from "../../types";

export default function Alert({ alert }) {
    return (
        <>
            {Object.values(alert).length != 0 && (
                <p
                    className={`${
                        alert.type !== ALERT_TYPES.SUCCESS
                            ? "bg-red-700"
                            : "bg-green-700"
                    } p-1 text-white rounded-lg text-center mt-2`}
                >
                    {alert.msg}
                </p>
            )}
        </>
    );
}
