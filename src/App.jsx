import { useEffect, useState } from "react";

import { getUser, signOut } from "../firebase/firebaseAuth";

import { LISTS_TYPES, ROLES_TYPES } from "../types";

import LoginForm from "./components/LoginForm";
import ListOfPersons from "./components/ListOfPersons";
import ListOfMyInfluences from "./components/ListOfMyInfluences";

export default function App() {
    const [loginModal, setLoginModal] = useState(false);
    const [user, setUser] = useState({});
    const [influencer, setInfluencer] = useState(
        JSON.parse(localStorage.getItem("influencer"))
    );
    const [select, setSelect] = useState(
        ![ROLES_TYPES.ADMIN, ROLES_TYPES.ADMIN_INFLUENCER].includes(
            influencer?.Rol
        )
            ? LISTS_TYPES.MYINFLUENCES
            : LISTS_TYPES.USERS
    );

    useEffect(() => {
        getUser((user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        setInfluencer(JSON.parse(localStorage.getItem("influencer")));
    }, [loginModal]);

    return (
        <>
            <header className="text-white bg-red-500 p-5 flex justify-between items-center sticky top-0 left-0">
                <p className="font-bold text-3xl">ON Bases de Datos</p>

                {user.uid ? (
                    <p
                        className="font-bold text-xl hover:cursor-pointer"
                        onClick={() => signOut()}
                    >
                        Cerrar Sesión
                    </p>
                ) : (
                    <p
                        className="font-bold text-xl hover:cursor-pointer"
                        onClick={() => setLoginModal(true)}
                    >
                        Iniciar Sesión
                    </p>
                )}
            </header>
            <main className="p-10 flex flex-col gap-10">
                {loginModal && <LoginForm setLoginModal={setLoginModal} />}
                <div>
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl mb-2">
                            <div className="flex">
                                {[
                                    ROLES_TYPES.ADMIN,
                                    ROLES_TYPES.ADMIN_INFLUENCER,
                                ].includes(influencer?.Rol) && (
                                    <p
                                        className={`hover:cursor-pointer p-2 ${
                                            select == LISTS_TYPES.USERS
                                                ? "bg-slate-400"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (select != LISTS_TYPES.USERS)
                                                setSelect(LISTS_TYPES.USERS);
                                        }}
                                    >
                                        Lista de Usuarios
                                    </p>
                                )}
                                {[
                                    ROLES_TYPES.INFLUENCER,
                                    ROLES_TYPES.ADMIN_INFLUENCER,
                                ].includes(influencer?.Rol) && (
                                    <p
                                        className={`border border-l-gray-600 p-2 hover:cursor-pointer ${
                                            select == LISTS_TYPES.MYINFLUENCES
                                                ? "bg-slate-400"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (
                                                select !=
                                                LISTS_TYPES.MYINFLUENCES
                                            )
                                                setSelect(
                                                    LISTS_TYPES.MYINFLUENCES
                                                );
                                        }}
                                    >
                                        Mis Influencias
                                    </p>
                                )}
                            </div>
                        </h2>
                    </div>
                    {select == LISTS_TYPES.USERS ? (
                        <ListOfPersons influencer={influencer} />
                    ) : (
                        <ListOfMyInfluences influencer={influencer} />
                    )}
                </div>
            </main>
        </>
    );
}
