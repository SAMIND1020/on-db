/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getPersons } from "../../firebase/firebaseDB";

import FilterModal from "./FilterModal";
import Person, { PersonMobile } from "./Person";
import CreatePersonModal from "./CreatePersonModal";

export default function ListOfUsers({ children }) {
    const [persons, setPersons] = useState([]);
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [filter, setFilter] = useState({ Nombre: "" });
    const [createPersonModal, setCreatePersonModal] = useState(false);

    useEffect(() => {
        const fn = async () => {
            setPersons([]);

            const persons = await getPersons({ order, filter });

            setPersons(persons);
        };
        fn();
    }, [order, filter]);

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
                <div className="flex justify-between">
                    <div></div>

                    <button
                        className="px-2 rounded-lg border-2 border-black text-xl font-bold mt-4"
                        onClick={() => setCreatePersonModal(true)}
                    >
                        {"+"}
                    </button>
                </div>

                {createPersonModal && (
                    <CreatePersonModal
                        setCreatePersonModal={setCreatePersonModal}
                    />
                )}
            </section>
        </>
    );
}
