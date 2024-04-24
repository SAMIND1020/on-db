/* eslint-disable react/prop-types */
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import {
    createUser,
    getGroups,
    getInfluencers,
} from "../../firebase/firebaseDB";
import { PAGES_TYPES } from "../../types/";

export default function CreatePersonModal({ setCreatePersonModal }) {
    const [page, setPage] = useState(PAGES_TYPES.FIRST);
    const [data, setData] = useState({
        Nombre: "",
        Correo: "",
        Telefono: "",
        Edad: "",
        TipoDocumento: "C.C",
        Documento: "",
        Familia: "",
        influencer: "",
        FechaNacimiento: "",
        FechaInicio: "",
        group: {},
        selectedLocation: {},
    });
    const [error, setError] = useState({});

    const nextPage = (p) => {
        switch (p) {
            case PAGES_TYPES.FIRST:
                setPage(PAGES_TYPES.SECOND);
                break;
            case PAGES_TYPES.SECOND:
                setPage(PAGES_TYPES.THIRD);
                break;
            default:
                setPage(PAGES_TYPES.THIRD);
                break;
        }
    };

    const previusPage = (p) => {
        switch (p) {
            case PAGES_TYPES.SECOND:
                setPage(PAGES_TYPES.FIRST);
                break;
            case PAGES_TYPES.THIRD:
                setPage(PAGES_TYPES.SECOND);
                break;
            default:
                setPage(PAGES_TYPES.FIRST);
                break;
        }
    };

    const handleCreatePerson = (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const documentRegex = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/;

        const errorFirstPage = {};
        const newFechaNacimiento = new Date(data.FechaNacimiento);
        const newFechaInicio = new Date(data.FechaInicio);

        if (!data.Nombre) errorFirstPage.Nombre = "Invalid Name";

        if (!data.Edad || data.Edad < 0 || data.Edad > 150)
            errorFirstPage.Edad = "Invalid Age";

        if (!emailRegex.test(data.Correo))
            errorFirstPage.Correo = "Invalid Email";

        if (!phoneRegex.test(data.Telefono))
            errorFirstPage.Telefono = "Invalid Phone";

        if (!data.Documento || !documentRegex.test(data.Documento))
            errorFirstPage.Documento = "Invalid Document";

        if (Object.keys(errorFirstPage).length) {
            setError({ ...errorFirstPage });
            return setPage(PAGES_TYPES.FIRST);
        }

        if (!Object.keys(data.selectedLocation).length) {
            setError({ selectedLocation: "Ubicación no seleccionada" });
            return setPage(PAGES_TYPES.SECOND);
        }

        const errorTirthPage = {};

        if (!data.FechaNacimiento || Date.now() - newFechaNacimiento < 0)
            errorTirthPage.FechaNacimiento = "Invalid Birth Date";

        if (!data.FechaInicio || Date.now() - newFechaInicio < 0)
            errorTirthPage.FechaInicio = "Invalid Init Date";

        if (!data.influencer) errorTirthPage.influencer = "Invalid Influencer";

        if (!Object.values(data.group).reduce((a, c) => (a ? a : c), false))
            errorTirthPage.group = "select at least one group";

        if (Object.keys(errorTirthPage).length) {
            setError({ ...errorTirthPage });
            return setPage(PAGES_TYPES.THIRD);
        }

        setError({});

        data.FechaInicio = newFechaInicio;
        data.FechaNacimiento = newFechaNacimiento;

        createUser(data);
    };

    return (
        <section className="h-full w-full opacity-90 bg-black top-0 left-0 z-10 absolute">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-6 rounded-xl">
                    <button
                        className="p-1 border-2 border-black rounded-lg text-white text-sm bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer mb-3"
                        onClick={() => setCreatePersonModal(false)}
                    >
                        {"<"} Cerrar
                    </button>
                    <h1 className="text-3xl font-black mb-5">
                        Inscribir Persona
                    </h1>
                    <form onSubmit={handleCreatePerson}>
                        {page === PAGES_TYPES.FIRST ? (
                            <FirstPage
                                nextPage={nextPage}
                                data={data}
                                setData={setData}
                                error={error}
                            />
                        ) : page === PAGES_TYPES.SECOND ? (
                            <SecondPage
                                nextPage={nextPage}
                                previusPage={previusPage}
                                data={data}
                                setData={setData}
                                error={error}
                            />
                        ) : page === PAGES_TYPES.THIRD ? (
                            <TirthPage
                                previusPage={previusPage}
                                data={data}
                                setData={setData}
                                error={error}
                            />
                        ) : (
                            <>ERROR</>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}

const SecondPage = ({ previusPage, nextPage, data, setData, error }) => {
    const [locationSearch, setLocationSearch] = useState("");
    const [locations, setLocations] = useState([]);

    const handleSearchLocation = () => {
        const fn = async () => {
            const q = await (
                await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${locationSearch}&contry=Colombia&format=json`
                )
            ).json();

            setLocations([...q]);
        };

        fn();
    };

    return (
        <>
            {!Object.keys(data.selectedLocation).length ? (
                <div className="w-[40dvw] h-[60dvh]">
                    <input
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        type="text"
                        placeholder="Dirección"
                        className="p-2 border border-black rounded-xl mb-2"
                        min={0}
                    />

                    <p
                        className="hover:cursor-pointer bg-indigo-600 hover-indigo-700 inline p-1 text-white rounded-lg ml-2 border border-black"
                        onClick={handleSearchLocation}
                    >
                        Buscar
                    </p>

                    <MapContainer center={[4.624335, -74.063644]} zoom={12}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MapContent
                            setLocations={setLocations}
                            locations={locations}
                            setSelectedLocation={(selectedLocation) =>
                                setData({ ...data, selectedLocation })
                            }
                        />
                    </MapContainer>
                </div>
            ) : (
                <div className="w-96">
                    <p className="font-black text-xl">
                        Ubicación Seleccionada:
                    </p>
                    <div className="text-balance">
                        <p className="text-lg font-bold">
                            {data.selectedLocation.name || "N/A"}:
                        </p>
                        <p className="ml-2">
                            <span className="font-bold block">
                                Descripción:
                            </span>
                            {data.selectedLocation.display_name || "N/A"}
                            <span className="font-bold block mt-2">
                                Barrio:
                            </span>
                            {data.selectedLocation.address?.neighbourhood ||
                                "N/A"}
                            <span className="font-bold block mt-2">
                                Localidad:
                            </span>
                            {data.selectedLocation.address?.suburb || "N/A"}
                            <span className="font-bold block mt-2">
                                Ciudad:
                            </span>
                            {data.selectedLocation.address?.city || "N/A"}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div></div>
                        <div
                            className="text-xs bg-indigo-600 border border-black rounded-lg font-black text-white p-1 hover:bg-indigo-700 hover:cursor-pointer mb-5"
                            onClick={() =>
                                setData({ ...data, selectedLocation: {} })
                            }
                        >
                            Seleccionar Otra Ubicación
                        </div>
                    </div>
                </div>
            )}
            <div>
                {error.selectedLocation && (
                    <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative my-2">
                        {error.selectedLocation}
                    </div>
                )}
            </div>
            <div className="flex justify-between">
                <div></div>
                <div className="flex gap-1">
                    <p
                        className="font-black p-1 border-2 border-black rounded-lg text-black bg-white hover:bg-gray-400 transition-all hover:cursor-pointer"
                        onClick={() => previusPage(PAGES_TYPES.SECOND)}
                    >
                        Atras {"<"}
                    </p>
                    <p
                        className="font-black p-1 border-2 border-black rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer"
                        onClick={() => nextPage(PAGES_TYPES.SECOND)}
                    >
                        Siguiente {">"}
                    </p>
                </div>
            </div>
        </>
    );
};

const MapContent = ({ setLocations, locations, setSelectedLocation }) => {
    const [viewMore, setViewMore] = useState(false);

    const handleClickMap = (e) => {
        setViewMore(false);

        const fn = async () => {
            const q = await (
                await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
                )
            ).json();

            setLocations([q]);

            map.flyTo(e.latlng, 15);
        };
        fn();
    };
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({ click: handleClickMap });

    const handleSelectLocation = (location) => setSelectedLocation(location);

    return (
        <>
            {locations.map((location, i) => (
                <Marker key={i} position={[location.lat, location.lon]}>
                    <Popup>
                        <p className="font-bold">{location.name}</p>
                        <div className={`${!viewMore && "truncate"}`}>
                            <span className="font-bold block">
                                Descripción:
                            </span>
                            {location.display_name}
                            {viewMore && (
                                <>
                                    <span className="font-bold block mt-2">
                                        Barrio:
                                    </span>
                                    {location.address.neighbourhood}
                                    <span className="font-bold block mt-2">
                                        Localidad:
                                    </span>
                                    {location.address.suburb}
                                    <span className="font-bold block mt-2">
                                        Ciudad:
                                    </span>
                                    {location.address.city}
                                </>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <p
                                className="hover:cursor-pointer font-bold active:text-indigo-600 m-0"
                                onClickCapture={() => setViewMore(!viewMore)}
                            >
                                {viewMore ? "Ver Menos" : "Ver Más"}
                            </p>
                            <p
                                className="hover:cursor-pointer font-bold active:text-indigo-600 m-0"
                                onClickCapture={() =>
                                    handleSelectLocation(location)
                                }
                            >
                                Seleccionar Ubicación
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

const FirstPage = ({ nextPage, setData, data, error }) => {
    const {
        Nombre,
        Correo,
        Telefono,
        Edad,
        TipoDocumento,
        Documento,
        Familia,
    } = data;

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex">
                    {error.Nombre && (
                        <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative">
                            X
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="p-2 border border-black rounded-xl w-full"
                        value={Nombre}
                        onChange={(e) =>
                            setData({
                                ...data,
                                Nombre: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex">
                    {error.Correo && (
                        <p className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black">
                            X
                        </p>
                    )}
                    <input
                        type="email"
                        placeholder="Correo"
                        className="p-2 border border-black rounded-xl w-full"
                        value={Correo}
                        onChange={(e) =>
                            setData({
                                ...data,
                                Correo: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex">
                    {error.Documento && (
                        <p className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black">
                            X
                        </p>
                    )}
                    <div className="flex gap-3">
                        <input
                            type="number"
                            placeholder="Numero de Identificación"
                            className="p-2 border border-black rounded-xl w-full"
                            value={Documento}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    Documento: e.target.value,
                                })
                            }
                            min={0}
                        />
                        <select
                            className="border border-black rounded-xl"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    TipoDocumento: e.target.value,
                                })
                            }
                            value={TipoDocumento}
                        >
                            <option value="T.I">T.I</option>
                            <option value="C.C">C.C</option>
                            <option value="C.E">C.E</option>
                        </select>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Familia"
                    className="p-2 border border-black rounded-xl w-full"
                    value={Familia}
                    onChange={(e) =>
                        setData({
                            ...data,
                            Familia: e.target.value,
                        })
                    }
                />
                <div className="flex">
                    {error.Telefono && (
                        <p className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black">
                            X
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Teléfono"
                        className="p-2 border border-black rounded-xl w-full"
                        value={Telefono}
                        onChange={(e) =>
                            setData({
                                ...data,
                                Telefono: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex">
                    {error.Edad && (
                        <p className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black">
                            X
                        </p>
                    )}
                    <input
                        type="number"
                        placeholder="Edad"
                        className="p-2 border border-black rounded-xl w-full"
                        value={Edad}
                        onChange={(e) =>
                            setData({
                                ...data,
                                Edad: parseInt(e.target.value),
                            })
                        }
                        min={0}
                    />
                </div>
                <div className="flex justify-between">
                    <div></div>
                    <p
                        className="font-black p-1 border-2 border-black rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer"
                        onClick={() => nextPage(PAGES_TYPES.FIRST)}
                    >
                        Siguiente {">"}
                    </p>
                </div>
            </div>
        </>
    );
};

const TirthPage = ({ previusPage, data, setData, error }) => {
    const [influencers, setInfluencers] = useState([]);
    const [groups, setGroups] = useState([]);

    const { FechaInicio, FechaNacimiento } = data;

    useEffect(() => {
        const fn = async () => {
            const [influencers, groupsProm] = await Promise.all([
                getInfluencers(),
                getGroups(),
            ]);

            setInfluencers(influencers);
            setGroups(groupsProm);

            const groupsObj = {};

            groupsProm.forEach(
                (groupThis) => (groupsObj[groupThis.id] = false)
            );

            if (!Object.keys(data.group).length)
                setData({ ...data, group: groupsObj });
        };
        fn();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <div className="flex flex-col font-bold">
                    <label className="text-lg" htmlFor="fechanacimiento">
                        Fecha Nacimiento:
                    </label>
                    <div className="flex">
                        {error.FechaNacimiento && (
                            <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative">
                                X
                            </div>
                        )}
                        <input
                            id="fechanacimiento"
                            type="date"
                            className="p-2 border border-black rounded-xl w-full"
                            value={FechaNacimiento}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    FechaNacimiento: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col font-bold">
                    <label className="text-lg" htmlFor="fechainicio">
                        Fecha Inicio:
                    </label>
                    <div className="flex">
                        {error.FechaInicio && (
                            <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative">
                                X
                            </div>
                        )}
                        <input
                            id="fechainicio"
                            type="date"
                            className="p-2 border border-black rounded-xl w-full"
                            value={FechaInicio}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    FechaInicio: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col font-bold">
                    <label className="text-lg ">Influencer:</label>
                    <div className="flex">
                        {error.influencer && (
                            <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative">
                                X
                            </div>
                        )}
                        <select
                            className="border-2 border-black mb-2 rounded-xl p-2"
                            value={data.influencer}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    influencer: e.target.value,
                                })
                            }
                        >
                            <option value="">-- Seleccione --</option>
                            {influencers.map((influencer) => (
                                <option
                                    value={influencer.id}
                                    key={influencer.id}
                                >
                                    {influencer.Nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex">
                        {error.group && (
                            <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative my-3">
                                X
                            </div>
                        )}
                        <label className="text-lg font-bold mt-4">
                            Grupos:
                        </label>
                    </div>
                    <ul className="ml-2 flex flex-col gap-1">
                        {groups.map(({ id: groupId }) => (
                            <li key={groupId}>
                                <label htmlFor={groupId}>{groupId}</label>
                                <input
                                    type="checkbox"
                                    id={groupId}
                                    className="ml-2"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            group: {
                                                ...data.group,
                                                [groupId]:
                                                    !data.group[e.target.id],
                                            },
                                        });
                                    }}
                                    checked={data.group[groupId]}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex justify-between mt-3">
                <div></div>
                <div className="flex gap-1">
                    <p
                        className="font-black p-1 border-2 border-black rounded-lg text-black bg-white hover:bg-gray-400 transition-all hover:cursor-pointer"
                        onClick={() => previusPage(PAGES_TYPES.THIRD)}
                    >
                        Atras {"<"}
                    </p>
                    <input
                        type="submit"
                        className="font-black p-1 border-2 border-black rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-all hover:cursor-pointer"
                        value="Inscribir Persona"
                    />
                </div>
            </div>
        </>
    );
};
