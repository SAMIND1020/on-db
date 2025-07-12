/* eslint-disable react/prop-types */
const TableRegistry = ({
    data = {},
    columnNames,
    textTruncate = false,
    actionButton = {},
}) => {
    return (
        <tr>
            <td className="h-[72px] px-4 py-2 text-text dark:text-text-dark text-sm font-normal leading-normal" />
            {columnNames.map((column, i) => (
                <td
                    className="h-[72px] px-4 py-2 text-text dark:text-text-dark text-sm font-normal leading-normal max-w-36"
                    key={i}
                >
                    {textTruncate ? (
                        <p className="truncate">{data[column]}</p>
                    ) : (
                        data[column] || "N/A"
                    )}
                </td>
            ))}
            {Object.keys(actionButton).length !== 0 && (
                <td
                    className="h-[72px] px-4 py-2 text-text dark:text-text-dark text-sm font-normal leading-normal max-w-36 hover:cursor-pointer"
                    onClick={() => actionButton.onClick(data)}
                >
                    {actionButton.icon ? (
                        <i className="material-icons-outlined text-text dark:text-text-dark pl-3">
                            {actionButton.icon}
                        </i>
                    ) : (
                        actionButton.name
                    )}
                </td>
            )}

            {/* TODO: add the actions buttons */}
            {/* <td className="h-[72px] px-4 py-2 text-text dark:text-text-dark text-sm font-medium leading-normal">
                <a href="#">Edit</a>/<a href="#">Delete</a>
            </td> */}
        </tr>
    );
};

export default TableRegistry;
