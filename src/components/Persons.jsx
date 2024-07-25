/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Person, { PersonMobile } from "./Person";
import Alert from "./Alert";
import { ALERT_TYPES } from "../../types";
import { deletePerson } from "../../firebase/firebaseDB";

export default function Persons({
    handleChangeOrder,
    persons,
    deleteMode,
    refreshPersons,
    alert,
    setAlert,
    handleUpdatePerson
}) {
    useEffect(() => {
        if (typeof deleteMode == "boolean")
            setAlert({
                msg: deleteMode
                    ? "Modo Eliminar Activado"
                    : "Modo Eliminar Desactivado",
                type: ALERT_TYPES.ALERT,
            });

        setTimeout(() => {
            setAlert({});
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteMode]);

    const handleDeletePerson = (person) => {
        const res = deletePerson(person);

        if (!Object.keys(res).length != 0) return;

        setAlert({
            msg: `Se ha eliminado la persona ${person.Nombre} correctamente`,
            type: ALERT_TYPES.SUCCESS,
        });

        refreshPersons();
    };
    return (
        <div>
            <table className="md:table hidden">
                <thead>
                    <tr>
                        <th
                            className="border border-black p-2 hover:cursor-pointer"
                            id="Nombre"
                            onClick={handleChangeOrder}
                        >
                            Nombre <span className="text-xs">▲▼</span>
                        </th>
                        <th
                            className="border border-black p-2 hover:cursor-pointer"
                            id="Correo"
                            onClick={handleChangeOrder}
                        >
                            Correo <span className="text-xs">▲▼</span>
                        </th>
                        <th className="border border-black p-2">Telefono</th>
                        <th className="border border-black p-2">Edad</th>
                        <th className="border border-black p-2">Grupos</th>
                        <th className="border border-black p-2">Servicios</th>
                        <th className="border border-black p-2">Incluencer</th>
                    </tr>
                </thead>
                <tbody className="users">
                    {persons.length != 0 &&
                        persons.map((person) => (
                            <Person key={person.id} person={person}>
                                <>
                                    <td>
                                        <button
                                            className="px-1 border border-black rounded-lg text-2xl ml-1 hover:bg-slate-400"
                                            onClick={() => {
                                                handleUpdatePerson(person)
                                            }}
                                        >
                                            ✎
                                        </button>
                                    </td>
                                    {typeof deleteMode == "boolean" &&
                                        deleteMode && (
                                            <td>
                                                <button
                                                    className="py-2 my-3 px-1 ml-1 bg-red-700 hover:bg-red-800 text-white font-bold border border-black rounded-lg text-xs"
                                                    onClick={() =>
                                                        setAlert({
                                                            msg: `¿Desea eliminar la persona ${person.Nombre}?`,
                                                            type: ALERT_TYPES.CONFIRM,
                                                            handleConfirm: () =>
                                                                handleDeletePerson(
                                                                    person
                                                                ),
                                                        })
                                                    }
                                                >
                                                    Borrar
                                                </button>
                                            </td>
                                        )}
                                </>
                            </Person>
                        ))}
                </tbody>
            </table>
            <div className="md:hidden block">
                {persons.length != 0 &&
                    persons.map((person) => (
                        <PersonMobile key={person.id} person={person}>
                            <div className="flex items-center h-fit">
                                <button
                                    className="px-1 border border-black rounded-lg text-2xl ml-1 h-fit hover:bg-slate-400"
                                    onClick={() => {}}
                                >
                                    ✎
                                </button>
                                {typeof deleteMode == "boolean" &&
                                    deleteMode && (
                                        <button
                                            className="p-1 my-1 h-fit ml-1 text-sm bg-red-700 hover:bg-red-800 text-white font-bold border border-black rounded-lg"
                                            onClick={() =>
                                                setAlert({
                                                    msg: `¿Desea eliminar la persona ${person.Nombre}?`,
                                                    type: ALERT_TYPES.CONFIRM,
                                                    handleConfirm: () =>
                                                        handleDeletePerson(
                                                            person
                                                        ),
                                                })
                                            }
                                        >
                                            Borrar
                                        </button>
                                    )}
                            </div>
                        </PersonMobile>
                    ))}
            </div>

            <div>
                {Object.keys(alert).length != 0 && (
                    <div className="fixed top-10 sm:left-[40dvw] left-[30dvw]">
                        <div className="relative">
                            <section className="w-full z-10 sticky">
                                <div className="flex items-center justify-center">
                                    <div
                                        className={`font-bold p-2 rounded-xl border-2 ${
                                            alert.type == ALERT_TYPES.SUCCESS
                                                ? "bg-green-700 border-green-900"
                                                : "bg-indigo-700 border-indigo-900"
                                        }`}
                                    >
                                        <Alert
                                            alert={alert}
                                            setAlert={setAlert}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
