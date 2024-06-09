/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
    getEventsByRefs,
    getGroups,
    getInfluencerRef,
    getPersons,
} from "../../firebase/firebaseDB";

import FilterModal from "./FilterModal";
import Person, { PersonMobile } from "./Person";
import Event from "./Event";
import { EVENTS_STATUS } from "../../types";

export default function ListOfMyInfluences({ children, influencer }) {
    const [persons, setPersons] = useState([]);
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [filter, setFilter] = useState({ Nombre: "" });
    const [influencerRef, setInfluencerRef] = useState({});
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState({});
    const [events, setEvents] = useState([]);

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

    const updateEvent = () => {
        const fn = async () => setEvents(await getEventsByRefs(group.Eventos));

        if (Object.keys(group).length) fn();
    };

    return (
        <>
            <section>
                {children}
                <div className="w-full h-8">
                    <FilterModal setFilter={setFilter} />
                </div>
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
                            <th
                                className="border border-black p-2 hover:cursor-pointer"
                                id="Fecha de Nacimiento"
                                onClick={handleChangeOrder}
                            >
                                Fecha de Nacimiento
                                <span className="text-xs">▲▼</span>
                            </th>
                            <th
                                className="border border-black p-2 hover:cursor-pointer"
                                id="Fecha de Inicio"
                                onClick={handleChangeOrder}
                            >
                                Fecha de Inicio
                                <span className="text-xs">▲▼</span>
                            </th>
                            <th className="border border-black p-2">
                                Telefono
                            </th>
                            <th className="border border-black p-2">Edad</th>
                            <th className="border border-black p-2">Grupos</th>
                            <th className="border border-black p-2">
                                Incluencer
                            </th>
                        </tr>
                    </thead>
                    <tbody className="users">
                        {persons.length != 0 &&
                            persons.map((person) => (
                                <Person key={person.id} person={person} />
                            ))}
                    </tbody>
                </table>
                <div className="md:hidden block">
                    {persons.length != 0 &&
                        persons.map((person) => (
                            <PersonMobile key={person.id} person={person} />
                        ))}
                </div>
            </section>
            <section className="absolute bottom-16">
                <div className="flex gap-2 items-center">
                    <h3 className="text-xl font-bold">Gestion de Eventos</h3>
                    <select
                        className="border-2 border-black rounded-lg p-1"
                        onChange={(e) =>
                            setGroup(
                                groups.filter((g) => g.id == e.target.value)[0]
                            )
                        }
                        defaultValue={group.id}
                    >
                        {groups.map((g) => (
                            <option value={g.id} key={g.id}>
                                {g.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-5 flex ml-3 gap-4 w-[80dvw] whitespace-nowrap">
                    {events.filter((g) => g.status != EVENTS_STATUS.INACTIVE)
                        .length != 0 ? (
                        events
                            .filter((g) => g.status != EVENTS_STATUS.INACTIVE)
                            .map((e) => <Event updateEvent={updateEvent} key={e.id} e={e} />)
                    ) : (
                        <p>No hay eventos</p>
                    )}
                </div>
            </section>
        </>
    );
}
