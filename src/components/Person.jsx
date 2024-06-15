/* eslint-disable react/prop-types */
export default function Person({ person, children }) {
    const {
        Nombre,
        Correo,
        FechaNacimiento,
        FechaInicio,
        Telefono,
        Edad,
        Grupos,
        Influencer,
    } = person;

    return (
        <tr>
            <th className="p-2 border border-black">{Nombre}</th>

            <td className="p-2 border border-black">{Correo}</td>
            <td className="p-2 border border-black">{FechaNacimiento}</td>
            <td className="p-2 border border-black">{FechaInicio}</td>
            <td className="p-2 border border-black">{Telefono}</td>
            <td className="p-2 border border-black">{Edad}</td>
            {/* <td className="p-2 border border-black">{Direccion}</td> */}
            <td className="p-2 border border-black">
                <div className="flex flex-col items-center">
                    {Grupos ? (
                        Grupos.map((group, i) => <div key={i}>{group.id}</div>)
                    ) : (
                        <p>No tiene grupos</p>
                    )}
                </div>
            </td>
            <td className="p-2 border border-black">{Influencer?.Nombre}</td>
            <td>{children}</td>
        </tr>
    );
}

export function PersonMobile({ person, extra, children }) {
    const {
        Nombre,
        Correo,
        FechaNacimiento,
        FechaInicio,
        Telefono,
        Edad,
        Grupos,
        Influencer,
    } = person;

    return (
        <div className="sm:flex sm:justify-between block border border-black p-3 w-[80dvw]">
            <div>
                <p className="font-bold text-lg">{Nombre}</p>
                <p>{Correo}</p>
                <p>{Telefono}</p>
            </div>
            {(typeof extra == "undefined" || extra) && (
                <div className="text-sm border-l border-black pl-2 mx-2 mt-2">
                    <p>
                        <span className="font-bold">Fecha de Nacimiento: </span>
                        {FechaNacimiento}
                    </p>
                    <p>
                        <span className="font-bold">Fecha de Inicio: </span>
                        {FechaInicio}
                    </p>
                    <p>
                        <span className="font-bold">Edad: </span>
                        {Edad}
                    </p>
                    <div>
                        <p className="font-bold text-sm">Grupos: </p>
                        <div className="flex flex-col text-sm ml-3">
                            {Grupos ? (
                                Grupos.map((group, i) => (
                                    <div key={i}>{group.id}</div>
                                ))
                            ) : (
                                <p>No tiene grupos</p>
                            )}
                        </div>
                    </div>
                    <p>
                        <span className="font-bold">Influencer: </span>
                        {Influencer?.Nombre}
                    </p>
                </div>
            )}
            {children}
        </div>
    );
}
