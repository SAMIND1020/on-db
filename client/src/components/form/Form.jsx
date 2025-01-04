/* eslint-disable react/prop-types */
import { useState } from "react";
import { paginateArray } from "../../helpers";

import Button from "../general/Button";

const Form = ({
    children,
    title,
    titleSmall = false,
    description,
    pages = 1,
    className,
    submitButtonText = "Save and close",
    onSubmit = () => {},
}) => {
    const [page, setPage] = useState(1);

    const inputsPerPage = children.length / pages;

    return (
        <div className="flex flex-col flex-1 justify-between h-full">
            <div>
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p
                            className={`text-text dark:text-text-dark tracking-light ${
                                titleSmall ? `text-[20px]` : "text-[32px]"
                            } font-bold leading-tight`}
                        >
                            {title}
                        </p>
                        {description && (
                            <p className="text-text2 dark:text-text2-dark text-sm font-normal leading-normal">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                <div className={className}>
                    {!children?.length
                        ? children
                        : paginateArray(children, inputsPerPage, page)}
                </div>
            </div>
            <div className="flex px-4 py-3 justify-between">
                {pages === 1 ? (
                    <div></div>
                ) : (
                    <Button
                        mode={2}
                        disable={page === 1}
                        onClick={
                            page !== 1 ? () => setPage(page - 1) : () => {}
                        }
                    >
                        <span className="truncate">Previous Page</span>
                    </Button>
                )}
                <Button
                    onClick={
                        pages === page
                            ? () => onSubmit()
                            : () => setPage(page + 1)
                    }
                >
                    <span className="truncate">
                        {pages === page || pages === 1
                            ? submitButtonText
                            : "Next Page"}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default Form;
