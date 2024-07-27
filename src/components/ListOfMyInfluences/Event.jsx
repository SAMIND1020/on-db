/* eslint-disable react/prop-types */
import { useState } from "react";
import { EVENTS_STATUS } from "../../../types";
import ViewInscribedModal from "./ViewInscribedModal";

export default function Event({ e, updateEvent }) {
    const [viewInscribedModal, setViewInscribedModal] = useState(false);

    return (
        <article className="w-80">
            <h4 className="text-lg font-bold">{e.Nombre}</h4>
            <p>
                <span className="font-bold">Fecha de Inicio: </span>
                {e.FechaInicio}
            </p>
            <p>
                <span className="font-bold">Fecha de Finalización: </span>
                {e.FechaFinalizacion}
            </p>
            <p>
                <span className="font-bold">Estado: </span>
                <span
                    className={`${
                        e.status == EVENTS_STATUS.ACTIVE
                            ? "bg-green-600"
                            : e.status == EVENTS_STATUS.SOON
                            ? "bg-indigo-500"
                            : "bg-red-600"
                    } p-1`}
                >
                    {e.status}
                </span>
            </p>
            {e.status == EVENTS_STATUS.SOON ? (
                <p
                    className=" px-1 font-bold border-2 border-black w-fit rounded-lg mt-1 hover:cursor-pointer"
                    onClick={() => setViewInscribedModal(true)}
                >
                    Ver Inscritos
                </p>
            ) : (
                e["Fecha de Finalizacion"].toDate().getTime() - Date.now() <
                    21600000 && (
                    <p
                        className=" px-1 font-bold border-2 border-black w-fit rounded-lg mt-1 hover:cursor-pointer"
                        onClick={() => setViewInscribedModal(true)}
                    >
                        Ver Asistencias
                    </p>
                )
            )}
            {viewInscribedModal && (
                <ViewInscribedModal
                    e={e}
                    setViewInscribedModal={setViewInscribedModal}
                    updateEvent={updateEvent}
                    isActive={e.status == EVENTS_STATUS.ACTIVE}
                />
            )}
        </article>
    );
}
