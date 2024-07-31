/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {
    updateEvent as updateEventDB,
    createEvent,
} from "../../../firebase/firebaseDB";
import { PAGES_TYPES } from "../../../types";

import FormInput from "../FormInput";

export default function CreatePersonModal({
    setCorUEventModal,
    refreshEvents,
    setAlert,
    updateEvent,
    setUpdateEvent,
    setGroup,
    group,
    groups,
}) {
    const [page, setPage] = useState(PAGES_TYPES.FIRST);
    const [data, setData] = useState({
        Nombre: "",
        FechaInicio: "",
        FechaFinalizacion: "",
        group,
    });
    const [error, setError] = useState({});

    useEffect(() => {
        if (Object.keys(updateEvent).length != 0) {
            const { FechaFinalizacion, FechaInicio } = updateEvent;

            setData({
                ...updateEvent,
                FechaFinalizacion: new Date(FechaFinalizacion)
                    .toISOString()
                    .split("T")[0],
                FechaInicio: new Date(FechaInicio).toISOString().split("T")[0],
            });
        }
    }, [updateEvent]);

    const handleCreateEvent = (e) => {
        e.preventDefault();

        const errorFirstPage = {};
        data["Fecha de Finalizacion"] = new Date(data.FechaFinalizacion);
        data["Fecha de Inicio"] = new Date(data.FechaInicio);

        if (!data.Nombre) errorFirstPage.Nombre = "Invalid Name";

        if (
            !data.FechaFinalizacion ||
            Date.now() - data["Fecha de Finalizacion"] > 0
        )
            errorFirstPage.FechaFinalizacion = "Invalid End Date";

        if (!data.FechaInicio || Date.now() - data["Fecha de Inicio"] > 0)
            errorFirstPage.FechaInicio = "Invalid Init Date";

        if (Object.keys(errorFirstPage).length) {
            setError({ ...errorFirstPage });
            return setPage(PAGES_TYPES.FIRST);
        }

        setError({});

        const res =
            Object.keys(updateEvent).length != 0
                ? updateEventDB(data)
                : createEvent(data);

        if (!res) return;

        setCorUEventModal(false);
        setTimeout(() => {
            refreshEvents();
            setAlert({
                msg: `Se ha ${
                    Object.keys(updateEvent).length != 0
                        ? "actualizado"
                        : "creado"
                } el evento ${data.Nombre} correctamente`,
            });
        }, 500);
        setTimeout(() => {
            setAlert({});
        }, 3500);
    };

    return (
        <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 absolute">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-xl">
                    <button
                        className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                        onClick={() => {
                            setCorUEventModal(false);
                            setUpdateEvent({});
                        }}
                    >
                        {"<"} Cerrar
                    </button>
                    <h1 className="text-3xl font-black mb-5">
                        {Object.keys(updateEvent).length != 0
                            ? "Actualizar Evento"
                            : "Crear Evento"}
                    </h1>
                    <select
                        className="border-2 border-black rounded-lg p-1 mb-5"
                        onChange={(e) =>
                            setGroup(
                                groups.filter((g) => g.id == e.target.value)[0]
                            )
                        }
                        value={group.id}
                    >
                        {groups.map((g) => (
                            <option value={g.id} key={g.id}>
                                {g.id}
                            </option>
                        ))}
                    </select>
                    <form onSubmit={handleCreateEvent}>
                        {page === PAGES_TYPES.FIRST ? (
                            <FirstPage
                                data={data}
                                setData={setData}
                                error={error}
                            >
                                <div className="flex justify-between mt-3">
                                    <div></div>
                                    <div className="flex gap-1">
                                        <input
                                            type="submit"
                                            className={
                                                "font-black p-1 border-2 border-black rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer"
                                            }
                                            value={
                                                Object.keys(updateEvent)
                                                    .length != 0
                                                    ? "Actualizar Evento"
                                                    : "Crear Evento"
                                            }
                                        />
                                    </div>
                                </div>
                            </FirstPage>
                        ) : (
                            <>ERROR</>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}

const FirstPage = ({ setData, data, error, children }) => {
    const { Nombre, FechaInicio, FechaFinalizacion } = data;

    const setFieldValue = (field, newValue) => {
        const newData = { ...data };
        newData[field] = newValue;
        setData({ ...newData });
    };

    return (
        <>
            <div className="flex flex-col gap-3">
                <FormInput
                    field="Nombre"
                    value={Nombre}
                    setFieldValue={setFieldValue}
                    error={error.Nombre}
                />
                <div className="flex flex-col font-bold">
                    <label className="text-lg" htmlFor="fechainicio">
                        Fecha Inicio:
                    </label>
                    <div className="flex">
                        <FormInput
                            field="FechaInicio"
                            defaultValue={FechaInicio}
                            setFieldValue={setFieldValue}
                            error={error.FechaInicio}
                            type="date"
                        />
                    </div>
                </div>
                <div className="flex flex-col font-bold">
                    <label className="text-lg" htmlFor="fechafinalizacion">
                        Fecha Finalizacion:
                    </label>
                    <div className="flex">
                        <FormInput
                            field="FechaFinalizacion"
                            defaultValue={FechaFinalizacion}
                            setFieldValue={setFieldValue}
                            error={error.FechaFinalizacion}
                            type="date"
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};
