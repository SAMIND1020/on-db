/* eslint-disable react/prop-types */
const Page = ({
    title = "Home",
    children,
    actionButtons = <></>,
    widthFull = false,
    titleMarginl = true,
}) => {
    return (
        <div className={widthFull ? "flex flex-col w-full h-full" : ""}>
            <div className="flex justify-between gap-3 p-5">
                <p
                    className={`text-text dark:text-text-dark tracking-light text-[32px] font-bold leading-tight ${
                        titleMarginl ? "ml-7" : ""
                    }`}
                >
                    {title}
                </p>
                {actionButtons}
            </div>
            {children}
        </div>
    );
};
export default Page;
