/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {
    getGroupMembers,
    updateInscribedPersons,
} from "../../../firebase/firebaseDB";

import { ALERT_TYPES } from "../../../types";
import Alert from "../Alert";
import { PersonMobile } from "../Person";

export default function ViewInscribedModal({
    e,
    setViewInscribedModal,
    updateEvent,
    isActive,
}) {
    const [inscribePersonModal, setInscribePersonModal] = useState(false);

    useEffect(() => {
        updateEvent();
    }, [inscribePersonModal, updateEvent]);

    return (
        <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 fixed">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-xl">
                    <button
                        className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                        onClick={() => setViewInscribedModal(false)}
                    >
                        {"<"} Cerrar
                    </button>
                    <h1 className="text-3xl font-black mb-5">{e.Nombre}</h1>
                    <h2 className="text-xl font-black mb-5">
                        {isActive ? "Asistencias" : "Personas Inscritas"}
                    </h2>

                    {!e.Asistencias.length && (
                        <p className="ml-2">No hay personas inscritas</p>
                    )}

                    {e.Asistencias.map((a, i) => (
                        <PersonMobile key={i} person={a} extra={false} />
                    ))}

                    <div className="flex justify-between">
                        <div></div>

                        <button
                            className="px-2 rounded-lg border-2 border-black text-xl font-bold mt-4"
                            onClick={() => setInscribePersonModal(true)}
                        >
                            {"+"}
                        </button>
                    </div>

                    {inscribePersonModal && (
                        <_InscribePersonModal
                            setInscribePersonModal={setInscribePersonModal}
                            e={e}
                            isActive={isActive}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

const _InscribePersonModal = ({ setInscribePersonModal, e, isActive }) => {
    const [groupMembers, setGroupMembers] = useState([]);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        const fn = async () => {
            const thisGroupMembers = await getGroupMembers(e.Grupo);

            thisGroupMembers.forEach((m, i) => {
                thisGroupMembers[i].isInscribed =
                    e.Asistencias.filter((a) => m.Documento === a.Documento)
                        .length > 0;
            });

            setGroupMembers(thisGroupMembers);
        };
        fn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInscribePerson = (e2) => {
        e2.preventDefault();

        const fn = async () => {
            const a = await updateInscribedPersons(
                groupMembers.filter((m) => m.isInscribed),
                e
            );

            if (a)
                setAlert({
                    msg: isActive
                        ? "Se han cambiado las asistencias correctamente"
                        : "Se han registrado las personas correctamente",
                    type: ALERT_TYPES.SUCCESS,
                });

            setTimeout(() => {
                setInscribePersonModal(false);
                setAlert({});
            }, 2000);
        };
        fn();
    };

    return (
        <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 fixed">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-xl">
                    <button
                        className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                        onClick={() => setInscribePersonModal(false)}
                    >
                        {"<"} Cerrar
                    </button>
                    <h1 className="text-3xl font-black mb-5">
                        {isActive ? "Asistencias" : "Inscribir Personas"}
                    </h1>
                    <form onSubmit={handleInscribePerson}>
                        {groupMembers &&
                            groupMembers.map((m) => (
                                <article
                                    key={m.Documento}
                                    className="flex justify-between gap-11"
                                >
                                    <label htmlFor={m.Documento}>
                                        {m.Nombre}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={m.Documento}
                                        checked={m.isInscribed}
                                        onChange={() => {
                                            setGroupMembers(
                                                groupMembers.map((a) =>
                                                    a.Documento != m.Documento
                                                        ? a
                                                        : {
                                                              ...a,
                                                              isInscribed:
                                                                  !m.isInscribed,
                                                          }
                                                )
                                            );
                                        }}
                                    />
                                </article>
                            ))}
                        <div className="flex justify-between">
                            <div></div>

                            <input
                                type="submit"
                                value={
                                    isActive
                                        ? "Cambiar Asistencias"
                                        : "Inscribir Personas"
                                }
                                className="p-1 border-2 border-black rounded-lg text-white mt-5 text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                            />
                        </div>
                    </form>
                    <div className="mt-5">
                        <Alert alert={alert} />
                    </div>
                </div>
            </div>
        </section>
    );
};
