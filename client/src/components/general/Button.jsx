/* eslint-disable react/prop-types */
const Button = ({
    mode = 1,
    children,
    onClick = () => {},
    disable = false,
    rounded = "xl",
    icon = false,
}) => {
    return (
        <button
            className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] rounded-${rounded} ${
                disable
                    ? "text-disable cursor-default"
                    : mode !== 1
                    ? "text-text dark:text-text-dark hover:bg-selected dark:hover:bg-selected-dark"
                    : "hover:bg-hover dark:hover:bg-hover-dark bg-primary dark:bg-primary-dark text-secondary"
            }`}
            onClick={onClick}
        >
            {!icon ? (
                <span className="truncate">{children}</span>
            ) : (
                <i className="material-icons-outlined text-text dark:text-text-dark">
                    {children}
                </i>
            )}
        </button>
    );
};

export default Button;
