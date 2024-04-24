/* eslint-disable react/prop-types */
import { useState } from "react";

export default function FilterModal({ setFilter }) {
    const [Nombre, setNombre] = useState("");
    const [Correo, setCorreo] = useState("");
    const [Telefono, setTelefono] = useState("");

    const handleFilter = (e) => {
        e.preventDefault();

        const filter = {};

        if (Nombre.length != 0) filter.Nombre = Nombre;
        if (Correo.length != 0) filter.Correo = Correo;
        if (Telefono.length != 0) filter.Telefono = Telefono;

        setFilter(filter);
    };

    return (
        <div className="w-full flex justify-between">
            <div></div>
            <div className="relative text-xl">
                <button className="absolute top-0 font-black dropdown-btn -left-14">
                    <div className="text-xl">Filtros</div>
                    <div className="hidden text-left absolute rounded-lg z-10 dropdown-content shadow-lg shadow-black bg-white -left-28 p-2 text-sm">
                        <form onSubmit={handleFilter}>
                            <input
                                type="search"
                                onChange={(e) => setNombre(e.target.value)}
                                value={Nombre}
                                placeholder="Nombre"
                                className="w-40 p-2 border border-black rounded-xl mb-2"
                            />
                            <input
                                type="search"
                                onChange={(e) => setCorreo(e.target.value)}
                                value={Correo}
                                placeholder="Correo"
                                className="w-40 p-2 border border-black rounded-xl mb-2"
                            />
                            <input
                                type="search"
                                onChange={(e) => setTelefono(e.target.value)}
                                value={Telefono}
                                placeholder="Telefono"
                                className="w-40 p-2 border border-black rounded-xl mb-2"
                            />
                            <div className="mb-2">
                                <label className="text-lg mb-2">
                                    Fecha Nacimiento:
                                </label>
                                <p className="text-xs">Desde:</p>
                                <input
                                    type="date"
                                    className="w-40 p-2 border border-black rounded-xl"
                                />
                                <p className="text-xs">Hasta:</p>
                                <input
                                    type="date"
                                    className="w-40 p-2 border border-black rounded-xl"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="text-lg mb-2">
                                    Fecha Inicio:
                                </label>
                                <p className="text-xs">Desde:</p>
                                <input
                                    type="date"
                                    className="w-40 p-2 border border-black rounded-xl"
                                />
                                <p className="text-xs">Hasta:</p>
                                <input
                                    type="date"
                                    className="w-40 p-2 border border-black rounded-xl"
                                />
                            </div>
                            <input
                                type="submit"
                                value="Aplicar"
                                className="border border-black bg-indigo-500 p-2 rounded-xl text-white hover:cursor-pointer"
                            />
                        </form>
                    </div>
                </button>
            </div>
        </div>
    );
}
