/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Person, { PersonMobile } from "./Person";
import { ALERT_TYPES } from "../../types";
import { deletePerson } from "../../firebase/firebaseDB";

export default function Persons({
    handleChangeOrder,
    persons,
    deleteMode,
    refreshPersons,
    setAlert,
    handleUpdatePerson,
    editButton,
    children
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
                        <th className="border border-black p-2">Influencer</th>
                    </tr>
                </thead>
                <tbody className="users">
                    {persons.length != 0 &&
                        persons.map((person) => (
                            <Person key={person.id} person={person}>
                                <>
                                    {typeof editButton == "boolean" &&
                                        editButton && (
                                            <td>
                                                <button
                                                    className="px-1 border border-black rounded-lg text-2xl ml-1 hover:bg-slate-400"
                                                    onClick={() => {
                                                        handleUpdatePerson(
                                                            person
                                                        );
                                                    }}
                                                >
                                                    ✎
                                                </button>
                                            </td>
                                        )}
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
                                {typeof editButton == "boolean" &&
                                    editButton && (
                                        <button
                                            className="px-1 border border-black rounded-lg text-2xl ml-1 h-fit hover:bg-slate-400"
                                            onClick={() => {}}
                                        >
                                            ✎
                                        </button>
                                    )}
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

            {children}
        </div>
    );
}
