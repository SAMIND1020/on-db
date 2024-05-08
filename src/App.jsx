import { useEffect, useState } from "react";

import { getUser, signOut } from "../firebase/firebaseAuth";

import { LISTS_TYPES, ROLES_TYPES } from "../types";

import LoginForm from "./components/LoginForm";
import ListOfPersons from "./components/ListOfPersons";
import ListOfMyInfluences from "./components/ListOfMyInfluences";

export default function App() {
    const [loginModal, setLoginModal] = useState(false);
    const [influencer, setInfluencer] = useState({
        user: {},
        influencer: {},
    });
    const [select, setSelect] = useState();

    useEffect(() => {
        const fn = async () => setInfluencer(await getUser());
        fn();
    }, []);

    useEffect(() => {
        setSelect(
            influencer.user.uid
                ? [ROLES_TYPES.ADMIN, ROLES_TYPES.ADMIN_INFLUENCER].includes(
                      influencer.influencer?.Rol
                  )
                    ? LISTS_TYPES.USERS
                    : LISTS_TYPES.MYINFLUENCES
                : null
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [influencer]);

    const resetAuth = (opt) => {
        if (!opt) return setInfluencer({ influencer: {}, user: {} });

        const fn = async () => setInfluencer(await getUser());
        fn();
    };

    return (
        <>
            <header className="text-white bg-red-500 p-5 flex justify-between items-center sticky top-0 left-0">
                <p className="font-bold text-3xl sm:hidden block">ON DB</p>
                <p className="font-bold text-3xl sm:block hidden">
                    ON Bases de Datos
                </p>

                {influencer.user.uid ? (
                    <p
                        className="font-bold text-xl hover:cursor-pointer"
                        onClick={() => {
                            resetAuth(false);
                            signOut();
                        }}
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
                {loginModal && (
                    <LoginForm
                        setLoginModal={setLoginModal}
                        resetAuth={resetAuth}
                    />
                )}
                <div>
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl mb-2">
                            <div className="flex">
                                {[
                                    ROLES_TYPES.ADMIN,
                                    ROLES_TYPES.ADMIN_INFLUENCER,
                                ].includes(influencer.influencer?.Rol) &&
                                    influencer.user?.uid && (
                                        <p
                                            className={`hover:cursor-pointer p-2 ${
                                                select == LISTS_TYPES.USERS
                                                    ? "bg-slate-400"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                if (select != LISTS_TYPES.USERS)
                                                    setSelect(
                                                        LISTS_TYPES.USERS
                                                    );
                                            }}
                                        >
                                            Lista de Usuarios
                                        </p>
                                    )}
                                {[
                                    ROLES_TYPES.INFLUENCER,
                                    ROLES_TYPES.ADMIN_INFLUENCER,
                                ].includes(influencer.influencer?.Rol) &&
                                    influencer.user?.uid && (
                                        <p
                                            className={`border border-l-gray-600 p-2 hover:cursor-pointer ${
                                                select ==
                                                LISTS_TYPES.MYINFLUENCES
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
                    ) : select == LISTS_TYPES.MYINFLUENCES ? (
                        <ListOfMyInfluences
                            influencer={influencer.influencer}
                        />
                    ) : (
                        <div>
                            <p>
                                Inicie sesion para empezar a ver la información
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
