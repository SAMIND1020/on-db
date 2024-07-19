/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getPersons } from "../../firebase/firebaseDB";

import FilterModal from "./FilterModal";
import Persons from "./Persons";
import CreatePersonModal from "./CreatePersonModal";

export default function ListOfUsers({ children }) {
    const [persons, setPersons] = useState([]);
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [filter, setFilter] = useState({ Nombre: "" });
    const [createPersonModal, setCreatePersonModal] = useState(false);
    const [deleteMode, setDeleteMode] = useState("No change");
    const [alert, setAlert] = useState({});

    useEffect(() => {
        refreshPersons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, filter]);

    const refreshPersons = async () => {
        setPersons([]);

        const persons = await getPersons({ order, filter });

        setPersons(persons);
    };

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
                <section>
                    <Persons
                        persons={persons}
                        handleChangeOrder={handleChangeOrder}
                        deleteMode={deleteMode}
                        refreshPersons={refreshPersons}
                        alert={alert}
                        setAlert={setAlert}
                    />
                </section>
                <div className="flex justify-between">
                    <div></div>

                    <div className="flex gap-2">
                        <button
                            className="px-2 rounded-lg border-2 border-black text-xl font-bold mt-4 hover:bg-slate-500 transition-all"
                            onClick={() => setCreatePersonModal(true)}
                        >
                            {"+"}
                        </button>
                        <button
                            className="px-2 rounded-lg border-2 border-black text-xl font-bold mt-4 hover:bg-slate-500 transition-all"
                            onClick={() =>
                                setDeleteMode(
                                    typeof deleteMode == "string"
                                        ? true
                                        : !deleteMode
                                )
                            }
                        >
                            {"-"}
                        </button>
                    </div>
                </div>

                {createPersonModal && (
                    <CreatePersonModal
                        setCreatePersonModal={setCreatePersonModal}
                        refreshPersons={refreshPersons}
                        alert={alert}
                        setAlert={setAlert}
                    />
                )}
            </section>
        </>
    );
}
