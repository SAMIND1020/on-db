/* eslint-disable react/prop-types */
import { capitalizeWithSpaces, lowercaseWithUnderscores } from "../../helpers";
import { INPUT_TYPES } from "../../types";

const FormInput = ({
    label = "Name",
    placeholder = "John",
    onChange = () => {},
    type = "",
    values = [],
    value = "",
    checkbox_cols = 2,
}) => {
    return (
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-text dark:text-text-dark text-base font-medium leading-normal pb-2">
                    {label}
                </p>
                {type === INPUT_TYPES.TEXT && (
                    <input
                        value={value}
                        placeholder={placeholder}
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-selected dark:bg-selected-dark focus:border-none h-14 placeholder:text-text2 dark:placeholder:text-text2-dark p-4 text-base font-normal leading-normal"
                        onChange={(e) =>
                            onChange(
                                e.target.value,
                                lowercaseWithUnderscores(label)
                            )
                        }
                        id={`${lowercaseWithUnderscores(label)}-form`}
                    />
                )}
                {type === INPUT_TYPES.DATE && (
                    <input
                        value={value}
                        type="date"
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-selected dark:bg-selected-dark focus:border-none h-14 placeholder:text-text2 dark:placeholder:text-text2-dark p-4 text-base font-normal leading-normal"
                        onChange={(e) =>
                            onChange(
                                e.target.value,
                                lowercaseWithUnderscores(label)
                            )
                        }
                        id={`${lowercaseWithUnderscores(label)}-form`}
                    />
                )}
                {type === INPUT_TYPES.SELECT && (
                    <select
                        value={value}
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-selected dark:bg-selected-dark focus:border-none h-14 placeholder:text-text2 dark:placeholder:text-text2-dark p-4 text-base font-normal leading-normal"
                        onChange={(e) =>
                            onChange(
                                e.target.value,
                                lowercaseWithUnderscores(label)
                            )
                        }
                    >
                        {values.map((v) => (
                            <option
                                key={`${v.value || v}-select`}
                                value={v.value || v}
                            >
                                {v.label || capitalizeWithSpaces(v)}
                            </option>
                        ))}
                    </select>
                )}
                {type === INPUT_TYPES.CHECKBOXES && (
                    <div
                        className={`grid grid-cols-${checkbox_cols} w-full flex-1 overflow-hidden rounded-xl text-text dark:text-text-dark bg-selected dark:bg-selected-dark h-auto placeholder:text-text2 dark:placeholder:text-text2-dark p-4 text-base font-normal gap-2`}
                    >
                        {values.map((v) => {
                            const id = `${v}-form`; // Reutilización de ID y nombre
                            const isChecked =
                                Array.isArray(value) && value.includes(v);

                            return (
                                <div
                                    key={id}
                                    className="flex gap-2 items-center"
                                >
                                    <input
                                        checked={isChecked}
                                        value={v}
                                        onChange={(e) => {
                                            const { value: va, checked } =
                                                e.target;

                                            const updatedValue = checked
                                                ? [...(value || []), va]
                                                : (value || []).filter(
                                                      (group) => group !== va
                                                  );
                                            onChange(
                                                updatedValue,
                                                lowercaseWithUnderscores(label)
                                            );
                                        }}
                                        id={id}
                                        name={id}
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor={id}
                                        className="text-text dark:text-text-dark text-sm font-medium"
                                    >
                                        {capitalizeWithSpaces(v)}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                )}
            </label>
        </div>
    );
};

export default FormInput;
