/* eslint-disable react/prop-types */
import { useState } from "react";

import { login, resetPassword } from "../../firebase/firebaseAuth";
import { ALERT_TYPES } from "../../types";

import Alert from "../components/Alert";

export default function LoginForm({ setLoginModal, resetAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        if ([email, password].includes(""))
            return setAlert({
                msg: "Todos los valores son obligatorios",
                type: ALERT_TYPES.ERROR,
            });

        const fn = async () => {
            // eslint-disable-next-line no-unused-vars
            const { error, data } = await login(email, password);

            if (error)
                return setAlert({
                    msg: error,
                    type: ALERT_TYPES.ERROR,
                });

            if (data.emailVerified) {
                setAlert({
                    msg: "Ha iniciado sesión correctamente",
                    type: ALERT_TYPES.SUCCESS,
                });

                resetAuth(true);

                setTimeout(() => {
                    setLoginModal(false);
                    setEmail("");
                    setPassword("");
                    setAlert({});
                }, 2000);

                return;
            }

            // No email verified

            setAlert({
                msg: (
                    <>
                        <h2 className="text-lg font-bold">
                            ¡Bienvenido al equipo!
                        </h2>
                        <p>Por favor verifica tu correo electronico</p>
                        <p>y guarda una nueva contraseña</p>
                        <p className="text-sm">
                            luego vuelve a iniciar sesion con tu nueva
                            contraseña
                        </p>
                    </>
                ),
                type: ALERT_TYPES.ALERT,
            });

            await resetPassword(email);
        };
        fn();
    };

    return (
        <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 absolute">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-xl">
                    <button
                        className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                        onClick={() => setLoginModal(false)}
                    >
                        {"<"} Cerrar
                    </button>
                    <h1 className="text-3xl font-black mb-5">Iniciar Sesión</h1>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleLogin}
                    >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Correo"
                            className="p-1 border-2 border-black rounded-lg"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Contraseña"
                            className="p-1 border-2 border-black rounded-lg"
                        />
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="p-1 border-2 border-black rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer"
                        />
                    </form>
                    <Alert alert={alert} />
                </div>
            </div>
        </section>
    );
}
