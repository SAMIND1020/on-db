import SearchInput from "./SearchInput";

const SearchFilters = () => {
    return (
        <div className="flex flex-col gap-2">
            <SearchInput placeholder="Search for a user..." />
            <div>
                <h3 className="text-text dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] px-4 py-2">
                    Filters
                </h3>
                <div className="flex gap-3 p-3 flex-wrap pr-4">
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-selected dark:bg-selected-dark pl-4 pr-4 text-text dark:text-text-dark">
                        <p className="text-text dark:text-text-dark text-sm font-medium leading-normal">
                            Active
                        </p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-selected dark:bg-selected-dark pl-4 pr-4 text-text dark:text-text-dark">
                        <p className="text-text dark:text-text-dark text-sm font-medium leading-normal">
                            Inactive
                        </p>
                    </div>
                    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-selected dark:bg-selected-dark pl-4 pr-4 text-text dark:text-text-dark">
                        <p className="text-text dark:text-text-dark text-sm font-medium leading-normal">
                            Blocked
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
