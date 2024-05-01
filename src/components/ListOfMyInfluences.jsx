/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getInfluencerRef, getPersons } from "../../firebase/firebaseDB";

import FilterModal from "./FilterModal";
import Person from "./Person";

export default function ListOfMyInfluences({ children, influencer }) {
    const [persons, setPersons] = useState([]);
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [filter, setFilter] = useState({ Nombre: "" });
    const [influencerRef, setInfluencerRef] = useState({});

    useEffect(() => {
        const fn = async () => {
            if (Object.keys(influencerRef).length == 0) return;

            setPersons([]);

            const persons = await getPersons({ order, filter, influencerRef });

            setPersons(persons);
        };
        fn();
    }, [order, filter, influencerRef]);

    useEffect(() => {
        const fn = async () =>
            setInfluencerRef(
                (await getInfluencerRef(influencer.Referencia)).ref
            );
        fn();
    }, [influencer]);

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

    return (
        <section>
            {children}
            <div className="w-full h-8">
                <FilterModal setFilter={setFilter} />
            </div>
            <table>
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
                        <th className="border border-black p-2">Telefono</th>
                        <th className="border border-black p-2">Edad</th>
                        <th className="border border-black p-2">Grupos</th>
                        <th className="border border-black p-2">Incluencer</th>
                    </tr>
                </thead>
                <tbody className="users">
                    {persons.length != 0 &&
                        persons.map((person) => (
                            <Person key={person.id} person={person} />
                        ))}
                </tbody>
            </table>
        </section>
    );
}
