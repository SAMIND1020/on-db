/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { getPersons } from "../../../firebase/firebaseDB";
import { ALERT_TYPES } from "../../../types";
import Alert from "../Alert";

import FilterModal from "../FilterModal";
import Persons from "../Persons";
import CorUPersonModal from "./CorUPersonModal";

export default function ListOfUsers({ children }) {
    const [persons, setPersons] = useState([]);
    const [order, setOrder] = useState({ orderBy: "Nombre", type: "asc" });
    const [filter, setFilter] = useState({ Nombre: "" });
    const [corUPersonModal, setCorUPersonModal] = useState(false);
    const [updatePerson, setUpdatePerson] = useState({});
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

    const handleUpdatePerson = (person) => {
        setCorUPersonModal(true);
        setUpdatePerson(person);
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
                        handleUpdatePerson={handleUpdatePerson}
                        editButton={true}
                    >
                        <div>
                            {Object.keys(alert).length != 0 && (
                                <div className="fixed top-10 sm:left-[40dvw] left-[30dvw]">
                                    <div className="relative">
                                        <section className="w-full z-10 sticky">
                                            <div className="flex items-center justify-center">
                                                <div
                                                    className={`font-bold p-2 rounded-xl border-2 ${
                                                        alert.type ==
                                                        ALERT_TYPES.SUCCESS
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
                    </Persons>
                </section>
                <div className="flex justify-between">
                    <div></div>

                    <div className="flex gap-2">
                        <button
                            className="px-2 rounded-lg border-2 border-black text-xl font-bold mt-4 hover:bg-slate-500 transition-all"
                            onClick={() => setCorUPersonModal(true)}
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

                {corUPersonModal && (
                    <CorUPersonModal
                        setCorUPersonModal={setCorUPersonModal}
                        refreshPersons={refreshPersons}
                        alert={alert}
                        setAlert={setAlert}
                        updatePerson={updatePerson}
                        setUpdatePerson={setUpdatePerson}
                    />
                )}
            </section>
        </>
    );
}
