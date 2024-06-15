/* eslint-disable react/prop-types */
import { ALERT_TYPES } from "../../types";

export default function Alert({ alert, setAlert }) {
    return (
        <>
            {Object.values(alert).length != 0 && (
                <div
                    className={`${
                        alert.type !== ALERT_TYPES.ERROR
                            ? alert.type !== ALERT_TYPES.SUCCESS
                                ? "bg-indigo-700"
                                : "bg-green-700"
                            : "bg-red-700"
                    } p-1 text-white rounded-lg text-center`}
                >
                    {typeof alert.msg != "string" ? (
                        alert.msg
                    ) : (
                        <p>{alert.msg}</p>
                    )}
                    {alert.type === ALERT_TYPES.CONFIRM && (
                        <div>
                            <button
                                className="bg-green-700 text-sm p-1 rounded-md mx-1"
                                onClick={alert.handleConfirm}
                            >
                                Aceptar
                            </button>
                            <button
                                className="bg-red-700 text-sm p-1 rounded-md mx-1"
                                onClick={() => setAlert({})}
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
