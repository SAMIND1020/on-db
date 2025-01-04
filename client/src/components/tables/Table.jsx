/* eslint-disable react/prop-types */
import { capitalizeWithSpaces } from "../../helpers/index";

const Table = (props) => {
    const {
        columnNames = ["ID", "Name", "Email", "Phone", "Actions"],
        children,
    } = props;

    return (
        <div className="p-3">
            <div className="flex overflow-hidden rounded-xl border borderselected bg-secondary dark:bg-secondary-dark">
                <table className="flex-1">
                    <thead>
                        <tr className="bg-secondary dark:bg-secondary-dark border-b border-bselected">
                            <td className="h-[72px] px-4 py-2 text-text dark:text-text-dark text-sm font-normal leading-normal" />

                            {columnNames.map((column, i) => (
                                <th
                                    className="px-4 py-3 text-left text-text dark:text-text-dark w-[400px] text-sm font-medium leading-normal"
                                    key={i}
                                >
                                    {capitalizeWithSpaces(column)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
