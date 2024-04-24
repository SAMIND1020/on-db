/* eslint-disable react/prop-types */
export default function Person({ person }) {
    return (
        <tr key={person.id}>
            <th className="p-2 border border-black">{person.Nombre}</th>

            <td className="p-2 border border-black">{person.Correo}</td>
            <td className="p-2 border border-black">
                {person.FechaNacimiento}
            </td>
            <td className="p-2 border border-black">{person.FechaInicio}</td>
            <td className="p-2 border border-black">{person.Telefono}</td>
            <td className="p-2 border border-black">{person.Edad}</td>
            {/* <td className="p-2 border border-black">{person.Direccion}</td> */}
            <td className="p-2 border border-black">
                <div className="flex flex-col items-center">
                    {person.Grupos.map((group) => (
                        <div key={group.id}>{group.id}</div>
                    ))}
                </div>
            </td>
            <td className="p-2 border border-black">
                {person.Influencer.Nombre}
            </td>
        </tr>
    );
}
