/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {
    getEventsByRefs,
    getGroups,
    getInfluencerRef,
    getPersons,
    deleteEvent,
} from "../../../firebase/firebaseDB";
import { EVENTS_STATUS, ALERT_TYPES } from "../../../types";
import FilterModal from "../FilterModal";
import Alert from "../Alert";
import Persons from "../Persons";
import Event from "./Event";
import CorUEventModal from "./CorUEventModal";

export default function ListOfMyInfluences({ children, influencer }) {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState({ Nombre: "" });
    const [group, setGroup] = useState({});
    const [groups, setGroups] = useState([]);
    const [influencerRef, setInfluencerRef] = useState({});
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [persons, setPersons] = useState([]);
    const [viewAllEventsModal, setViewAllEventsModal] = useState(false);
    const [corUEventsModal, setCorUEventsModal] = useState(false);
    const [updateEvent, setUpdateEvent] = useState({});
    const [generalAlert, setGeneralAlert] = useState({});
    const [modalAlert, setModalAlert] = useState({});

    useEffect(() => {
        const fn = async () => {
            if (Object.keys(influencerRef).length == 0) return;

            // Get Influences
            setPersons([]);

            setPersons(await getPersons({ order, filter, influencerRef }));

            // Get groups
            const allGroups = await getGroups();
            const filteredGroups = allGroups.filter((g) =>
                g.Influencers?.reduce(
                    (a, c) => (c.path == influencerRef.path ? true : a),
                    false
                )
            );

            setGroups(filteredGroups);
            setGroup(filteredGroups[0]);
        };
        fn();
    }, [order, filter, influencerRef]);

    useEffect(() => {
        const fn = async () =>
            setInfluencerRef(
                (await getInfluencerRef(influencer.Referencia)).ref
            );
        if (influencer) fn();
    }, [influencer]);

    useEffect(() => {
        const fn = async () => setEvents(await getEventsByRefs(group.Eventos));

        if (Object.keys(group).length) fn();
    }, [group]);

    const handleChangeOrder = (e) => {
        const orderBy = e.target.id != "" ? e.target.id : "Nombre";

        setOrder({
            orderBy,
            type:
                order.orderBy == orderBy
                    ? order.type == "asc"
                        ? "desc"
                        : "asc"
                    : "asc",
        });
    };

    const refreshEvents = () => {
        const fn = async () => {
            // Get groups
            const allGroups = await getGroups();
            const filteredGroups = allGroups.filter((g) =>
                g.Influencers?.reduce(
                    (a, c) => (c.path == influencerRef.path ? true : a),
                    false
                )
            );

            setGroups(filteredGroups);
            setGroup(filteredGroups[0]);

            if (Object.keys(group).length)
                setEvents(await getEventsByRefs(group.Eventos));
        };

        fn();
    };

    const handleUpdateEvent = (e) => {
        setCorUEventsModal(true);
        setUpdateEvent(e);
    };

    const handleDeleteEvent = (e) => {
        const res = deleteEvent(e);

        if (!res) return;

        setModalAlert({
            msg: `Se ha eliminado el evento ${e.Nombre} correctamente`,
            type: ALERT_TYPES.SUCCESS,
        });

        setTimeout(() => {
            refreshEvents();
        }, 200);

        setTimeout(() => {
            setModalAlert({});
        }, 1000);
    };

    return (
        <>
            <section>
                {children}
                <div className="w-full h-8">
                    <FilterModal setFilter={setFilter} />
                </div>
                <Persons
                    handleChangeOrder={handleChangeOrder}
                    persons={persons}
                    setAlert={() => {}}
                />
            </section>
            {Object.keys(generalAlert).length != 0 && (
                <div className="fixed top-10 sm:left-[40dvw] left-[30dvw]">
                    <div className="relative">
                        <section className="w-full z-10 sticky">
                            <div className="flex items-center justify-center">
                                <div
                                    className={`font-bold p-2 rounded-xl border-2 ${
                                        generalAlert.type == ALERT_TYPES.SUCCESS
                                            ? "bg-green-700 border-green-900"
                                            : "bg-indigo-700 border-indigo-900"
                                    }`}
                                >
                                    <Alert
                                        alert={generalAlert}
                                        setAlert={setGeneralAlert}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
            {viewAllEventsModal && (
                <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 absolute">
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white p-6 rounded-xl">
                            <button
                                className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                                onClick={() => setViewAllEventsModal(false)}
                            >
                                {"<"} Cerrar
                            </button>
                            <h1 className="text-3xl font-black mb-5">
                                Todos los Eventos
                            </h1>
                            <select
                                className="border-2 border-black rounded-lg p-1"
                                onChange={(e) =>
                                    setGroup(
                                        groups.filter(
                                            (g) => g.id == e.target.value
                                        )[0]
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
                            <div>
                                {events.length != 0 ? (
                                    events.map((e) => (
                                        <div key={e.id} className="mb-4">
                                            <Event
                                                updateEvent={refreshEvents}
                                                e={e}
                                                handleUpdateEvent={
                                                    handleUpdateEvent
                                                }
                                            >
                                                <p
                                                    className="ml-1 px-1 font-bold border-2 border-black w-fit rounded-lg mt-1 hover:cursor-pointer hover:bg-slate-400 transition-all"
                                                    onClick={() =>
                                                        setModalAlert({
                                                            msg: `¿Desea eliminar el evento ${e.Nombre}?`,
                                                            type: ALERT_TYPES.CONFIRM,
                                                            handleConfirm: () =>
                                                                handleDeleteEvent(
                                                                    e
                                                                ),
                                                        })
                                                    }
                                                >
                                                    x
                                                </p>
                                            </Event>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay eventos</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        {Object.keys(modalAlert).length != 0 && (
                            <div className="fixed top-10 sm:left-[40dvw] left-[30dvw]">
                                <div className="relative">
                                    <section className="w-full z-10 sticky">
                                        <div className="flex items-center justify-center">
                                            <div
                                                className={`font-bold p-2 rounded-xl border-2 ${
                                                    generalAlert.type ==
                                                    ALERT_TYPES.SUCCESS
                                                        ? "bg-green-700 border-green-900"
                                                        : "bg-indigo-700 border-indigo-900"
                                                }`}
                                            >
                                                <Alert
                                                    alert={modalAlert}
                                                    setAlert={setModalAlert}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
            {corUEventsModal && (
                <CorUEventModal
                    refreshEvents={refreshEvents}
                    setAlert={setGeneralAlert}
                    setCorUEventModal={setCorUEventsModal}
                    updateEvent={updateEvent}
                    setUpdateEvent={setUpdateEvent}
                    setGroup={setGroup}
                    groups={groups}
                    group={group}
                />
            )}
            <section className="absolute bottom-16 left-0 border-t-2 border-black pt-6 w-screen pl-5 pr-5">
                <div className="flex justify-between">
                    <div>
                        <div className="flex gap-2 items-center">
                            <h3 className="text-xl font-bold">
                                Gestion de Eventos
                            </h3>
                            <select
                                className="border-2 border-black rounded-lg p-1"
                                onChange={(e) =>
                                    setGroup(
                                        groups.filter(
                                            (g) => g.id == e.target.value
                                        )[0]
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
                        </div>
                        <div className="mt-5 flex ml-3 gap-4 w-[80dvw] whitespace-nowrap">
                            {events.filter(
                                (g) => g.status != EVENTS_STATUS.INACTIVE
                            ).length != 0 ? (
                                events
                                    .filter(
                                        (g) =>
                                            g.status != EVENTS_STATUS.INACTIVE
                                    )
                                    .map((e) => (
                                        <Event
                                            updateEvent={refreshEvents}
                                            key={e.id}
                                            e={e}
                                            handleUpdateEvent={
                                                handleUpdateEvent
                                            }
                                        />
                                    ))
                            ) : (
                                <p>No hay eventos</p>
                            )}
                        </div>
                    </div>
                    <div className="flex h-fit">
                        <button
                            className=" px-1 mr-1 font-bold border-2 border-black w-fit rounded-lg mt-1 hover:cursor-pointer hover:bg-slate-400 transition-all"
                            onClick={() => setCorUEventsModal(true)}
                        >
                            +
                        </button>
                        <button
                            className=" px-1 font-bold border-2 border-black w-fit rounded-lg mt-1 hover:cursor-pointer hover:bg-slate-400 transition-all"
                            onClick={() => setViewAllEventsModal(true)}
                        >
                            Todos los eventos
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
