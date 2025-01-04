/* eslint-disable react/prop-types */
const SearchInput = ({
    shadow,
    placeholder,
    icon = "search",
    onChange = () => {},
    value = "",
}) => {
    return (
        <div className="px-2 py-3">
            <label className="flex flex-col h-12 w-full">
                <div
                    className={`flex w-full flex-1 items-center rounded-xl h-full bg-selected dark:bg-selected-dark ${
                        shadow && "shadow-md"
                    }`}
                >
                    <i className="material-icons-outlined bg-transparent pl-2 text-text dark:text-text-dark">
                        {icon}
                    </i>
                    <input
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-selected dark:bg-selected-dark focus:border-none h-full placeholder:text-text2 dark:placeholder:text-text2-dark px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    />
                </div>
            </label>
        </div>
    );
};

export default SearchInput;
