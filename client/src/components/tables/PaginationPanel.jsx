const PaginationPanel = () => {
    const numbers = [1, 2, 3, 4, 5];
    const selectedPage = 1;

    return (
        <div className="flex items-center justify-center p-4">
            <button className="transition-all flex items-center justify-center size-8 m-1 rounded-full hover:bg-selected dark:hover:bg-selected-dark">
                <i className="material-icons-outlined text-text dark:text-text-dark">
                    chevron_left
                </i>
            </button>
            {numbers.map((n) => (
                <button
                    className={`text-sm font-bold leading-normal tracking-[0.015em] flex items-center justify-center text-text dark:text-text-dark rounded-full ${
                        selectedPage === n
                            ? "bg-selected dark:bg-selected-dark size-10"
                            : "hover:bg-selected dark:hover:bg-selected-dark size-8 m-1"
                    }`}
                    key={`${n}-pag`}
                >
                    {n}
                </button>
            ))}
            <button className="transition-all flex items-center justify-center size-8 m-1 rounded-full hover:bg-selected dark:hover:bg-selected-dark">
                <i className="material-icons-outlined text-text dark:text-text-dark">
                    chevron_right
                </i>
            </button>
        </div>
    );
};

export default PaginationPanel;
