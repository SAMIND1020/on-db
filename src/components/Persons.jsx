/* eslint-disable react/prop-types */
import Person, {PersonMobile} from './Person'

export default function Persons({ handleChangeOrder, persons }) {
    return (
        <div>
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
                        <th className="border border-black p-2">Telefono</th>
                        <th className="border border-black p-2">Edad</th>
                        <th className="border border-black p-2">Grupos</th>
                        <th className="border border-black p-2">Incluencer</th>
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
        </div>
    );
}
