/* eslint-disable react/prop-types */
const NavigationPanel = ({
    pages = [{ name: "Home", icon: "home" }],
    selectedPage = "home",
    handleChangePage = () => {},
    className = "text-text dark:text-text-dark text-sm font-medium leading-normal",
}) => {
    return (
        <div className="flex flex-col gap-2">
            {pages.map(({ name, icon, path }) => (
                <div
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:cursor-pointer ${
                        selectedPage == path
                            ? "bg-selected dark:bg-selected-dark"
                            : "hover:bg-selected dark:hover:bg-selected-dark"
                    }`}
                    key={`${name}-nav`}
                    onClick={() => handleChangePage(path)}
                >
                    {icon && (
                        <i className="material-icons-outlined text-text dark:text-text-dark">
                            {icon}
                        </i>
                    )}
                    <p className={className}>{name}</p>
                </div>
            ))}
        </div>
    );
};

export default NavigationPanel;
